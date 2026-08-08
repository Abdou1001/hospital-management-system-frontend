import Image from "next/image";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";


interface Props {
    appointment: any;
}

export default function AppointmentDoctorCard({appointment}: Props) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>بيانات الطبيب</CardTitle>
            </CardHeader>

            <Separator />

            <CardContent className="space-y-5 pt-6">
                <div className="flex flex-col items-center gap-3">
                    <Image
                        src={appointment.doctor_schedule.doctor.path_image}
                        alt={appointment.doctor_schedule.doctor.full_name}
                        width={90}
                        height={90}
                        className="rounded-full object-cover"
                    />

                    <h3 className="font-semibold text-lg">
                        {appointment.doctor_schedule.doctor.full_name}
                    </h3>
                </div>

                <Separator />

                <InfoRow
                    title="كشف الطبيب"
                    value={`${appointment.doctor_fee} ريال`}
                />
            </CardContent>
        </Card>
    );
}

function InfoRow({title, value}: {title: string; value: React.ReactNode}) {
    return (
        <div className="flex justify-between">
            <span className="text-muted-foreground">{title}</span>
            <span className="font-medium">{value}</span>
        </div>
    );
}
