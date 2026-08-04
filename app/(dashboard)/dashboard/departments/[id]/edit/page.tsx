"use client";

import {notFound, useParams, useRouter} from "next/navigation";

import HeaderSection from "@/components/shared/headerSection";
import DepartmentForm from "../../../components/forms/DepartmentForm";

import {useDepartment} from "@/hooks/departments/useDepartment";
import {useUpdateDepartment} from "@/hooks/departments/useUpdateDepartment";

import {CreateDepartmentValues} from "@/validation/departments/schemas/create-department.schema";
import DepartmentFormSkeleton from "./DepartmentFormSkeleton";

export default function EditDepartmentPage() {
    const router = useRouter();
    const params = useParams();

    const departmentId = Number(params.id);

    const {data: departmentData, isLoading} = useDepartment(departmentId);

    const updateDepartmentMutation = useUpdateDepartment();

    if (isLoading) {
        return <DepartmentFormSkeleton />;
    }

    if (!departmentData) {
        return notFound();
    }

    const department = departmentData.results;

    return (
        <>
            <HeaderSection text="تعديل القسم" />

            <DepartmentForm
                mode="edit"
                loading={updateDepartmentMutation.isPending}
                imageUrl={department.path_image ?? undefined}
                defaultValues={{
                    depart_name: department.depart_name,
                }}
                onSubmit={async (
                    values: CreateDepartmentValues,
                    image?: File,
                ) => {
                    await updateDepartmentMutation.mutateAsync({
                        id: departmentId,
                        data: {
                            ...values,
                            path_image: image,
                        },
                    });

                    router.push("/dashboard/departments");
                }}
            />
        </>
    );
}
