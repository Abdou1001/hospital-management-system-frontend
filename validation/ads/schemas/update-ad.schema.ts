import {z} from "zod";

export const updateAdSchema = z
    .object({
        path_image: z.instanceof(File).optional(),

        start_date: z.string().optional(),

        end_date: z.string().optional(),
    })
    .refine(
        (data) => {
            if (!data.start_date || !data.end_date) {
                return true;
            }

            return new Date(data.end_date) >= new Date(data.start_date);
        },
        {
            path: ["end_date"],
            message: "يجب أن يكون تاريخ الانتهاء بعد أو يساوي تاريخ البداية.",
        },
    );

export type UpdateAdSchema = z.infer<typeof updateAdSchema>;
