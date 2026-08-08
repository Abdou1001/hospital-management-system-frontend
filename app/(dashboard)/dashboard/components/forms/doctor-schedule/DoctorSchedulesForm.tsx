"use client";

import {Control, useFieldArray, UseFormSetValue, UseFormWatch} from "react-hook-form";
import {Plus, Power, PowerOff, Trash2} from "lucide-react";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {DoctorFormValues} from "@/validation/doctors/schemas/doctor-form.schema";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface Props {
    control: Control<DoctorFormValues>;
    watch: UseFormWatch<DoctorFormValues>;
    setValue: UseFormSetValue<DoctorFormValues>;
}

export default function DoctorSchedulesForm({control, watch, setValue}: Props) {
    const {fields, append, remove} = useFieldArray({
        control,
        name: "schedules",
    });

    const handleNumberInput = (value: string, onChange: any) => {
        const numbersOnly = value.replace(/\D/g, "");
        onChange(numbersOnly === "" ? undefined : Number(numbersOnly));
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>أوقات دوام الطبيب</CardTitle>
                    <CardDescription className="mt-2">
                        يمكنك إضافة أكثر من فترة دوام للطبيب.
                    </CardDescription>
                </div>

                <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                        append({
                            schedule_id: null,
                            day_of_week: "السبت",
                            shift_type: "صباحية",
                            start_time: "",
                            end_time: "",
                            max_patients: 20,
                            status: "active",
                            notes: "",
                        })
                    }>
                    <Plus className="me-2 size-4" />
                    إضافة دوام
                </Button>
            </CardHeader>

            <CardContent className="space-y-5">
                {fields.length === 0 && (
                    <div className="rounded-lg border border-dashed py-10 text-center text-muted-foreground">
                        لم يتم إضافة أي فترة دوام بعد.
                    </div>
                )}

                {fields.map((field, index) => (
                    <Card key={field.id}>
                        <CardHeader className="flex flex-row items-center justify-between w-full">
                            <CardTitle className="text-base">
                                فترة دوام رقم {index + 1}
                            </CardTitle>

                            <div className="flex items-center gap-2">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            type="button"
                                            size="icon"
                                            variant={
                                                watch(
                                                    `schedules.${index}.status`,
                                                ) === "active"
                                                    ? "default"
                                                    : "secondary"
                                            }
                                            onClick={() => {
                                                const status = watch(
                                                    `schedules.${index}.status`,
                                                );

                                                setValue(
                                                    `schedules.${index}.status`,
                                                    status === "active"
                                                        ? "inactive"
                                                        : "active",
                                                );
                                            }}>
                                            {watch(
                                                `schedules.${index}.status`,
                                            ) === "active" ? (
                                                <Power className="size-4" />
                                            ) : (
                                                <PowerOff className="size-4" />
                                            )}
                                        </Button>
                                    </TooltipTrigger>

                                    <TooltipContent>
                                        {watch(`schedules.${index}.status`) ===
                                        "active"
                                            ? "إيقاف الدوام"
                                            : "تفعيل الدوام"}
                                    </TooltipContent>
                                </Tooltip>

                                <Button
                                    type="button"
                                    size="icon"
                                    variant="destructive"
                                    onClick={() => remove(index)}>
                                    <Trash2 className="size-4" />
                                </Button>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-5">
                            {/* اليوم + الفترة */}
                            <div className="grid gap-4 md:grid-cols-2">
                                <FormField
                                    control={control}
                                    name={`schedules.${index}.day_of_week`}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>اليوم</FormLabel>
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}>
                                                <FormControl>
                                                    <SelectTrigger
                                                        className="w-full"
                                                        dir="rtl">
                                                        <SelectValue placeholder="اختر اليوم" />
                                                    </SelectTrigger>
                                                </FormControl>

                                                <SelectContent>
                                                    <SelectItem value="السبت">
                                                        السبت
                                                    </SelectItem>
                                                    <SelectItem value="الاحد">
                                                        الأحد
                                                    </SelectItem>
                                                    <SelectItem value="الاثنين">
                                                        الإثنين
                                                    </SelectItem>
                                                    <SelectItem value="الثلاثاء">
                                                        الثلاثاء
                                                    </SelectItem>
                                                    <SelectItem value="الاربعاء">
                                                        الأربعاء
                                                    </SelectItem>
                                                    <SelectItem value="الخميس">
                                                        الخميس
                                                    </SelectItem>
                                                    <SelectItem value="الجمعة">
                                                        الجمعة
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={control}
                                    name={`schedules.${index}.shift_type`}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>الفترة</FormLabel>

                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}>
                                                <FormControl>
                                                    <SelectTrigger
                                                        className="w-full"
                                                        dir="rtl">
                                                        <SelectValue placeholder="اختر الفترة" />
                                                    </SelectTrigger>
                                                </FormControl>

                                                <SelectContent>
                                                    <SelectItem value="صباحية">
                                                        صباحية
                                                    </SelectItem>

                                                    <SelectItem value="مسائية">
                                                        مسائية
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* الوقت والحد الأقصى */}
                            <div className="grid gap-4 md:grid-cols-3">
                                <FormField
                                    control={control}
                                    name={`schedules.${index}.start_time`}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>من الساعة</FormLabel>

                                            <FormControl>
                                                <Input type="time" {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={control}
                                    name={`schedules.${index}.end_time`}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>إلى الساعة</FormLabel>

                                            <FormControl>
                                                <Input type="time" {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={control}
                                    name={`schedules.${index}.max_patients`}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>
                                                الحد الأقصى للمرضى
                                            </FormLabel>

                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    inputMode="numeric"
                                                    placeholder="مثال: 20"
                                                    value={field.value ?? ""}
                                                    onChange={(e) =>
                                                        handleNumberInput(
                                                            e.target.value,
                                                            field.onChange,
                                                        )
                                                    }
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* ملاحظات */}
                            <FormField
                                control={control}
                                name={`schedules.${index}.notes`}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>ملاحظات</FormLabel>

                                        <FormControl>
                                            <Textarea
                                                rows={3}
                                                placeholder="أي ملاحظات تخص فترة الدوام"
                                                value={field.value ?? ""}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
                ))}
            </CardContent>
        </Card>
    );
}
