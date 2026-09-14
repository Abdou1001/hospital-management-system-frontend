# Frontend Analysis

هذا هو التحليل المرجعي للمشروع كما هو عند وقت التوثيق. لا يحوّل التقنيات تلقائيًا إلى قواعد لكل مشروع جديد.

## MUST FOLLOW

### الطبقات وتدفق البيانات

النمط المتكرر هو:

```text
Component / Page → Hook → TanStack Query → API Service → Axios → Backend API
```

الصفحات تستهلك custom hooks بدل استدعاء Axios مباشرة. مثال: `users/page.tsx` → `useUsers.ts` → `user.api.ts`. الاستثناء الموجود هو `useCurrentUser.ts` الذي يعرف طلب `/auth/me` داخل hook.

### API بحسب المجال

توجد services في `api/` بحسب domain: auth، users، doctors، departments، appointments، ads، hospital، dashboard، doctor-departments، doctor-schedules. تستخدم جميعها instance من `lib/axios.ts`.

### Query وMutation hooks

تعيش hooks في `hooks/<domain>/`. Query keys تبدأ باسم المورد مثل `["ads", filters]` و`["doctor", id]`. mutation hooks تنفذ toast ثم تبطل cache keys المناسبة. راجع `hooks/ads/useUpdateAd.ts` و`hooks/doctors/useUpdateDoctor.ts`.

### القوائم والفلاتر

صفحات users/doctors/departments/appointments/advertisements تتبع نمط: constants من `types/filter.ts` → `useTableFilters` → URL search params → query hook → `DataTable`. الجدول العام في `components/table/DataTable.tsx` ضمن dashboard، بينما columns/actions/badges مرتبطة بالمورد.

### النماذج

React Hook Form مع Zod و`zodResolver` هو نمط النماذج. schemas في `validation/<domain>/schemas/` والأنواع تستنتج بـ `z.infer`. يستخدم العرض مكونات shadcn Form. نماذج Department وAdvertisement تعيد استخدام نفس component للإنشاء والتعديل عبر `mode`, `defaultValues`, `imageUrl`, `loading`, `onSubmit`.

### حالات الواجهة

- `isLoading`: Skeleton أو spinner.
- `isPending`: تعطيل الحقول/الأزرار وعرض loading feedback.
- نجاح وفشل mutations: Sonner toast داخل hook عادة.
- أخطاء queries: لا توجد واجهة موحدة؛ AuthProvider يفحص `isError` صراحة.

### المصادقة والحماية

Root layout يوفر QueryProvider وToaster. Dashboard layout يوفر AuthProvider وsidebar. AuthProvider يجلب المستخدم بواسطة `useCurrentUser` ثم يزامنه مع Zustand. الحماية الفعالة في `proxy.ts` بالاعتماد على JWT cookie وrole `admin`; AuthGuard موجود لكن منطق التحقق فيه معلّق.

### UI واللغة

المشروع يستخدم shadcn/ui محليًا في `components/ui/`، Tailwind v4 وCSS variables في `app/globals.css`، وخط Cairo و`lang="ar" dir="rtl"` في root layout.

## REFERENCE PATTERNS

| Pattern | متى يُستخدم | المثال الحقيقي |
| --- | --- | --- |
| List query | جلب قائمة مع filters | `hooks/doctors/useDoctors.ts` |
| Detail query | جلب عنصر بالـ id | `hooks/ads/useOneAd.ts` |
| Mutation + invalidation | تعديل مورد وإعادة جلب القائمة/التفاصيل | `hooks/ads/useUpdateAd.ts` |
| URL filters | جداول قابلة للبحث والـ pagination | `hooks/shared/useTableFilters.ts` |
| Generic table | عرض rows/columns/pagination/loading | `components/table/DataTable.tsx` |
| Reusable create/edit form | مورد له حقول مشتركة في الإنشاء والتعديل | `components/forms/DepartmentForm.tsx` |
| Image input | اختيار صورة وإرجاع File | `components/shared/image-upload/image-upload.tsx` |
| Dynamic page | تفاصيل أو تعديل عنصر | `appointments/[id]/page.tsx` |
| Zod response | typing بيانات المورد والاستجابة | `validation/appointments/schemas/appointment.schema.ts` |
| Auth hydration | جلب المستخدم وحفظه محليًا | `components/providers/AuthProvider.tsx` |

## PROJECT-SPECIFIC

- domains الطبية: الأطباء، الأقسام، الحجوزات، جداول الدوام، ربط الطبيب بالقسم، المستشفى، الإعلانات، المستخدمون.
- dashboard: بطاقات إحصائية للحجوزات ورسم شهري في `components/AppointmentsChart.tsx`.
- workflow الطبيب: صفحة التعديل تنسق بيانات الطبيب والأقسام والجداول ضمن عملية واحدة في `doctors/[id]/edit/page.tsx`.
- filters الخاصة بالحجوزات تشمل حالة الحجز وجنس المريض واليوم والتاريخ والمدى الزمني.
- صلاحية dashboard الحالية هي `admin` فقط.
- `next.config.ts` يسمح بصور من Supabase hostname محدد؛ هذا إعداد المشروع الحالي.

## التفاوتات الموثقة

- ملفات المكونات ليست موحدة بالكامل بين PascalCase وcamel/lowercase.
- typing في services ليس موحدًا بالكامل: بعض الدوال ترجع `Promise<T>` وبعضها يعيد `data` بلا annotation وبعضها يستخرج `results`.
- بناء FormData يقع أحيانًا في API service وأحيانًا في الصفحة.
- error typing في mutations متفاوت بين `any` و`Error`.
- `AuthProvider` مستورد في auth layout لكنه غير موضوع داخل JSX حاليًا.
- `AuthGuard` يمرر children فقط بسبب تعليق منطق التحقق.
