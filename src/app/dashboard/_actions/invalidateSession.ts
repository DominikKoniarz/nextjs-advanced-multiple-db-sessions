"use server";

import { getSingleSession } from "@/data-access/sessions";
import { lucia } from "@/lib/auth";
import {
    BadRequestError,
    UnauthorizedError,
    userActionClient,
} from "@/lib/safeAction";
import invalidateSessionSchema from "@/schema/invalidateSessionSchema";

const invalidateSession = userActionClient
    .schema(invalidateSessionSchema)
    .action(
        async ({
            parsedInput: { sessionId },
            ctx: { userId, sessionId: currentSessionId },
        }) => {
            if (sessionId === currentSessionId)
                throw new BadRequestError("Cannot invalidate current session!");

            const foundSession = await getSingleSession(sessionId);

            if (!foundSession) throw new BadRequestError("Session not found!");

            if (foundSession.userId !== userId)
                throw new UnauthorizedError(
                    "Unauthorized to invalidate this session!",
                );

            await lucia.invalidateSession(sessionId);

            return { success: true };
        },
    );

export default invalidateSession;
