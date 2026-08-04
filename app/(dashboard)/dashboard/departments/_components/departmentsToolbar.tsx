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

import {DepartmentFilters} from "@/types/filter";

interface DepartmentsToolbarProps {
    filters: DepartmentFilters;

    // نفس DoctorToolbar
    onFiltersChange: (values: Partial<DepartmentFilters>) => void;
}

export default function DepartmentsToolbar({
    filters,
    onFiltersChange,
}: DepartmentsToolbarProps) {
    return (
        <div className="w-full rounded-lg border bg-background p-4">
            {/* =========================================
                الصف الأول
                البحث + زر إضافة قسم
            ========================================= */}
            <div className="flex items-end gap-3">
                {/* البحث */}
                <div className="flex-1 space-y-1">
                    <p className="text-xs text-muted-foreground">البحث</p>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                        <Input
                            placeholder="ابحث باسم القسم..."
                            value={filters.keyword}
                            onChange={(e) =>
                                onFiltersChange({
                                    keyword: e.target.value,
                                    page: 1,
                                })
                            }
                            className="pl-10"
                        />
                    </div>
                </div>

                {/* زر إضافة قسم */}
                <Button asChild>
                    <Link href="/dashboard/departments/create">إضافة قسم</Link>
                </Button>
            </div>

            {/* =========================================
                الصف الثاني
                الترتيب + إعادة التعيين
            ========================================= */}
            <div className="mt-4 flex flex-wrap gap-3">
                {/* الترتيب */}
                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">الترتيب</p>

                    <Select
                        value={filters.sort}
                        onValueChange={(value) =>
                            onFiltersChange({
                                sort: value as DepartmentFilters["sort"],
                                page: 1,
                            })
                        }>
                        <SelectTrigger className="w-[220px]">
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="name">الاسم (أ-ي)</SelectItem>

                            <SelectItem value="most_doctors">
                                الأكثر أطباء
                            </SelectItem>

                            <SelectItem value="least_doctors">
                                الأقل أطباء
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* إعادة تعيين الفلاتر */}
                <div className="space-y-1">
                    <p className="text-xs text-transparent">.</p>

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                            onFiltersChange({
                                page: 1,
                                limit: 10,
                                keyword: "",
                                sort: "name",
                            })
                        }>
                        <RotateCcw className="size-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
