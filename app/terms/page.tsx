import {Metadata} from "next";
import Link from "next/link";
import {
    Building2,
    ShieldCheck,
    FileText,
    CheckCircle2,
    Calendar,
    Lock,
    HelpCircle,
    ArrowLeft,
    LogIn,
} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
    title: "سياسة الاستخدام | مستشفى التعاون",
    description: "الشروط العامة وسياسة استخدام نظام مستشفى التعاون لحجز المواعيد والخدمات الطبية.",
};

export default function TermsPage() {
    const terms = [
        {
            icon: CheckCircle2,
            title: "١. القبول والموافقة العامة",
            content:
                "باستخدامك لنظام مستشفى التعاون أو الاستفادة من خدماته الإلكترونية، فإنك توافق التام على الالتزام بجميع البنود والإرشادات الموضحة في هذه السياسة، والتي تهدف إلى ضمان سير العمل بأعلى مستويات التنظيم والكفاءة.",
        },
        {
            icon: Calendar,
            title: "٢. حجز المواعيد وصحة البيانات",
            content:
                "يلتزم المراجع بتقديم معلومات صحيحة ودقيقة عند حجز أي موعد طبي (كالاسم، ورقم الهاتف، والبيانات الشخصية). تساعد دقة المعلومات في ضمان التواصل السليم وتقديم الرعاية الطبية المناسبة في وقتها دون تعارض.",
        },
        {
            icon: Lock,
            title: "٣. الخصوصية وسرية المعلومات الطبية",
            content:
                "نحن نولي خصوصيتك وسرية بياناتك الطبية أهمية قصوى. لا يتم الاطلاع على سجلك الطبي أو مشاركته إلا من قبل الكادر الطبي والإداري المصرح له قانونياً لغايات التشخيص والعلاج فقط.",
        },
        {
            icon: FileText,
            title: "٤. تنظيم المواعيد والإلغاء",
            content:
                "نرجو من جميع المراجعين الكرام الحضور قبل موعد العيادة بوقت كافٍ. وفي حال تعذر الحضور، يُرجى إلغاء الموعد أو تعديله في أقرب وقت متاح لإتاحة الفرصة لمراجعين آخرين بحاجة للرعاية.",
        },
        {
            icon: ShieldCheck,
            title: "٥. الاستخدام العادل والآمن للمنصة",
            content:
                "يُمنع استخدام النظام بأي شكل يهدف إلى تعطيل خدماته أو محاولة الوصول غير المصرح به لقواعد البيانات أو حسابات الآخرين. يلتزم المستخدم بالحفاظ على سرية بيانات تسجيل دخوله في حال تم تزويده بها.",
        },
        {
            icon: HelpCircle,
            title: "٦. التحديثات والتواصل معنا",
            content:
                "تحتفظ إدارة مستشفى التعاون بالحق في تحديث شروط وسياسة الاستخدام بما يتوافق مع الأنظمة الطبية وتطوير الخدمات. لأي استفسار أو مساعدة، يمكنكم دائماً التوجه لمكتب الاستقبال أو التواصل مع قسم الدعم.",
        },
    ];

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
                        <Link href="/about">
                            <Button variant="ghost" size="sm" className="text-zinc-600 hover:text-black">
                                من نحن
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

            {/* Main Content */}
            <main className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full space-y-10">
                {/* Intro Heading */}
                <section className="text-center space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-800 border border-zinc-300">
                        <FileText className="size-3.5" />
                        <span>الشروط والضوابط العامة</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
                        سياسة الاستخدام
                    </h2>
                    <p className="text-zinc-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                        دليل واضح ومبسط يوضح قواعد استخدام النظام وحقوق المراجعين والتزاماتهم لضمان تقديم أفضل تجربة علاجية وتنظيمية.
                    </p>
                </section>

                {/* Terms List Cards */}
                <section className="space-y-4">
                    {terms.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                            <Card key={index} className="border border-zinc-200 shadow-sm bg-white hover:border-zinc-300 transition-colors">
                                <CardHeader className="pb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="size-9 rounded-md bg-zinc-100 flex items-center justify-center text-zinc-900 shrink-0">
                                            <IconComponent className="size-4" />
                                        </div>
                                        <CardTitle className="text-base sm:text-lg font-bold text-zinc-900">
                                            {item.title}
                                        </CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-zinc-600 text-sm sm:text-base leading-relaxed pr-12">
                                        {item.content}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </section>

                {/* Quick Info Box */}
                <section className="bg-zinc-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="space-y-1 text-center sm:text-right">
                        <h3 className="text-lg font-bold">هل لديك أي استفسار حول سياسة الاستخدام؟</h3>
                        <p className="text-zinc-400 text-sm">
                            فريق مستشفى التعاون مستعد للإجابة على كافة أسئلتكم ومساعدتكم.
                        </p>
                    </div>
                    <Link href="/about">
                        <Button variant="secondary" className="bg-white text-zinc-950 hover:bg-zinc-100 gap-2 shrink-0">
                            <span>تعرف علينا أكثر</span>
                            <ArrowLeft className="size-4" />
                        </Button>
                    </Link>
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
