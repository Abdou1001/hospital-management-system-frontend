"use client";

import {RotateCcw} from "lucide-react";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {AppointmentFilters} from "@/types/filter";

interface AppointmentToolbarProps {
    filters: AppointmentFilters;
    onFiltersChange: (values: Partial<AppointmentFilters>) => void;
}

export function AppointmentToolbar({
    filters,
    onFiltersChange,
}: AppointmentToolbarProps) {
    return (
        <div className="space-y-4 rounded-lg border bg-card p-4">
            {/* Search */}

            <div className="space-y-1">
                <p className="text-xs text-muted-foreground">البحث</p>

                <Input
                    placeholder="ابحث باسم المريض أو الطبيب أو رقم الهاتف..."
                    value={filters.keyword}
                    onChange={(e) =>
                        onFiltersChange({
                            keyword: e.target.value,
                            page: 1,
                        })
                    }
                />
            </div>

            {/* Filters */}

            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                {/* Status */}

                <div className="w-full space-y-1">
                    <p className="text-xs text-muted-foreground">
                        الحالة الحجز
                    </p>

                    <Select
                        value={filters.status || "all"}
                        onValueChange={(value) =>
                            onFiltersChange({
                                status: value === "all" ? "" : value,
                                page: 1,
                            })
                        }>
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="all">جميع الحالات</SelectItem>
                            <SelectItem value="pending">
                                قيد المراجعة
                            </SelectItem>
                            <SelectItem value="approved">مقبول</SelectItem>
                            <SelectItem value="rejected">مرفوض</SelectItem>
                            <SelectItem value="cancelled">ملغي</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Gender */}

                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">الجنس</p>

                    <Select
                        value={filters.patient_gender || "all"}
                        onValueChange={(value) =>
                            onFiltersChange({
                                patient_gender: value === "all" ? "" : value,
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

                {/* Day */}

                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">اليوم</p>

                    <Select
                        value={filters.day_of_week || "all"}
                        onValueChange={(value) =>
                            onFiltersChange({
                                day_of_week: value === "all" ? "" : value,
                                page: 1,
                            })
                        }>
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="all">جميع الأيام</SelectItem>
                            <SelectItem value="السبت">السبت</SelectItem>
                            <SelectItem value="الاحد">الأحد</SelectItem>
                            <SelectItem value="الاتنين">الإثنين</SelectItem>
                            <SelectItem value="الثلاثاء">الثلاثاء</SelectItem>
                            <SelectItem value="الاربعاء">الأربعاء</SelectItem>
                            <SelectItem value="الخميس">الخميس</SelectItem>
                            <SelectItem value="الجمعة">الجمعة</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Appointment Date */}

                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">
                        تاريخ الموعد
                    </p>

                    <Input
                        type="date"
                        value={filters.appointment_date}
                        onChange={(e) =>
                            onFiltersChange({
                                appointment_date: e.target.value,
                                page: 1,
                            })
                        }
                    />
                </div>

                {/* From */}

                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">من تاريخ</p>

                    <Input
                        type="date"
                        value={filters.from_date}
                        onChange={(e) =>
                            onFiltersChange({
                                from_date: e.target.value,
                                page: 1,
                            })
                        }
                    />
                </div>

                {/* To */}

                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">إلى تاريخ</p>

                    <Input
                        type="date"
                        value={filters.to_date}
                        onChange={(e) =>
                            onFiltersChange({
                                to_date: e.target.value,
                                page: 1,
                            })
                        }
                    />
                </div>

                {/* Sort */}

                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">الترتيب</p>

                    <Select
                        value={filters.sort}
                        onValueChange={(value) =>
                            onFiltersChange({
                                sort: value,
                            })
                        }>
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="-created_at">الأحدث</SelectItem>
                            <SelectItem value="created_at">الأقدم</SelectItem>
                            <SelectItem value="appointment_date">
                                تاريخ الحجز ↑
                            </SelectItem>
                            <SelectItem value="-appointment_date">
                                تاريخ الحجز ↓
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex justify-end">
                <Button
                    variant="outline"
                    onClick={() =>
                        onFiltersChange({
                            page: 1,
                            limit: 20,
                            keyword: "",
                            status: "",
                            patient_gender: "",
                            day_of_week: "",
                            appointment_date: "",
                            from_date: "",
                            to_date: "",
                            sort: "-created_at",
                        })
                    }>
                    <RotateCcw className="me-2 h-4 w-4" />
                    إعادة ضبط
                </Button>
            </div>
        </div>
    );
}
