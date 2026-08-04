"use client";

import {useRouter} from "next/navigation";

import HeaderSection from "@/components/shared/headerSection";
import DepartmentForm from "../../components/forms/DepartmentForm";

import {useCreateDepartment} from "@/hooks/departments/useCreateDepartment";

import {CreateDepartmentValues} from "@/validation/departments/schemas/create-department.schema";

export default function CreateDepartmentPage() {
    const router = useRouter();

    const createDepartmentMutation = useCreateDepartment();

    return (
        <>
            <HeaderSection text="إضافة قسم جديد" />

            <DepartmentForm
                mode="create"
                loading={createDepartmentMutation.isPending}
                onSubmit={async (
                    values: CreateDepartmentValues,
                    image?: File,
                ) => {
                    await createDepartmentMutation.mutateAsync({
                        ...values,
                        path_image: image,
                    });

                    router.push("/dashboard/departments");
                }}
            />
        </>
    );
}
