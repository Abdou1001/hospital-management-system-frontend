import {useQuery} from "@tanstack/react-query";

import {getAds} from "@/api/ads.api";
import {AdsFilters} from "@/types/filter";

export function useAds(filters: AdsFilters) {
    return useQuery({
        queryKey: ["ads", filters],
        queryFn: () => getAds(filters),
    });
}
