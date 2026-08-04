import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";

import {updateDepartment} from "@/api/departments.api";

export function useUpdateDepartment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: number;
            data: Parameters<typeof updateDepartment>[1];
        }) => updateDepartment(id, data),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["departments"],
            });

            queryClient.invalidateQueries({
                queryKey: ["department", variables.id],
            });

            toast.success("تم تحديث القسم بنجاح.");
        },

        onError: (error: Error) => {
            toast.error(error.message || "حدث خطأ أثناء تحديث القسم.");
        },
    });
}
