# Frontend Agent Instructions

استخدم البنية والأنماط الحالية كما هي. راجع `docs/reference-patterns.md` قبل تنفيذ حالة مشابهة، و`docs/architecture.md` لفهم المسؤوليات.

## Architecture

- التدفق القائم: Component/Page → Hook → TanStack Query → `api/` service → Axios → Backend.
- لا تستدع Axios من صفحات أو components؛ استخدم service ثم custom hook، باستثناء النمط القائم لـ `useCurrentUser`.
- لا تغيّر architecture أو تضف مكتبات دون إذن صريح.
- ابحث أولًا عن implementation مماثل وأعد استخدامه بدل إنشاء duplicate logic.

## Folder responsibilities

- `app/`: routes, pages, layouts، ومكونات dashboard أو route-local.
- `components/ui/`: shadcn primitives.
- `components/shared/`: shared application components.
- `hooks/<domain>/`: query/mutation hooks حسب المورد.
- `api/<domain>.api.ts`: HTTP services فقط.
- `validation/<domain>/schemas/`: Zod schemas/types.
- `store/`: Zustand؛ الاستخدام الحالي للمصادقة.
- `lib/axios.ts`: Axios instance الموحد.
- `types/`: filters, enums, وأنواع مشتركة.

## Naming

- API: `<domain>.api.ts`.
- Hooks: تبدأ بـ `use`: `use<Resource>s`, `useOne<Resource>`, `useCreate<Resource>`, `useUpdate<Resource>`, `useDelete<Resource>` أو `useToggle/Change...` بحسب العملية القائمة.
- Schemas: `<purpose>.schema.ts`.
- حافظ على اسم ونمط الملف القريب المماثل؛ يوجد تفاوت حالي بين PascalCase وcamelCase في أسماء ملفات components.

## Query وMutation

- ضع `useQuery` و`useMutation` في custom hooks.
- استعمل query keys بنفس resource keys القائمة؛ للقائمة عادة `["resource", filters]` وللتفاصيل `["resource", id]`.
- mutation hooks الموجودة تعرض toast وتبطل query keys ذات العلاقة؛ اتبع هذا عندما يكون هناك pattern مماثل.
- استخدم `isLoading` للـ skeleton/loading view و`isPending` لتعطيل submit controls حسب الأمثلة القائمة.
- أخطاء mutation تعالج عادة داخل hook عبر Sonner وresponse errors/message. لا تفترض وجود نمط موحد لأخطاء queries.

## API

- استخدم Axios instance من `@/lib/axios`؛ لا تنشئ instance جديدة.
- أرسل filters عبر `{params}`.
- اتبع نمط resource القائم للـ response typing أو `FormData`؛ المشروع غير موحد كليًا بين domains.

## Forms وZod

- استخدم React Hook Form مع `zodResolver` وschema من `validation/` عند وجود form pattern مماثل.
- استخدم shadcn `FormField`, `FormControl`, `FormMessage` للحقول حسب النماذج الحالية.
- للنماذج create/edit القابلة للمشاركة، ارجع إلى `DepartmentForm` و`AdvertisementForm` قبل إنشاء مكون جديد.
- استخدم `ImageUpload` مع `File` وFormData لحالات الصور القائمة.

## Auth وcomponents

- لا تغيّر تدفق auth أو حماية routes دون إذن. الحماية الفعالة الحالية في `proxy.ts`؛ `AuthGuard` لا يطبق تحققًا فعليًا حاليًا.
- استخدم `useAuth` لقراءة حالة المستخدم من Zustand داخل الواجهة.
- أضف `"use client"` عندما يحتاج الملف hooks أو Query أو Zustand أو forms أو client navigation؛ لا تضفه بلا حاجة عندما يتبع المثال القائم غير العميل.
- أعد استخدام `components/ui/` و`components/shared/` قبل إنشاء primitive أو shared component جديد.

## Scope

- لا تنقل تفاصيل hospital/domain-specific إلى قواعد عامة لمورد جديد.
- عند وجود تفاوت في المشروع، وثّقه واتبع أقرب implementation مماثل بدل فرض توحيد جديد.
