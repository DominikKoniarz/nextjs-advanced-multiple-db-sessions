import DotPattern from "./magicui/dot-pattern";

export default function PublicPagesDotPattern() {
    return (
        <DotPattern
            width={24}
            height={24}
            cx={1}
            cy={1}
            cr={1}
            className="z-0 [mask-image:radial-gradient(550px_circle_at_center,#efeff0,transparent)] md:[mask-image:radial-gradient(675px_circle_at_center,#efeff0,transparent)] lg:[mask-image:radial-gradient(850px_circle_at_center,#efeff0,transparent)] xl:[mask-image:radial-gradient(1050px_circle_at_center,#efeff0,transparent)] 2xl:[mask-image:radial-gradient(1200px_circle_at_center,#efeff0,transparent)]"
        />
    );
}
