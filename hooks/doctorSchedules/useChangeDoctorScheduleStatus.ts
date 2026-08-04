import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";

import {changeDoctorScheduleStatus} from "@/api/doctor-schedules.api";

export function useChangeDoctorScheduleStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: changeDoctorScheduleStatus,

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
