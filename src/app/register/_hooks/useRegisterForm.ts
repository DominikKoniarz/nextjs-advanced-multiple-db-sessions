import type ReCAPTCHA from "react-google-recaptcha";
import registerSchema, { RegisterSchema } from "@/schema/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useAction } from "next-safe-action/hooks";
import registerUser from "../_actions/registerUser";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const useRegisterForm = () => {
    const router = useRouter();

    const reCaptchaRef = useRef<ReCAPTCHA>(null);

    const form = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        mode: "onBlur",
        reValidateMode: "onChange",
        defaultValues: {
            reCaptchaToken: "",
            email: "",
            password: "",
            repeatPassword: "",
        },
    });

    const resetFormAndCaptcha = () => {
        reCaptchaRef.current?.reset();

        const { email } = form.getValues();
        form.reset({
            reCaptchaToken: "",
            email,
            password: "",
            repeatPassword: "",
        });
    };

    const { execute, isPending } = useAction(registerUser, {
        onSuccess: () => {
            router.push("/dashboard");
        },
        onError: (error) => {
            resetFormAndCaptcha();

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

export default useRegisterForm;
