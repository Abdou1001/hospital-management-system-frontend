import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";

import {deleteAd} from "@/api/ads.api";

export function useDeleteAd() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteAd,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["ads"],
            });

            toast.success("تم حذف الإعلان بنجاح.");
        },

        onError: (error: Error) => {
            toast.error(error.message || "حدث خطأ أثناء حذف الإعلان.");
        },
    });
}
