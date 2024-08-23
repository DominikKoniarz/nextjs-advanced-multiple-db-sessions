import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function AboutButton() {
    return (
        <Link
            href="/about"
            className={cn(
                buttonVariants({ variant: "outline" }),
                "z-10 h-fit rounded-lg bg-white px-8 py-2.5 text-base tracking-wide",
            )}
        >
            About
        </Link>
    );
}
