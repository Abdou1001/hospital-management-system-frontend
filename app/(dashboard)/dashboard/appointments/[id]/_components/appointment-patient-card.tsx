import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";

interface Props {
    appointment: any;
}

export default function AppointmentPatientCard({appointment}: Props) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>بيانات المريض</CardTitle>
            </CardHeader>

            <Separator />

            <CardContent className="space-y-4 pt-6">
                <InfoRow title="اسم المريض" value={appointment.patient_name} />

                <InfoRow title="رقم الهاتف" value={appointment.patient_phone} />

                <InfoRow
                    title="العمر"
                    value={`${appointment.patient_age} سنة`}
                />

                <InfoRow title="الجنس" value={appointment.patient_gender} />

                <InfoRow
                    title="ملاحظات"
                    value={appointment.notes ?? "لا يوجد"}
                />
            </CardContent>
        </Card>
    );
}

function InfoRow({title, value}: {title: string; value: React.ReactNode}) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{title}</span>
            <span className="font-medium">{value}</span>
        </div>
    );
}
