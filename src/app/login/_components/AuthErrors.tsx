"use client";

import { EMAIL_ALREADY_IN_USE_ERROR } from "@/constants/auth";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function AuthErrors() {
    const searchParams = useSearchParams();

    useEffect(() => {
        const error = searchParams.get("error");

        if (error === EMAIL_ALREADY_IN_USE_ERROR) {
            toast.error(
                "This email is already in use. Please try to log in with your credentials.",
                { id: "email-already-in-use", duration: 4500 },
            );
        }
    }, [searchParams]);

    return null;
}
