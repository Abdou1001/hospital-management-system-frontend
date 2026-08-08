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

        onError: (error: any) => {
            const errors = error.response?.data?.errors;

            if (errors?.length) {
                errors.forEach((err: any) => {
                    toast.error(err.message);
                });
            } else {
                toast.error("حدث خطأ أثناء إضافة اعلان");
            }
        },
    });
}
