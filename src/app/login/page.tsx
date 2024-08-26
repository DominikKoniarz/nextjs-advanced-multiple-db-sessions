import PublicPagesDotPattern from "@/components/PublicPagesDotPattern";
import LoginCTA from "./_components/LoginCTA";
import NewHere from "./_components/NewHere";
import LoginForm from "./_components/LoginForm";

export default function LoginPage() {
    return (
        <main className="flex h-full w-full flex-col items-center justify-center px-6 pb-10 xs:px-14 sm:gap-6 lg:px-8">
            <div className="relative z-10 mx-auto flex w-full max-w-xs flex-col gap-6 rounded-2xl border bg-white p-6 shadow transition-all sm:max-w-sm sm:gap-8 sm:p-8">
                <LoginCTA />
                <LoginForm />
                <NewHere />
            </div>
            <PublicPagesDotPattern />
            {/* TODO: google login */}
        </main>
    );
}
