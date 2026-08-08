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
    verifyPhoneSchema,
    VerifyPhoneSchema,
} from "@/validation/users/schemas/verify-phone.schema";
import { useVerifyChangePhone } from "@/hooks/auth/useVerifyChangePhone";

interface VerifyPhoneDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    phoneNumber: string;
}

export default function VerifyPhoneDialog({
    open,
    onOpenChange,
    phoneNumber,
}: VerifyPhoneDialogProps) {
    const verifyPhone = useVerifyChangePhone();

    const form = useForm<VerifyPhoneSchema>({
        resolver: zodResolver(verifyPhoneSchema),

        defaultValues: {
            otp: "",
        },
    });

    const onSubmit = (values: VerifyPhoneSchema) => {
        verifyPhone.mutate(values, {
            onSuccess: () => {
                onOpenChange(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>تأكيد رقم الهاتف</DialogTitle>

                    <DialogDescription>
                        تم إرسال رمز التحقق إلى
                        <span className="mx-1 font-semibold">
                            {phoneNumber}
                        </span>
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-5">
                        <FormField
                            control={form.control}
                            name="otp"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>رمز التحقق</FormLabel>

                                    <FormControl>
                                        <Input
                                            maxLength={6}
                                            placeholder="123456"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            className="w-full"
                            type="submit"
                            disabled={verifyPhone.isPending}>
                            {verifyPhone.isPending
                                ? "جاري التأكيد..."
                                : "تأكيد"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
