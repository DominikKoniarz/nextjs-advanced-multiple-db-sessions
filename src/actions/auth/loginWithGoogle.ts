"use server";

import {
    GOOGLE_CODE_VERIFIER_COOKIE_NAME,
    GOOGLE_OAUTH_STATE_COOKIE_NAME,
} from "@/constants/auth";
import { env } from "@/env";
import { google } from "@/lib/auth";
import { actionClient } from "@/lib/safeAction";
import { generateCodeVerifier, generateState } from "arctic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const loginWithGoogle = actionClient.action(async () => {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    const url = await google.createAuthorizationURL(state, codeVerifier, {
        scopes: ["profile", "email"],
    });

    cookies().set(GOOGLE_OAUTH_STATE_COOKIE_NAME, state, {
        secure: env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 60 * 10,
    });

    cookies().set(GOOGLE_CODE_VERIFIER_COOKIE_NAME, codeVerifier, {
        secure: env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 60 * 10,
    });

    redirect(url.toString());
});

export default loginWithGoogle;
