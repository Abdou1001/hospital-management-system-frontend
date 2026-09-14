import {Metadata} from "next";
import Link from "next/link";
import {
    Building2,
    CalendarCheck2,
    UserCheck,
    Megaphone,
    ShieldCheck,
    Clock,
    Activity,
    ArrowLeft,
    LogIn,
} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
    title: "من نحن | مستشفى التعاون",
    description: "تعرف على مستشفى التعاون ونظام إدارة الخدمات الطبية والحجوزات والأطباء والإعلانات.",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col justify-between selection:bg-zinc-900 selection:text-white">
            {/* Header Navigation */}
            <header className="border-b border-zinc-200 bg-white/80 backdrop-blur-md sticky top-0 z-30">
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="size-10 rounded-lg bg-zinc-900 text-white flex items-center justify-center">
                            <Building2 className="size-5" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold leading-tight">مستشفى التعاون</h1>
                            <p className="text-xs text-zinc-500">نظام الإدارة والرعاية الصحية</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link href="/terms">
                            <Button variant="ghost" size="sm" className="text-zinc-600 hover:text-black">
                                سياسة الاستخدام
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button size="sm" className="gap-2 bg-zinc-900 hover:bg-zinc-800 text-white">
                                <LogIn className="size-4" />
                                <span>تسجيل الدخول</span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <main className="flex-1 max-w-6xl mx-auto px-4 py-12 w-full space-y-12">
                <section className="text-center space-y-4 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-800 border border-zinc-300">
                        <Activity className="size-3.5" />
                        <span>رؤية متطورة للرعاية الصحية</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
                        نحن مستشفى التعاون
                    </h2>
                    <p className="text-zinc-600 text-base sm:text-lg leading-relaxed">
                        صرح طبي متكامل يهدف إلى تقديم أرقى خدمات الرعاية الصحية عبر بيئة علاجية متطورة وكوادر طبية متميزة، مدعومة بمنظومة رقمية شاملة لإدارة كافة العمليات التشغيلية والخدمات الطبية بكفاءة وسرعة.
                    </p>
                </section>

                {/* Core Modules Grid */}
                <section className="space-y-6">
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-zinc-900">ركائز النظام الطبي المتكامل</h3>
                        <p className="text-sm text-zinc-500 mt-1">
                            نظام متطور تم تصميمه لربط كافة مرافق المستشفى وتسهيل تجربة المرضى والكوادر الطبية
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Appointments */}
                        <Card className="border border-zinc-200 shadow-sm hover:shadow-md transition-shadow bg-white">
                            <CardHeader>
                                <div className="size-10 rounded-md bg-zinc-100 flex items-center justify-center text-zinc-900 mb-2">
                                    <CalendarCheck2 className="size-5" />
                                </div>
                                <CardTitle className="text-lg">إدارة الحجوزات والمواعيد</CardTitle>
                                <CardDescription className="text-zinc-500">
                                    تنظيم المواعيد بدقة وسلاسة
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-zinc-600 leading-relaxed">
                                    نظام جدولة ذكي يُتيح تنظيم مواعيد العيادات والاستشارات الطبية بدقة متناهية، مما يضمن تقليص فترات الانتظار، وتحقيق أعلى معايير الانسيابية في استقبال المراجعين.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Doctors */}
                        <Card className="border border-zinc-200 shadow-sm hover:shadow-md transition-shadow bg-white">
                            <CardHeader>
                                <div className="size-10 rounded-md bg-zinc-100 flex items-center justify-center text-zinc-900 mb-2">
                                    <UserCheck className="size-5" />
                                </div>
                                <CardTitle className="text-lg">إدارة الأطباء والعيادات</CardTitle>
                                <CardDescription className="text-zinc-500">
                                    متابعة الكادر الطبي والتخصصات
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-zinc-600 leading-relaxed">
                                    ملفات مهنية متكاملة للأطباء والاستشاريين، وإدارة جداول مناوباتهم وتخصصاتهم الطبية، بما يكفل التنسيق الفعّال بين الأقسام وتقديم رعاية صحية فورية وموثوقة.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Advertisements & Announcements */}
                        <Card className="border border-zinc-200 shadow-sm hover:shadow-md transition-shadow bg-white">
                            <CardHeader>
                                <div className="size-10 rounded-md bg-zinc-100 flex items-center justify-center text-zinc-900 mb-2">
                                    <Megaphone className="size-5" />
                                </div>
                                <CardTitle className="text-lg">الإعلانات والتوعية الطبية</CardTitle>
                                <CardDescription className="text-zinc-500">
                                    مركز إعلامي وتوعوي مباشر
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-zinc-600 leading-relaxed">
                                    إدارة مركزية للإعلانات والتعاميم الداخلية والإرشادات الصحية الموجهة للمراجعين والعاملين، لنشر المستجدات الطبية والخدمات الجديدة أولاً بأول.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Hospital Departments */}
                        <Card className="border border-zinc-200 shadow-sm hover:shadow-md transition-shadow bg-white">
                            <CardHeader>
                                <div className="size-10 rounded-md bg-zinc-100 flex items-center justify-center text-zinc-900 mb-2">
                                    <Building2 className="size-5" />
                                </div>
                                <CardTitle className="text-lg">الأقسام والخدمات التخصصية</CardTitle>
                                <CardDescription className="text-zinc-500">
                                    تكامل الخدمات العلاجية والتشخيصية
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-zinc-600 leading-relaxed">
                                    تنسيق إلكتروني متكامل يربط مختلف الأقسام الطبية والإدارية، لضمان استمرارية الخدمة وسرعة انتقال المريض بين مراحل الفحص والتشخيص والعلاج.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Security & Confidentiality */}
                        <Card className="border border-zinc-200 shadow-sm hover:shadow-md transition-shadow bg-white">
                            <CardHeader>
                                <div className="size-10 rounded-md bg-zinc-100 flex items-center justify-center text-zinc-900 mb-2">
                                    <ShieldCheck className="size-5" />
                                </div>
                                <CardTitle className="text-lg">السرية وحماية البيانات</CardTitle>
                                <CardDescription className="text-zinc-500">
                                    أمان المعلومات الطبية والشخصية
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-zinc-600 leading-relaxed">
                                    تطبيق أحدث البروتوكولات الأمنية لحماية السجلات الطبية والبيانات الحساسة لمرضانا وموظفينا، مع رقابة دقيقة على صلاحيات الوصول.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Fast Support */}
                        <Card className="border border-zinc-200 shadow-sm hover:shadow-md transition-shadow bg-white">
                            <CardHeader>
                                <div className="size-10 rounded-md bg-zinc-100 flex items-center justify-center text-zinc-900 mb-2">
                                    <Clock className="size-5" />
                                </div>
                                <CardTitle className="text-lg">الدقة وسرعة الاستجابة</CardTitle>
                                <CardDescription className="text-zinc-500">
                                    خدمة متواصلة على مدار الساعة
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-zinc-600 leading-relaxed">
                                    نظام مصمم للعمل بأداء عالٍ على مدار الساعة لضمان استجابة سريعة لاحتياجات المراجعين وتيسير المهام الطبية دون تأخير.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Values Banner */}
                <section className="bg-zinc-900 text-white rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-2 text-center md:text-right">
                        <h3 className="text-2xl font-bold">هدفنا: رعاية طبية ترتقي لتطلعاتكم</h3>
                        <p className="text-zinc-300 text-sm max-w-xl leading-relaxed">
                            يسخر مستشفى التعاون خبراته الطبية وإمكانياته التقنية لتقديم تجربة علاجية إنسانية مريحة ترتكز على الجودة والاهتمام بكل مراجع.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <Link href="/login">
                            <Button variant="secondary" className="bg-white text-zinc-950 hover:bg-zinc-100 gap-2">
                                <span>الدخول إلى النظام</span>
                                <ArrowLeft className="size-4" />
                            </Button>
                        </Link>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-zinc-200 bg-white py-6">
                <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
                    <p>© جميع الحقوق محفوظة - مستشفى التعاون</p>
                    <div className="flex items-center gap-4">
                        <Link href="/about" className="hover:text-black font-medium transition-colors">
                            من نحن
                        </Link>
                        <span>•</span>
                        <Link href="/terms" className="hover:text-black font-medium transition-colors">
                            سياسة الاستخدام
                        </Link>
                        <span>•</span>
                        <Link href="/login" className="hover:text-black font-medium transition-colors">
                            تسجيل الدخول
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
