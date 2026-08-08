import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarImage } from "../../ui/avatar";
import NavMain from "./navMain";
import { NavUser } from "./nav-user";


export async function AppSidebar(){
	return (
        <Sidebar collapsible="icon" className="p-1" side="right">
            <div className="w-full text-left bg-white">
                <SidebarTrigger className="p-2 text-2xl" />
            </div>
            <SidebarHeader className="bg-background">
                <div className="flex items-center">
                    <Avatar>
                        <AvatarImage src={"/next.svg"} />
                    </Avatar>
                    <SidebarGroupLabel
                        style={{
                            fontSize: "17px",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                            paddingLeft: "15px",
                        }}>
                        نظام تطبيق المستشفى
                    </SidebarGroupLabel>
                </div>
            </SidebarHeader>

            <SidebarContent className="bg-background">
                <NavMain />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

export default AppSidebar