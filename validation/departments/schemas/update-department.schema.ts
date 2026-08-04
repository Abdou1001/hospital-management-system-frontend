import {z} from "zod";

export const updateDepartmentSchema = z.object({
    depart_name: z
        .string()
        .trim()
        .min(2, "اسم القسم يجب أن يحتوي على حرفين على الأقل.")
        .max(100, "اسم القسم طويل جداً.")
        .optional(),

    path_image: z.instanceof(File).optional(),
});

export type UpdateDepartmentSchema = z.infer<typeof updateDepartmentSchema>;
