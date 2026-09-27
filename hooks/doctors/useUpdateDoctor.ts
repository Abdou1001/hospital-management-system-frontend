import {useMutation, useQueryClient} from "@tanstack/react-query";

import {toast} from "sonner";

import {updateDoctor} from "@/api/doctor.api";

export function useUpdateDoctor() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            formData,
        }: {
            id: number;
            formData: FormData;
        }) => updateDoctor(id, formData),

        onSuccess: async (_, variables) => {
            toast.success("تم تعديل الطبيب بنجاح");

            /* ==========================================
               1. تحديث قائمة الأطباء
            ========================================== */

            await queryClient.invalidateQueries({
                queryKey: ["doctors"],
            });


            /* ==========================================
               2. تحديث بيانات الطبيب
            ========================================== */

            await queryClient.invalidateQueries({
                queryKey: ["doctor", variables.id],
            });


            /* ==========================================
               3. تحديث جميع الـ Queries المرتبطة
                  بهذا الطبيب

               نحن لا نعتمد على اسم queryKey هنا،
               لأننا نريد التأكد من تحديث:

               - Departments
               - Schedules
               - Doctor
               - وأي Query أخرى مرتبطة بالطبيب

               مثل:

               ["doctorDepartments", 30]
               ["doctorSchedules", 30]

               أو أي اسم آخر.
            ========================================== */

            await queryClient.invalidateQueries({
                predicate: (query) => {
                    return query.queryKey.some(
                        (key) =>
                            key === variables.id,
                    );
                },
            });
        },

        onError: (error: any) => {
            const errors =
                error.response?.data?.errors;

            if (errors?.length) {
                errors.forEach((err: any) => {
                    toast.error(err.message);
                });
            } else {
                toast.error(
                    "حدث خطأ أثناء تعديل الطبيب",
                );
            }
        },
    });
}