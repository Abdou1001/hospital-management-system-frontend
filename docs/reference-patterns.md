# Reference Patterns

هذه أمثلة موجودة فعليًا لاستخدامها كمرجع عند وجود حالة مشابهة.

## Component → Hook → Query → API

**متى يظهر:** صفحات القوائم.

**المرجع:** `app/(dashboard)/dashboard/users/page.tsx`, `hooks/users/useUsers.ts`, `api/user.api.ts`.

```text
UsersPage → useUsers(filters) → useQuery → getUsers(filters) → Axios GET /users
```

## Query hook

**المرجع:** `hooks/doctors/useDoctors.ts`.

```ts
export function useOneDoctor(id: number) {
  return useQuery({
    queryKey: ["doctor", id],
    queryFn: () => getOneDoctor(id),
    enabled: !!id,
  })
}
```

## Mutation hook وquery invalidation

**المرجع:** `hooks/ads/useUpdateAd.ts`.

بعد التعديل، يبطل hook query القائمة `ads` وquery العنصر `ad, id` ثم يعرض toast.

## Table filters → URL → Query → DataTable

**المرجع:** `hooks/shared/useTableFilters.ts` و`app/(dashboard)/dashboard/doctors/page.tsx`.

```text
DOCTOR_FILTERS
  → useTableFilters
  → search params + router.replace
  → useDoctors(filters)
  → DataTable(data.results, data.pagination)
```

## Generic DataTable + resource columns/actions

**المرجع:** `components/table/DataTable.tsx` داخل dashboard، و`components/table/columns/doctorColumns.tsx`.

- `DataTable<TData, TValue>` يستقبل `columns`, `data`, `isLoading`, `pagination`, `onPageChange`.
- columns/actions/badges تعرف المورد وتبقى منفصلة عن الجدول العام.

## React Hook Form + Zod

**المرجع:** `app/(auth)/login/page.tsx` و`validation/auth/schemas/login.schema.ts`.

```ts
const form = useForm<LoginSchema>({
  resolver: zodResolver(loginSchema),
  defaultValues: {login: "", password: ""},
})
```

## Create/Edit reusable form

**المرجع:** `components/forms/DepartmentForm.tsx` مع صفحات departments create/edit.

النموذج يأخذ `mode`, `defaultValues`, `imageUrl`, `loading`, و`onSubmit`; الصفحة تملك mutation والتنقل.

## ImageUpload + FormData

**المرجع:** `components/shared/image-upload/image-upload.tsx` و`api/ads.api.ts`.

`ImageUpload` يعيد `File | null`، وتبني service `FormData` عند POST/PUT للصور.

## Skeleton loading وmutation pending

**المراجع:** `components/table/DataTableSkeleton.tsx`, `components/DashboardSkeleton.tsx`, `dashboard/hospital/page.tsx`.

- `isLoading` يعرض skeleton.
- `mutation.isPending` يعطل عناصر الإدخال/الحفظ ويعرض مؤشّر تحميل أو نصًا بديلًا.

## Toast داخل mutation hooks

**المرجع:** `hooks/departments/useCreateDepartment.ts`.

الـ hook يعرض success toast عند النجاح، ويقرأ `response.data.errors` أو `response.data.message` عند الخطأ.

## Authentication flow

**المراجع:** `hooks/auth/useLogin.ts`, `hooks/auth/useLogout.ts`, `app/(auth)/login/page.tsx`.

```text
Login form → useLogin mutation → POST /auth/login
  → Zustand setUser(data.user) → toast → /dashboard
```

## AuthProvider + useCurrentUser + Zustand

**المراجع:** `components/providers/AuthProvider.tsx`, `hooks/auth/useCurrentUser.ts`, `store/auth.store.ts`.

`AuthProvider` يجلب `/auth/me` باستخدام query ثم يحدّث store؛ `useAuth` هو واجهة الاستهلاك.

## Protected routes

**المرجع:** `proxy.ts`.

يتحقق proxy من cookie/JWT قبل dashboard ويقارن `payload.role` بـ `admin`. `AuthGuard.tsx` موجود لكن منطق التحقق فيه معلّق حاليًا.

## Axios with credentials

**المرجع:** `lib/axios.ts`.

```ts
axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
})
```

## Dynamic routes

**المرجع:** `app/(dashboard)/dashboard/appointments/[id]/page.tsx`.

تستخدم الصفحة `useParams()` وتحول `params.id` إلى رقم ثم تستدعي query hook. تعرض Skeleton ثم حالة عدم وجود بيانات.

## Zod response schemas

**المراجع:** `validation/appointments/schemas/appointment.schema.ts`, `validation/users/schemas/user.schema.ts`.

تعرّف schemas بيانات المورد، response wrapper، وأنواع TypeScript المستنتجة مثل `AppointmentsResponse` و`UsersResponse`.
