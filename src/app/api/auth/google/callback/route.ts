import {
    EMAIL_ALREADY_IN_USE_ERROR,
    GOOGLE_CODE_VERIFIER_COOKIE_NAME,
    GOOGLE_OAUTH_STATE_COOKIE_NAME,
    INTERNAL_SERVER_ERROR,
    OAUTH_ERROR,
} from "@/constants/auth";
import {
    createUser,
    getUserByEmail,
    getUserByGoogleId,
} from "@/data-access/users";
import { env } from "@/env";
import { google, lucia } from "@/lib/auth";
import { getRequestIp } from "@/lib/ip";
import { getDataFromUserAgent } from "@/lib/userAgent";
import { googleUserSchema } from "@/schema/OAuthSchemas";
import { OAuth2RequestError } from "arctic";
import { cookies, headers } from "next/headers";
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

    const codeVerifier = codeVerifierCookie?.value;
    const savedState = stateCookie?.value;

    if (!codeVerifier || !savedState) {
        console.error("Invalid request! Code verifier and state are required!");

        return NextResponse.redirect(
            new URL(`/login?error=${OAUTH_ERROR}`, env.NEXT_PUBLIC_BASE_URL),
            {
                status: 302,
            },
        );
    }

    if (savedState !== state) {
        console.error("Invalid request! State mismatch!");

        return NextResponse.redirect(
            new URL(`/login?error=${OAUTH_ERROR}`, env.NEXT_PUBLIC_BASE_URL),
            {
                status: 302,
            },
        );
    }

    try {
        const tokens = await google.validateAuthorizationCode(
            code,
            codeVerifier,
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

        const userAgent = headers().get("user-agent") ?? "";
        const dataFromUserAgent = getDataFromUserAgent(userAgent);

        if (foundUserWithGoogleId) {
            const session = await lucia.createSession(
                foundUserWithGoogleId.id,
                {
                    ip,
                    browserName: dataFromUserAgent.browser.name,
                    osName: dataFromUserAgent.os.name,
                },
            );
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies().set(
                sessionCookie.name,
                sessionCookie.value,
                sessionCookie.attributes,
            );

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
                    `/login?error=${EMAIL_ALREADY_IN_USE_ERROR}`,
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

        const session = await lucia.createSession(newUser.id, {
            ip,
            browserName: dataFromUserAgent.browser.name,
            osName: dataFromUserAgent.os.name,
        });
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes,
        );

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
        } else {
            console.error(error);
        }

        return NextResponse.redirect(
            new URL(
                `/login?error=${INTERNAL_SERVER_ERROR}`,
                env.NEXT_PUBLIC_BASE_URL,
            ),
            {
                status: 302,
            },
        );
    }
};
