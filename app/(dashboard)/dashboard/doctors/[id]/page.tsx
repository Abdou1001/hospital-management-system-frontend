"use client";

import Image from "next/image";
import {useParams, useRouter} from "next/navigation";
import {ArrowRight} from "lucide-react";

import {useOneDoctor} from "@/hooks/doctors/useDoctors";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {Skeleton} from "@/components/ui/skeleton";

export default function DoctorDetailsPage() {
    const router = useRouter();

    const params = useParams();
    const doctorId = Number(params.id);

    const {data, isLoading} = useOneDoctor(doctorId);

    if (isLoading) {
        return (
            <Card>
                <CardContent className="space-y-6 p-6">
                    <Skeleton className="mx-auto size-32 rounded-full" />

                    <Skeleton className="mx-auto h-7 w-60" />

                    <div className="grid gap-4 md:grid-cols-2">
                        {Array.from({length: 9}).map((_, index) => (
                            <Skeleton key={index} className="h-16 rounded-lg" />
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    const doctor = data?.results;

    if (!doctor) {
        return (
            <Card>
                <CardContent className="py-20 text-center">
                    الطبيب غير موجود.
                </CardContent>

                <div className="flex justify-center pb-6">
                    <Button variant="outline" onClick={() => router.back()}>
                        <ArrowRight className="size-4" />
                        العودة
                    </Button>
                </div>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>تفاصيل الطبيب</CardTitle>

                <Button variant="outline" onClick={() => router.back()}>
                    <ArrowRight className="size-4" />
                    العودة
                </Button>
            </CardHeader>

            <CardContent className="space-y-8">
                <div className="flex flex-col items-center gap-5 md:flex-row">
                    <Image
                        src={
                            doctor.path_image ||
                            "/images/doctor-placeholder.png"
                        }
                        alt={doctor.full_name}
                        width={120}
                        height={120}
                        className="size-32 rounded-full border object-cover"
                    />

                    <div className="space-y-3">
                        <h2 className="text-2xl font-bold">
                            {doctor.full_name}
                        </h2>

                        <Badge
                            variant={
                                doctor.status === "active"
                                    ? "default"
                                    : "secondary"
                            }>
                            {doctor.status === "active" ? "نشط" : "غير نشط"}
                        </Badge>
                    </div>
                </div>

                <Separator />

                <div className="grid gap-6 md:grid-cols-2">
                    <InfoItem
                        title="الأقسام"
                        value={
                            doctor.doctor_department?.length ? (
                                <div className="flex flex-wrap gap-2">
                                    {doctor.doctor_department.map((item) => (
                                        <Badge
                                            key={item.doctor_deprtment_id}
                                            variant="secondary">
                                            {item.department.depart_name}
                                        </Badge>
                                    ))}
                                </div>
                            ) : (
                                "-"
                            )
                        }
                    />

                    <InfoItem title="التخصص" value={doctor.bio ?? "-"} />

                    <InfoItem
                        title="المؤهل العلمي"
                        value={doctor.education ?? "-"}
                    />

                    <InfoItem title="الجنس" value={doctor.gender} />

                    <InfoItem
                        title="سنوات الخبرة"
                        value={`${doctor.years_exper} سنة`}
                    />

                    <InfoItem
                        title="رسوم الكشف"
                        value={`${doctor.consultation_fee.toLocaleString()} ريال`}
                    />

                    <InfoItem
                        title="البريد الإلكتروني"
                        value={doctor.email ?? "-"}
                    />

                    <InfoItem
                        title="رقم الهاتف"
                        value={doctor.phone_number ?? "-"}
                    />

                    <InfoItem
                        title="حالة الظهور"
                        value={doctor.is_hidden ? "مخفي" : "ظاهر"}
                    />
                </div>

                <Separator />

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">أوقات الدوام</h3>

                    {doctor.doctor_schedule?.length ? (
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {doctor.doctor_schedule.map((schedule) => (
                                <div
                                    key={schedule.schedule_id}
                                    className="rounded-xl border bg-card p-4">
                                    <div className="mb-3 flex items-center justify-between">
                                        <Badge variant="secondary">
                                            {schedule.day_of_week}
                                        </Badge>

                                        <Badge
                                            variant={
                                                schedule.status === "active"
                                                    ? "default"
                                                    : "destructive"
                                            }>
                                            {schedule.status === "active"
                                                ? "نشط"
                                                : "غير نشط"}
                                        </Badge>
                                    </div>

                                    <div className="space-y-2 text-sm">
                                        <p>
                                            <span className="font-medium">
                                                نوع الدوام:
                                            </span>{" "}
                                            {schedule.shift_type}
                                        </p>

                                        <p>
                                            <span className="font-medium">
                                                من:
                                            </span>{" "}
                                            {schedule.start_time.slice(0, 5)}
                                        </p>

                                        <p>
                                            <span className="font-medium">
                                                إلى:
                                            </span>{" "}
                                            {schedule.end_time.slice(0, 5)}
                                        </p>

                                        <p>
                                            <span className="font-medium">
                                                الحد الأقصى للمرضى:
                                            </span>{" "}
                                            {schedule.max_patients}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-lg border border-dashed py-10 text-center text-muted-foreground">
                            لا توجد مواعيد دوام لهذا الطبيب.
                        </div>
                    )}
                </div>

                <Separator />

                <div className="space-y-2">
                    <h3 className="font-semibold">الملاحظات</h3>

                    <p className="leading-7 text-muted-foreground">
                        {doctor.notes || "لا توجد ملاحظات."}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

interface InfoItemProps {
    title: string;
    value: React.ReactNode;
}

function InfoItem({title, value}: InfoItemProps) {
    return (
        <div className="space-y-2 rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">{title}</p>

            <div className="font-medium">{value}</div>
        </div>
    );
}
