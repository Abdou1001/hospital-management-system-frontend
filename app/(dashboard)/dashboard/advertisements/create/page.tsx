"use client";

import {useRouter} from "next/navigation";

import HeaderSection from "@/components/shared/headerSection";
import AdvertisementForm from "../../components/forms/AdvertisementForm";

import {useCreateAd} from "@/hooks/ads/useCreateAd";

import {CreateAdValues} from "@/validation/ads/schemas/create-ad.schema";

export default function CreateAdvertisementPage() {
    /* ==========================================
        Router
    ========================================== */
    const router = useRouter();

    /* ==========================================
        Mutation إنشاء الإعلان
    ========================================== */
    const createAdMutation = useCreateAd();

    return (
        <>
            {/* ==========================================
                عنوان الصفحة
            ========================================== */}
            <HeaderSection text="إضافة إعلان جديد" />

            {/* ==========================================
                نموذج إنشاء الإعلان
            ========================================== */}
            <AdvertisementForm
                mode="create"
                loading={createAdMutation.isPending}
                onSubmit={async (values: CreateAdValues, image?: File) => {
                    /* ==========================================
                        إرسال البيانات إلى الـ API
                    ========================================== */
                    await createAdMutation.mutateAsync({
                        ...values,
                        path_image: image!,
                    });

                    /* ==========================================
                        العودة إلى صفحة الإعلانات
                    ========================================== */
                    router.push("/dashboard/advertisements");
                }}
            />
        </>
    );
}
