"use client";

import {Plus, Search} from "lucide-react";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

type DataTableToolbarProps = {
    searchPlaceholder?: string;
    buttonText?: string;

    onSearch: (value: string) => void;
    onAdd: () => void;
};

export default function DataTableToolbar({
    searchPlaceholder = "بحث...",
    buttonText = "إضافة",

    onSearch,
    onAdd,
}: DataTableToolbarProps) {
    return (
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-sm">
                <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                    placeholder={searchPlaceholder}
                    className="pr-9"
                    onChange={(e) => onSearch(e.target.value)}
                />
            </div>

            <Button onClick={onAdd}>
                <Plus className="ml-2 h-4 w-4" />
                {buttonText}
            </Button>
        </div>
    );
}
