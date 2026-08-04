"use client";

import {useState} from "react";
import {useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useDepartments} from "@/hooks/departments/useDepartments";
import ImageUpload from "@/components/shared/image-upload/image-upload";
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
import {Check, ChevronsUpDown, Plus, Trash2} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    doctorFormSchema,
    DoctorFormValues,
} from "@/validation/doctors/schemas/doctor-form.schema";
import {Checkbox} from "@/components/ui/checkbox";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface DoctorFormProps {
    loading?: boolean;
    imageUrl?: string;
    defaultValues?: Partial<DoctorFormValues>;
    onSubmit: (values: DoctorFormValues, image?: File) => void;
}

export default function DoctorForm({
    defaultValues,
    imageUrl,
    onSubmit,
    loading = false,
}: DoctorFormProps) {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const preview = imageFile ? URL.createObjectURL(imageFile) : imageUrl;

    const {data: departmentsData} = useDepartments({page: 1});
    const departments = departmentsData?.results ?? [];

    const form = useForm<DoctorFormValues>({
        resolver: zodResolver(doctorFormSchema),
        defaultValues: {
            full_name: "",
            email: "",
            phone_number: "",
            bio: "",
            education: "",
            gender: "ذكر",
            department_ids: [],
            years_exper: 0,
            consultation_fee: 0,
            notes: "",

            /* الدوامات*/
            schedules: defaultValues?.schedules ?? [],
            ...defaultValues,
        },
    });

    const {fields, append, remove} = useFieldArray({
        control: form.control,
        name: "schedules",
    });

    const handleNumberInput = (
        value: string,
        onChange: (value: number | undefined) => void,
    ) => {
        const numericValue = value.replace(/[^0-9]/g, "");
        onChange(numericValue === "" ? undefined : Number(numericValue));
    };
    console.log(form.watch("schedules"));
    return (
        <Form {...form}>
            <form
                className="space-y-7"
                onSubmit={form.handleSubmit(
                    (values) => onSubmit(values, imageFile ?? undefined),
                    (errors) => {
                        console.error("أخطاء التحقق في النموذج:", errors);
                    },
                )}>
                {/* الصورة الشخصية */}
                <FormField
                    control={form.control}
                    name="path_image"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <ImageUpload
                                    value={preview}
                                    onChange={(file) => {
                                        setImageFile(file);
                                        field.onChange(file);
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* اسم الطبيب */}
                <FormField
                    control={form.control}
                    name="full_name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>اسم الطبيب</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="مثال: د. أحمد محمد بوزير"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* البريد الإلكتروني ورقم الهاتف */}
                <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    البريد الإلكتروني{" "}
                                    <span className="text-xs text-gray-600">
                                        (اختياري)
                                    </span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="doctor@example.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phone_number"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    رقم الهاتف{" "}
                                    <span className="text-xs text-gray-600">
                                        (اختياري)
                                    </span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="tel"
                                        placeholder="777123456"
                                        className="text-right"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* نبذة عن الطبيب */}
                <FormField
                    control={form.control}
                    name="bio"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>
                                وصف الطبيب{" "}
                                <span className="text-xs text-gray-600">
                                    (اختياري)
                                </span>
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    className="h-40"
                                    placeholder="اكتب نبذة مختصرة عن الطبيب، مثل تخصص، سنوات الخبرة، وأبرز الخدمات التي يقدمها."
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* المؤهل العلمي */}
                <FormField
                    control={form.control}
                    name="education"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>المؤهل العلمي</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="مثال: البورد العربي في طب الأطفال"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* الجنس والأقسام */}
                <div className="grid gap-4 md:grid-cols-2">
                    {/* الجنس */}
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>الجنس</FormLabel>
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger
                                            className="w-full"
                                            dir="rtl">
                                            <SelectValue placeholder="اختر الجنس" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="ذكر">ذكر</SelectItem>
                                        <SelectItem value="أنثى">
                                            أنثى
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* الأقسام */}
                    <FormField
                        control={form.control}
                        name="department_ids"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    الأقسام{" "}
                                    <span className="text-xs text-gray-600">
                                        (اختياري)
                                    </span>
                                </FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="w-full justify-between">
                                                <div className="flex flex-wrap gap-1">
                                                    {field.value?.length ? (
                                                        departments
                                                            .filter(
                                                                (department) =>
                                                                    field.value.includes(
                                                                        department.depart_id,
                                                                    ),
                                                            )
                                                            .map(
                                                                (
                                                                    department,
                                                                ) => (
                                                                    <Badge
                                                                        key={
                                                                            department.depart_id
                                                                        }
                                                                        variant="secondary">
                                                                        {
                                                                            department.depart_name
                                                                        }
                                                                    </Badge>
                                                                ),
                                                            )
                                                    ) : (
                                                        <span className="text-muted-foreground">
                                                            اختر الأقسام
                                                        </span>
                                                    )}
                                                </div>
                                                <ChevronsUpDown className="h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[350px] p-0">
                                        <Command>
                                            <CommandInput placeholder="ابحث عن قسم..." />
                                            <CommandEmpty>
                                                لا توجد نتائج.
                                            </CommandEmpty>
                                            <CommandGroup className="max-h-64 overflow-auto">
                                                {departments.map(
                                                    (department) => {
                                                        const checked =
                                                            field.value?.includes(
                                                                department.depart_id,
                                                            ) ?? false;
                                                        return (
                                                            <CommandItem
                                                                key={
                                                                    department.depart_id
                                                                }
                                                                onSelect={() => {
                                                                    if (
                                                                        checked
                                                                    ) {
                                                                        field.onChange(
                                                                            field.value.filter(
                                                                                (
                                                                                    id,
                                                                                ) =>
                                                                                    id !==
                                                                                    department.depart_id,
                                                                            ),
                                                                        );
                                                                    } else {
                                                                        field.onChange(
                                                                            [
                                                                                ...(field.value ??
                                                                                    []),
                                                                                department.depart_id,
                                                                            ],
                                                                        );
                                                                    }
                                                                }}>
                                                                <Checkbox
                                                                    checked={
                                                                        checked
                                                                    }
                                                                    className="ml-2"
                                                                />
                                                                <span className="flex-1">
                                                                    {
                                                                        department.depart_name
                                                                    }
                                                                </span>
                                                                {checked && (
                                                                    <Check className="h-4 w-4" />
                                                                )}
                                                            </CommandItem>
                                                        );
                                                    },
                                                )}
                                            </CommandGroup>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* أوقات دوام الطبيب */}
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
                                    schedule_id: undefined,
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
                                    <Button
                                        type="button"
                                        size="icon"
                                        variant="destructive"
                                        onClick={() => remove(index)}>
                                        <Trash2 className="size-4" />
                                    </Button>
                                </CardHeader>
                                <CardContent className="space-y-5">
                                    {/* اليوم + الفترة */}
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <FormField
                                            control={form.control}
                                            name={`schedules.${index}.day_of_week`}
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>اليوم</FormLabel>
                                                    <Select
                                                        value={field.value}
                                                        onValueChange={
                                                            field.onChange
                                                        }>
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
                                            control={form.control}
                                            name={`schedules.${index}.status`}
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        الحاله
                                                    </FormLabel>
                                                    <Select
                                                        value={field.value}
                                                        onValueChange={
                                                            field.onChange
                                                        }>
                                                        <FormControl>
                                                            <SelectTrigger
                                                                className="w-full"
                                                                dir="rtl">
                                                                <SelectValue placeholder="اختر حاله" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="active">
                                                                الدوام فعال
                                                            </SelectItem>
                                                            <SelectItem value="inactive">
                                                                الدوام غير فعال
                                                                حاليا
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name={`schedules.${index}.shift_type`}
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        الفترة
                                                    </FormLabel>
                                                    <Select
                                                        value={field.value}
                                                        onValueChange={
                                                            field.onChange
                                                        }>
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

                                    {/* الوقت والحد الأقصى للمرضى */}
                                    <div className="grid gap-4 md:grid-cols-3">
                                        <FormField
                                            control={form.control}
                                            name={`schedules.${index}.start_time`}
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        من الساعة
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="time"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name={`schedules.${index}.end_time`}
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        إلى الساعة
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="time"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name={`schedules.${index}.max_patients`}
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        الحد الأقصى للمرضى
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            min={1}
                                                            value={
                                                                field.value ??
                                                                ""
                                                            }
                                                            onChange={(e) => {
                                                                const val =
                                                                    e.target
                                                                        .value;
                                                                field.onChange(
                                                                    val === ""
                                                                        ? undefined
                                                                        : Number(
                                                                              val,
                                                                          ),
                                                                );
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    {/* ملاحظات الجدول */}
                                    <FormField
                                        control={form.control}
                                        name={`schedules.${index}.notes`}
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>ملاحظات</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        rows={3}
                                                        placeholder="أي ملاحظات تخص فترة الدوام"
                                                        value={
                                                            field.value ?? ""
                                                        }
                                                        onChange={
                                                            field.onChange
                                                        }
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

                {/* سنوات الخبرة ورسوم الكشف */}
                <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="years_exper"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>سنوات الخبرة</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        inputMode="numeric"
                                        placeholder="مثال: 10"
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

                    <FormField
                        control={form.control}
                        name="consultation_fee"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>رسوم الكشف</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        inputMode="numeric"
                                        placeholder="مثال: 5000"
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

                {/* ملاحظات عامة */}
                <FormField
                    control={form.control}
                    name="notes"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>
                                ملاحظات{" "}
                                <span className="text-xs text-gray-600">
                                    (اختياري)
                                </span>
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    placeholder="اكتب أي ملاحظات إضافية مثل مواعيد الحضور، الخدمات الخاصة، أو أي معلومات مهمة."
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* زر التسليم */}
                <Button type="submit" disabled={loading}>
                    {loading ? "جاري حفظ البيانات..." : "حفظ الطبيب"}
                </Button>
            </form>
        </Form>
    );
}
