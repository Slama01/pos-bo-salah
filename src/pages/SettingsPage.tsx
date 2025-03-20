
import React from 'react';
import SidebarLayout from '@/components/layouts/SidebarLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DemoModeSettings } from '@/components/settings/DemoModeSettings';
import { UserManagement } from '@/components/settings/UserManagement';
import AutoBackupSettings from '@/components/settings/AutoBackupSettings';
import LanguageSettings from '@/components/settings/LanguageSettings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Settings, 
  CreditCard, 
  BellRing, 
  Lock, 
  Building, 
  Globe, 
  Phone, 
  Mail, 
  ChevronLeft,
  HardDrive,
  Languages,
  Printer
} from 'lucide-react';

const SettingsPage = () => {
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSaveGeneralSettings = () => {
    toast({
      title: "تم حفظ الإعدادات",
      description: "تم حفظ الإعدادات العامة بنجاح",
    });
  };

  const handleSaveCompanySettings = () => {
    toast({
      title: "تم حفظ البيانات",
      description: "تم حفظ بيانات الشركة بنجاح",
    });
  };

  return (
    <SidebarLayout>
      <div className="flex flex-col p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">{t('settings')}</h1>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid grid-cols-7 w-full mb-6">
            <TabsTrigger value="general" className="flex items-center">
              <Settings className="ml-2 h-4 w-4" />
              <span>عام</span>
            </TabsTrigger>
            <TabsTrigger value="company" className="flex items-center">
              <Building className="ml-2 h-4 w-4" />
              <span>الشركة</span>
            </TabsTrigger>
            <TabsTrigger value="language" className="flex items-center">
              <Languages className="ml-2 h-4 w-4" />
              <span>اللغة</span>
            </TabsTrigger>
            <TabsTrigger value="backup" className="flex items-center">
              <HardDrive className="ml-2 h-4 w-4" />
              <span>النسخ الاحتياطي</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center">
              <CreditCard className="ml-2 h-4 w-4" />
              <span>الفوترة</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <BellRing className="ml-2 h-4 w-4" />
              <span>الإشعارات</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center">
              <Lock className="ml-2 h-4 w-4" />
              <span>المستخدمين</span>
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>الإعدادات العامة</CardTitle>
                <CardDescription>
                  ضبط الإعدادات العامة للنظام
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="language">اللغة</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center p-3 border rounded-md cursor-pointer bg-gray-100">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white border">
                        <span className="text-lg">ع</span>
                      </div>
                      <div className="mx-4">
                        <p className="font-medium">العربية</p>
                        <p className="text-sm text-muted-foreground">اللغة الافتراضية</p>
                      </div>
                      <div className="mr-auto">
                        <ChevronLeft className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="flex items-center p-3 border rounded-md cursor-pointer">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white border">
                        <span className="text-lg">EN</span>
                      </div>
                      <div className="mx-4">
                        <p className="font-medium">English</p>
                        <p className="text-sm text-muted-foreground">Alternative language</p>
                      </div>
                      <div className="mr-auto">
                        <ChevronLeft className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">المنطقة الزمنية</Label>
                  <select 
                    id="timezone" 
                    className="w-full border rounded-md p-2"
                  >
                    <option value="Asia/Jerusalem">(GMT+02:00) القدس</option>
                    <option value="Asia/Amman">(GMT+03:00) عمّان</option>
                    <option value="Asia/Riyadh">(GMT+03:00) الرياض</option>
                    <option value="Asia/Dubai">(GMT+04:00) دبي</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">الوضع الليلي</Label>
                    <p className="text-sm text-muted-foreground">
                      تفعيل المظهر الداكن للنظام
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">تصدير البيانات تلقائياً</Label>
                    <p className="text-sm text-muted-foreground">
                      تصدير البيانات تلقائياً في نهاية كل يوم
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
              <div className="p-6 pt-0">
                <Button onClick={handleSaveGeneralSettings}>
                  حفظ الإعدادات
                </Button>
              </div>
            </Card>

            <DemoModeSettings />
          </TabsContent>

          {/* Company Settings */}
          <TabsContent value="company" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>بيانات الشركة</CardTitle>
                <CardDescription>
                  تظهر هذه البيانات على الفواتير والتقارير
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">اسم الشركة</Label>
                  <Input id="company-name" placeholder="أدخل اسم الشركة" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tax-number">الرقم الضريبي</Label>
                  <Input id="tax-number" placeholder="أدخل الرقم الضريبي" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <div className="flex">
                      <Phone className="h-5 w-5 mr-2 self-center text-muted-foreground" />
                      <Input id="phone" placeholder="أدخل رقم الهاتف" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <div className="flex">
                      <Mail className="h-5 w-5 mr-2 self-center text-muted-foreground" />
                      <Input id="email" type="email" placeholder="example@company.com" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website">الموقع الإلكتروني</Label>
                    <div className="flex">
                      <Globe className="h-5 w-5 mr-2 self-center text-muted-foreground" />
                      <Input id="website" placeholder="www.example.com" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">العنوان</Label>
                    <Input id="address" placeholder="أدخل عنوان الشركة" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logo">شعار الشركة</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-md bg-gray-100 flex items-center justify-center border">
                      <span className="text-muted-foreground">الشعار</span>
                    </div>
                    <Button variant="outline">تحميل شعار</Button>
                  </div>
                </div>
              </CardContent>
              <div className="p-6 pt-0">
                <Button onClick={handleSaveCompanySettings}>
                  حفظ البيانات
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Language Settings */}
          <TabsContent value="language" className="space-y-6">
            <LanguageSettings />
          </TabsContent>

          {/* Backup Settings */}
          <TabsContent value="backup" className="space-y-6">
            <AutoBackupSettings />
          </TabsContent>

          {/* Billing Settings */}
          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات الفوترة</CardTitle>
                <CardDescription>
                  إدارة خطة الاشتراك وبيانات الدفع
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">الخطة الحالية: الخطة الاحترافية</h3>
                      <p className="text-sm text-muted-foreground">
                        تجديد تلقائي في 15 يناير 2024
                      </p>
                    </div>
                    <Button variant="outline">تغيير الخطة</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">طرق الدفع</h3>
                  <div className="rounded-lg border p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <div className="rounded-full bg-gray-200 h-10 w-10 flex items-center justify-center">
                          <CreditCard className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm">بطاقة إئتمان تنتهي بـ 4242</p>
                          <p className="text-xs text-muted-foreground">تنتهي في 12/2026</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">تعديل</Button>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-2">
                    إضافة طريقة دفع جديدة
                  </Button>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">الفواتير السابقة</h3>
                  <div className="rounded-md border">
                    <div className="py-3 px-4 border-b flex justify-between">
                      <div>
                        <p className="font-medium">ديسمبر 2023</p>
                        <p className="text-sm text-muted-foreground">INV-2023-001</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs ml-2">مدفوعة</span>
                        <Button variant="outline" size="sm">عرض</Button>
                      </div>
                    </div>
                    <div className="py-3 px-4 border-b flex justify-between">
                      <div>
                        <p className="font-medium">نوفمبر 2023</p>
                        <p className="text-sm text-muted-foreground">INV-2023-002</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs ml-2">مدفوعة</span>
                        <Button variant="outline" size="sm">عرض</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات الإشعارات</CardTitle>
                <CardDescription>
                  تخصيص الإشعارات التي تريد تلقيها
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">إشعارات المبيعات</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">عمليات البيع الجديدة</Label>
                        <p className="text-sm text-muted-foreground">
                          إشعار عند إتمام عملية بيع جديدة
                        </p>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">إلغاء عمليات البيع</Label>
                        <p className="text-sm text-muted-foreground">
                          إشعار عند إلغاء عملية بيع
                        </p>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                  </div>

                  <h3 className="font-medium">إشعارات المخزون</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">منتجات قاربت على النفاذ</Label>
                        <p className="text-sm text-muted-foreground">
                          إشعار عندما يقل المخزون عن الحد الأدنى
                        </p>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">منتجات نفذت من المخزون</Label>
                        <p className="text-sm text-muted-foreground">
                          إشعار عندما ينفذ منتج من المخزون
                        </p>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                  </div>

                  <h3 className="font-medium">إشعارات العملاء</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">عملاء جدد</Label>
                        <p className="text-sm text-muted-foreground">
                          إشعار عند إضافة عميل جديد
                        </p>
                      </div>
                      <Switch defaultChecked={false} />
                    </div>
                  </div>
                </div>
              </CardContent>
              <div className="p-6 pt-0">
                <Button>
                  حفظ إعدادات الإشعارات
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Users Management */}
          <TabsContent value="users" className="space-y-6">
            <UserManagement />
          </TabsContent>
        </Tabs>
      </div>
    </SidebarLayout>
  );
};

export default SettingsPage;
