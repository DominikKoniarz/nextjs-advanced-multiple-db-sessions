import PublicPagesDotPattern from "@/components/PublicPagesDotPattern";
import BackToHomeLink from "./_components/BackToHomeLink";
import Link from "next/link";
import ProseSection from "./_components/ProseSection";
import Heading from "./_components/Heading";

export default function AboutPage() {
    return (
        <main className="h-full w-full p-6 xs:p-8 sm:p-14">
            <div className="relative z-10 mx-auto w-full max-w-screen-lg space-y-8 rounded-md border bg-white px-5 py-4 pb-8 shadow">
                <div className="flex w-full items-center justify-between">
                    <Heading />
                    <BackToHomeLink />
                </div>
                <ProseSection>
                    <h2>Auth is everywhere</h2>
                    <p>
                        Auth tend to be liked (ex. by me) or disliked by
                        developers.
                        <br />
                        There are couple types of auth. One of them is session
                        based auth. It&apos;s a way to authenticate users by
                        storing their data in a session. This session is{" "}
                        <span className="font-bold text-primary">
                            server side
                        </span>{" "}
                        and it&apos;s usually stored in a database.
                        <br />
                        Client receives a cookie with a session ID during login
                        and uses it to authenticate requests. If the session is
                        still fresh and valid, server will{" "}
                        <span className="font-bold text-primary">
                            let you go!
                        </span>
                    </p>
                </ProseSection>
                <ProseSection>
                    <p>
                        Goal of this app is to create a simple session based
                        auth system. It will be a simple app with pages like:{" "}
                        <Link href="/login" className="font-bold text-primary">
                            login
                        </Link>
                        ,{" "}
                        <Link
                            href="/register"
                            className="font-bold text-primary"
                        >
                            register
                        </Link>{" "}
                        and{" "}
                        <Link
                            href="/dashboard"
                            className="font-bold text-primary"
                        >
                            dashboard
                        </Link>
                        .
                        <br />
                        You will be able to create an account, then login and
                        see additional informations about your session. You will
                        also be able to login from multiple devices and see how
                        sessions are managed. Then if you need, you could logout
                        any session from any device.
                    </p>
                </ProseSection>
                <ProseSection>
                    <p>This app is only for educational/testing purposes.</p>
                </ProseSection>
            </div>
            <PublicPagesDotPattern />
        </main>
    );
}
