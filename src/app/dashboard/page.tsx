import { lucia, validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Heading from "./_components/Heading";
import SessionsTiles from "./_components/SessionsTiles";
import SessionsTilesSkeleton from "./_components/SessionsTilesSkeleton";
import LogoutButton from "./_components/LogoutButton";

export default async function DashboardPage() {
    const { user, session } = await validateRequest();

    if (!user || !session) redirect("/login");

    const sessionsPromise = lucia.getUserSessions(user.id);

    return (
        <main className="h-full w-full p-6 xs:px-8 sm:px-14">
            <div className="mx-auto pb-8">
                <div className="relative z-10 mx-auto w-full max-w-screen-sm space-y-5 rounded-md border bg-white px-5 py-4 pb-8 shadow transition-all lg:max-w-screen-lg">
                    <div className="flex flex-row items-center justify-between">
                        <Heading />
                        <LogoutButton />
                    </div>
                    <p className="text-sm font-medium text-error sm:text-base">
                        Remember! Do not leak your sessions id!
                    </p>
                    <Suspense fallback={<SessionsTilesSkeleton />}>
                        <SessionsTiles
                            sessionsPromise={sessionsPromise}
                            currentSessionId={session.id}
                        />
                    </Suspense>
                </div>
            </div>
        </main>
    );
}
