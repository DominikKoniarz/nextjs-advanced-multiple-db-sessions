"use client";

import FloatingLabelInput from "@/components/FloatingLabelInput";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import useRegisterForm from "../_hooks/useRegisterForm";
import ReCAPTCHA from "react-google-recaptcha";
import { env } from "@/env";
import SubmitButton from "@/components/SubmitButton";

export default function RegisterForm() {
    const { form, reCaptchaRef, onSubmit, isLoading } = useRegisterForm();

    return (
        <Form {...form}>
            <form
                onSubmit={onSubmit}
                className="relative z-10 flex flex-col gap-6 sm:gap-8"
            >
                <ReCAPTCHA
                    className="hidden"
                    size="invisible"
                    sitekey={env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    ref={reCaptchaRef}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FormControl>
                                <FloatingLabelInput
                                    type="email"
                                    placeholder="Email"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="ml-0.5" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FormControl>
                                <FloatingLabelInput
                                    type="password"
                                    placeholder="Password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="ml-0.5" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="repeatPassword"
                    render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FormControl>
                                <FloatingLabelInput
                                    type="password"
                                    placeholder="Repeat Password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="ml-0.5" />
                        </FormItem>
                    )}
                />
                <SubmitButton isLoading={isLoading} text="Sign Up" />
            </form>
        </Form>
    );
}
