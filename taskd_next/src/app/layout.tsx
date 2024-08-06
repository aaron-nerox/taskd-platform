import type {Metadata} from "next";
import {Poppins} from "next/font/google";
import "./globals.css";
import {Toaster} from "@/components/ui/toaster";

const poppins = Poppins({style: "normal", weight: "400", subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Taskd Platform",
    description: "Your unusual way of tackling tasks",
};

export default function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={poppins.className}>
                <main>{children}</main>
                <Toaster/>
            </body>
        </html>
    );
}
