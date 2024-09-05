import { env } from "@/env";

export const GOOGLE_REDIRECT_URI: string = new URL(
    "/api/auth/google/callback",
    env.NEXT_PUBLIC_BASE_URL,
).toString();

export const GOOGLE_OAUTH_STATE_COOKIE_NAME = "google_oauth_state";
export const GOOGLE_CODE_VERIFIER_COOKIE_NAME = "google_code_verifier";

export const EMAIL_ALREADY_IN_USE_ERROR = "EMAIL_ALREADY_IN_USE";
export const OAUTH_ERROR = "OAUTH_ERROR";
export const INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR";
