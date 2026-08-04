import {useMutation, useQueryClient} from "@tanstack/react-query";

import {assignDoctorToDepartment} from "@/api/doctor-departments.api";
import {AssignDoctorDepartmentPayload} from "@/types/data";

export function useAssignDoctorToDepartment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body: AssignDoctorDepartmentPayload) =>
            assignDoctorToDepartment(body),

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
