import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";

import {updateDoctorSchedule} from "@/api/doctor-schedules.api";

export function useUpdateDoctorSchedule() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateDoctorSchedule,

        onSuccess: (data) => {
            toast.success(data.message);

            queryClient.invalidateQueries({
                queryKey: ["doctor-schedules"],
            });

            queryClient.invalidateQueries({
                queryKey: ["doctor-schedule"],
            });
        },

        onError: (error: any) => {
            toast.error(error.response?.data?.message);
        },
    });
}
