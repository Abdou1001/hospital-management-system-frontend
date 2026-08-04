import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";

import {changeRoleUsers, changeStatusUsers} from "@/api/user.api";
import {RoleProps} from "@/types/data";

export const useChangeStatusUsers = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({id}: {id: number}) => changeStatusUsers(id),

        onSuccess(data) {
            toast.success(data.message);

            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },

        onError(error: any) {
            toast.error(
                error?.response?.data?.message ??
                    "حدث خطأ أثناء تغيير حالة الحساب",
            );
        },
    });
};

export const useChangeRoleUsers = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({id, role}: {id: number; role: RoleProps}) =>
            changeRoleUsers(id, role),

        onSuccess(data) {
            toast.success(data.message);

            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },

        onError(error: any) {
            toast.error(
                error?.response?.data?.message ??
                    "حدث خطأ أثناء تغيير صلاحية المستخدم",
            );
        },
    });
};
