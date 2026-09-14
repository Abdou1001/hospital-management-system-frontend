# Coding Conventions

هذا وصف للأنماط والتفاوتات الموجودة، وليس قائمة قواعد مصطنعة.

## التنظيم والتسمية

| العنصر | النمط المرصود |
| --- | --- |
| API file | `api/<domain>.api.ts` |
| Hook | يبدأ بـ `use` مثل `useDoctors` و`useCreateDoctor` |
| Schema | `<purpose>.schema.ts` تحت `validation/<domain>/schemas/` |
| UI primitive | `components/ui/` |
| shared component | `components/shared/` |
| dashboard component | `app/(dashboard)/dashboard/components/` |
| صفحة محلية | `_components/` بجانب route عند الحاجة |
| dynamic route | `[id]` |

المكونات المصدرة غالبًا PascalCase مثل `DataTable` و`DepartmentForm`. توجد ملفات بأسماء PascalCase وأخرى camel/lowercase مثل `navMain.tsx` و`advertisementsToolbar.tsx`؛ لا يوجد توحيد كامل في أسماء الملفات.

## Components

- المكونات العامة تتلقى props ولا تعرف تفاصيل API، مثل `DataTable` و`ImageUpload`.
- المكونات الخاصة بالمورد تعيش قرب dashboard أو route الخاص بها، مثل columns وactions وdialogs.
- الصفحات تجمع hooks والمكونات وتقرر navigation أو loading shell.
- يتم استخدام aliases مثل `@/components/...` و`@/hooks/...` بدل المسارات النسبية غالبًا، مع وجود imports نسبية في مكونات route القريبة.

## Client وServer Components

- أضف `"use client"` عندما يحتاج الملف React hooks أو TanStack Query أو React Hook Form أو Zustand أو Next client navigation.
- تظل layouts والمكونات التي لا تحتاج تلك السلوكيات بدون directive عندما تكون كذلك في المشروع.

## Hooks وTanStack Query

- query hooks تغلف `useQuery` وتستدعي service من `api/`.
- mutation hooks تغلف `useMutation`، وتحتوي عادة toast و`invalidateQueries`.
- المفتاح يبدأ باسم المورد، ثم المدخلات إن وجدت: `["ads", filters]` أو `["doctor", id]`.
- المورد المفرد يستخدم أحيانًا `enabled: !!id`.
- بعد تعديل مورد، يتم إبطال list key، ثم detail key عند وجوده.

## Zustand

- الاستخدام الموجود حاليًا مخصص للمصادقة في `store/auth.store.ts`.
- `useAuth` هو الواجهة التي تستهلك store في المكونات والـ auth hooks.
- store يحتفظ بـ `user` و`isLoading` وعمليات `setUser` و`setLoading` و`clearUser`.

## Forms وZod

- schemas في `validation/` تُعرّف بواسطة Zod.
- type النموذج يستنتج بـ `z.infer<typeof schema>`.
- النماذج تستعمل `useForm` مع `zodResolver(schema)`.
- حقول الواجهة تستعمل مكونات shadcn: `Form`, `FormField`, `FormItem`, `FormControl`, `FormMessage`.
- create/edit forms العامة تقبل عادة `defaultValues`, `loading`, `mode`, `onSubmit`.
- الصور تستخدم `ImageUpload` و`File`، ثم تتحول إلى `FormData` في service أو page.

## Loading وerrors

- queries تعرض Skeleton أو spinner عبر `isLoading`.
- mutations تعطل inputs/buttons أو تمرر `loading={mutation.isPending}`.
- نجاح وفشل mutation يظهر غالبًا عبر `toast` داخل hook.
- لا يوجد شكل واحد موحد لعرض أخطاء query في الصفحات الحالية.

## Styling وUI

- UI primitives مأخوذة من shadcn/ui وتعيش محليًا في `components/ui/`.
- Tailwind v4 وshadcn CSS variables في `app/globals.css`.
- التطبيق عربي RTL على root layout، مع `dir="ltr"` لحقول محددة عند الحاجة.
