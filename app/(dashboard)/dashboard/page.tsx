"use client";
import {CardData} from "@/types/data";
import AppointmentsChart from "./components/AppointmentsChart";
import StatisticsCards from "./components/StatisticsCards";
import DashboardSkeleton from "./components/DashboardSkeleton";
import HeaderSection from "@/components/shared/headerSection";
import useShowCards from "@/hooks/home/useShowCards";

export default function Home() {
    const {cardData: data, isLoading} = useShowCards();

    const cardData: CardData[] = data.slice(0,8);
    
    if (isLoading) {
        return <DashboardSkeleton />;
    }
    return (
        <div className="home">
            <HeaderSection text="أحصائيات" />

            {/* Cards */}
            <div className="grid lg:grid-cols-4 grid-cols-2 gap-x-4 gap-y-2">
                {cardData.map((data: CardData) => (
                    <StatisticsCards data={data} key={data.id} />
                ))}
            </div>

            {/* Chart */}
            <div className="w-full h-full mt-5">
                <AppointmentsChart />
            </div>
        </div>
    );
}
