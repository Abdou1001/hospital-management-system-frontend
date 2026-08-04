import {useMutation, useQueryClient} from "@tanstack/react-query";

import {toast} from "sonner";

import {updateDoctor} from "@/api/doctor.api";

export function useUpdateDoctor() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({id, formData}: {id: number; formData: FormData}) =>
            updateDoctor(id, formData),

        onSuccess: (_, variables) => {
            toast.success("تم تعديل الطبيب بنجاح");

            queryClient.invalidateQueries({
                queryKey: ["doctors"],
            });

            queryClient.invalidateQueries({
                queryKey: ["doctor", variables.id],
            });
        },

        onError: (error: any) => {
            toast.error(error.response?.data?.message || "حدث خطأ اثناء التعديل");
        },
    });
}
