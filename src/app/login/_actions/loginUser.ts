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
import loginSchema from "@/schema/loginSchema";
import { cookies } from "next/headers";
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

        const session = await lucia.createSession(foundUser.id, { ip });
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes,
        );

        redirect("/dashboard");
    });

export default loginUser;
