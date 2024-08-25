import { Lucia, TimeSpan } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { prisma } from "./prisma";
import { env } from "@/env";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
    sessionExpiresIn: new TimeSpan(7, "d"),
    sessionCookie: {
        expires: true,
        attributes: {
            secure: env.NODE_ENV === "production",
            sameSite: "strict",
        },
    },
});
