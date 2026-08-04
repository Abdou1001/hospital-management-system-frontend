import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";

import {deleteDoctorSchedule} from "@/api/doctor-schedules.api";

export function useDeleteDoctorSchedule() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteDoctorSchedule,

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
