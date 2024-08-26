import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";

export default function SubmitButton({
    isLoading,
    text,
    className,
}: {
    isLoading: boolean;
    text: string;
    className?: string;
}) {
    return (
        <Button
            type="submit"
            className={cn(
                "h-9 bg-secondary text-secondary-content hover:bg-secondary sm:h-10",
                className,
            )}
            disabled={isLoading}
            aria-disabled={isLoading}
        >
            {isLoading ? <LoaderCircle className="animate-spin" /> : text}
        </Button>
    );
}
