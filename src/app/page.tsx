import DotPattern from "@/components/magicui/dot-pattern";
import HeroHeader from "./_components/HeroHeader";
import HeroParagraph from "./_components/HeroParagraph";
import TryItButton from "./_components/TryItButton";
import AboutButton from "./_components/AboutButton";

export default function Home() {
    return (
        <main className="xs:px-14 flex h-full w-full flex-col items-center justify-center gap-4 px-6 pb-12 sm:gap-6 lg:px-8">
            <HeroHeader />
            <HeroParagraph />
            <div className="flex w-fit flex-row items-center gap-4 sm:gap-6 md:gap-8">
                <TryItButton />
                <AboutButton />
            </div>
            <DotPattern
                width={24}
                height={24}
                cx={1}
                cy={1}
                cr={1}
                className="z-0 [mask-image:radial-gradient(550px_circle_at_center,#efeff0,transparent)] md:[mask-image:radial-gradient(675px_circle_at_center,#efeff0,transparent)] lg:[mask-image:radial-gradient(850px_circle_at_center,#efeff0,transparent)] xl:[mask-image:radial-gradient(1050px_circle_at_center,#efeff0,transparent)] 2xl:[mask-image:radial-gradient(1150px_circle_at_center,#efeff0,transparent)]"
            />
        </main>
    );
}
