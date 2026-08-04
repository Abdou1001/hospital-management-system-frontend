import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";

import {toggleAdStatus} from "@/api/ads.api";

export function useToggleAdStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: toggleAdStatus,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["ads"],
            });

            toast.success("تم تحديث حالة الإعلان بنجاح.");
        },

        onError: (error: Error) => {
            toast.error(error.message || "حدث خطأ أثناء تحديث حالة الإعلان.");
        },
    });
}
