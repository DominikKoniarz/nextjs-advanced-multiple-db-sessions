import { env } from "@/env";

const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

const generateVerifyUrl = (token: string): string => {
    const url = new URL(RECAPTCHA_VERIFY_URL);

    url.searchParams.append("secret", env.RECAPTCHA_SECRET_KEY);
    url.searchParams.append("response", token);

    return url.toString();
};

const verify = async (
    token: string,
): Promise<{ success: boolean; response: unknown }> => {
    const url = generateVerifyUrl(token);

    const response = await fetch(url, {
        method: "POST",
    });

    if (!response.ok)
        throw new Error(
            "Failed to verify reCaptcha token. Response code is other than 2**",
        );

    const data = await response.json();

    return {
        success: !!data.success,
        response: data,
    };
};

export const reCaptcha = {
    verify,
};
