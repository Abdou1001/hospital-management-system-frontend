import {useMutation, useQueryClient} from "@tanstack/react-query";

import {deleteDoctorDepartment} from "@/api/doctor-departments.api";

export function useDeleteDoctorDepartment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteDoctorDepartment(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["doctor-departments"],
            });

            queryClient.invalidateQueries({
                queryKey: ["doctors"],
            });
        },
    });
}
