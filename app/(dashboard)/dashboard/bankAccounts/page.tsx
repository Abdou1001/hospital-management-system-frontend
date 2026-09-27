"use client";

import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Landmark, Loader2, Plus} from "lucide-react";

import HeaderSection from "@/components/shared/headerSection";
import ImageUpload from "@/components/shared/image-upload/image-upload";

import {Button} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
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
import {Badge} from "@/components/ui/badge";

import {
    createBankAccountSchema,
    CreateBankAccountValues,
    BankAccount,
} from "@/validation/bank-accounts/schemas/bank-account.schema";
import {useBankAccounts} from "@/hooks/bank-accounts/useBankAccounts";
import {useCreateBankAccount} from "@/hooks/bank-accounts/useCreateBankAccount";

import BankAccountCard from "./components/BankAccountCard";
import BankAccountsSkeleton from "./components/BankAccountsSkeleton";

export default function HospitalBankAccountsPage() {
    const {data, isLoading} = useBankAccounts();
    const createMutation = useCreateBankAccount();

    const [imageFile, setImageFile] = useState<File | null>(null);

    const form = useForm<CreateBankAccountValues>({
        resolver: zodResolver(createBankAccountSchema),
        defaultValues: {
            name: "",
            account_number: "",
            path_image: "",
        },
    });

    const preview = imageFile ? URL.createObjectURL(imageFile) : "";

    const onSubmit = (values: CreateBankAccountValues) => {
        createMutation.mutate(
            {
                ...values,
                imageFile,
            },
            {
                onSuccess: () => {
                    form.reset({
                        name: "",
                        account_number: "",
                        path_image: "",
                    });
                    setImageFile(null);
                },
            },
        );
    };

    // استخراج قائمة الحسابات سواء كانت المصفوفة مباشرة أو داخل results
    const accounts: BankAccount[] = Array.isArray(data)
        ? data
        : Array.isArray(data?.results)
        ? data.results
        : [];

    return (
        <div className="space-y-8">
            <HeaderSection text="إدارة الحسابات البنكية" />

            {/* فورم إضافة حساب بنكي في أعلى الصفحة */}
            <Card className="shadow-sm">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Landmark className="size-5 text-primary" />
                        <CardTitle className="text-lg">
                            إضافة حساب بنكي جديد
                        </CardTitle>
                    </div>
                    <CardDescription>
                        أدخل بيانات الحساب البنكي لإضافته إلى قائمة حسابات المستشفى
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="grid gap-6 md:grid-cols-[220px_1fr]">
                            {/* صورة الحساب */}
                            <FormField
                                control={form.control}
                                name="path_image"
                                render={({field}) => (
                                    <FormItem className="flex flex-col items-center justify-center">
                                        <FormControl>
                                            <ImageUpload
                                                value={preview}
                                                disabled={
                                                    createMutation.isPending
                                                }
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

                            {/* الحقول النصية وزر الإضافة */}
                            <div className="space-y-4 flex flex-col justify-between">
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>
                                                    اسم الحساب / البنك
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="مثال: حساب بنك البسيري"
                                                        disabled={
                                                            createMutation.isPending
                                                        }
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
                                                <FormLabel>
                                                    رقم الحساب
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="مثال: 0019834"
                                                        dir="ltr"
                                                        className="text-left font-mono"
                                                        disabled={
                                                            createMutation.isPending
                                                        }
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="pt-2">
                                    <Button
                                        type="submit"
                                        disabled={createMutation.isPending}
                                        className="w-full sm:w-auto min-w-[140px]">
                                        {createMutation.isPending ? (
                                            <>
                                                <Loader2 className="me-2 size-4 animate-spin" />
                                                جاري الإضافة...
                                            </>
                                        ) : (
                                            <>
                                                <Plus className="me-2 size-4" />
                                                إضافة الحساب
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            {/* قائمة الحسابات المضافة */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold">الحسابات البنكية المتاحة</h2>
                    <Badge variant="outline" className="font-mono">
                        {accounts.length}
                    </Badge>
                </div>

                {isLoading ? (
                    <BankAccountsSkeleton />
                ) : accounts.length === 0 ? (
                    <Card className="border-dashed py-12 text-center text-muted-foreground">
                        <CardContent className="space-y-3">
                            <Landmark className="mx-auto size-10 opacity-40" />
                            <p className="text-base font-medium">
                                لم يتم إضافة أي حساب بنكي بعد.
                            </p>
                            <p className="text-xs text-muted-foreground">
                                استخدم النموذج أعلاه لإضافة أول حساب بنكي للمستشفى.
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-5 sm:grid-cols-1 grid-cols-2">
                        {accounts.map((account) => (
                            <BankAccountCard
                                key={account.bank_account_id ?? account.name}
                                account={account}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
