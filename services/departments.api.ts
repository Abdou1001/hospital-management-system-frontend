import api from "@/lib/axios";

import {
    DepartmentResponse,
    DepartmentsResponse,
} from "@/validation/departments/schemas/department.schema";
import {DepartmentFilters} from "@/types/filter";
import { CreateDepartmentValues } from "@/validation/departments/schemas/create-department.schema";
import { UpdateDepartmentSchema } from "@/validation/departments/schemas/update-department.schema";


/* -------------------- Get All Departments -------------------- */

export async function getDepartments(
    params?: DepartmentFilters,
) {
    const {data} = await api.get<DepartmentsResponse>("/departments", {
        params,
    });
    return data;
}

/* -------------------- Get One Department -------------------- */

export async function getOneDepartment(
    id: number,
): Promise<DepartmentResponse> {
    const response = await api.get(`/departments/${id}`);

    return response.data;
}


/* -------------------------------------------------------------------------- */
/*                              Create Department                             */
/* -------------------------------------------------------------------------- */

export async function createDepartment(data: CreateDepartmentValues) {
    const formData = new FormData();

    formData.append("depart_name", data.depart_name);

    if (data.path_image !== undefined) {
        formData.append("path_image", data.path_image);
    }

    const {data: response} = await api.post("/departments", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response;
}

/* -------------------------------------------------------------------------- */
/*                              Update Department                             */
/* -------------------------------------------------------------------------- */

export async function updateDepartment(
    id: number,
    data: UpdateDepartmentSchema,
) {
    const formData = new FormData();

    if (data.depart_name !== undefined) {
        formData.append("depart_name", data.depart_name);
    }

    if (data.path_image !== undefined) {
        formData.append("path_image", data.path_image);
    }

    const {data: response} = await api.put(`/departments/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response;
}
/* -------------------- Delete Department -------------------- */

export async function deleteDepartment(id: number) {
    const response = await api.delete(`/departments/${id}`);

    return response.data;
}
