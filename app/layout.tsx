import type {Metadata} from "next";
import {Cairo} from "next/font/google";

import "./globals.css";
import QueryProvider from "@/components/providers/QueryProvider";
import {Toaster} from "sonner";

const cairo = Cairo({
    subsets: ["arabic"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-cairo",
});

export const metadata: Metadata = {
    title: "نظام المستشفى",
    description: "نظام المستشفى",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="ar"
            dir="rtl"
            className={`${cairo.variable} h-full antialiased`}>
            <body className="min-h-screen">
                <QueryProvider>
                    {children}
                    <Toaster dir="rtl" position="top-left" />
                </QueryProvider>
            </body>
        </html>
    );
}
