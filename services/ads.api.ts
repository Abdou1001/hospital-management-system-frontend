import api from "@/lib/axios";

import {AdsFilters} from "@/types/filter";

import {CreateAdValues} from "@/validation/ads/schemas/create-ad.schema";

import {UpdateAdSchema} from "@/validation/ads/schemas/update-ad.schema";

/* -------------------------------------------------------------------------- */
/*                                  Get Ads                                   */
/* -------------------------------------------------------------------------- */

export async function getAds(filters: AdsFilters) {
    const {data} = await api.get("/ads", {
        params: filters,
    });


    return data;
}

/* -------------------------------------------------------------------------- */
/*                                Get One Ad                                  */
/* -------------------------------------------------------------------------- */

export async function getOneAd(id: number) {
    const {data} = await api.get(`/ads/${id}`);

    return data;
}

/* -------------------------------------------------------------------------- */
/*                               Create Ad                                    */
/* -------------------------------------------------------------------------- */

export async function createAd(data: CreateAdValues) {
    const formData = new FormData();

    formData.append("start_date", data.start_date);
    formData.append("end_date", data.end_date);

    if (data.path_image !== undefined) {
        formData.append("path_image", data.path_image);
    }

    const {data: response} = await api.post("/ads", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response;
}

/* -------------------------------------------------------------------------- */
/*                               Update Ad                                    */
/* -------------------------------------------------------------------------- */

export async function updateAd(id: number, data: UpdateAdSchema) {
    const formData = new FormData();

    if (data.start_date !== undefined) {
        formData.append("start_date", data.start_date);
    }

    if (data.end_date !== undefined) {
        formData.append("end_date", data.end_date);
    }

    if (data.path_image !== undefined) {
        formData.append("path_image", data.path_image);
    }

    const {data: response} = await api.put(`/ads/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response;
}

/* -------------------------------------------------------------------------- */
/*                               Delete Ad                                    */
/* -------------------------------------------------------------------------- */

export async function deleteAd(id: number) {
    const {data} = await api.delete(`/ads/${id}`);

    return data;
}

/* -------------------------------------------------------------------------- */
/*                            Toggle Ad Status                                */
/* -------------------------------------------------------------------------- */

export async function toggleAdStatus(id: number) {
    const {data} = await api.patch(`/ads/${id}/status`);

    return data;
}
