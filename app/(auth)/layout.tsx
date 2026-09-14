import {Metadata} from "next";
import Link from "next/link";
import AuthProvider from "@/components/providers/AuthProvider";

export const metadata: Metadata = {
    title: "صفحة تسجيل الدخول",
    description: "صفحة تسجيل الدخول لنظام المستشفى",
};

export default function AuthLayout({children}: {children: React.ReactNode}) {
    return (
        <main className="min-h-screen flex flex-col items-center justify-between p-4 bg-linear-to-tl from-gray-50 to-gray-300">
            <div className="w-full flex-1 flex items-center justify-center">
                {children}
            </div>

            <footer className="w-full max-w-sm py-4 text-center">
                <div className="flex items-center justify-center gap-6 text-sm text-zinc-600 font-medium">
                    <Link
                        href="/about"
                        className="transition-colors hover:text-black hover:underline">
                        من نحن
                    </Link>
                    <span className="text-zinc-400">|</span>
                    <Link
                        href="/terms"
                        className="transition-colors hover:text-black hover:underline">
                        سياسة الاستخدام
                    </Link>
                </div>
            </footer>
        </main>
    );
}
