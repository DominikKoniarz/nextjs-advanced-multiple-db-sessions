import { prisma } from "@/lib/prisma";

export const getSingleSession = (sessionId: string) =>
    prisma.session.findUnique({
        where: {
            id: sessionId,
        },
    });
