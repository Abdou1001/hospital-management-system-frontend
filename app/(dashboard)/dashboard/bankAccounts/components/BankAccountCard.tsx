"use client";

import {useState} from "react";
import Image from "next/image";
import {
    Check,
    Copy,
    Landmark,
    Pencil,
    Power,
    PowerOff,
    Trash2,
} from "lucide-react";
import {toast} from "sonner";

import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import {BankAccount} from "@/validation/bank-accounts/schemas/bank-account.schema";
import {useToggleBankAccountStatus} from "@/hooks/bank-accounts/useToggleBankAccountStatus";
import EditBankAccountDialog from "./EditBankAccountDialog";
import DeleteBankAccountDialog from "./DeleteBankAccountDialog";

interface BankAccountCardProps {
    account: BankAccount;
}

export default function BankAccountCard({account}: BankAccountCardProps) {
    const [copied, setCopied] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const toggleStatusMutation = useToggleBankAccountStatus();

    const accountId = account.bank_account_id;

    const handleCopy = () => {
        if (!account.account_number) return;
        navigator.clipboard.writeText(account.account_number);
        setCopied(true);
        toast.success("تم نسخ رقم الحساب بنجاح");
        setTimeout(() => setCopied(false), 2000);
    };

    const isActive = account.is_active;

    return (
        <>
            <Card className="overflow-hidden transition-shadow hover:shadow-md">
                <CardContent className="p-5 space-y-4">
                    {/* الصف العلوي: الصورة والاسم + الأزرار */}
                    <div className="flex items-start justify-between gap-3">
                        {/* صورة الحساب واسمه */}
                        <div className="flex items-center gap-3">
                            <div className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-muted/40">
                                {account.path_image ? (
                                    <Image
                                        src={account.path_image}
                                        alt={account.name}
                                        fill
                                        unoptimized
                                        className="object-cover"
                                    />
                                ) : (
                                    <Landmark className="size-7 text-muted-foreground" />
                                )}
                            </div>

                            <div className="space-y-1">
                                <h3 className="font-semibold text-base leading-tight">
                                    {account.name}
                                </h3>
                                <Badge
                                    variant={isActive ? "default" : "secondary"}
                                    className="text-xs mt-2">
                                    {isActive ? "مفعل" : "غير مفعل"}
                                </Badge>
                            </div>
                        </div>

                        {/* الإجراءات: تفعيل / تعديل / حذف */}
                        <div className="flex items-center gap-1.5">
                            {accountId && (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            type="button"
                                            size="icon"
                                            variant={isActive ? "default" : "secondary"}
                                            className="size-8"
                                            disabled={toggleStatusMutation.isPending}
                                            onClick={() =>
                                                toggleStatusMutation.mutate(accountId)
                                            }>
                                            {isActive ? (
                                                <Power className="size-4" />
                                            ) : (
                                                <PowerOff className="size-4" />
                                            )}
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        {isActive ? "إلغاء التفعيل" : "تفعيل الحساب"}
                                    </TooltipContent>
                                </Tooltip>
                            )}

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        type="button"
                                        size="icon"
                                        variant="outline"
                                        className="size-8"
                                        onClick={() => setEditOpen(true)}>
                                        <Pencil className="size-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>تعديل الحساب</TooltipContent>
                            </Tooltip>

                            {accountId && (
                                <DeleteBankAccountDialog accountId={accountId}>
                                    <Button
                                        type="button"
                                        size="icon"
                                        variant="destructive"
                                        className="size-8">
                                        <Trash2 className="size-4" />
                                    </Button>
                                </DeleteBankAccountDialog>
                            )}
                        </div>
                    </div>

                    {/* رقم الحساب وبجانبه زر النسخ */}
                    <div className="flex items-center justify-between rounded-lg border bg-muted/20 px-3.5 py-2.5">
                        <div className="space-y-0.5">
                            <span className="text-xs text-muted-foreground block">
                                رقم الحساب
                            </span>
                            <span
                                dir="ltr"
                                className="font-mono text-base font-semibold tracking-wider text-foreground">
                                {account.account_number}
                            </span>
                        </div>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    type="button"
                                    size="icon"
                                    variant="ghost"
                                    className="size-8 text-muted-foreground hover:text-foreground"
                                    onClick={handleCopy}>
                                    {copied ? (
                                        <Check className="size-4 text-emerald-600" />
                                    ) : (
                                        <Copy className="size-4" />
                                    )}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                {copied ? "تم النسخ!" : "نسخ رقم الحساب"}
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </CardContent>
            </Card>

            <EditBankAccountDialog
                account={account}
                open={editOpen}
                onOpenChange={setEditOpen}
            />
        </>
    );
}
