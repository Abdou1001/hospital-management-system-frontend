import api from "@/lib/axios";
import {RoleProps} from "@/types/data";
import { AppointmentFilters } from "@/types/filter";

import {UsersResponse} from "@/validation/users/schemas/user.schema";

export interface GetUsersParams {
    page?: number;
    limit?: number;
    keyword?: string;
    role?: string;
    gender?: string;
    is_active?: string;
    sort?: string;
}

export async function getUsers(params: AppointmentFilters): Promise<UsersResponse> {
    const {data} = await api.get("/users", {
        params,
    });

    return data;
}

export async function changeStatusUsers(id: number) {
    const {data} = await api.patch(`/users/${id}/status`);
    return data;
}

export async function changeRoleUsers(id: number, role: RoleProps) {
    const {data} = await api.patch(`/users/${id}/role`, {
        role,
    });
    
    return data;
}
