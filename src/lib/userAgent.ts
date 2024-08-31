import parser from "ua-parser-js";

type DataFromUserAgent = {
    browser: {
        name: string | null;
    };
    os: {
        name: string | null;
    };
};

export const getDataFromUserAgent = (userAgent: string): DataFromUserAgent => {
    const result = parser(userAgent);

    return {
        browser: {
            name: result.browser.name ?? null,
        },
        os: {
            name: result.os.name ?? null,
        },
    };
};
