import {useQuery} from "@tanstack/react-query";

import {getDepartments} from "@/api/departments.api";
import {DepartmentFilters} from "@/types/filter";

export function useDepartments(params?: DepartmentFilters) {
    return useQuery({
        queryKey: ["departments", params],
        queryFn: () => getDepartments(params),
    });
}
