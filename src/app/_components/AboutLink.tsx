import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function AboutLink() {
    return (
        <Link
            href="/about"
            className={cn(
                buttonVariants({ variant: "outline" }),
                "z-10 h-fit rounded-lg bg-white px-7 py-2 tracking-wide sm:px-7 sm:py-2.5 sm:text-base",
            )}
        >
            About
        </Link>
    );
}
