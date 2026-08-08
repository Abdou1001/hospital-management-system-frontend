import AppSidebar from "@/components/shared/sidebar/app-sidebar";

import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";

import {Metadata} from "next";

import AuthProvider from "@/components/providers/AuthProvider";
import AuthGuard from "./AuthGuard";

export const metadata: Metadata = {
    title: "لوحة التحكم",
    description: "لوحة التحكم لنظام المستشفى",
};

export default function AuthLayout({children}: {children: React.ReactNode}) {
    return (
        <AuthProvider>
            <AuthGuard allowedRoles={["admin"]}>
                <SidebarProvider>
                    <div dir="rtl" className="flex min-h-screen w-full">
                        <SidebarTrigger className="block p-2 text-2xl md:hidden" />

                        <AppSidebar />

                        <main className="flex-1 p-4">{children}</main>
                    </div>
                </SidebarProvider>
            </AuthGuard>
        </AuthProvider>
    );
}
