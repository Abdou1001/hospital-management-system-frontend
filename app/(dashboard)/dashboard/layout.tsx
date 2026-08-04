import AppSidebar from "@/components/shared/sidebar/app-sidebar";

import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";

import {Metadata} from "next";
import AuthProvider from "@/components/providers/AuthProvider";

export const metadata: Metadata = {
    title: "لوحة التحكم",
    description: "لوحة التحكم لنظام المستشفى",
};

export default function AuthLayout({children}: {children: React.ReactNode}) {
    return (
        <AuthProvider>
            <SidebarProvider>
                <div dir="rtl" className="flex min-h-screen w-full">
                    <SidebarTrigger className="p-2 text-2xl" />
                    
                    <AppSidebar />

                    <main className="flex-1 p-4 ">{children}</main>
                </div>
            </SidebarProvider>
        </AuthProvider>
    );
}
