import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        NODE_ENV: z.enum(["development", "production", "test"]),
        RECAPTCHA_SECRET_KEY: z.string().min(1),
        GOOGLE_CLIENT_ID: z.string().min(1),
        GOOGLE_CLIENT_SECRET: z.string().min(1),
    },
    client: {
        NEXT_PUBLIC_IS_DEV: z.boolean(),
        NEXT_PUBLIC_IS_PROD: z.boolean(),
        NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string().min(1),
        NEXT_PUBLIC_BASE_URL: z.string().min(1),
    },
    runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,
        NEXT_PUBLIC_IS_DEV: process.env.NODE_ENV === "development",
        NEXT_PUBLIC_IS_PROD: process.env.NODE_ENV === "production",
        RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
        NEXT_PUBLIC_RECAPTCHA_SITE_KEY:
            process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    },
});
