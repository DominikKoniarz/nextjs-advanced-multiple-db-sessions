"use server";

import { lucia } from "@/lib/auth";
import { userActionClient } from "@/lib/safeAction";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const logout = userActionClient.action(async ({ ctx: { sessionId } }) => {
    await lucia.invalidateSession(sessionId);

    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
    );

    redirect("/login");
});

export default logout;
