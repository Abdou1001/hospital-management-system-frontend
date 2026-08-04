import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";

import {updateAd} from "@/api/ads.api";

export function useUpdateAd() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: number;
            data: Parameters<typeof updateAd>[1];
        }) => updateAd(id, data),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["ads"],
            });

            queryClient.invalidateQueries({
                queryKey: ["ad", variables.id],
            });

            toast.success("تم تحديث الإعلان بنجاح.");
        },

        onError: (error: Error) => {
            toast.error(error.message || "حدث خطأ أثناء تحديث الإعلان.");
        },
    });
}
