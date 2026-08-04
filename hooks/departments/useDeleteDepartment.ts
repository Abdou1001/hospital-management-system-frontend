import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";

import {deleteDepartment} from "@/api/departments.api";

export function useDeleteDepartment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteDepartment,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["departments"],
            });

            toast.success("تم حذف القسم بنجاح.");
        },

        onError: (error: Error) => {
            toast.error(error.message || "حدث خطأ أثناء حذف القسم.");
        },
    });
}
