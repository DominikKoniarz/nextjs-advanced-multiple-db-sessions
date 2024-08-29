import { cn } from "@/lib/utils";

export default function Hr({ className }: { className?: string }) {
    return <hr className={cn("w-full border-slate-200", className)} />;
}
