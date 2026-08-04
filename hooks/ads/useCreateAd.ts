import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";

import {createAd} from "@/api/ads.api";

export function useCreateAd() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createAd,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["ads"],
            });

            toast.success("تم إنشاء الإعلان بنجاح.");
        },

        onError: (error: Error) => {
            toast.error(error.message || "حدث خطأ أثناء إنشاء الإعلان.");
        },
    });
}
