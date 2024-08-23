import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";

export default function TryItButton() {
    return (
        <Link
            href="/login"
            className={cn(
                buttonVariants({ variant: "default" }),
                "z-10 flex h-fit flex-row items-center gap-2 rounded-lg bg-copy px-7 py-2.5 text-base tracking-wide duration-200 hover:bg-copy/90",
            )}
        >
            Try it out <GoArrowRight className="text-lg" />
        </Link>
    );
}
