"use client";

import {useState} from "react";

import HeaderSection from "@/components/shared/headerSection";

import ProfileForm from "./_components/ProfileForm";
import ChangePhoneCard from "./_components/ChangePhoneCard";
import ChangePasswordCard from "./_components/ChangePasswordCard";

import ChangePhoneDialog from "./_components/ChangePhoneDialog";
import VerifyPhoneDialog from "./_components/VerifyPhoneDialog";
import ChangePasswordDialog from "./_components/ChangePasswordDialog";

export default function SettingsPage() {
    const [phoneDialogOpen, setPhoneDialogOpen] = useState(false);

    const [verifyPhoneDialogOpen, setVerifyPhoneDialogOpen] = useState(false);

    const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState("");

    return (
        <div className="space-y-6">
            <HeaderSection text="إعدادات الحساب" />

            <div className="mx-auto max-w-4xl space-y-6">
                <ProfileForm />

                <ChangePhoneCard onOpen={() => setPhoneDialogOpen(true)} />

                <ChangePasswordCard
                    onOpen={() => setPasswordDialogOpen(true)}
                />
            </div>

            <ChangePhoneDialog
                open={phoneDialogOpen}
                onOpenChange={setPhoneDialogOpen}
                onVerifyOpen={() => setVerifyPhoneDialogOpen(true)}
                setPhoneNumber={setPhoneNumber}
            />

            <VerifyPhoneDialog
                open={verifyPhoneDialogOpen}
                onOpenChange={setVerifyPhoneDialogOpen}
                phoneNumber={phoneNumber}
            />

            <ChangePasswordDialog
                open={passwordDialogOpen}
                onOpenChange={setPasswordDialogOpen}
            />
        </div>
    );
}
