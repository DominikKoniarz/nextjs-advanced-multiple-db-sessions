import { NextRequest, NextResponse } from "next/server";
import { getRedirectUrl, validateMiddlewareSession } from "./lib/middleware";

const PROTECTED_PAGES = ["/dashboard"];
const PAGES_WITH_REDIRECT_WHEN_LOGGED_IN = ["/login", "/register"];

export const middleware = async (req: NextRequest): Promise<NextResponse> => {
    const pathname = req.nextUrl.pathname;

    if (PROTECTED_PAGES.includes(pathname)) {
        const { user } = await validateMiddlewareSession();

        if (!user) return NextResponse.redirect(getRedirectUrl("/login"));
    }

    if (PAGES_WITH_REDIRECT_WHEN_LOGGED_IN.includes(pathname)) {
        const { user } = await validateMiddlewareSession();

        if (user) return NextResponse.redirect(getRedirectUrl("/dashboard"));
    }

    return NextResponse.next();
};
