"use client";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

import {
    ChangePasswordSchema,
    changePasswordSchema,
} from "@/validation/users/schemas/change-password.schema";
import { useChangePassword } from "@/hooks/users/useChangePassword";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function ChangePasswordDialog({open, onOpenChange}: Props) {
    const changePassword = useChangePassword();

    const form = useForm<ChangePasswordSchema>({
        resolver: zodResolver(changePasswordSchema),

        defaultValues: {
            current_password: "",
            new_password: "",
            confirm_password: "",
        },
    });

    const onSubmit = (values: ChangePasswordSchema) => {
        changePassword.mutate(values)
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>تغيير كلمة المرور</DialogTitle>

                    <DialogDescription>
                        استخدم كلمة مرور قوية تحتوي على حروف وأرقام.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-5">
                        <FormField
                            control={form.control}
                            name="current_password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>كلمة المرور الحالية</FormLabel>

                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="new_password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>كلمة المرور الجديدة</FormLabel>

                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirm_password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>تأكيد كلمة المرور</FormLabel>

                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={changePassword.isPending}>
                            {changePassword.isPending
                                ? "جاري تغيير كلمة المرور"
                                : "تغيير كلمة المرور"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
