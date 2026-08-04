"use client";

import {useRouter} from "next/navigation";
import DoctorForm from "../../components/forms/DoctorForm";

import {useCreateDoctor} from "@/hooks/doctors/useCreateDoctor";
import {useAssignDoctorToDepartment} from "@/hooks/doctor-departments/useAssignDoctorToDepartment";
import {useCreateDoctorSchedule} from "@/hooks/doctorSchedules/useCreateDoctorSchedule";
import {DoctorFormValues} from "@/validation/doctors/schemas/doctor-form.schema";

export default function CreateDoctorPage() {
    const router = useRouter();

    const createDoctorMutation = useCreateDoctor();
    const assignDoctorMutation = useAssignDoctorToDepartment();
    const createDoctorScheduleMutation = useCreateDoctorSchedule();

    return (
        <DoctorForm
            loading={
                createDoctorMutation.isPending ||
                assignDoctorMutation.isPending ||
                createDoctorScheduleMutation.isPending
            }
            onSubmit={async (values: DoctorFormValues, image?: File) => {
                try {
                    /* ==========================================
              1. تجهيز بيانات الطبيب الأساسية
          ========================================== */
                    const formData = new FormData();

                    Object.entries(values).forEach(([key, value]) => {
                        // استبعاد الحقول المستقلة والصورة
                        if (
                            key !== "department_ids" &&
                            key !== "schedules" &&
                            key !== "path_image"
                        ) {
                            // تتأكد ألا نرسل undefined أو null كنصوص "undefined"
                            if (
                                value !== undefined &&
                                value !== null &&
                                value !== ""
                            ) {
                                formData.append(key, String(value));
                            }
                        }
                    });

                    if (image) {
                        formData.append("path_image", image);
                    }

                    /* ==========================================
              2. إنشاء الطبيب
          ========================================== */
                    const doctorResponse =
                        await createDoctorMutation.mutateAsync(formData);

                    // التأكد من استخراج الـ ID بدقة (حسب بناء الـ API الخاص بك)
                    const doctorId =
                        doctorResponse?.results?.doctor_id ??
                        doctorResponse?.doctor_id;

                    if (!doctorId) {
                        throw new Error("لم يتم إرجاع معرف الطبيب من السيرفر.");
                    }

                    /* ==========================================
              3. ربط الطبيب بالأقسام (بالتوازي)
          ========================================== */
                    if (
                        values.department_ids &&
                        values.department_ids.length > 0
                    ) {
                        await Promise.all(
                            values.department_ids.map((depart_id) =>
                                assignDoctorMutation.mutateAsync({
                                    doctor_id: doctorId,
                                    depart_id,
                                }),
                            ),
                        );
                    }

                    /* ==========================================
              4. إنشاء الدوامات (بالتوازي)
          ========================================== */
                    if (values.schedules && values.schedules.length > 0) {
                        await Promise.all(
                            values.schedules.map((schedule) =>
                                createDoctorScheduleMutation.mutateAsync({
                                    doctor_id: doctorId,
                                    day_of_week: schedule.day_of_week,
                                    shift_type: schedule.shift_type,
                                    start_time: schedule.start_time,
                                    end_time: schedule.end_time,
                                    max_patients: Number(schedule.max_patients),
                                    notes: schedule.notes || "",
                                    status: schedule.status,
                                }),
                            ),
                        );
                    }

                    /* ==========================================
              5. التوجيه عند النجاح
          ========================================== */
                    router.push("/dashboard/doctors");
                } catch (error) {
                    console.error(
                        "فشل في عملية إضافة الطبيب والدوامات:",
                        error,
                    );
                }
            }}
        />
    );
}
