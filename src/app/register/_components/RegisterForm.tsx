"use client";

import FloatingLabelInput from "@/components/FloatingLabelInput";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function RegisterForm() {
    const [email, setEmail] = useState("");

    return (
        <>
            <FloatingLabelInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <FloatingLabelInput
                value={email}
                type="password"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Password"
            />
            <FloatingLabelInput
                value={email}
                type="password"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Repeat Password"
            />
            <Button
                type="submit"
                className="h-9 bg-secondary text-secondary-content hover:bg-secondary sm:h-10"
            >
                Sign Up
            </Button>
        </>
    );
}
