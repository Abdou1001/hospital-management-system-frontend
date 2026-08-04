"use client";

import HeaderSection from "@/components/shared/headerSection";
import {DataTable} from "../components/table/DataTable";

import {useTableFilters} from "@/hooks/shared/useTableFilters";
import {useAds} from "@/hooks/ads/useAds";

import {ADS_FILTERS} from "@/types/filter";

import {adsColumns} from "../components/table/columns/advertisementsColumns";
import AdsToolbar from "./_components/advertisementsToolbar";

const AdvertisementsPage = () => {
    /* ===============================
            إدارة الفلاتر
    =============================== */
    const {filters, setFilters} = useTableFilters(ADS_FILTERS);

    /* ===============================
            جلب البيانات
    =============================== */
    const {data, isLoading} = useAds(filters);

    // console.log(data)

    

    return (
        <div className="space-y-6">
            <HeaderSection text="إدارة الإعلانات" />

            {/* أدوات البحث والفلاتر */}
            <AdsToolbar
                filters={filters}
                onFiltersChange={setFilters}
            />

            {/* جدول الإعلانات */}
            <DataTable
                columns={adsColumns}
                data={data?.results ?? []}
                isLoading={isLoading}
                pagination={data?.pagination}
                onPageChange={(page) =>
                    setFilters({
                        page,
                    })
                }
            />
        </div>
    );
};

export default AdvertisementsPage;