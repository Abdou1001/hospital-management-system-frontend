"use client";

import {ArrowRight} from "lucide-react";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";

export default function BackButton() {
    const router = useRouter();

    return (
        <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowRight className="size-5" />
        </Button>
    );
}
