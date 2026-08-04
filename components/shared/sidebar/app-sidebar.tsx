import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import NavMain from "./navMain";
import { NavUser } from "./nav-user";


export async function AppSidebar(){
	return (
        <Sidebar collapsible="icon" className="p-1" side="right">
            <div className="w-full text-left ">
                <SidebarTrigger className="p-2 text-2xl" />
            </div>
            <SidebarHeader className="bg-background">
                <div className="flex items-center">
                    <Avatar>
                        <AvatarImage src={"/next.svg"} />
                    </Avatar>
                    <SidebarGroupLabel
                        style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                            paddingLeft: "15px",
                        }}>
                        نظام المستشفى
                    </SidebarGroupLabel>
                </div>
            </SidebarHeader>

            <SidebarContent className="bg-background">
                <NavMain />
            </SidebarContent>

            <SidebarFooter>
                <NavUser
                    user={{
                        name: "Dhoom",
                        email: "aa486609@gamil.com",
                        avatar: "D",
                    }}
                />
            </SidebarFooter>
        </Sidebar>
    );
}

export default AppSidebar