"use client";
import HeaderSection from "@/components/shared/headerSection";
import DoctorToolbar from "./_components/DoctorsToolbar";
import {useTableFilters} from "@/hooks/shared/useTableFilters";
import {DOCTOR_FILTERS} from "@/types/filter";
import { DataTable } from "../components/table/DataTable";
import {useDoctors} from "@/hooks/doctors/useDoctors";
import { doctorsColumns } from "../components/table/columns/doctorColumns";

const DoctorsPage = () => {
    const {filters, setFilters} = useTableFilters(DOCTOR_FILTERS);
    const {data, isLoading} = useDoctors(filters);

    return (
        <div>
            <HeaderSection text="إدارة لأطباء" />
            <DoctorToolbar filters={filters} onFiltersChange={setFilters} />
            <DataTable
                columns={doctorsColumns}
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

export default DoctorsPage;
