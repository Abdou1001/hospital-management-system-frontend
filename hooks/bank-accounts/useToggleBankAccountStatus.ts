import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import {toggleBankAccountStatus} from "@/api/bank-accounts.api";

export function useToggleBankAccountStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number | string) => toggleBankAccountStatus(id),

        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: ["bank-accounts"],
            });

            toast.success(data?.message || "تم تغيير حالة الحساب البنكي بنجاح.");
        },

        onError: (error: any) => {
            toast.error(
                error.response?.data?.message ||
                    "حدث خطأ أثناء تغيير حالة الحساب البنكي",
            );
        },
    });
}
