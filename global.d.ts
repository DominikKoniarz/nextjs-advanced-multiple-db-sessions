import type { PrismaClient } from "@prisma/client";

declare global {
    var db: PrismaClient | undefined;
}

interface DatabaseUserAttributes {
    email: string;
}

interface DatabaseSessionAttributes {
    ip: string;
}

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
        DatabaseSessionAttributes: DatabaseSessionAttributes;
    }
}
