import type { Session, User } from "lucia";
import { lucia } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const validateSessionSchema = z.object({
    sessionId: z
        .string({ invalid_type_error: "Invalid session ID" })
        .min(1, { message: "Session ID must be at least 1 character long!" }),
});

export type ValidateSessionSuccessResponse =
    | {
          user: User;
          session: Session;
      }
    | {
          user: null;
          session: null;
      };

export type ValidateSessionErrorResponse = { error: string };

export const POST = async (
    req: NextRequest,
): Promise<
    NextResponse<ValidateSessionSuccessResponse | ValidateSessionErrorResponse>
> => {
    try {
        const json = await req.json();
        console.log(req.nextUrl);
        const sessionIdNotSecure = json?.sessionId ?? null;

        const jsonValResult = validateSessionSchema.safeParse({
            sessionId: sessionIdNotSecure,
        });

        if (!jsonValResult.success) {
            console.error(jsonValResult.error.errors);
            return NextResponse.json(
                { error: jsonValResult.error.errors[0].message },
                { status: 400 },
            );
        }

        const { sessionId } = jsonValResult.data;

        const result = await lucia.validateSession(sessionId);

        return NextResponse.json(result);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
};
