import "server-only";

import { Lucia, Session, TimeSpan, User } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { prisma } from "./prisma";
import { env } from "@/env";
import { cookies } from "next/headers";
import { cache } from "react";
import { Google } from "arctic";
import { GOOGLE_REDIRECT_URI } from "@/constants/auth";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const google = new Google(
    env.GOOGLE_CLIENT_ID,
    env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI,
);

export const lucia = new Lucia(adapter, {
    sessionExpiresIn: new TimeSpan(7, "d"),
    sessionCookie: {
        expires: true,
        attributes: {
            secure: env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        },
    },
    getSessionAttributes: ({ ip, browserName, osName }) => {
        return { ip, browserName, osName };
    },
    getUserAttributes: ({ googleId }) => {
        return {
            googleId,
        };
    },
});

export const validateRequest = cache(
    async (): Promise<
        { user: User; session: Session } | { user: null; session: null }
    > => {
        const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
        if (!sessionId) {
            return {
                user: null,
                session: null,
            };
        }

        const result = await lucia.validateSession(sessionId);
        // next.js throws when you attempt to set cookie when rendering page
        try {
            if (result.session && result.session.fresh) {
                const sessionCookie = lucia.createSessionCookie(
                    result.session.id,
                );
                cookies().set(
                    sessionCookie.name,
                    sessionCookie.value,
                    sessionCookie.attributes,
                );
            }
            if (!result.session) {
                const sessionCookie = lucia.createBlankSessionCookie();
                cookies().set(
                    sessionCookie.name,
                    sessionCookie.value,
                    sessionCookie.attributes,
                );
            }
        } catch {}
        return result;
    },
);
