import DotPattern from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";

export default function Home() {
    return (
        <main className="relative flex h-full w-full flex-col">
            <h1 className="text-lg font-bold">Test</h1>
            <DotPattern
                width={24}
                height={24}
                cx={1}
                cy={1}
                cr={1}
                className={cn(
                    "[mask-image:radial-gradient(1000px_circle_at_center,#efeff0,transparent)]",
                )}
            />
        </main>
    );
}
