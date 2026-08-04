"use client";

import {useEffect, useState} from "react";
import z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Loader2} from "lucide-react";

import HeaderSection from "@/components/shared/headerSection";
import ImageUpload from "@/components/shared/image-upload/image-upload";

import {Button} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";

import {useGetHospital} from "@/hooks/hospital/useGetHospital";
import {useEditHospital} from "@/hooks/hospital/useEditHospital";

import {hospitalSchema} from "@/validation/hospitals/schemas/hospital.schema";

import HospitalSkeleton from "./components/HospitalSkeleton";

// type
type HospitalSchema = z.infer<typeof hospitalSchema>;

const HospitalPage = () => {
    const {data, isLoading} = useGetHospital();
    const mutation = useEditHospital();

    const [imageFile, setImageFile] = useState<File | null>(null);
    
    const preview: any  = imageFile
        ? URL.createObjectURL(imageFile)
        : (data?.path_image ?? "");

    const form = useForm<HospitalSchema>({
        resolver: zodResolver(hospitalSchema),
        defaultValues: {
            hospital_name: "",
            location: "",
            phone_number: "",
            path_image: "",
        },
    });

    useEffect(() => {
        if (!data) return;

        form.reset({
            hospital_name: data.hospital_name,
            location: data.location,
            phone_number: data.phone_number,
            path_image: data.path_image,
        });

    }, [data, form]);
    
    // onSubmit 
    const onSubmit = (values: HospitalSchema) => {
        const formData = new FormData();

        formData.append("hospital_name", values.hospital_name);
        formData.append("location", values.location);
        formData.append("phone_number", values.phone_number);

        if (imageFile) {
            formData.append("path_image", imageFile);
        }

        mutation.mutate(formData);
    };

    if (isLoading) {
        return <HospitalSkeleton />;
    }

    return (
        <div className="space-y-6">
            <HeaderSection text="المعلومات الخاصة بالمستشفى" />

            <Card className="mx-auto max-w-5xl shadow-sm">
                <CardHeader>
                    <CardTitle>تعديل بيانات المستشفى</CardTitle>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="grid gap-8 lg:grid-cols-[280px_1fr]">
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

                            <div className="space-y-5">
                                <FormField
                                    control={form.control}
                                    name="hospital_name"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>اسم المستشفى</FormLabel>

                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="مستشفى التعاون"
                                                    disabled={
                                                        mutation.isPending
                                                    }
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="location"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>الموقع</FormLabel>

                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="حضرموت - المكلا"
                                                    disabled={
                                                        mutation.isPending
                                                    }
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
                                            <FormLabel>رقم الهاتف</FormLabel>

                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="7xxxxxxxx"
                                                    disabled={
                                                        mutation.isPending
                                                    }
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <CardFooter className="px-0 pb-0">
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={mutation.isPending}>
                                        {mutation.isPending && (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        حفظ التعديلات
                                    </Button>
                                </CardFooter>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default HospitalPage;
