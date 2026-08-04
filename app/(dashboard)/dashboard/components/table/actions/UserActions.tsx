"use client";

import {MoreHorizontal} from "lucide-react";

import {User} from "@/validation/users/schemas/user.schema";

import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {ChangeStatusDialog} from "../../dialogs/change-user-status-dialog";
import {ChangeRoleDialog} from "../../dialogs/change-role-dialog";

interface UserActionsProps {
    user: User;
}

export function UserActions({user}: UserActionsProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <MoreHorizontal className="size-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="center">
                <ChangeRoleDialog user={user} />

                <DropdownMenuSeparator />

                <ChangeStatusDialog user={user} />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
