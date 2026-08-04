import {z} from "zod";

export const createAdSchema = z
    .object({
        path_image: z.instanceof(File, {
            message: "صورة الإعلان مطلوبة.",
        }),

        start_date: z.string().min(1, "تاريخ البداية مطلوب."),

        end_date: z.string().min(1, "تاريخ الانتهاء مطلوب."),
    })
    .refine((data) => new Date(data.end_date) >= new Date(data.start_date), {
        path: ["end_date"],
        message: "يجب أن يكون تاريخ الانتهاء بعد أو يساوي تاريخ البداية.",
    });

export type CreateAdValues = z.infer<typeof createAdSchema>;
