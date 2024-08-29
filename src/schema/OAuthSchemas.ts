import { z } from "zod";

export const googleUserSchema = z.object({
    sub: z.string(),
    name: z.string(),
    given_name: z.string(),
    family_name: z.string(),
    picture: z.string(),
    email: z.string(),
    email_verified: z.boolean(),
});
