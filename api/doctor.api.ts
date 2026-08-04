import api from "@/lib/axios";
import {DoctorFilters} from "@/types/filter";

import {
    DoctorResponse,
    DoctorsResponse,
} from "@/validation/doctors/schemas/doctor.schema";

export async function getDoctors(
    params: DoctorFilters,
): Promise<DoctorsResponse> {
    const {data} = await api.get("/doctors", {
        params,
    });

    return data;
}

export async function getOneDoctor(id: number): Promise<DoctorResponse> {
    const {data} = await api.get(`/doctors/${id}`);
    return data;
}

export async function createDoctor(formData: FormData) {
    const {data} = await api.post("/doctors", formData);
    console.log(data)
    return data;
}

export async function updateDoctor(id: number, formData: FormData) {
    const {data} = await api.put(`/doctors/${id}`, formData);

    return data;
}

export async function toggleDoctorStatus(id: number) {
    const {data} = await api.patch(`/doctors/${id}/status`);

    return data;
}

export async function toggleDoctorHidden(id: number) {
    const {data} = await api.patch(`/doctors/${id}/is_hidden`);

    return data;
}
