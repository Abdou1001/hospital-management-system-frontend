import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";

import {createDepartment} from "@/api/departments.api";

export function useCreateDepartment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createDepartment,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["departments"],
            });

            toast.success("تم إنشاء القسم بنجاح.");
        },

        onError: (error: Error) => {
            toast.error(error.message || "حدث خطأ أثناء إنشاء القسم.");
        },
    });
}
