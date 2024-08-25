import Link from "next/link";

export default function AlreadyBeenHere() {
    return (
        <div className="mx-auto w-fit text-sm text-copy/85 sm:text-base">
            Already been here?{" "}
            <Link
                href="/login"
                className="transition-colors hover:text-primary"
            >
                Log in.
            </Link>
        </div>
    );
}
