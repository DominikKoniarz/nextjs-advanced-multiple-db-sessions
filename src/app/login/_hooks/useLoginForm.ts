import type ReCAPTCHA from "react-google-recaptcha";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useAction } from "next-safe-action/hooks";
import toast from "react-hot-toast";
import loginUser from "../_actions/loginUser";
import loginSchema, { LoginSchema } from "@/schema/loginSchema";

const useLoginForm = () => {
    const reCaptchaRef = useRef<ReCAPTCHA>(null);

    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        mode: "onBlur",
        reValidateMode: "onChange",
        defaultValues: {
            reCaptchaToken: "",
            email: "",
            password: "",
        },
    });

    const resetFormAndCaptcha = () => {
        reCaptchaRef.current?.reset();

        const { email } = form.getValues();
        form.reset({
            reCaptchaToken: "",
            email,
            password: "",
        });
    };

    const { execute, isPending } = useAction(loginUser, {
        onError: (error) => {
            resetFormAndCaptcha();

            const fetchError = error.error.fetchError;

            if (fetchError) {
                toast.error(fetchError);
            }

            const serverError = error.error.serverError;

            if (serverError) {
                toast.error(serverError);
            }

            const validationErrors = error.error.validationErrors?.fieldErrors;

            if (validationErrors) {
                Object.values(validationErrors).forEach((errors) => {
                    toast.error(errors[0]);
                });
            }
        },
    });

    const onSubmit = form.handleSubmit(async (data) => {
        const token = await reCaptchaRef.current?.executeAsync();
        execute({ ...data, reCaptchaToken: token ?? "" });
    });

    return { form, reCaptchaRef, onSubmit, isLoading: isPending };
};

export default useLoginForm;
