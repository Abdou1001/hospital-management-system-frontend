# API Conventions

هذه الاتفاقيات مستخرجة من `api/` و`hooks/` كما هي في المشروع الحالي.

## API services

- توضع services في `api/<domain>.api.ts`، مثل `api/doctor.api.ts` و`api/ads.api.ts`.
- كل دالة تمثل endpoint أو عملية backend محددة.
- services تستورد instance باسم `api` من `@/lib/axios`.
- لا تحتوي service files على React hooks.

```ts
export async function getDoctors(params: DoctorFilters) {
  const {data} = await api.get("/doctors", {params})
  return data
}
```

## Axios

المصدر: `lib/axios.ts`.

```ts
export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
})
```

- `baseURL` يأتي من `NEXT_PUBLIC_API_URL`.
- `withCredentials: true` يرسل cookies مع الطلبات.
- لا يوجد interceptor ظاهر في instance الحالي.

## Query parameters

القوائم ترسل filters من خلال Axios `params`:

```ts
api.get("/ads", {params: filters})
```

تُعرّف أنواع وقيم filters الافتراضية في `types/filter.ts`. صفحات الإدارة تربطها بـ URL search params عبر `useTableFilters`، ثم تمررها إلى query hook.

## Mutations وFormData

- services تنفذ POST/PUT/PATCH/DELETE.
- الملفات تستخدم `FormData` عند إرسال الصور، مثل `createAd` و`updateDepartment`.
- بعض الصفحات تبني `FormData` قبل استدعاء mutation، خصوصًا workflow الطبيب؛ وبعض services تبنيه داخليًا.

```ts
const {data: response} = await api.post("/ads", formData, {
  headers: {"Content-Type": "multipart/form-data"},
})
return response
```

## العلاقة بين service وhook

الـ hook هو طبقة الاستهلاك لتطبيق React Query فوق service:

```text
api/doctor.api.ts: getDoctors(params)
  ↓
hooks/doctors/useDoctors.ts: useQuery(...)
  ↓
page.tsx: useDoctors(filters)
```

مثال query hook:

```ts
return useQuery({
  queryKey: ["doctors", params],
  queryFn: () => getDoctors(params),
})
```

مثال mutation hook:

```ts
return useMutation({
  mutationFn: createDoctor,
  onSuccess: ({message}) => {
    toast.success(message)
    queryClient.invalidateQueries({queryKey: ["doctors"]})
  },
})
```

## API responses

- services غالبًا تفكك `data` من Axios response ثم تعيده.
- موارد القوائم تستخدم عادة `data.results` و`data.pagination` في الصفحة.
- بعض schemas في `validation/` تصف response مثل `UsersResponse` و`AppointmentsResponse`.
- لا يوجد تحويل response موحد أو generic response wrapper واحد في المشروع؛ التعامل يتم حسب endpoint.

## أخطاء API

معالجة أخطاء mutations موجودة غالبًا في hooks عبر Sonner:

```ts
const errors = error.response?.data?.errors

if (errors?.length) {
  errors.forEach((err: any) => toast.error(err.message))
} else {
  toast.error(error.response?.data?.message ?? "...")
}
```

يوجد تفاوت: بعض hooks تستقبل `error: any` وتفحص `response.data.errors`، وبعضها يستقبل `error: Error` ويعرض `error.message`. صفحات queries لا تستخدم `isError` كنمط موحد؛ `AuthProvider` هو الاستخدام الصريح الأبرز له.
