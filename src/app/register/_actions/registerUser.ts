"use server";

import { createUser, getUserByEmail } from "@/data-access/users";
import { hashPassword } from "@/lib/bcrypt";
import { verifyReCaptcha } from "@/lib/reCaptcha";
import {
    actionClient,
    BadRequestError,
    ForbiddenError,
} from "@/lib/safeAction";
import registerSchema from "@/schema/registerSchema";

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

        await createUser({
            email,
            password: hashedPassword,
        });

        return { success: true };
    });

export default registerUser;
