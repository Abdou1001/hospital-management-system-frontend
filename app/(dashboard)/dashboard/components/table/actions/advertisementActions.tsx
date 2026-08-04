"use client";

import Link from "next/link";
import {MoreHorizontal} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";

import {Ad} from "@/types/data";

import DeleteAdvertisementDialog from "../../dialogs/deleteAdvertisementDialog";
import {useToggleAdStatus} from "@/hooks/ads/useToggleAdStatus";

interface AdvertisementActionsProps {
    ad: Ad;
}

export default function AdvertisementActions({ad}: AdvertisementActionsProps) {
    const toggleStatus = useToggleAdStatus();

    return (
        <div className="flex ">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreHorizontal className="size-4" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="center">
                    {/* تعديل */}
                    <DropdownMenuItem asChild className="justify-center">
                        <Link
                            href={`/dashboard/advertisements/${ad.ad_id}/edit`}>
                            تعديل
                        </Link>
                    </DropdownMenuItem>

                    {/* تفعيل / تعطيل */}
                    <DropdownMenuItem
                        onClick={() => toggleStatus.mutate(ad.ad_id)}
                        className="justify-center">
                        {ad.status === "active"
                            ? "تعطيل الإعلان"
                            : "تفعيل الإعلان"}
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    {/* حذف */}
                    <DeleteAdvertisementDialog adId={ad.ad_id}>
                        <DropdownMenuItem
                            className="text-destructive focus:text-destructive justify-center"
                            onSelect={(e) => e.preventDefault()}>
                            حذف
                        </DropdownMenuItem>
                    </DeleteAdvertisementDialog>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
