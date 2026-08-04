import {useMutation} from "@tanstack/react-query";
import {toast} from "sonner";
import {login} from "@/api/auth.api";
import {useAuth} from "@/hooks/auth/useAuth";
import {useRouter} from "next/navigation";

export const useLogin = () => {
    const router = useRouter();

    const {setUser} = useAuth();

    return useMutation({
        mutationFn: login,

        onSuccess(data) {
            setUser(data.user);
            toast.success(data.message);
            router.replace("/dashboard");
        },

        onError(error: any) {
            toast.error(
                error?.response?.data?.message ?? "حدث خطأ أثناء تسجيل الدخول",
            );
            console.log(error)
        },
    });
};
