"use client";
import HeaderSection from "@/components/shared/headerSection";
import {CardData} from "@/types/data";
import StatisticsCards from "../components/StatisticsCards";
import useShowCards from "@/hooks/home/useShowCards";
import {AppointmentToolbar} from "./_components/appointmentsToolbar";
import {useTableFilters} from "@/hooks/shared/useTableFilters";
import {APPOINTMENT_FILTERS} from "@/types/filter";
import {useAppointments} from "@/hooks/appointments/useAppointments";
import { DataTable } from "../components/table/DataTable";
import { appointmentsColumns } from "../components/table/columns/appointmentsColumns";

const AppointmentsPage = () => {
    const {cardData, isLoading: loading} = useShowCards();
    const {filters, setFilters} = useTableFilters(APPOINTMENT_FILTERS);
    const {data, isLoading} = useAppointments(filters);

    const cardDataAppointments: CardData[] = cardData.slice(8, 13);

    return (
        <div>
            <HeaderSection text="إدارة الحجوزات" />

            {/* Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-x-4 gap-y-2 mb-5">
                {cardDataAppointments.map((data: CardData) => (
                    <StatisticsCards data={data} key={data.id} />
                ))}
            </div>

            <AppointmentToolbar
                filters={filters}
                onFiltersChange={setFilters}
            />

            <DataTable
                columns={appointmentsColumns}
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

export default AppointmentsPage;
