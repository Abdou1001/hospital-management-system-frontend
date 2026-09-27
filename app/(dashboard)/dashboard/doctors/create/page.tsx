"use client";

import { useRouter } from "next/navigation";
import DoctorForm from "../../components/forms/DoctorForm";

import { useCreateDoctor } from "@/hooks/doctors/useCreateDoctor";
import { DoctorFormValues } from "@/validation/doctors/schemas/doctor-form.schema";

export default function CreateDoctorPage() {
    const router = useRouter();

    const createDoctorMutation = useCreateDoctor();

    return (
        <DoctorForm
            loading={createDoctorMutation.isPending}
            onSubmit={async (
                values: DoctorFormValues,
                image?: File,
            ) => {
                try {
                    /* ==========================================
                       1. تجهيز FormData
                    ========================================== */

                    const formData = new FormData();


                    /* ==========================================
                       2. إضافة بيانات الطبيب

                       نستثني:
                       - department_ids
                       - schedules
                       - path_image

                       لأن الأقسام والدوامات سيتم إرسالها
                       كـ JSON، والصورة لها معالجة خاصة.
                    ========================================== */

                    Object.entries(values).forEach(
                        ([key, value]) => {
                            if (
                                key !== "department_ids" &&
                                key !== "schedules" &&
                                key !== "path_image" &&
                                value !== undefined &&
                                value !== null &&
                                value !== ""
                            ) {
                                formData.append(
                                    key,
                                    String(value),
                                );
                            }
                        },
                    );


                    /* ==========================================
                       3. إضافة الأقسام

                       مثال:

                       [1, 3, 5]

                       يتم إرسالها إلى Backend كـ JSON String.
                    ========================================== */

                    formData.append(
                        "department_ids",
                        JSON.stringify(
                            values.department_ids ?? [],
                        ),
                    );


                    /* ==========================================
                       4. إضافة الدوامات

                       نحول schedules إلى JSON String
                       حتى يستطيع Backend عمل JSON.parse().
                    ========================================== */

                    const schedules =
                        values.schedules?.map((schedule) => ({
                            day_of_week:
                                schedule.day_of_week,

                            shift_type:
                                schedule.shift_type,

                            start_time:
                                schedule.start_time,

                            end_time:
                                schedule.end_time,

                            max_patients:
                                Number(
                                    schedule.max_patients,
                                ),

                            notes:
                                schedule.notes || "",

                            status:
                                schedule.status,
                        })) ?? [];

                    formData.append(
                        "schedules",
                        JSON.stringify(schedules),
                    );


                    /* ==========================================
                       5. إضافة صورة الطبيب

                       الصورة ستذهب إلى Backend،
                       والـ Backend يرفعها إلى Storage.
                    ========================================== */

                    if (image) {
                        formData.append(
                            "path_image",
                            image,
                        );
                    }


                    /* ==========================================
                       6. إرسال Request واحد فقط

                       Backend سيقوم بـ:

                       Upload Image
                            ↓
                       PostgreSQL RPC
                            ↓
                       Create Doctor
                       Create Departments
                       Create Schedules
                    ========================================== */

                    await createDoctorMutation.mutateAsync(
                        formData,
                    );


                    /* ==========================================
                       7. التوجيه بعد نجاح العملية بالكامل
                    ========================================== */

                    router.push(
                        "/dashboard/doctors",
                    );

                } catch (error) {

                    console.error(
                        "فشل في عملية إضافة الطبيب:",
                        error,
                    );
                }
            }}
        />
    );
}