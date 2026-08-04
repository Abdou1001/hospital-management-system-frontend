"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";

import {z} from "zod";

import {
    Card,
    CardContent,
    CardDescription,
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

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

import {Loader2} from "lucide-react";

import {loginSchema} from "@/validation/auth/schemas/login.schema";
import {useLogin} from "@/hooks/auth/useLogin";


type LoginSchema = z.infer<typeof loginSchema>;

export default function Login() {

    // Login Mutataion
    const mutation = useLogin();

    // Form
    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),

        defaultValues: {
            login: "",
            password: "",
        },
    });

    // on submit logic
    const onSubmit = (values: LoginSchema) => {
        mutation.mutate(values);
    };

    return (
        <Card className="w-full max-w-sm">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">تسجيل الدخول</CardTitle>

                <CardDescription>
                    أدخل البريد الإلكتروني أو رقم الهاتف وكلمة المرور
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6">
                        <FormField
                            control={form.control}
                            name="login"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        البريد الإلكتروني أو رقم الهاتف
                                    </FormLabel>

                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="m@example.com - 700000000"
                                            dir="ltr"
                                            disabled={mutation.isPending}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>كلمة المرور</FormLabel>

                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            placeholder="********"
                                            dir="ltr"
                                            disabled={mutation.isPending}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <CardFooter className="p-0">
                            <Button
                                className="w-full"
                                disabled={mutation.isPending}>
                                {mutation.isPending && (
                                    <Loader2 className="size-4 animate-spin" />
                                )}
                                تسجيل الدخول
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
