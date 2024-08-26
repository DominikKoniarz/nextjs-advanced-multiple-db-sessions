import z from "zod";

const loginSchema = z.object({
    reCaptchaToken: z.string(),
    email: z
        .string({ message: "Type your email!" })
        .email({ message: "Type valid email!" }),
    password: z.string({ message: "Password is required!" }).min(8, {
        message: "Type valid password!",
    }),
});

export default loginSchema;

export type LoginSchema = z.infer<typeof loginSchema>;
