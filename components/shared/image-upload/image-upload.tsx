"use client";

import Image from "next/image";
import {Camera, UploadCloud, X} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useRef} from "react";

type ImageUploadProps = {
    value?: string;
    disabled?: boolean;
    onChange: (file: File | null) => void;
};

const ImageUpload = ({value, disabled = false, onChange}: ImageUploadProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = (file?: File) => {
        if (!file) return;

        onChange(file);
    };

    const removeImage = () => {
        onChange(null);

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <div
                onClick={() => !disabled && inputRef.current?.click()}
                className="group relative flex h-60 w-60 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-muted-foreground/25 bg-muted/30 transition hover:border-primary hover:bg-muted">
                {value ? (
                    <>
                        <Image
                            src={value}
                            alt="Preview"
                            fill
                            className="object-cover"
                        />

                        <div className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 transition group-hover:opacity-100">
                            <Camera className="h-9 w-9 text-white" />
                        </div>

                        <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            className="absolute right-2 top-2 z-20 h-8 w-8"
                            onClick={(e) => {
                                e.stopPropagation();
                                removeImage();
                            }}>
                            <X className="h-4 w-4" />
                        </Button>
                    </>
                ) : (
                    <div className="flex flex-col items-center gap-3 text-center text-muted-foreground">
                        <UploadCloud className="h-12 w-12" />

                        <div>
                            <p className="font-semibold">اضغط لاختيار صورة</p>

                            <p className="text-sm">PNG • JPG • JPEG • WEBP</p>
                        </div>
                    </div>
                )}
            </div>

            <Button
                type="button"
                variant="outline"
                disabled={disabled}
                onClick={() => inputRef.current?.click()}>
                {value ? "تغيير الصورة" : "اختيار صورة"}
            </Button>

            <input
                ref={inputRef}
                hidden
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={(e) => handleFile(e.target.files?.[0])}
            />
        </div>
    );
};

export default ImageUpload;
