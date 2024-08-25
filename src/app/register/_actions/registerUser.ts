"use server";

import { createUser, getUserByEmail } from "@/data-access/users";
import { lucia } from "@/lib/auth";
import { hashPassword } from "@/lib/bcrypt";
import { verifyReCaptcha } from "@/lib/reCaptcha";
import {
    actionClient,
    BadRequestError,
    ForbiddenError,
} from "@/lib/safeAction";
import registerSchema from "@/schema/registerSchema";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

const registerUser = actionClient
    .schema(registerSchema)
    .action(async ({ parsedInput: { reCaptchaToken, email, password } }) => {
        if (!reCaptchaToken)
            throw new BadRequestError("Valid reCaptcha token is required");

        const { success } = await verifyReCaptcha(reCaptchaToken);

        if (!success) throw new ForbiddenError("reCaptcha verification failed");

        const foundUser = await getUserByEmail(email);

        if (foundUser)
            throw new ForbiddenError("This email is already in use!");

        const hashedPassword = await hashPassword(password);

        const newUser = await createUser({
            email,
            password: hashedPassword,
        });

        const ip =
            headers().get("x-real-ip") ||
            headers().get("x-forwarded-for") ||
            "";

        const session = await lucia.createSession(newUser.id, { ip });
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes,
        );

        redirect("/dashboard");
    });

export default registerUser;
