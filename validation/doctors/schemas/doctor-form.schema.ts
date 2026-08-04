import {z} from "zod";

import {GENDER, STATUS} from "@/types/enums";

/* ============================================================
   Doctor Schedule Form
============================================================ */

export const doctorScheduleFormSchema = z.object({
    
    day_of_week: z.string().min(1, "اليوم مطلوب"),

    shift_type: z.string().min(1, "الفترة مطلوبة"),

    start_time: z.string().min(1, "وقت البداية مطلوب"),

    end_time: z.string().min(1, "وقت النهاية مطلوب"),

    max_patients: z.number()
        .min(1, "عدد المرضى يجب أن يكون أكبر من صفر"),

    status: z.enum(STATUS),

    notes: z.string().optional(),
});

/* ============================================================
   Doctor Form Schema
============================================================ */

export const doctorFormSchema = z.object({
    full_name: z
        .string()
        .trim()
        .min(3, "اسم الطبيب يجب أن يكون 3 أحرف على الأقل")
        .max(100),

    bio: z.string().trim().max(500).optional(),

    education: z.string().trim().max(255).optional(),

    gender: z.enum(GENDER),

    department_ids: z.array(z.number()).min(1, "اختر قسمًا واحدًا على الأقل"),

    email: z
        .union([z.literal(""), z.string().email("البريد الإلكتروني غير صالح")])
        .optional(),

    phone_number: z.string().trim().max(20).optional(),

    years_exper: z.number().min(0).optional(),

    consultation_fee: z.number().min(0),

    notes: z.string().optional(),

    path_image: z.instanceof(File).optional(),

    /* ===============================
       الدوامات
    =============================== */

    schedules: z.array(doctorScheduleFormSchema).optional(),
});

export type DoctorFormValues = z.infer<typeof doctorFormSchema>;
