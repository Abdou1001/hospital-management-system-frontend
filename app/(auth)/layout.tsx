import {Metadata} from "next";
import AuthProvider from "@/components/providers/AuthProvider";

export const metadata: Metadata = {
    title: "صفحة تسجيل الدخول",
    description: "صحفة تسجيل الدخول لنظام المستشفى",
};

export default function AuthLayout({children}: {children: React.ReactNode}) {
    return (
        <main className="min-h-screen flex items-center justify-center bg-linear-to-tl from-gray-50 to-gray-300">
            {children}
        </main>
    );
}
