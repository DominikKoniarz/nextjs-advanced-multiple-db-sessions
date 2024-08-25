"use client";

import FloatingLabelInput from "@/components/FloatingLabelInput";
import { Button } from "@/components/ui/button";
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

export default function RegisterForm() {
    const { form, reCaptchaRef } = useRegisterForm();

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((data) => console.log(data))}
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
                                    placeholder="Email"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="ml-0.5 text-error" />
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
                            <FormMessage className="ml-0.5 text-error" />
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
                            <FormMessage className="ml-0.5 text-error" />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="h-9 bg-secondary text-secondary-content hover:bg-secondary sm:h-10"
                >
                    Sign Up
                </Button>
            </form>
        </Form>
    );
}
