"use client";

import HeaderSection from "@/components/shared/headerSection";

import DepartmentsToolbar from "./_components/departmentsToolbar";
// import DepartmentsTable from "..";

import {useDepartments} from "@/hooks/departments/useDepartments";
import {useTableFilters} from "@/hooks/shared/useTableFilters";

import {DEPARTMENT_FILTERS} from "@/types/filter";
import {DataTable} from "../components/table/DataTable";
import { departmentColumns } from "../components/table/columns/departmentColumns";

export default function DepartmentsPage() {
    /* ===============================
        إدارة الفلاتر
    =============================== */
    const {filters, setFilters} = useTableFilters(DEPARTMENT_FILTERS);

    /* ===============================
        جلب الأقسام من الـ API
    =============================== */
    const {data, isLoading} = useDepartments(filters);


    return (
        <div className="space-y-6">
            {/* عنوان الصفحة */}
            <HeaderSection text="إدارة الأقسام" />

            {/* أدوات البحث والفلاتر */}
            <DepartmentsToolbar
                filters={filters}
                onFiltersChange={setFilters}
            />

            {/* جدول الأقسام */}
            <DataTable
                columns={departmentColumns}
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
}
