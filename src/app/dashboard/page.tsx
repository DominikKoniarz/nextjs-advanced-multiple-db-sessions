import { lucia, validateRequest } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Heading from "./_components/Heading";
import SessionTile from "./_components/SessionTile/SessionTile";

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

    const sessions = await lucia.getUserSessions(user.id);

    return (
        <main className="h-full w-full p-6 xs:p-8 sm:p-14">
            <div className="relative z-10 mx-auto w-full max-w-screen-lg space-y-5 rounded-md border bg-white px-5 py-4 pb-8 shadow">
                <div className="flex flex-row items-center justify-between">
                    <Heading />
                    <form action={logout}>
                        <button className="text-primary underline">
                            Logout
                        </button>
                    </form>
                </div>
                <p className="font-medium text-error">
                    Remember! Do not leak your sessions id!
                </p>
                {sessions.length > 0 && (
                    <div className="grid w-full grid-cols-2 gap-4">
                        {sessions.map((item) => (
                            <SessionTile
                                key={item.id}
                                session={item}
                                isCurrent={item.id === session.id}
                            />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
