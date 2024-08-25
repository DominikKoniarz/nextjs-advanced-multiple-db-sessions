import type ReCAPTCHA from "react-google-recaptcha";
import registerSchema, { RegisterSchema } from "@/schema/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";

const useRegisterForm = () => {
    const reCaptchaRef = useRef<ReCAPTCHA>(null);

    const form = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        mode: "onBlur",
        reValidateMode: "onChange",
        defaultValues: {
            email: "",
            password: "",
            repeatPassword: "",
        },
    });

    const onSubmit = () => {
        // TODO
    };

    return { form, reCaptchaRef, onSubmit };
};

export default useRegisterForm;
