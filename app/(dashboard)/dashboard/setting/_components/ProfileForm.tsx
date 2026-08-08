"use client";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {
    Form,
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

import {Input} from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {Button} from "@/components/ui/button";

import {
    UpdateMyProfileSchema,
    updateMyProfileSchema,
} from "@/validation/users/schemas/update-my-profile.schema";
import {User} from "lucide-react";
import {useEffect} from "react";
import {useAuth} from "@/hooks/auth/useAuth";
import {useUpdateMyProfile} from "@/hooks/users/useUpdateMyProfile";

export default function ProfileForm() {
    const {user} = useAuth();
    const update = useUpdateMyProfile();


    const form = useForm<UpdateMyProfileSchema>({
        resolver: zodResolver(updateMyProfileSchema),

        defaultValues: {
            full_name: "",
            email: "",
            gender: "ذكر",
            date_of_birth: undefined,
        },
    });

    useEffect(() => {
        if (!user) return;

        form.reset({
            full_name: user.full_name,
            email: user.email ?? "",
            gender: user.gender,
            date_of_birth: user.date_of_birth
                ? new Date(user.date_of_birth)
                : undefined,
        });

    }, [user, form]);

    const onSubmit = (values: UpdateMyProfileSchema) => {
        if(!user) return;
        update.mutate({id: user?.user_id, value: values});
    };


    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="rounded-lg border p-2">
                        <User className="size-5" />
                    </div>
                    <div>
                        <CardTitle>البيانات الشخصية</CardTitle>
                        <CardDescription className="mt-1">
                            يمكنك تعديل معلومات حسابك الشخصية.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-5">
                        <div className="grid md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="full_name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>الاسم الكامل</FormLabel>

                                        <FormControl>
                                            <Input
                                                placeholder="الاسم الكامل"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>البريد الإلكتروني</FormLabel>

                                        <FormControl>
                                            <Input
                                                placeholder="example@gmail.com"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="date_of_birth"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>تاريخ الميلاد</FormLabel>

                                        <FormControl>
                                            <Input
                                                type="date"
                                                value={
                                                    field.value
                                                        ? field.value
                                                              .toISOString()
                                                              .split("T")[0]
                                                        : ""
                                                }
                                                onChange={(e) =>
                                                    field.onChange(
                                                        e.target.value
                                                            ? new Date(
                                                                  e.target
                                                                      .value,
                                                              )
                                                            : undefined,
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
                                                <SelectItem value="ذكر">
                                                    ذكر
                                                </SelectItem>

                                                <SelectItem value="أنثى">
                                                    أنثى
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex justify-end">
                            <Button type="submit" disabled={update.isPending}>
                                {update.isPending
                                    ? "جاري الحفظ..."
                                    : "حفظ التغييرات"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
