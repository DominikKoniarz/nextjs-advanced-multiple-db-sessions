import z from "zod";

const registerSchema = z
    .object({
        reCaptchaToken: z.string(),
        email: z
            .string({ message: "Type your email!" })
            .email({ message: "Type a valid email!" }),
        password: z.string({ message: "Password is required!" }).min(8, {
            message: "Password must be at least 8 characters long!",
        }),
        repeatPassword: z.string(),
    })
    .superRefine((data, ctx) => {
        if (data.password !== data.repeatPassword)
            ctx.addIssue({
                message: "Passwords don't match!",
                path: ["repeatPassword"],
                code: z.ZodIssueCode.custom,
            });
    });

export default registerSchema;

export type RegisterSchema = z.infer<typeof registerSchema>;
