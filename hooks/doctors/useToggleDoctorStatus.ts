import {useMutation, useQueryClient} from "@tanstack/react-query";

import {toast} from "sonner";

import {toggleDoctorStatus} from "@/api/doctor.api";

export function useToggleDoctorStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => toggleDoctorStatus(id),

        onSuccess: ({message}) => {
            toast.success(message);

            queryClient.invalidateQueries({
                queryKey: ["doctors"],
            });
        },

        onError: (error: any) => {
            toast.error(error.response?.data?.message);
        },
    });
}
