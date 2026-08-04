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
    createAdSchema,
    CreateAdValues,
} from "@/validation/ads/schemas/create-ad.schema";

interface AdvertisementFormProps {
    defaultValues?: Partial<CreateAdValues>;

    imageUrl?: string;

    loading?: boolean;

    mode: "create" | "edit";

    onSubmit: (values: CreateAdValues, image?: File) => void;
}

export default function AdvertisementForm({
    defaultValues,
    imageUrl,
    loading = false,
    mode,
    onSubmit,
}: AdvertisementFormProps) {
    /* ==========================================
        الصورة المختارة
    ========================================== */
    const [imageFile, setImageFile] = useState<File | null>(null);

    /* ==========================================
        معاينة الصورة
    ========================================== */
    const preview = imageFile ? URL.createObjectURL(imageFile) : imageUrl;

    /* ==========================================
        React Hook Form
    ========================================== */
    const form = useForm<CreateAdValues>({
        resolver: zodResolver(createAdSchema),

        defaultValues: {
            start_date: "",
            end_date: "",
            ...defaultValues,
        },
    });

    const startDate = form.watch("start_date");

    return (
        <Form {...form}>
            <form
                className="space-y-7"
                onSubmit={form.handleSubmit((values) =>
                    onSubmit(values, imageFile ?? undefined),
                )}>
                {/* ==========================================
                    صورة الإعلان
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
                    تاريخ البداية
                ========================================== */}
                <FormField
                    control={form.control}
                    name="start_date"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>تاريخ البداية</FormLabel>

                            <FormControl>
                                <Input
                                    type="date"
                                    min={mode == "create" ? new Date().toISOString().split("T")[0] : ""}
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* ==========================================
                    تاريخ الانتهاء
                ========================================== */}
                <FormField
                    control={form.control}
                    name="end_date"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>تاريخ الانتهاء</FormLabel>

                            <FormControl>
                                <Input
                                    type="date"
                                    min={
                                        startDate ||
                                        new Date().toISOString().split("T")[0]
                                    }
                                    {...field}
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
                            ? "جاري إنشاء الإعلان..."
                            : "جاري حفظ التعديلات..."
                        : mode === "create"
                          ? "إضافة الإعلان"
                          : "حفظ التعديلات"}
                </Button>
            </form>
        </Form>
    );
}
