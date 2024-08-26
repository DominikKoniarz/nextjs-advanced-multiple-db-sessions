import Link from "next/link";

export default function NewHere() {
    return (
        <div className="mx-auto w-fit text-sm text-copy/85 sm:text-base">
            New here?{" "}
            <Link
                href="/register"
                className="transition-colors hover:text-primary"
            >
                Sign Up.
            </Link>
        </div>
    );
}
