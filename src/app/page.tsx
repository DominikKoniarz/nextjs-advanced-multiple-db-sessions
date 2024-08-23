import DotPattern from "@/components/magicui/dot-pattern";
import HeroHeader from "./_components/HeroHeader";
import HeroParagraph from "./_components/HeroParagraph";

export default function Home() {
    return (
        <main className="flex h-full w-full flex-col items-center justify-center gap-6 pb-10">
            <HeroHeader />
            <HeroParagraph />
            <DotPattern
                width={24}
                height={24}
                cx={1}
                cy={1}
                cr={1}
                className="z-0 [mask-image:radial-gradient(1000px_circle_at_center,#efeff0,transparent)]"
            />
        </main>
    );
}
