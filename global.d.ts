import type { PrismaClient } from "@prisma/client";

declare global {
	var db: PrismaClient | undefined;
}
