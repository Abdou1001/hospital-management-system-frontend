import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import {deleteBankAccount} from "@/api/bank-accounts.api";

export function useDeleteBankAccount() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number | string) => deleteBankAccount(id),

        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: ["bank-accounts"],
            });

            toast.success(data?.message || "تم حذف الحساب البنكي بنجاح.");
        },

        onError: (error: any) => {
            toast.error(
                error.response?.data?.message ||
                    "حدث خطأ أثناء حذف الحساب البنكي",
            );
        },
    });
}
