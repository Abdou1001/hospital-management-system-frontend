"use client";

import {useRouter, useParams, notFound} from "next/navigation";

import DoctorForm from "../../../components/forms/DoctorForm";

import {useOneDoctor} from "@/hooks/doctors/useDoctors";
import {useUpdateDoctor} from "@/hooks/doctors/useUpdateDoctor";

import {useDoctorSchedule} from "@/hooks/doctorSchedules/useDoctorSchedule";
import {useUpdateDoctorSchedule} from "@/hooks/doctorSchedules/useUpdateDoctorSchedule";

import {useDepartmentsByDoctor} from "@/hooks/doctor-departments/useDepartmentsByDoctor";
import {useDeleteDoctorDepartment} from "@/hooks/doctor-departments/useDeleteDoctorDepartment";
import {useAssignDoctorToDepartment} from "@/hooks/doctor-departments/useAssignDoctorToDepartment";
import DoctorFormSkeleton from "./DoctorFormSkeleton";
import { useCreateDoctorSchedule } from "@/hooks/doctorSchedules/useCreateDoctorSchedule";
import { useDeleteDoctorSchedule } from "@/hooks/doctorSchedules/useDeleteDoctorSchedule";

export default function EditDoctorPage() {
    const router = useRouter();
    const params = useParams();

    const doctorId = Number(params.id);

    const {data: doctorData, isLoading} = useOneDoctor(doctorId);

    const {data: doctorDepartments, isLoading: doctorDepartmentsLoading} =
        useDepartmentsByDoctor(doctorId);

    const {data: doctorSchedule, isLoading: doctorScheduleLoading} =
        useDoctorSchedule(doctorId);

    const updateDoctorMutation = useUpdateDoctor();
    
    const deleteDepartmentMutation = useDeleteDoctorDepartment();
    
    const assignDepartmentMutation = useAssignDoctorToDepartment();
    
    const updateDoctorScheduleMutation = useUpdateDoctorSchedule();
    const createDoctorScheduleMutation = useCreateDoctorSchedule();
    const deleteDoctorScheduleMutation = useDeleteDoctorSchedule();

    if (isLoading || doctorDepartmentsLoading || doctorScheduleLoading)
        return <DoctorFormSkeleton />;

    if (!doctorData) return notFound();

    const doctor = doctorData.results;

    console.log(doctorSchedule);

    return (
        <DoctorForm
            loading={
                updateDoctorMutation.isPending ||
                deleteDepartmentMutation.isPending ||
                assignDepartmentMutation.isPending
            }
            imageUrl={doctor?.path_image as string}
            defaultValues={{
                full_name: doctor.full_name,
                email: doctor.email ?? "",
                phone_number: doctor.phone_number ?? "",
                bio: doctor.bio ?? "",
                education: doctor.education ?? "",
                gender: doctor.gender,
                years_exper: doctor.years_exper,
                consultation_fee: doctor.consultation_fee,
                notes: doctor.notes ?? "",

                department_ids:
                    doctorDepartments?.results.map(
                        (item: any) => item.department.depart_id,
                    ) ?? [],

                schedules:
                    doctorSchedule?.results.map((item : any) => ({
                        schedule_id: item.schedule_id,
                        day_of_week: item.day_of_week,
                        shift_type: item.shift_type,
                        start_time: item.start_time,
                        end_time: item.end_time,
                        max_patients: item.max_patients,
                        notes: item.notes ?? "",
                        status: item.status,
                    })) ?? [],
            }}
            onSubmit={async (values, image) => {
                try {
                    const formData = new FormData();
                    Object.entries(values).forEach(([key, value]) => {
                        if (key !== "department_ids") {
                            formData.append(key, String(value));
                        }
                    });

                    if (image) {
                        formData.append("path_image", image);
                    }

                    await updateDoctorMutation.mutateAsync({
                        id: doctorId,
                        formData: formData,
                    });

                    const currentDepartments = doctorDepartments?.results ?? [];

                    // الأقسام القديمة
                    const oldDepartmentIds = currentDepartments.map(
                        (item: any) => item.department.depart_id,
                    );

                    // الأقسام الجديدة
                    const newDepartmentIds = values.department_ids;

                    // الأقسام المطلوب حذفها
                    const departmentsToDelete = currentDepartments.filter(
                        (item: any) =>
                            !newDepartmentIds.includes(
                                item.department.depart_id,
                            ),
                    );

                    // الأقسام المطلوب إضافتها
                    const departmentsToAdd = newDepartmentIds.filter(
                        (id) => !oldDepartmentIds.includes(id),
                    );

                    // حذف فقط ما أزيل
                    for (const item of departmentsToDelete) {
                        await deleteDepartmentMutation.mutateAsync(
                            item.doctor_deprtment_id,
                        );
                    }

                    // إضافة فقط الجديد
                    for (const depart_id of departmentsToAdd) {
                        await assignDepartmentMutation.mutateAsync({
                            doctor_id: doctorId,
                            depart_id,
                        });
                    }

                    const currentSchedules = doctorSchedule?.results ?? [];

                    //  الدوامات القديمة
                    const oldScheduleIds = currentSchedules.map(
                        (item: any) => item.schedule_id,
                    );

                    if (!values.schedules) {
                        console.log("error");
                        return;
                    }
                    // الدوامات الجديدة
                    const newScheduleIds = values.schedules
                        .filter((item) => item.schedule_id)
                        .map((item) => item.schedule_id);

                    // الدومات المطلوب إضافتها
                    const schedulesToDelete = oldScheduleIds.filter(
                        (id: number) => !newScheduleIds.includes(id),
                    );

                    for (const schedule of values.schedules) {
                        if (schedule.schedule_id) {
                            // تحديث دوام موجود
                            await updateDoctorScheduleMutation.mutateAsync({
                                id: schedule.schedule_id,

                                values: {
                                    doctor_id: doctorId,
                                    day_of_week: schedule.day_of_week,
                                    shift_type: schedule.shift_type,
                                    start_time: schedule.start_time,
                                    end_time: schedule.end_time,
                                    max_patients: schedule.max_patients,
                                    notes: schedule.notes,
                                    status: schedule.status,
                                },
                            });
                        } else {
                            // إنشاء دوام جديد
                            await createDoctorScheduleMutation.mutateAsync({
                                doctor_id: doctorId,

                                day_of_week: schedule.day_of_week,
                                shift_type: schedule.shift_type,
                                start_time: schedule.start_time,
                                end_time: schedule.end_time,
                                max_patients: schedule.max_patients,
                                notes: schedule.notes,
                                status: schedule.status,
                            });
                        }
                    }
                } catch (error) {
                    console.log(error)
                }
                router.push("/dashboard/doctors");
            }}
        />
    );
}
