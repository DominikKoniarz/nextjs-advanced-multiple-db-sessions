import type { PrismaClient } from "@prisma/client";
import type { lucia } from "@/lib/auth";

declare global {
    var db: PrismaClient | undefined;
}

interface DatabaseSessionAttributes {
    ip: string;
}

interface DatabaseUserAttributes {
    googleId: string;
}

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseSessionAttributes: DatabaseSessionAttributes;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}
