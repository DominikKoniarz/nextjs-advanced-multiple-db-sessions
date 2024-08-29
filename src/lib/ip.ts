import { headers } from "next/headers";
import "server-only";

// USE IN SERVER ACTION OR ROUTE HANDLER (OR SERVER COMPONENT?)
export const getRequestIp = (): string => {
    return (
        headers().get("x-real-ip") ||
        headers().get("x-forwarded-for") ||
        "127.0.0.1"
    );
};
