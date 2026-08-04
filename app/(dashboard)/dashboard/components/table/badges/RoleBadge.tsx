import {Badge} from "@/components/ui/badge";
import { RoleProps } from "@/types/data";



const roleMap = {
    admin: "مدير النظام",
    reception: "استقبال",
    user: "مستخدم",
};

export function RoleBadge({role}: RoleProps) {
    
    const variants = {
        admin: "MEMBER",
        reception: "default",
        user: "secondary",
    } as const;

    return <Badge variant={variants[role]}>{roleMap[role]}</Badge>;
}
