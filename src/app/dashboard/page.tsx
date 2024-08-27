import { lucia, validateRequest } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
    const { user } = await validateRequest();

    if (!user) redirect("/login");

    return (
        <main className="flex h-full w-full flex-col items-center justify-center px-6 pb-10 xs:px-14 sm:gap-6 lg:px-8">
            {/* <div className="relative z-10 mx-auto flex w-full max-w-xs flex-col gap-6 rounded-2xl border bg-white p-6 shadow transition-all sm:max-w-sm sm:gap-8 sm:p-8">

    </div> */}
            <form action={logout} className="z-10 bg-white p-5">
                <button
                    className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                    type="submit"
                >
                    Logout
                </button>
            </form>
        </main>
    );
}
