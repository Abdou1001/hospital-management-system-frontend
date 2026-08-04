import {LucideProps} from "lucide-react";
import {ForwardRefExoticComponent} from "react";

/* ============================================================
    Dashboard
============================================================ */

/* ==========================================
    بيانات بطاقة الإحصائيات
========================================== */
export interface CardData {
    // معرف البطاقة
    id: number;

    // عنوان البطاقة
    name: string;

    // أيقونة البطاقة
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref">>;

    // قيمة البطاقة (رقم أو نص)
    value: number | string;

    // وصف إضافي أسفل البطاقة (اختياري)
    footer?: string;

    // نسبة التغيير مقارنة بالفترة السابقة (اختياري)
    growth?: number;

    // هل القيمة تمثل مبلغًا ماليًا؟
    isCurrency?: boolean;
}

/* ==========================================
    إحصائيات لوحة التحكم
========================================== */
export interface StatisticsTypes {
    /* ===============================
        الإحصائيات العامة
    =============================== */

    // عدد المستخدمين
    numberUsers: number;

    // عدد الأقسام
    numberDepartments: number;

    // عدد الأطباء
    numberDoctors: number;

    // عدد الإعلانات
    numberAds: number;

    /* ===============================
        إحصائيات الحجوزات
    =============================== */

    // إجمالي الحجوزات
    numberAppointments: number;

    // حجوزات الشهر الحالي
    appointmentsThisMonth: number;

    // الحجوزات المقبولة
    acceptedAppointments: number;

    // الحجوزات قيد المراجعة
    pendingAppointments: number;

    // الحجوزات المرفوضة
    rejectedAppointments: number;

    // الحجوزات الملغية
    cancelledAppointments: number;

    /* ===============================
        إحصائيات الأرباح
    =============================== */

    // إجمالي أرباح المنصة
    totalRevenue: number;

    // أرباح الشهر الحالي
    monthlyRevenue: number;
}

/* ============================================================
    Dashboard Chart
============================================================ */

/* ==========================================
    عنصر واحد داخل مخطط الحجوزات
========================================== */
export interface AppointmentChartItem {
    // رقم الشهر
    month_number: number;

    // اسم الشهر
    month_name: string;

    // عدد الحجوزات
    total: number;
}

/* ==========================================
    إحصائيات الرسم البياني
========================================== */
export interface AppointmentChartStatistics {
    // عدد حجوزات الشهر الحالي
    currentMonthAppointments: number;

    // عدد حجوزات الشهر السابق
    previousMonthAppointments: number;

    // نسبة التغيير مقارنة بالشهر السابق
    growth: number;
}

/* ==========================================
    استجابة API للرسم البياني
========================================== */
export interface AppointmentChartResponse {
    // بيانات الرسم البياني
    results: AppointmentChartItem[];

    // إحصائيات إضافية تستخدم في الـ Footer
    statistics: AppointmentChartStatistics;
}
/* ============================================================
    Appointments
============================================================ */

/* ==========================================
    حالات الحجز
========================================== */
export type AppointmentStatusProps =
    | "pending"
    | "approved"
    | "rejected"
    | "cancelled";

/* ============================================================
    Doctor Departments
============================================================ */

/* ==========================================
    بيانات ربط طبيب بقسم
========================================== */
export interface AssignDoctorDepartmentPayload {
    doctor_id: number;
    depart_id: number;
}

/* ==========================================
    بيانات تعديل ربط طبيب بقسم
========================================== */
export interface UpdateDoctorDepartmentPayload {
    doctor_id: number;
    depart_id: number;
}

/* ==========================================
    بيانات القسم
========================================== */
export interface Department {
    depart_id: number;
    depart_name: string;
    path_image: string;
}

/* ==========================================
    بيانات الطبيب
========================================== */
export interface Doctor {
    doctor_id: number;
    full_name: string;
    email: string | null;
    phone_number: string | null;
    bio: string;
    education: string;
    gender: string;
    years_exper: number;
    consultation_fee: number;
    notes: string;
    status: string;
    is_hidden: boolean;
    path_image: string;
}

/* ==========================================
    بيانات ربط طبيب بقسم
========================================== */
export interface DoctorDepartment {
    doctor_deprtment_id: number;

    doctor: Doctor;

    department: Department;
}

/* ==========================================
    استجابة API لعنصر واحد
========================================== */
export interface DoctorDepartmentResponse {
    status: "success";
    message: string;

    results: DoctorDepartment;
}

/* ==========================================
    استجابة API للقائمة
========================================== */
export interface DoctorDepartmentsResponse {
    status: "success";
    message: string;

    pagination: {
        currentPage: number;
        limit: number;
        totalPages: number;
        totalItems: number;
    };

    results: DoctorDepartment[];
}

/* ============================================================
    Users
============================================================ */

/* ==========================================
    صلاحيات المستخدم
========================================== */
export interface RoleProps {
    role: "admin" | "reception" | "user";
}

/* ============================================================
    Advertisements
============================================================ */

/* ==========================================
    بيانات الإعلان
========================================== */
export interface Ad {
    // معرف الإعلان
    ad_id: number;

    // اسم ملف الصورة داخل التخزين
    path_image: string;

    // الرابط الكامل للصورة
    image_url: string;

    // تاريخ بداية الإعلان
    start_date: string;

    // تاريخ انتهاء الإعلان
    end_date: string;

    // حالة الإعلان
    status: "active" | "inactive";

    // تاريخ إنشاء الإعلان
    created_at: string;
}

export const SHIFT_TYPES = ["صباحية", "مسائية"] as const;