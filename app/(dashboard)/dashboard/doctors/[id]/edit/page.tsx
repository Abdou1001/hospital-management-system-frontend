"use client";

import { useRouter, useParams, notFound } from "next/navigation";

import DoctorForm from "../../../components/forms/DoctorForm";

import { useOneDoctor } from "@/hooks/doctors/useDoctors";
import { useUpdateDoctor } from "@/hooks/doctors/useUpdateDoctor";

import { useDoctorSchedule } from "@/hooks/doctorSchedules/useDoctorSchedule";
import { useDepartmentsByDoctor } from "@/hooks/doctor-departments/useDepartmentsByDoctor";

import DoctorFormSkeleton from "./DoctorFormSkeleton";

export default function EditDoctorPage() {
    const router = useRouter();
    const params = useParams();

    const doctorId = Number(params.id);

    /* ==========================================
       جلب بيانات الطبيب
    ========================================== */

    const { data: doctorData, isLoading } =
        useOneDoctor(doctorId);


    /* ==========================================
       جلب أقسام الطبيب
    ========================================== */

    const {
        data: doctorDepartments,
        isLoading: doctorDepartmentsLoading,
    } = useDepartmentsByDoctor(doctorId);


    /* ==========================================
       جلب أوقات دوام الطبيب
    ========================================== */

    const {
        data: doctorSchedule,
        isLoading: doctorScheduleLoading,
    } = useDoctorSchedule(doctorId);


    /* ==========================================
       Mutation واحدة فقط للتعديل
    ========================================== */

    const updateDoctorMutation =
        useUpdateDoctor();


    /* ==========================================
       Loading
    ========================================== */

    if (
        isLoading ||
        doctorDepartmentsLoading ||
        doctorScheduleLoading
    ) {
        return <DoctorFormSkeleton />;
    }


    /* ==========================================
       التأكد من وجود الطبيب
    ========================================== */

    if (!doctorData) {
        return notFound();
    }


    const doctor = doctorData.results;


    return (
        <DoctorForm

            /* ======================================
               Loading أثناء عملية التعديل
            ====================================== */

            loading={
                updateDoctorMutation.isPending
            }


            /* ======================================
               الصورة الحالية
            ====================================== */

            imageUrl={
                doctor?.path_image as string
            }


            /* ======================================
               القيم الافتراضية
            ====================================== */

            defaultValues={{
                full_name:
                    doctor.full_name,

                email:
                    doctor.email ?? "",

                phone_number:
                    doctor.phone_number ?? "",

                bio:
                    doctor.bio ?? "",

                education:
                    doctor.education ?? "",

                gender:
                    doctor.gender,

                years_exper:
                    doctor.years_exper,

                consultation_fee:
                    doctor.consultation_fee,

                notes:
                    doctor.notes ?? "",


                /* ==============================
                   أقسام الطبيب
                ============================== */

                department_ids:
                    doctorDepartments?.results.map(
                        (item: any) =>
                            item.department.depart_id,
                    ) ?? [],


                /* ==============================
                   دوامات الطبيب
                ============================== */

                schedules:
                    doctorSchedule?.results.map(
                        (item: any) => ({
                            schedule_id:
                                item.schedule_id,

                            day_of_week:
                                item.day_of_week,

                            shift_type:
                                item.shift_type,

                            start_time:
                                item.start_time,

                            end_time:
                                item.end_time,

                            max_patients:
                                item.max_patients,

                            notes:
                                item.notes ?? "",

                            status:
                                item.status,
                        }),
                    ) ?? [],
            }}


            /* ======================================
               Submit
            ====================================== */

            onSubmit={async (
                values,
                image,
            ) => {

                try {

                    /* ==================================
                       1. تجهيز FormData
                    ================================== */

                    const formData =
                        new FormData();


                    /* ==================================
                       2. بيانات الطبيب

                       نستثني:
                       - department_ids
                       - schedules
                       - path_image

                       لأننا سنرسلها بشكل منفصل.
                    ================================== */

                    Object.entries(values).forEach(
                        ([key, value]) => {

                            if (
                                key !==
                                "department_ids" &&
                                key !==
                                "schedules" &&
                                key !==
                                "path_image" &&
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


                    /* ==================================
                       3. الأقسام

                       مثال:

                       [1, 2, 5]
                    ================================== */

                    formData.append(
                        "department_ids",
                        JSON.stringify(
                            values.department_ids ??
                            [],
                        ),
                    );


                    /* ==================================
                       4. الدوامات

                       نرسل schedule_id أيضًا.

                       وهذا مهم جدًا لأن Backend
                       يحتاج معرفة:

                       - أي Schedule موجود ويتم تحديثه
                       - وأي Schedule جديد
                    ================================== */

                    const schedules =
                        values.schedules?.map(
                            (schedule) => ({
                                schedule_id:
                                    schedule.schedule_id ??
                                    null,

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
                                    schedule.notes ||
                                    "",

                                status:
                                    schedule.status,
                            }),
                        ) ?? [];


                    formData.append(
                        "schedules",
                        JSON.stringify(
                            schedules,
                        ),
                    );


                    /* ==================================
                       5. الصورة

                       إذا المستخدم اختار صورة جديدة
                       نرسلها.

                       إذا لم يختار:
                       Backend سيستخدم الصورة القديمة.
                    ================================== */

                    if (image) {
                        formData.append(
                            "path_image",
                            image,
                        );
                    }


                    /* ==================================
                       6. Request واحد فقط

                       Backend سيقوم بـ:

                       Update Doctor
                       Sync Departments
                       Sync Schedules
                    ================================== */

                    await updateDoctorMutation.mutateAsync(
                        {
                            id: doctorId,
                            formData,
                        },
                    );


                    /* ==================================
                       7. النجاح
                    ================================== */

                    router.push(
                        "/dashboard/doctors",
                    );

                } catch (error) {

                    console.error(
                        "فشل في عملية تعديل الطبيب:",
                        error,
                    );
                }
            }}
        />
    );
}