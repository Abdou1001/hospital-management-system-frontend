"use client";

import {Bell, ChevronsUpDown, LogOut, Settings} from "lucide-react";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import {useAuth} from "@/hooks/auth/useAuth";
import {useLogout} from "@/hooks/auth/useLogout";
import Link from "next/link";

export function NavUser() {
    const {isMobile} = useSidebar();

    const {user} = useAuth();
    const logout = useLogout();

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage
                                    // src={user?.avatar}
                                    src={user?.full_name}
                                    alt={user?.full_name}
                                />
                                <AvatarFallback className="rounded-lg bg-gray-200">
                                    {user?.full_name
                                        .substring(0, 2)
                                        .toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">
                                    {user?.full_name}
                                </span>
                                <span className="truncate text-xs">
                                    {user?.phone_number}
                                </span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg pr-3"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}>
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center justify-end gap-2 px-1 py-1.5 text-right text-sm">
                                <div className="grid text-left text-sm leading-tight">
                                    <span className="truncate font-medium">
                                        {user?.full_name}
                                    </span>
                                    <span className="truncate text-xs">
                                        {user?.phone_number}
                                    </span>
                                </div>
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage
                                        // src={user?.avatar}
                                        src={user?.full_name}
                                        alt={user?.full_name}
                                    />
                                    <AvatarFallback className="rounded-lg bg-gray-200">
                                        {user?.full_name
                                            .substring(0, 2)
                                            .toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <Link href={"/dashboard/setting"}>
                                <DropdownMenuItem className="justify-end">
                                    الاعدادات
                                    <Settings />
                                </DropdownMenuItem>
                            </Link>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="text-red-600 focus:text-red-600 justify-end"
                            onClick={() => {
                                logout.mutate();
                            }}>
                            تسجيل الخروج
                            <LogOut className="text-red-600" />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
