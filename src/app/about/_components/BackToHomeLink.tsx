import Link from "next/link";
import { GoArrowLeft } from "react-icons/go";

export default function BackToHomeLink() {
    return (
        <Link
            href="/"
            className="after:transition-width relative flex w-fit items-center gap-1 text-nowrap p-1 text-sm font-medium after:absolute after:bottom-0 after:left-0 after:z-10 after:block after:h-0.5 after:w-0 after:bg-primary-dark after:opacity-50 after:duration-200 after:content-[''] hover:after:w-full xs:gap-1.5 xs:text-base"
        >
            <GoArrowLeft className="text-sm xs:text-base" /> Back to home
        </Link>
    );
}
