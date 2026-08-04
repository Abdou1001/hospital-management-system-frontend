"use client";

import {notFound, useParams, useRouter} from "next/navigation";

import HeaderSection from "@/components/shared/headerSection";
import AdvertisementForm from "../../../components/forms/AdvertisementForm";

import {useOneAd} from "@/hooks/ads/useOneAd";
import {useUpdateAd} from "@/hooks/ads/useUpdateAd";

import {CreateAdValues} from "@/validation/ads/schemas/create-ad.schema";
import AdvertisementFormSkeleton from "./AdvertisementFormSkeleton";

export default function EditAdvertisementPage() {
    /* ==========================================
        Router & Params
    ========================================== */
    const router = useRouter();
    const params = useParams();

    const adId = Number(params.id);

    /* ==========================================
        جلب بيانات الإعلان
    ========================================== */
    const {data: adData, isLoading} = useOneAd(adId);

    /* ==========================================
        Mutation التعديل
    ========================================== */
    const updateAdMutation = useUpdateAd();

    if(isLoading){
        return <AdvertisementFormSkeleton />
    }

    if (!adData) {
        return notFound();
    }

    const ad = adData.results;

    return (
        <>
            {/* ==========================================
                عنوان الصفحة
            ========================================== */}
            <HeaderSection text="تعديل الإعلان" />

            {/* ==========================================
                نموذج التعديل
            ========================================== */}
            <AdvertisementForm
                mode="edit"
                loading={updateAdMutation.isPending}
                imageUrl={ad.image_url ?? undefined}
                defaultValues={{
                    start_date: ad.start_date,
                    end_date: ad.end_date,
                }}
                onSubmit={async (values: CreateAdValues, image?: File) => {
                    await updateAdMutation.mutateAsync({
                        id: adId,
                        data: {
                            ...values,
                            path_image: image,
                        },
                    });

                    router.push("/dashboard/advertisements");
                }}
            />
        </>
    );
}
