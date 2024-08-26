import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Advanced Multiple DB Sessions",
    description: "Advanced Multiple DB Sessions with Next.js and lucia auth",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={rubik.className}>
                {children}
                <Toaster
                    position="top-center"
                    toastOptions={{ duration: 3500 }}
                />
            </body>
        </html>
    );
}
