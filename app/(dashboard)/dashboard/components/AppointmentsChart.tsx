"use client";

import {useState} from "react";
import {TrendingDown, TrendingUp} from "lucide-react";
import {Area, AreaChart, CartesianGrid, XAxis} from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {useAppointmentsChart} from "@/hooks/home/useAppointmentsChart";

const chartConfig = {
    total: {
        label: "الحجوزات",
        color: "hsl(var(--primary))",
    },
} satisfies ChartConfig;

const months: Record<string, string> = {
    Jan: "يناير",
    Feb: "فبراير",
    Mar: "مارس",
    Apr: "أبريل",
    May: "مايو",
    Jun: "يونيو",
    Jul: "يوليو",
    Aug: "أغسطس",
    Sep: "سبتمبر",
    Oct: "أكتوبر",
    Nov: "نوفمبر",
    Dec: "ديسمبر",
};

export default function AppointmentsChart() {
    const currentYear = new Date().getFullYear();

    const [year, setYear] = useState(currentYear.toString());

    const years = Array.from({length: currentYear - 2026 + 1}, (_, index) =>
        (2026 + index).toString(),
    );

    const {data, isLoading} = useAppointmentsChart(Number(year));


    const chartData =
        data?.results.map((item) => ({
            ...item,
            month_name: months[item.month_name] ?? item.month_name,
        })) ?? [];

    const statistics = data?.statistics;

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>إحصائيات الحجوزات</CardTitle>

                    <CardDescription>
                        عدد الحجوزات خلال آخر {chartData.length} أشهر
                    </CardDescription>
                </div>

                <Select value={year} onValueChange={setYear}>
                    <SelectTrigger className="w-32">
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                        {years.map((year) => (
                            <SelectItem key={year} value={year}>
                                {year}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </CardHeader>

            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="h-[320px] w-full">
                    <AreaChart data={chartData} accessibilityLayer>
                        <defs>
                            <linearGradient
                                id="fillAppointments"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-total)"
                                    stopOpacity={0.45}
                                />

                                <stop
                                    offset="95%"
                                    stopColor="var(--color-total)"
                                    stopOpacity={0.05}
                                />
                            </linearGradient>
                        </defs>

                        <CartesianGrid vertical={false} />

                        <XAxis
                            dataKey="month_name"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />

                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />

                        <Area
                            dataKey="total"
                            type="natural"
                            stroke="var(--color-total)"
                            strokeWidth={3}
                            fill="url(#fillAppointments)"
                            fillOpacity={1}
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>

            <CardFooter className="flex items-center gap-2 text-sm">
                {statistics?.growth >= 0 ? (
                    <TrendingUp className="size-4 text-green-600" />
                ) : (
                    <TrendingDown className="size-4 text-red-600" />
                )}

                <span className="font-medium">
                    {statistics?.growth === 0
                        ? "لا يوجد تغيير عن الشهر الماضي"
                        : statistics?.growth! > 0
                          ? `ارتفع عدد الحجوزات بنسبة ${statistics?.growth}%`
                          : `انخفض عدد الحجوزات بنسبة ${Math.abs(
                                statistics?.growth!,
                            )}%`}
                </span>
            </CardFooter>
        </Card>
    );
}
