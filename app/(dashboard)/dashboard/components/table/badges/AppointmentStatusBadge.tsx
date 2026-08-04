"use client";

import {Badge} from "@/components/ui/badge";
import {AppointmentStatusProps} from "@/types/data";

interface AppointmentStatusBadgeProps {
    status: AppointmentStatusProps;
}

const statusConfig: Record<
    AppointmentStatusProps,
    {
        label: string;
        variant: "IN_PROGRESS" | "MEMBER" | "VIEWER" | "outline";
    }
> = {
    pending: {
        label: "قيد المراجعة",
        variant: "IN_PROGRESS",
    },

    approved: {
        label: "مقبول",
        variant: "MEMBER",
    },

    rejected: {
        label: "مرفوض",
        variant: "VIEWER",
    },

    cancelled: {
        label: "ملغي",
        variant: "outline",
    },
}; ;
export function AppointmentStatusBadge({status}: AppointmentStatusBadgeProps) {
    const config = statusConfig[status];

    return <Badge variant={config.variant}>{config.label}</Badge>;
}
