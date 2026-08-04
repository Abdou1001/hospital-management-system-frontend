import {useQuery} from "@tanstack/react-query";

import {getDoctors, getOneDoctor} from "@/api/doctor.api";

import {DoctorFilters} from "@/types/filter";

export function useDoctors(params: DoctorFilters) {
    return useQuery({
        queryKey: ["doctors", params],
        queryFn: () => getDoctors(params),
    });
}

export function useOneDoctor(id: number) {
    return useQuery({
        queryKey: ["doctor", id],
        queryFn: () => getOneDoctor(id),
        enabled: !!id,
    });
}
