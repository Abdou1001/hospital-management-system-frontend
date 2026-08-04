import {Badge} from "@/components/ui/badge";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import { AppointmentStatusBadge } from "../../../components/table/badges/AppointmentStatusBadge";


interface Props {
    appointment: any;
}

export default function AppointmentInfoCard({appointment}: Props) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>بيانات الحجز</CardTitle>
            </CardHeader>

            <Separator />

            <CardContent className="space-y-4 pt-6">
                <InfoRow title="رقم الحجز" value={appointment.appointment_id} />

                <InfoRow
                    title="تاريخ الحجز"
                    value={appointment.appointment_date}
                />

                <InfoRow
                    title="رسوم الطبيب"
                    value={`${appointment.doctor_fee} ريال`}
                />

                <InfoRow
                    title="رسوم المنصة"
                    value={`${appointment.platform_fee} ريال`}
                />

                <InfoRow
                    title="الإجمالي"
                    value={`${appointment.total_amount} ريال`}
                />

                <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">حالة الحجز</span>

                    <AppointmentStatusBadge
                        status={appointment.status}></AppointmentStatusBadge>
                </div>

                <InfoRow
                    title="ملاحظات الإدارة"
                    value={appointment.admin_notes ?? "لا يوجد"}
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
