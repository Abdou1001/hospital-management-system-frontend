import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import {updateBankAccount} from "@/api/bank-accounts.api";
import {CreateBankAccountValues} from "@/validation/bank-accounts/schemas/bank-account.schema";

interface UpdateParams {
    id: number | string;
    data: CreateBankAccountValues & {imageFile?: File | null};
}

export function useUpdateBankAccount() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({id, data}: UpdateParams) => updateBankAccount(id, data),

        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: ["bank-accounts"],
            });

            toast.success(data?.message || "تم تحديث الحساب البنكي بنجاح.");
        },

        onError: (error: any) => {
            const errors = error.response?.data?.errors;

            if (errors?.length) {
                errors.forEach((err: any) => toast.error(err.message));
            } else {
                toast.error(
                    error.response?.data?.message ||
                        "حدث خطأ أثناء تحديث الحساب البنكي",
                );
            }
        },
    });
}
