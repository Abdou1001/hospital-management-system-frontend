"use client";

import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import ImageUpload from "@/components/shared/image-upload/image-upload";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import {
    createDepartmentSchema,
    CreateDepartmentValues,
} from "@/validation/departments/schemas/create-department.schema";

interface DepartmentFormProps {
    // القيم الافتراضية عند التعديل
    defaultValues?: Partial<CreateDepartmentValues>;
    // رابط الصورة الحالية
    imageUrl?: string;
    // هل النموذج في حالة تحميل؟
    loading?: boolean;
    // إنشاء أو تعديل
    mode: "create" | "edit";
    // تنفيذ عملية الحفظ
    onSubmit: (
        values: CreateDepartmentValues,
        image?: File,
    ) => void;
}

export default function DepartmentForm({
    defaultValues,
    imageUrl,
    loading = false,
    mode,
    onSubmit,
}: DepartmentFormProps) {
    /* ==========================================
        الصورة المختارة من المستخدم
    ========================================== */
    const [imageFile, setImageFile] = useState<File | null>(null);

    /* ==========================================
        معاينة الصورة
    ========================================== */
    const preview = imageFile ? URL.createObjectURL(imageFile) : imageUrl;

    /* ==========================================
        React Hook Form
    ========================================== */
    const form = useForm<CreateDepartmentValues>({
        resolver: zodResolver(createDepartmentSchema),

        defaultValues: {
            depart_name: "",
            ...defaultValues,
        },
    });

    return (
        <Form {...form}>
            <form
                className="space-y-7"
                onSubmit={form.handleSubmit((values) =>
                    onSubmit(values, imageFile ?? undefined),
                )}>
                
                {/* ==========================================
                    صورة القسم
                ========================================== */}
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

                {/* ==========================================
                    اسم القسم
                ========================================== */}
                <FormField
                    control={form.control}
                    name="depart_name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>اسم القسم</FormLabel>

                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="مثال: قسم القلب"
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* ==========================================
                    زر الحفظ
                ========================================== */}
                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full md:w-auto">
                    {loading
                        ? mode === "create"
                            ? "جاري إنشاء القسم..."
                            : "جاري حفظ التعديلات..."
                        : mode === "create"
                          ? "إضافة القسم"
                          : "حفظ التعديلات"}
                </Button>
            </form>
        </Form>
    );
}