import {
    GOOGLE_CODE_VERIFIER_COOKIE_NAME,
    GOOGLE_OAUTH_STATE_COOKIE_NAME,
} from "@/constants/auth";
import {
    createUser,
    getUserByEmail,
    getUserByGoogleId,
} from "@/data-access/users";
import { env } from "@/env";
import { google, lucia } from "@/lib/auth";
import { getRequestIp } from "@/lib/ip";
import { googleUserSchema } from "@/schema/OAuthSchemas";
import { OAuth2RequestError } from "arctic";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
    const code = req.nextUrl.searchParams.get("code");
    const state = req.nextUrl.searchParams.get("state");

    const stateCookie = cookies().get(GOOGLE_OAUTH_STATE_COOKIE_NAME);
    const codeVerifierCookie = cookies().get(GOOGLE_CODE_VERIFIER_COOKIE_NAME);

    if (!code || !state)
        return NextResponse.json(
            {
                error: "Invalid request!",
                message: "State and code are required!",
            },
            { status: 400 },
        );

    const codeVerified = codeVerifierCookie?.value;
    const savedState = stateCookie?.value;

    if (!codeVerified || !savedState)
        return NextResponse.json(
            {
                error: "Invalid request!",
                message: "Code verifier and state are required!",
            },
            { status: 400 },
        );

    if (savedState !== state)
        return NextResponse.json(
            {
                error: "Invalid request!",
                message: "State mismatch!",
            },
            { status: 400 },
        );

    try {
        const tokens = await google.validateAuthorizationCode(
            code,
            codeVerifierCookie.value,
        );

        const response = await fetch(
            "https://openidconnect.googleapis.com/v1/userinfo",
            {
                headers: {
                    Authorization: `Bearer ${tokens.accessToken}`,
                },
            },
        );

        const json = await response.json();

        const googleUser = googleUserSchema.parse(json);
        const { sub: googleId } = googleUser;

        const foundUserWithGoogleId = await getUserByGoogleId(googleId);

        const ip = getRequestIp();

        if (foundUserWithGoogleId) {
            const session = await lucia.createSession(
                foundUserWithGoogleId.id,
                { ip },
            );
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies().set(sessionCookie.name, sessionCookie.value, {
                ...sessionCookie.attributes,
                sameSite: "lax",
            });

            return NextResponse.redirect(
                new URL("/dashboard", env.NEXT_PUBLIC_BASE_URL),
                {
                    status: 302,
                },
            );
        }

        const foundUserByEmail = await getUserByEmail(googleUser.email);

        if (foundUserByEmail)
            return NextResponse.redirect(
                new URL(
                    "/login?error=EMAIL_ALREADY_IN_USE",
                    env.NEXT_PUBLIC_BASE_URL,
                ),
                {
                    status: 302,
                },
            );

        const newUser = await createUser({
            googleId,
            email: googleUser.email,
        });

        const session = await lucia.createSession(newUser.id, { ip });
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, {
            ...sessionCookie.attributes,
            sameSite: "lax",
        });

        return NextResponse.redirect(
            new URL("/dashboard", env.NEXT_PUBLIC_BASE_URL),
            {
                status: 302,
            },
        );
    } catch (error) {
        if (error instanceof OAuth2RequestError) {
            const { request, message, description } = error;
            console.error(request);
            console.error(message);
            console.error(description);

            return NextResponse.json(
                { error: "Invalid request!" },
                { status: 400 },
            );
        }

        console.error(error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
};
