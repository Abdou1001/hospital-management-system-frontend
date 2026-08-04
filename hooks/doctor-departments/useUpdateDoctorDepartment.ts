import {useMutation, useQueryClient} from "@tanstack/react-query";

import {updateDoctorDepartment} from "@/api/doctor-departments.api";
import {UpdateDoctorDepartmentPayload} from "@/types/data";

export function useUpdateDoctorDepartment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            body,
        }: {
            id: number;
            body: UpdateDoctorDepartmentPayload;
        }) => updateDoctorDepartment(id, body),

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
