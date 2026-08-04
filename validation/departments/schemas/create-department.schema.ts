import {z} from "zod";

export const createDepartmentSchema = z.object({
    depart_name: z
        .string()
        .trim()
        .min(2, "اسم القسم يجب أن يحتوي على حرفين على الأقل.")
        .max(100, "اسم القسم طويل جداً."),

    path_image: z.instanceof(File).optional(),
});

export type CreateDepartmentValues = z.infer<typeof createDepartmentSchema>;
