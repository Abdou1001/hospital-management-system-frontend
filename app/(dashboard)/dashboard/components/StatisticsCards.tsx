import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {CardData} from "@/types/data";

const StatisticsCards = ({data} : {data: CardData}) => {
    return (
        <Card key={data.id} className="gap-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                <CardTitle className="text-sm font-bold">{data.name}</CardTitle>
                {/* Icon */}
                <data.icon className="h-10 w-10 text-muted-foreground border-2 border-gray-300 rounded-full p-2" />
            </CardHeader>

            {/* Content */}
            <CardContent>
                <div className="text-2xl font-bold text-center mb-2">
                    {data.value}
                </div>

                {/* Footer */}
                {data.footer && <CardDescription>{data.footer}</CardDescription>}
            </CardContent>
        </Card>
    );
};

export default StatisticsCards;
