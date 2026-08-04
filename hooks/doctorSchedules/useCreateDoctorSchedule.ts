import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";

import {createDoctorSchedule} from "@/api/doctor-schedules.api";

export function useCreateDoctorSchedule() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createDoctorSchedule,

        onSuccess: (data) => {
            toast.success(data.message);

            queryClient.invalidateQueries({
                queryKey: ["doctor-schedules"],
            });
        },

        onError: (error: any) => {
            toast.error(error.response?.data?.message);
        },
    });
}
