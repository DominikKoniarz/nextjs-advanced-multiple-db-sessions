import "server-only";

import { ValidateSessionSuccessResponse } from "@/app/api/validate-session/route";
import { LUCIA_SESSION_COOKIE_NAME } from "@/constants/auth";
import { env } from "@/env";
import { cookies } from "next/headers";

const url = new URL("/api/validate-session", env.APP_URL).toString();

export const validateMiddlewareSession =
    async (): Promise<ValidateSessionSuccessResponse> => {
        const sessionId =
            cookies().get(LUCIA_SESSION_COOKIE_NAME)?.value ?? null;
        if (!sessionId) return { session: null, user: null };

        try {
            const reponse = await fetch(url, {
                method: "POST",
                body: JSON.stringify({ sessionId }),
            });

            if (!reponse.ok) return { session: null, user: null };

            const json =
                (await reponse.json()) as ValidateSessionSuccessResponse;

            return json;
        } catch (error) {
            console.error(error);
            return { session: null, user: null };
        }
    };

export const getRedirectUrl = (pathname: string): string => {
    const url = new URL(pathname, env.APP_URL);
    return url.toString();
};
