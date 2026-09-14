"use client";

import {useState} from "react";
import {Loader2} from "lucide-react";

import {User} from "@/validation/users/schemas/user.schema";
import {RoleProps} from "@/types/data";
import {useChangeRoleUsers} from "@/hooks/users/useEditUser";

import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {DropdownMenuItem} from "@/components/ui/dropdown-menu";

interface ChangeRoleDialogProps {
    user: User;
}

export function ChangeRoleDialog({user}: ChangeRoleDialogProps) {
    const [open, setOpen] = useState(false);
    const [role, setRole] = useState<RoleProps["role"]>(user.role);

    const changeRole = useChangeRoleUsers();

    const handleSubmit = () => {
        changeRole.mutate(
            {
                id: user.user_id,
                role,
            },
            {
                onSuccess: () => {
                    setOpen(false);
                },
            },
        );
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(value) => {
                if (!changeRole.isPending) {
                    setOpen(value);
                }
            }}>
            <DialogTrigger asChild className="justify-center">
                <DropdownMenuItem
                    onSelect={(e) => {
                        e.preventDefault();
                        setOpen(true);
                    }}>
                    تغيير الصلاحية
                </DropdownMenuItem>
            </DialogTrigger>

            <DialogContent
                onInteractOutside={(e) => {
                    if (changeRole.isPending) {
                        e.preventDefault();
                    }
                }}>
                <DialogHeader>
                    <DialogTitle>تغيير صلاحية المستخدم</DialogTitle>

                    <DialogDescription>
                        اختر الصلاحية المناسبة لهذا المستخدم.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-5 py-2">
                    <div className="rounded-lg border bg-muted/40 p-4">
                        <p className="font-medium">{user.full_name}</p>

                        <p className="text-sm text-muted-foreground">
                            {user.phone_number}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            الصلاحية الجديدة
                        </label>

                        <Select
                            value={role}
                            onValueChange={(value) =>
                                setRole(value as RoleProps["role"])
                            }>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="admin">
                                    مدير النظام
                                </SelectItem>

                                <SelectItem value="reception">
                                    موظف استقبال
                                </SelectItem>

                                <SelectItem value="user">مستخدم</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        disabled={changeRole.isPending}>
                        إلغاء
                    </Button>

                    <Button
                        onClick={handleSubmit}
                        disabled={changeRole.isPending || role === user.role}
                        className="min-w-32">
                        {changeRole.isPending && (
                            <Loader2 className="mr-2 size-4 animate-spin" />
                        )}
                        حفظ التغييرات
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
