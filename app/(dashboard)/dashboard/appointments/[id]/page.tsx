"use client";

import {ArrowRight} from "lucide-react";
import {useParams, useRouter} from "next/navigation";

import HeaderSection from "@/components/shared/headerSection";
import {Button} from "@/components/ui/button";

import {useOneAppointment} from "@/hooks/appointments/useAppointments";

import AppointmentPatientCard from "./_components/appointment-patient-card";
import AppointmentDoctorCard from "./_components/appointment-doctor-card";
import AppointmentInfoCard from "./_components/appointment-info-card";
import PaymentReceiptCard from "./_components/payment-receipt-card";
import AppointmentDetailsSkeleton from "./_components/appointment-details-skeleton";

export default function AppointmentDetailsPage() {
    const router = useRouter();
    const params = useParams();

    const id = Number(params.id);

    const {data, isLoading} = useOneAppointment(id);


    if (isLoading) {
        return <AppointmentDetailsSkeleton />;
    }
    if (!data) {
        return <div>الحجز غير موجود</div>;
    }
    const appointment = data.results;

    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between">
                <div>
                    <HeaderSection text="تفاصيل الحجز" />
                    <p className="text-muted-foreground">
                        عرض جميع بيانات الحجز رقم #{appointment.appointment_id}
                    </p>
                </div>

                <Button variant="outline" onClick={() => router.back()}>
                    <ArrowRight />
                    رجوع
                </Button>
            </div>

            <div className="grid gap-6 xl:grid-cols-3">
                <AppointmentPatientCard appointment={appointment} />

                <AppointmentDoctorCard appointment={appointment} />

                <AppointmentInfoCard appointment={appointment} />
            </div>

            <PaymentReceiptCard appointment={appointment} />
        </div>
    );
}
