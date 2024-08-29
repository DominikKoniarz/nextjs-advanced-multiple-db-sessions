import RegisterForm from "./_components/RegisterForm";
import RegisterCTA from "./_components/RegisterCTA";
import AlreadyBeenHere from "./_components/AlreadyBeenHere";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import Hr from "@/components/Hr";
import GoogleSignInButton from "@/components/GoogleSignInButton";

export default async function RegisterPage() {
    const { user } = await validateRequest();

    if (user) redirect("/dashboard");

    return (
        <main className="flex h-full w-full flex-col items-center justify-center px-6 pb-10 xs:px-14 sm:gap-6 lg:px-8">
            <div className="relative z-10 mx-auto flex w-full max-w-xs flex-col gap-6 rounded-2xl border bg-white p-6 shadow transition-all sm:max-w-sm sm:gap-8 sm:p-8">
                <RegisterCTA />
                <RegisterForm />
                <Hr />
                <GoogleSignInButton text="Sign up with Google" />
                <AlreadyBeenHere />
            </div>
            {/* TODO: Password se zobaczyć */}
        </main>
    );
}
