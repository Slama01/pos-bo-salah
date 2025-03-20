
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  ShoppingCart, 
  Package, 
  Users, 
  ClipboardList, 
  Settings as SettingsIcon,
  HelpCircle,
  Download
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const UserManual = () => {
  const { toast } = useToast();

  const handleDownloadManual = () => {
    toast({
      title: "جاري التحميل",
      description: "جاري تحميل دليل المستخدم بصيغة PDF",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>دليل المستخدم</CardTitle>
            <CardDescription>
              دليل شامل لاستخدام نظام إدارة المبيعات
            </CardDescription>
          </div>
          <Button onClick={handleDownloadManual} variant="outline">
            <Download className="ml-2 h-4 w-4" />
            تحميل PDF
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="intro">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="intro" className="flex items-center">
              <HelpCircle className="ml-2 h-4 w-4" />
              <span>مقدمة</span>
            </TabsTrigger>
            <TabsTrigger value="sales" className="flex items-center">
              <ShoppingCart className="ml-2 h-4 w-4" />
              <span>المبيعات</span>
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center">
              <Package className="ml-2 h-4 w-4" />
              <span>المخزون</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center">
              <SettingsIcon className="ml-2 h-4 w-4" />
              <span>الإعدادات</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="intro" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">نظرة عامة على النظام</h3>
              <p>نظام إدارة المبيعات هو تطبيق شامل يساعدك على إدارة المنتجات والمبيعات والعملاء والمخزون وغيرها من الوظائف المهمة لإدارة الأعمال التجارية.</p>
              
              <h3 className="text-lg font-medium">الميزات الرئيسية</h3>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>إدارة كاملة للمنتجات والمخزون</li>
                <li>تسجيل عمليات البيع ومتابعتها</li>
                <li>إدارة قاعدة بيانات العملاء</li>
                <li>إنشاء وطباعة الفواتير</li>
                <li>متابعة الديون وعمليات الدفع</li>
                <li>تقارير إحصائية للمبيعات والأرباح</li>
                <li>نظام التنبيهات للمخزون والديون</li>
                <li>نسخ احتياطي تلقائي للبيانات</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="sales" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">إدارة المبيعات</h3>
              <p>يمكنك إدارة عمليات البيع من خلال صفحة المبيعات، حيث يمكنك:</p>
              
              <h4 className="font-medium mt-4">إضافة عملية بيع جديدة</h4>
              <ol className="list-decimal list-inside space-y-2 mr-4">
                <li>انتقل إلى صفحة المبيعات</li>
                <li>انقر على زر "بيع جديد"</li>
                <li>اختر العميل أو أضف عميل جديد</li>
                <li>أضف المنتجات إلى سلة المبيعات</li>
                <li>حدد طريقة الدفع (نقدي أو آجل)</li>
                <li>أكمل عملية البيع</li>
              </ol>
              
              <h4 className="font-medium mt-4">عرض سجل المبيعات</h4>
              <p>يمكنك عرض سجل المبيعات السابقة وتصفيتها حسب التاريخ أو العميل أو الحالة.</p>
              
              <h4 className="font-medium mt-4">إدارة الفواتير</h4>
              <p>يمكنك طباعة الفواتير أو تصديرها بصيغة PDF أو إرسالها بالبريد الإلكتروني للعملاء مباشرة من صفحة المبيعات أو الفواتير.</p>
            </div>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">إدارة المخزون</h3>
              <p>تتيح لك هذه الوحدة إدارة المنتجات والمخزون بشكل فعال:</p>
              
              <h4 className="font-medium mt-4">إضافة منتجات جديدة</h4>
              <ol className="list-decimal list-inside space-y-2 mr-4">
                <li>انتقل إلى صفحة المنتجات</li>
                <li>انقر على زر "إضافة منتج جديد"</li>
                <li>أدخل معلومات المنتج (الاسم، السعر، الكمية، إلخ)</li>
                <li>انقر على "حفظ" لإضافة المنتج</li>
              </ol>
              
              <h4 className="font-medium mt-4">مراقبة المخزون</h4>
              <p>يقوم النظام تلقائياً بتحديث كميات المخزون بعد كل عملية بيع، كما يوفر تنبيهات للمنتجات التي قاربت على النفاد.</p>
              
              <h4 className="font-medium mt-4">إعادة تعبئة المخزون</h4>
              <p>عندما يصل المنتج إلى الحد الأدنى المحدد، يمكنك تسجيل عملية إعادة تعبئة من خلال:</p>
              <ol className="list-decimal list-inside space-y-2 mr-4">
                <li>الانتقال إلى صفحة المنتجات</li>
                <li>تحديد المنتج المراد إعادة تعبئته</li>
                <li>النقر على "تعديل" وتحديث الكمية</li>
                <li>حفظ التغييرات</li>
              </ol>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">إعدادات النظام</h3>
              <p>يمكنك تخصيص النظام وفقًا لاحتياجاتك من خلال صفحة الإعدادات:</p>
              
              <h4 className="font-medium mt-4">إعدادات الشركة</h4>
              <p>إضافة معلومات الشركة التي ستظهر على الفواتير والتقارير:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>اسم الشركة</li>
                <li>الرقم الضريبي</li>
                <li>العنوان ومعلومات الاتصال</li>
                <li>شعار الشركة</li>
              </ul>
              
              <h4 className="font-medium mt-4">النسخ الاحتياطي</h4>
              <p>يمكنك إعداد النسخ الاحتياطي التلقائي للبيانات وتحديد التكرار ومسار الحفظ.</p>
              
              <h4 className="font-medium mt-4">تعدد اللغات</h4>
              <p>يدعم النظام اللغة العربية والإنجليزية، ويمكنك التبديل بينهما من الإعدادات.</p>
              
              <h4 className="font-medium mt-4">إدارة المستخدمين</h4>
              <p>للمشرفين، يمكن إضافة وإدارة حسابات المستخدمين وتحديد صلاحياتهم في النظام.</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UserManual;
