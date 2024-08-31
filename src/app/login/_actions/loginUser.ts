"use server";

import { getUserByEmail } from "@/data-access/users";
import { lucia } from "@/lib/auth";
import { comparePassword, hashPassword } from "@/lib/bcrypt";
import { getRequestIp } from "@/lib/ip";
import { verifyReCaptcha } from "@/lib/reCaptcha";
import {
    actionClient,
    BadRequestError,
    ForbiddenError,
} from "@/lib/safeAction";
import { getDataFromUserAgent } from "@/lib/userAgent";
import loginSchema from "@/schema/loginSchema";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

const loginUser = actionClient
    .schema(loginSchema)
    .action(async ({ parsedInput: { email, password, reCaptchaToken } }) => {
        if (!reCaptchaToken)
            throw new BadRequestError("Valid reCaptcha token is required");

        const { success } = await verifyReCaptcha(reCaptchaToken);

        if (!success) throw new ForbiddenError("reCaptcha verification failed");

        const foundUser = await getUserByEmail(email);

        if (!foundUser || !foundUser.password) {
            // This is for security reasons, so that attackers can't guess if an email is registered or not
            await hashPassword(password);

            throw new ForbiddenError("Invalid email or password!");
        }

        const passwordMatch = await comparePassword(
            password,
            foundUser.password,
        );

        if (!passwordMatch)
            throw new ForbiddenError("Invalid email or password!");

        const ip = getRequestIp();

        const userAgent = headers().get("user-agent") ?? "";
        const dataFromUserAgent = getDataFromUserAgent(userAgent);

        const session = await lucia.createSession(foundUser.id, {
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

        // only for purpose of testing this application - to not have a lot of sessions in the database
        // usually this should be done in a cron job
        await lucia.deleteExpiredSessions();

        redirect("/dashboard");
    });

export default loginUser;
