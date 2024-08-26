"use client";

import useLoginForm from "../_hooks/useLoginForm";
import ReCAPTCHA from "react-google-recaptcha";
import { env } from "@/env";
import SubmitButton from "@/components/SubmitButton";
import FloatingLabelInput from "@/components/FloatingLabelInput";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";

export default function LoginForm() {
    const { reCaptchaRef, isLoading, onSubmit, form } = useLoginForm();

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
                <SubmitButton isLoading={isLoading} text="Sign in" />
            </form>
        </Form>
    );
}
