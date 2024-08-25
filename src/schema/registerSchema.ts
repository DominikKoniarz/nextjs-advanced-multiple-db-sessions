import z from "zod";

const registerSchema = z
    .object({
        email: z
            .string({ message: "Type your email!" })
            .email({ message: "Type a valid email!" }),
        password: z.string({ message: "Password is required!" }).min(8, {
            message: "Password must be at least 8 characters long!",
        }),
        repeatPassword: z.string(),
    })
    .refine((data) => data.password === data.repeatPassword, {
        message: "Passwords don't match!",
        path: ["repeatPassword"],
    });

export default registerSchema;

export type RegisterSchema = z.infer<typeof registerSchema>;
