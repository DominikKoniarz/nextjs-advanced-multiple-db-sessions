import { env } from "@/env";
import { PrismaClient } from "@prisma/client";

export const prisma = globalThis.db || new PrismaClient();

if (env.NODE_ENV !== "production") globalThis.db = prisma;
