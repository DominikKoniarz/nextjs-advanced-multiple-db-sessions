"use server";

import { actionClient, BadRequestError } from "@/lib/safeAction";
import registerSchema from "@/schema/registerSchema";

const registerUser = actionClient
    .schema(registerSchema)
    .action(async ({ parsedInput }) => {
        throw new BadRequestError("This is a bad request error!");
        console.log(parsedInput);
        return { success: true };
    });

export default registerUser;
