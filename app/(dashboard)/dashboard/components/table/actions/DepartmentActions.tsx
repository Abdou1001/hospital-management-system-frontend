"use client";

import Link from "next/link";
import {MoreHorizontal} from "lucide-react";

import {Button} from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {Department} from "@/validation/departments/schemas/department.schema";

import DeleteDepartmentDialog from "../../dialogs/DeleteDepartmentDialog";

interface DepartmentActionsProps {
    department: Department;
}

export default function DepartmentActions({
    department,
}: DepartmentActionsProps) {
    return (
        <>
            {/* ======================================================
                قائمة الإجراءات الخاصة بكل قسم
            ====================================================== */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreHorizontal className="size-5"  />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="center">
                    {/* ==========================================
                        تعديل القسم
                    ========================================== */}
                    <DropdownMenuItem asChild>
                        <Link
                            className="justify-center"
                            href={`/dashboard/departments/${department.depart_id}/edit`}>
                            تعديل
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    {/* ==========================================
                        حذف القسم
                    ========================================== */}
                    <DeleteDepartmentDialog department={department}>
                        <DropdownMenuItem
                            className="text-destructive justify-center"
                            onSelect={(e) => e.preventDefault()}>
                            حذف
                        </DropdownMenuItem>
                    </DeleteDepartmentDialog>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
