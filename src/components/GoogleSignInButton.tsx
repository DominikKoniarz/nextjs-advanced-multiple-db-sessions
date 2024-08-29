"use client";

import { Button } from "./ui/button";
import { FaGoogle } from "react-icons/fa";
import { cn } from "@/lib/utils";
import useGoogleLogin from "@/hooks/useGoogleLogin";

export default function GoogleSignInButton({
    className,
    text = "Sign in with Google",
}: {
    className?: string;
    text?: string;
}) {
    const { login, isPending } = useGoogleLogin();

    return (
        <Button
            type="button"
            onClick={() => login()}
            disabled={isPending}
            aria-disabled={isPending}
            className={cn(
                "flex h-10 w-full flex-row items-center gap-2 border bg-white px-4 text-copy transition-all hover:bg-slate-50 disabled:bg-slate-50 disabled:text-copy disabled:opacity-90 disabled:hover:bg-slate-50",
                className,
            )}
        >
            <FaGoogle /> {text}
        </Button>
    );
}
