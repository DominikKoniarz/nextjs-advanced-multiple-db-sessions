import { lucia, validateRequest } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Heading from "./_components/Heading";
import { Suspense } from "react";
import SessionsTiles from "./_components/SessionsTiles";
import SessionsTilesSkeleton from "./_components/SessionsTilesSkeleton";

// for now - for test
const logout = async () => {
    "use server";

    const { session } = await validateRequest();

    if (!session) return redirect("/login");

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
    );
    return redirect("/login");
};
export default async function DashboardPage() {
    const { user, session } = await validateRequest();

    if (!user || !session) redirect("/login");

    const sessionsPromise = lucia.getUserSessions(user.id);

    return (
        <main className="h-full w-full p-6 xs:p-8 sm:p-14">
            <div className="relative z-10 mx-auto w-full max-w-screen-sm space-y-5 rounded-md border bg-white px-5 py-4 pb-8 shadow transition-all lg:max-w-screen-lg">
                <div className="flex flex-row items-center justify-between">
                    <Heading />
                    <form action={logout}>
                        <button className="text-primary underline">
                            Logout
                        </button>
                    </form>
                </div>
                <p className="text-sm font-medium text-error sm:text-base">
                    Remember! Do not leak your sessions id!
                </p>
                <Suspense fallback={<SessionsTilesSkeleton />}>
                    <SessionsTiles
                        sessionsPromise={sessionsPromise}
                        currentSessionId={session.id}
                    />
                    <SessionsTilesSkeleton />
                </Suspense>
            </div>
        </main>
    );
}
