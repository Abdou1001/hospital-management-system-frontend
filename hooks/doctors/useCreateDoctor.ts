import {useMutation, useQueryClient} from "@tanstack/react-query";

import {toast} from "sonner";

import {createDoctor} from "@/api/doctor.api";

export function useCreateDoctor() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createDoctor,

        onSuccess: ({message}) => {
            toast.success(message);

            queryClient.invalidateQueries({
                queryKey: ["doctors"],
            });
        },

        onError: (error: any) => {
            toast.error(error.response?.data?.message || "حدث خطأ اثناء اضافة طبيب");
        },
    });
}
