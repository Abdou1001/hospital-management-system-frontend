"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";

import {Spinner} from "@/components/ui/spinner";
import {useAuth} from "@/hooks/auth/useAuth";

type AuthGuardProps = {
    children: React.ReactNode;
    allowedRoles: string[];
};

export default function AuthGuard({children, allowedRoles}: AuthGuardProps) {
    // const router = useRouter();

    // const {user, clearUser} = useAuth();

    // useEffect(() => {
    //     if (!user) return;

    //     if (!allowedRoles.includes(user.role)) {
    //         clearUser();
    //         router.replace("/login");
    //     }
    // }, [user, allowedRoles, clearUser, router]);

    // if (!user) {
    //     return <Spinner />;
    // }

    // if (!allowedRoles.includes(user.role)) {
    //     return <Spinner  className="w-full"/>;
    // }

    return <>{children}</>;
}
