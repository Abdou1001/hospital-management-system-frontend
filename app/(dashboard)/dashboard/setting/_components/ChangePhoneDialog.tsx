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

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

import {
    changePhoneSchema,
    ChangePhoneSchema,
} from "@/validation/users/schemas/change-phone.schema";
import {useChangePhoneNumber} from "@/hooks/users/useChangePhoneNumber";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onVerifyOpen: () => void;
    setPhoneNumber: (phone: string) => void;
}

export default function ChangePhoneDialog({
    open,
    onOpenChange,
    onVerifyOpen,
    setPhoneNumber,
}: Props) {
    const changePhone = useChangePhoneNumber();

    const form = useForm<ChangePhoneSchema>({
        resolver: zodResolver(changePhoneSchema),

        defaultValues: {
            phone_number: "",
            password: "",
        },
    });

    const onSubmit = (values: ChangePhoneSchema) => {
        changePhone.mutate(values, {
            onSuccess: () => {
                setPhoneNumber(values.phone_number);

                onOpenChange(false);

                onVerifyOpen();

                form.reset();
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>تغيير رقم الهاتف</DialogTitle>

                    <DialogDescription>
                        سيتم إرسال رمز تحقق إلى الرقم الجديد.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-5">
                        <FormField
                            control={form.control}
                            name="phone_number"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>رقم الهاتف الجديد</FormLabel>

                                    <FormControl>
                                        <Input
                                            placeholder="77xxxxxxxx"
                                            {...field}
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
                                    <FormLabel>كلمة المرور الحالية</FormLabel>

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
                            disabled={changePhone.isPending}>
                            {changePhone.isPending
                                ? "جاري الارسال..."
                                : "إرسال رمز التحقق"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
