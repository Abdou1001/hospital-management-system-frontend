"use client";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "../../ui/sidebar";
import { Calendar, IdCard, Landmark, LayoutDashboard, Megaphone, NotepadText, Settings, Users } from "lucide-react";
import Link from "next/link";

const NavMain = () => {
	const { setOpenMobile } = useSidebar();

	const items = [
        {
            label: "الصفحة الرئيسية",
            href: `/dashboard`,
            icon: LayoutDashboard,
            path: "الرئيسية",
        },
        {
            label: "ادارة الحجوزات",
            href: `/dashboard/appointments`,
            icon: Calendar,
            path: "الحجوزات",
        },
        {
            label: "ادارة الاطباء",
            href: `/dashboard/doctors`,
            icon: IdCard,
            path: "الاطباء",
        },
        {
            label: "ادارة الاقسام",
            href: `/dashboard/departments`,
            icon: NotepadText,
            path: "الاقسام",
        },
        {
            label: "ادارة الاعلانات",
            href: `/dashboard/advertisements`,
            icon: Megaphone,
            path: "الاعلانات",
        },
        {
            label: "الحسابات البنكية",
            href: `/dashboard/bankAccounts`,
            icon: Landmark,
            path: "الحسابات البنكية",
        },
        {
            label: "ادارة المستخدمين",
            href: `/dashboard/users`,
            icon: Users,
            path: "المستخدمين",
        },
    ];
	return (
		<>
			<SidebarGroup>
				<SidebarGroupLabel>الاقسام</SidebarGroupLabel>
				<SidebarMenu className='space-y-3'>
					{items.map((item) => (
						<SidebarMenuItem key={item.label}>
							<SidebarMenuButton
								asChild
								tooltip={item.label}
								className='px-2 py-1.5'>
								<Link href={item.href} onClick={() => setOpenMobile(false)}>
									<item.icon className='pl-2 size-6!' />
									{item.label}
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroup>
		</>
	);
};

export default NavMain;
