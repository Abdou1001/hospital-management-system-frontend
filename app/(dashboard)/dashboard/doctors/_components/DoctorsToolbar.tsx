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

import {DoctorFilters} from "@/types/filter";

interface DoctorsToolbarProps {
    filters: DoctorFilters;
    onFiltersChange: (values: Partial<DoctorFilters>) => void;
}

export default function DoctorsToolbar({
    filters,
    onFiltersChange,
}: DoctorsToolbarProps) {
    const feeValue =
        filters.min_fee === undefined && filters.max_fee === undefined
            ? "all"
            : `${filters.min_fee ?? ""}-${filters.max_fee ?? ""}`;

    const experienceValue =
        filters.min_experience === undefined &&
        filters.max_experience === undefined
            ? "all"
            : `${filters.min_experience ?? ""}-${filters.max_experience ?? ""}`;

    return (
        <div className="space-y-4 rounded-lg border bg-card p-4">
            {/* =========================
                البحث
            ========================= */}
            <div className="flex items-end gap-3">
                <div className="flex-1 space-y-1">
                    <p className="text-xs text-muted-foreground">البحث</p>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                        <Input
                            placeholder="ابحث باسم الطبيب..."
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

                <Button asChild>
                    <Link href="/dashboard/doctors/create">إضافة طبيب</Link>
                </Button>
            </div>

            {/* =========================
                الفلاتر
            ========================= */}
            <div className="grid gap-2 grid-cols-6">
                {/* الحالة */}
                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">الحالة</p>

                    <Select
                        value={filters.status || "all"}
                        onValueChange={(value) =>
                            onFiltersChange({
                                status:
                                    value === "all"
                                        ? ""
                                        : (value as DoctorFilters["status"]),
                                page: 1,
                            })
                        }>
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="all">جميع الحالات</SelectItem>

                            <SelectItem value="active">نشط</SelectItem>

                            <SelectItem value="inactive">غير نشط</SelectItem>
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
                                gender:
                                    value === "all"
                                        ? ""
                                        : (value as DoctorFilters["gender"]),
                                page: 1,
                            })
                        }>
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="all">الجميع</SelectItem>

                            <SelectItem value="ذكر">ذكر</SelectItem>

                            <SelectItem value="أنثى">أنثى</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* رسوم الكشف */}
                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">رسوم الكشف</p>

                    <Select
                        value={feeValue}
                        onValueChange={(value) => {
                            const values = {
                                all: {
                                    min_fee: undefined,
                                    max_fee: undefined,
                                },
                                "0-5000": {
                                    min_fee: 0,
                                    max_fee: 5000,
                                },
                                "5001-10000": {
                                    min_fee: 5001,
                                    max_fee: 10000,
                                },
                                "10001-": {
                                    min_fee: 10001,
                                    max_fee: undefined,
                                },
                            };

                            onFiltersChange({
                                ...values[value as keyof typeof values],
                                page: 1,
                            });
                        }}>
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="all">جميع الرسوم</SelectItem>
                            <SelectItem value="0-5000">0 - 5000 ر.ي</SelectItem>
                            <SelectItem value="5001-10000">
                                5,001 - 10,000 ر.ي
                            </SelectItem>
                            <SelectItem value="10001-">
                                أكثر من ر.ي 10,000
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* سنوات الخبرة */}
                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">
                        سنوات الخبرة
                    </p>

                    <Select
                        value={experienceValue}
                        onValueChange={(value) => {
                            const values = {
                                all: {
                                    min_experience: undefined,
                                    max_experience: undefined,
                                },
                                "0-5": {
                                    min_experience: 0,
                                    max_experience: 5,
                                },
                                "6-10": {
                                    min_experience: 6,
                                    max_experience: 10,
                                },
                                "11-": {
                                    min_experience: 11,
                                    max_experience: undefined,
                                },
                            };

                            onFiltersChange({
                                ...values[value as keyof typeof values],
                                page: 1,
                            });
                        }}>
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="all">جميع الخبرات</SelectItem>

                            <SelectItem value="0-5">
                                من 0 إلى 5 سنوات
                            </SelectItem>

                            <SelectItem value="6-10">
                                من 6 إلى 10 سنوات
                            </SelectItem>

                            <SelectItem value="11-">
                                أكثر من 10 سنوات
                            </SelectItem>
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
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="full_name">
                                الاسم (أ-ي)
                            </SelectItem>

                            <SelectItem value="-full_name">
                                الاسم (ي-أ)
                            </SelectItem>

                            <SelectItem value="consultation_fee">
                                الرسوم (الأقل)
                            </SelectItem>

                            <SelectItem value="-consultation_fee">
                                الرسوم (الأعلى)
                            </SelectItem>

                            <SelectItem value="years_exper">
                                الخبرة (الأقل)
                            </SelectItem>

                            <SelectItem value="-years_exper">
                                الخبرة (الأعلى)
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* إعادة التعيين */}
                <div className="flex items-end">
                    <Button
                        className="w-full"
                        variant="outline"
                        onClick={() =>
                            onFiltersChange({
                                page: 1,
                                limit: 20,
                                keyword: "",
                                status: "",
                                gender: "",
                                min_fee: undefined,
                                max_fee: undefined,
                                min_experience: undefined,
                                max_experience: undefined,
                                sort: "full_name",
                            })
                        }>
                        <RotateCcw className="me-2 h-4 w-4" />
                        إعادة ضبط
                    </Button>
                </div>
            </div>
        </div>
    );
}
