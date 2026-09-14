# Frontend Architecture

هذا المستند يصف البنية الموجودة حاليًا في المشروع، ولا يفرض بنية بديلة.

## المسؤوليات

| المسار | المسؤولية المرصودة |
| --- | --- |
| `app/` | المسارات، الصفحات، layouts، route groups، مكونات dashboard القريبة من الصفحات. |
| `components/ui/` | مكونات shadcn/ui الأولية مثل `Button` و`Dialog` و`Table`. |
| `components/shared/` | مكونات مشتركة على مستوى التطبيق مثل `HeaderSection` و`ImageUpload` وsidebar. |
| `components/providers/` | مزود TanStack Query ومزامنة المستخدم الحالي مع Zustand. |
| `hooks/` | Custom hooks حسب المجال؛ تغليف `useQuery` و`useMutation` وسلوك النجاح/الفشل. |
| `api/` | دوال HTTP حسب المجال؛ تستخدم Axios ولا تحتوي على React hooks. |
| `store/` | Zustand؛ الموجود حاليًا هو حالة المصادقة. |
| `validation/` | Zod schemas للنماذج، وschemas/types لبعض استجابات API. |
| `lib/` | أدوات مشتركة، ومنها Axios instance. |
| `types/` | أنواع وقيم ثابتة مشتركة مثل filters وenums وبيانات dashboard. |

## تدفق البيانات

```text
Component / Page
  → Custom Hook
  → TanStack Query (useQuery أو useMutation)
  → API Service في api/
  → Axios instance في lib/axios.ts
  → Backend API
```

مثال حقيقي: `users/page.tsx` يستعمل `useUsers(filters)`، والـ hook يستدعي `getUsers(params)` من `api/user.api.ts`.

```ts
// hooks/users/useUsers.ts
return useQuery({
  queryKey: ["users", params],
  queryFn: () => getUsers(params),
})
```

## تدفق المصادقة

```text
Dashboard layout
  → AuthProvider
  → useCurrentUser
  → TanStack Query: GET /auth/me
  → Zustand auth store
  → useAuth
  → NavUser / ProfileForm / auth hooks
```

- `AuthProvider` ينتظر `useCurrentUser` ثم يستدعي `setUser(data)` أو `clearUser()`.
- `useAuth` يقدم واجهة مختصرة فوق `useAuthStore` مثل `user` و`isAuthenticated` و`isAdmin`.
- تسجيل الدخول: `useLogin` يستدعي API، يخزن `data.user` في Zustand، ثم ينتقل إلى `/dashboard`.
- تسجيل الخروج: `useLogout` يستدعي API، يمسح store، ثم ينتقل إلى `/login`.

## App Router وlayouts

المشروع يستخدم Next.js App Router:

```text
app/
├─ (auth)/login
└─ (dashboard)/dashboard
```

- `app/layout.tsx`: Cairo، لغة عربية وRTL، `QueryProvider`، و`Toaster`.
- `app/(auth)/layout.tsx`: تخطيط صفحة login.
- `app/(dashboard)/dashboard/layout.tsx`: `AuthProvider`، `AuthGuard`، sidebar، وdashboard shell.
- `[id]`: صفحات تفاصيل وتعديل ديناميكية؛ تقرأ `id` عبر `useParams` في client pages.

## الحماية

الحماية الفعالة للمسارات موجودة في `proxy.ts`:

- يقرأ Cookie باسم `token`.
- يتحقق من JWT باستخدام `jose` و`SECRET_KEY_JWT`.
- يعيد غير المسجل إلى `/login` عند محاولة الوصول إلى `/dashboard`.
- يمنع من لا يحمل role `admin` من dashboard.
- يمنع admin المسجل من الرجوع إلى `/login`.

`AuthGuard.tsx` موجود في dashboard layout، لكن منطق التحقق داخله معلّق حاليًا؛ لذلك لا يمثل حاجز الحماية الفعلي الآن.

## Client وServer Components

- الصفحات التفاعلية والجداول والنماذج والـ dialogs تحمل `"use client"` لأنها تستخدم hooks أو Router أو forms أو query state.
- layouts الأساسية و`loading.tsx` و`not-found.tsx` وبعض المكونات البسيطة لا تحملها.
- `QueryProvider` و`AuthProvider` هما client components ويُستخدمان من layouts.

## ملاحظات على الاستجابات

كثير من list responses يستخدم `results` و`pagination`، وتستهلكه صفحات القوائم بهذه الصيغة:

```tsx
<DataTable
  data={data?.results ?? []}
  pagination={data?.pagination}
  isLoading={isLoading}
/>
```

هناك تفاوت في typing وإرجاع البيانات بين services: بعضها يحدد `Promise<ResponseType>`، وبعضها يعيد `data` مباشرة، وبعض dashboard services تستخرج `results` قبل الإرجاع.
