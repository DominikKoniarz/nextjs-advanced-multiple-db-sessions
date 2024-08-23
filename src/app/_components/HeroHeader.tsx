export default function HeroHeader() {
    return (
        <h1 className="z-10 w-full max-w-screen-lg text-center text-4xl font-medium leading-tight tracking-wide transition-all md:text-5xl xl:text-6xl">
            Advanced{" "}
            <span className="font-bold text-primary">Database Sessions</span>{" "}
            with <span className="font-bold text-secondary-dark">Next.js</span>{" "}
            and{" "}
            <span className="font-bold text-secondary-dark">Lucia Auth</span>
        </h1>
    );
}
