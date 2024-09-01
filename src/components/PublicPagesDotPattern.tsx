import DotPattern from "./magicui/dot-pattern";

export default function PublicPagesDotPattern() {
    return (
        <DotPattern
            width={24}
            height={24}
            cx={1.25}
            cy={1.25}
            cr={1.25}
            className="fixed left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(550px_circle_at_center,#efeff0,transparent)] md:[mask-image:radial-gradient(675px_circle_at_center,#efeff0,transparent)] lg:[mask-image:radial-gradient(850px_circle_at_center,#efeff0,transparent)] xl:[mask-image:radial-gradient(1050px_circle_at_center,#efeff0,transparent)] 2xl:[mask-image:radial-gradient(1200px_circle_at_center,#efeff0,transparent)]"
        />
    );
}
