import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import {createBankAccount} from "@/api/bank-accounts.api";

export function useCreateBankAccount() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createBankAccount,

        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: ["bank-accounts"],
            });

            toast.success(data?.message || "تمت إضافة الحساب البنكي بنجاح.");
        },

        onError: (error: any) => {
            const errors = error.response?.data?.errors;

            if (errors?.length) {
                errors.forEach((err: any) => toast.error(err.message));
            } else {
                toast.error(
                    error.response?.data?.message ||
                        "حدث خطأ أثناء إضافة الحساب البنكي",
                );
            }
        },
    });
}
