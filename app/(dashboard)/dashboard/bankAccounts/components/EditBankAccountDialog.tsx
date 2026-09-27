"use client";

import {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Loader2, Pencil} from "lucide-react";
import {
    Dialog,
    DialogContent,
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
import ImageUpload from "@/components/shared/image-upload/image-upload";
import {
    BankAccount,
    createBankAccountSchema,
    CreateBankAccountValues,
} from "@/validation/bank-accounts/schemas/bank-account.schema";
import {useUpdateBankAccount} from "@/hooks/bank-accounts/useUpdateBankAccount";

interface EditBankAccountDialogProps {
    account: BankAccount;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function EditBankAccountDialog({
    account,
    open,
    onOpenChange,
}: EditBankAccountDialogProps) {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const updateMutation = useUpdateBankAccount();

    const form = useForm<CreateBankAccountValues>({
        resolver: zodResolver(createBankAccountSchema),
        defaultValues: {
            name: account.name || "",
            account_number: account.account_number || "",
            path_image: account.path_image || "",
        },
    });

    useEffect(() => {
        if (open) {
            form.reset({
                name: account.name || "",
                account_number: account.account_number || "",
                path_image: account.path_image || "",
            });
            setImageFile(null);
        }
    }, [open, account, form]);

    const preview = imageFile
        ? URL.createObjectURL(imageFile)
        : (account.path_image ?? "");

    const onSubmit = (values: CreateBankAccountValues) => {
        if (!account.bank_account_id) return;

        updateMutation.mutate(
            {
                id: account.bank_account_id,
                data: {
                    ...values,
                    imageFile,
                },
            },
            {
                onSuccess: () => {
                    onOpenChange(false);
                },
            },
        );
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md" dir="rtl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Pencil className="size-5" />
                        تعديل الحساب البنكي
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4">
                        <FormField
                            control={form.control}
                            name="path_image"
                            render={({field}) => (
                                <FormItem className="flex flex-col items-center">
                                    <FormControl>
                                        <ImageUpload
                                            value={preview}
                                            disabled={updateMutation.isPending}
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

                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>اسم الحساب / البنك</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="مثال: حساب بنك البسيري"
                                            disabled={updateMutation.isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="account_number"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>رقم الحساب</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="مثال: 0019834"
                                            dir="ltr"
                                            className="text-left font-mono"
                                            disabled={updateMutation.isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end gap-2 pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                                disabled={updateMutation.isPending}>
                                إلغاء
                            </Button>
                            <Button
                                type="submit"
                                disabled={updateMutation.isPending}>
                                {updateMutation.isPending && (
                                    <Loader2 className="me-2 size-4 animate-spin" />
                                )}
                                حفظ التعديلات
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
