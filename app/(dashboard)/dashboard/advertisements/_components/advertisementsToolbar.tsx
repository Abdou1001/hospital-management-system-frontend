"use client";

import Link from "next/link";
import {RotateCcw, Search} from "lucide-react";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {AdsFilters} from "@/types/filter";

interface AdsToolbarProps {
    filters: AdsFilters;

    onFiltersChange: (values: Partial<AdsFilters>) => void;
}

export default function AdsToolbar({
    filters,
    onFiltersChange,
}: AdsToolbarProps) {
    return (
        <div className="w-full rounded-lg border bg-background p-4">
            {/* =========================================
                الصف الأول
                البحث + زر إضافة إعلان
            ========================================= */}
            <div className="flex items-end gap-3">
                {/* البحث */}
                <div className="flex-1 space-y-1">
                    <p className="text-xs text-muted-foreground">البحث</p>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                        <Input
                            placeholder="ابحث..."
                            value={filters.keyword}
                            onChange={(e) =>
                                onFiltersChange({
                                    keyword: e.target.value,
                                    page: 1,
                                })
                            }
                            disabled
                            className="pl-10"
                        />
                    </div>
                </div>

                {/* زر إضافة إعلان */}
                <Button asChild>
                    <Link href="/dashboard/advertisements/create">
                        إضافة إعلان
                    </Link>
                </Button>
            </div>

            {/* =========================================
                الصف الثاني
            ========================================= */}
            <div className="mt-4 flex flex-wrap gap-3">
                {/* الحالة */}
                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">الحالة</p>

                    <Select
                        value={filters.status || "all"}
                        onValueChange={(value) =>
                            onFiltersChange({
                                status:
                                    value == "all"
                                        ? ""
                                        : (value as AdsFilters["status"]),
                                page: 1,
                            })
                        }>
                        <SelectTrigger className="w-[170px]">
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="all">جميع الحالات</SelectItem>

                            <SelectItem value="active">مفعل</SelectItem>

                            <SelectItem value="inactive">غير مفعل</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* الصلاحية */}
                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">الصلاحية</p>

                    <Select
                        value={filters.expired || "all"}
                        onValueChange={(value) =>
                            onFiltersChange({
                                expired:
                                    value == "all"
                                        ? ""
                                        : (value as AdsFilters["expired"]),
                                page: 1,
                            })
                        }>
                        <SelectTrigger className="w-[170px]">
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="all">الكل</SelectItem>

                            <SelectItem value="false">سارية</SelectItem>

                            <SelectItem value="true">منتهية</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* الترتيب */}
                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">الترتيب</p>

                    <Select
                        value={filters.sort}
                        onValueChange={(value) =>
                            onFiltersChange({
                                sort: value as AdsFilters["sort"],
                                page: 1,
                            })
                        }>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="-created_at">الأحدث</SelectItem>

                            <SelectItem value="created_at">الأقدم</SelectItem>

                            <SelectItem value="start_date">
                                تاريخ البداية
                            </SelectItem>

                            <SelectItem value="end_date">
                                تاريخ الانتهاء
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* إعادة التعيين */}
                <div className="space-y-1">
                    <p className="text-xs text-transparent">.</p>

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                            onFiltersChange({
                                page: 1,
                                limit: 20,
                                keyword: "",
                                status: "all",
                                expired: "all",
                                sort: "-created_at",
                            })
                        }>
                        <RotateCcw className="size-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
