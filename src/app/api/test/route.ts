import { NextRequest, NextResponse } from "next/server";
import { Mutex } from "async-mutex";

export const runtime = "node";

export const dynamic = "force-dynamic";

const getDelayFrom5Sto15SInMs = () => Math.floor(Math.random() * 10000) + 5000;

const mutex = new Mutex();

export const GET = async (req: NextRequest) => {
    const delay = getDelayFrom5Sto15SInMs();

    const release = await mutex.acquire();

    try {
        await new Promise((resolve) => setTimeout(resolve, delay));

        return NextResponse.json({ delay });
    } catch (error) {
        return NextResponse.json({ error: "server error" }, { status: 500 });
    } finally {
        release();
    }
};
