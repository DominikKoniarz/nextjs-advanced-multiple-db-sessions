import { NextRequest, NextResponse } from "next/server";
import { env } from "@/env";
import { Redis } from "@upstash/redis";
import { Lock } from "@upstash/lock";

export const runtime = "nodejs";

export const dynamic = "force-dynamic";

export const maxDuration = 30;

const redis = new Redis({
    url: env.UPSTASH_REDIS_URL,
    token: env.UPSTASH_REDIS_TOKEN,
});

const getDelayFrom5Sto15SInMs = () => Math.floor(Math.random() * 10000) + 5000;

// const mutex = new Mutex();

export const GET = async (
    req: NextRequest,
    { params }: { params: { id: string } },
) => {
    // const delay = getDelayFrom5Sto15SInMs();
    // const release = await mutex.acquire();
    // try {
    //     await new Promise((resolve) => setTimeout(resolve, delay));
    //     return NextResponse.json({ delay });
    // } catch (error) {
    //     return NextResponse.json({ error: "server error" }, { status: 500 });
    // } finally {
    //     release();
    // }
    const lock = new Lock({
        id: `lock:${params.id}`,
        redis,
        lease: 25000,
        retry: {
            attempts: 10,
            delay: 1000,
        },
    });

    const start = Date.now();

    try {
        const tryLockStart = Date.now();
        console.log(lock.id);
        console.log(await lock.getStatus());
        const acquired = await lock.acquire();
        const tryLockEnd = Date.now();
        console.log(
            "tryLockEnd - tryLockStart",
            (tryLockEnd - tryLockStart) / 1000,
        );
        console.log("acquired", acquired);
        if (!acquired) {
            return NextResponse.json({ error: "rate limit" }, { status: 429 });
        }

        const delay = getDelayFrom5Sto15SInMs();
        await new Promise((resolve) => setTimeout(resolve, delay));

        await lock.release();

        const end = Date.now();
        return NextResponse.json({ delay: delay, end: (end - start) / 1000 });
    } catch (error) {
        console.error(error);
        const end = Date.now();
        return NextResponse.json(
            { error: "server error", end: (end - start) / 1000 },
            { status: 500 },
        );
    }
};
