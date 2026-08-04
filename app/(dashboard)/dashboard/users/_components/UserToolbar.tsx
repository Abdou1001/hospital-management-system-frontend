"use client";

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

import {UserFilters} from "@/types/filter";

interface UserToolbarProps {
    filters: UserFilters;
    onFiltersChange: (values: Partial<UserFilters>) => void;
}

export default function UserToolbar({
    filters,
    onFiltersChange,
}: UserToolbarProps) {
    return (
        <div className="space-y-4 rounded-lg border bg-background p-4">
            {/* الصف الأول */}
            <div className="space-y-1">
                <p className="text-xs text-muted-foreground">البحث</p>

                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                        placeholder="ابحث بالاسم أو البريد أو رقم الهاتف..."
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

            {/* الصف الثاني */}
            <div className="flex flex-wrap gap-3">
                {/* الصلاحية */}
                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">الصلاحية</p>

                    <Select
                        value={filters.role || "all"}
                        onValueChange={(value) =>
                            onFiltersChange({
                                role: value === "all" ? "" : value,
                                page: 1,
                            })
                        }>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="الصلاحية" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="all">الكل</SelectItem>
                            <SelectItem value="admin">مدير النظام</SelectItem>
                            <SelectItem value="reception">
                                موظف استقبال
                            </SelectItem>
                            <SelectItem value="user">مستخدم</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* الجنس */}
                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">الجنس</p>

                    <Select
                        value={filters.gender || "all"}
                        onValueChange={(value) =>
                            onFiltersChange({
                                gender: value === "all" ? "" : value,
                                page: 1,
                            })
                        }>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="الجنس" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="all">الكل</SelectItem>
                            <SelectItem value="ذكر">ذكر</SelectItem>
                            <SelectItem value="أنثى">أنثى</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* الحالة */}
                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">الحالة</p>

                    <Select
                        value={filters.is_active || "all"}
                        onValueChange={(value) =>
                            onFiltersChange({
                                is_active: value === "all" ? "" : value,
                                page: 1,
                            })
                        }>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="الحالة" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="all">الكل</SelectItem>
                            <SelectItem value="active">نشط</SelectItem>
                            <SelectItem value="inactive">غير نشط</SelectItem>
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
                                sort: value,
                                page: 1,
                            })
                        }>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="الترتيب" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="-created_at">الأحدث</SelectItem>
                            <SelectItem value="created_at">الأقدم</SelectItem>
                            <SelectItem value="full_name">
                                الاسم (أ-ي)
                            </SelectItem>
                            <SelectItem value="-full_name">
                                الاسم (ي-أ)
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* إعادة تعيين */}
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
                                role: "",
                                gender: "",
                                is_active: "",
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
