import { Suspense } from "react";
import LoginCTA from "./_components/LoginCTA";
import NewHere from "./_components/NewHere";
import LoginForm from "./_components/LoginForm";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import Hr from "@/components/Hr";
import AuthErrors from "./_components/AuthErrors";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const { user } = await validateRequest();

    if (user) redirect("/dashboard");

    return (
        <main className="flex h-full w-full flex-col items-center justify-center px-6 pb-10 xs:px-14 sm:gap-6 lg:px-8">
            <div className="relative z-10 mx-auto flex w-full max-w-xs flex-col gap-6 rounded-2xl border bg-white p-6 shadow transition-all sm:max-w-sm sm:gap-8 sm:p-8">
                <LoginCTA />
                <LoginForm />
                <Hr />
                <GoogleSignInButton />
                <NewHere />
            </div>
            {/* Suspense as docs suggest */}
            <Suspense>
                <AuthErrors />
            </Suspense>
        </main>
    );
}
