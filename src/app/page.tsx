import HeroHeader from "./_components/HeroHeader";
import HeroParagraph from "./_components/HeroParagraph";
import TryItLink from "./_components/TryItLink";
import AboutLink from "./_components/AboutLink";
import PublicPagesDotPattern from "@/components/PublicPagesDotPattern";

export default function Home() {
    return (
        <main className="xs:px-14 flex h-full w-full flex-col items-center justify-center gap-4 px-6 pb-12 sm:gap-6 lg:px-8">
            <HeroHeader />
            <HeroParagraph />
            <div className="flex w-fit flex-row items-center gap-4 sm:gap-6 md:gap-8">
                <TryItLink />
                <AboutLink />
            </div>
            <PublicPagesDotPattern />
        </main>
    );
}
