import {Badge} from "@/components/ui/badge";

interface StatusBadgeProps {
    status: "active" | "inactive";
}

export function StatusBadge({status}: StatusBadgeProps) {
    return (
        <Badge variant={status === "active" ? "default" : "secondary"}>
            {status === "active" ? "نشط" : "غير نشط"}
        </Badge>
    );
}
