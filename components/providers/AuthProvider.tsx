"use client";

import {useEffect} from "react";
import {useCurrentUser} from "@/hooks/auth/useCurrentUser";
import {useAuth} from "@/hooks/auth/useAuth";
import {Spinner} from "../ui/spinner";

export default function AuthProvider({children}: {children: React.ReactNode}) {
    const {data, isLoading, isError} = useCurrentUser();

    const {setUser, clearUser} = useAuth();


    useEffect(() => {
        if (isLoading) return;

        if (data) {
            setUser(data);
        } else if (isError) {
            clearUser();
        }
    }, [data, isLoading, isError, setUser, clearUser]);

    if (isLoading) {
        return (
            <div className="w-full h-[100dvh] flex justify-center items-center">
                <Spinner className="size-8" />;
            </div>
        );
    }

    return <>{children}</>;
}
