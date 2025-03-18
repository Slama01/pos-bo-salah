
import React, { useState } from 'react';
import SidebarLayout from '@/components/layouts/SidebarLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const SettingsPage = () => {
  const { toast } = useToast();
  const [trialEnabled, setTrialEnabled] = useState(false);
  const [trialDays, setTrialDays] = useState("14");
  const [currency, setCurrency] = useState("ILS");
  const [taxRate, setTaxRate] = useState("17");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  const handleSaveGeneralSettings = () => {
    toast({
      title: "تم الحفظ",
      description: "تم حفظ الإعدادات العامة بنجاح",
    });
  };
  
  const handleSaveBillingSettings = () => {
    toast({
      title: "تم الحفظ",
      description: "تم حفظ إعدادات الفوترة بنجاح",
    });
  };
  
  const handleSaveNotificationSettings = () => {
    toast({
      title: "تم الحفظ",
      description: "تم حفظ إعدادات الإشعارات بنجاح",
    });
  };
  
  const handleTrialToggle = (checked: boolean) => {
    setTrialEnabled(checked);
    if (checked) {
      toast({
        title: "تم تفعيل النسخة التجريبية",
        description: `تم تفعيل النسخة التجريبية لمدة ${trialDays} يوم`,
      });
    } else {
      toast({
        title: "تم تعطيل النسخة التجريبية",
        description: "تم تعطيل النسخة التجريبية للنظام",
      });
    }
  };

  return (
    <SidebarLayout>
      <div className="flex flex-col p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">الإعدادات</h1>
        </div>
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">عام</TabsTrigger>
            <TabsTrigger value="billing">الفوترة</TabsTrigger>
            <TabsTrigger value="notifications">الإشعارات</TabsTrigger>
            <TabsTrigger value="permissions">الصلاحيات</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>الإعدادات العامة</CardTitle>
                <CardDescription>
                  قم بتعديل الإعدادات العامة للنظام
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="store-name">اسم المتجر</Label>
                    <Input id="store-name" placeholder="اسم المتجر الخاص بك" defaultValue="متجر العربي" />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="currency">العملة</Label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="اختر العملة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ILS">شيكل إسرائيلي (₪)</SelectItem>
                        <SelectItem value="USD">دولار أمريكي ($)</SelectItem>
                        <SelectItem value="EUR">يورو (€)</SelectItem>
                        <SelectItem value="JOD">دينار أردني (د.أ)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dark-mode">الوضع المظلم</Label>
                      <p className="text-sm text-muted-foreground">تفعيل وضع الألوان الداكنة</p>
                    </div>
                    <Switch id="dark-mode" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveGeneralSettings}>حفظ الإعدادات</Button>
              </CardFooter>
            </Card>
            
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>النسخة التجريبية</CardTitle>
                <CardDescription>
                  إعدادات النسخة التجريبية للعملاء
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="trial-enabled">تفعيل النسخة التجريبية</Label>
                    <p className="text-sm text-muted-foreground">السماح للعملاء بتجربة النظام قبل الشراء</p>
                  </div>
                  <Switch 
                    id="trial-enabled" 
                    checked={trialEnabled} 
                    onCheckedChange={handleTrialToggle} 
                  />
                </div>
                
                {trialEnabled && (
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="trial-days">مدة النسخة التجريبية (بالأيام)</Label>
                    <Input 
                      id="trial-days" 
                      type="number" 
                      value={trialDays} 
                      onChange={(e) => setTrialDays(e.target.value)} 
                      min="1" 
                      max="90" 
                    />
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button disabled={!trialEnabled} onClick={() => toast({
                  title: "تم الحفظ",
                  description: `تم تحديث إعدادات النسخة التجريبية بنجاح`,
                })}>
                  حفظ إعدادات النسخة التجريبية
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات الفوترة</CardTitle>
                <CardDescription>
                  قم بتعديل إعدادات الفوترة والضرائب
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="tax-rate">نسبة الضريبة (%)</Label>
                  <Input 
                    id="tax-rate" 
                    type="number" 
                    value={taxRate} 
                    onChange={(e) => setTaxRate(e.target.value)} 
                    min="0" 
                    max="100" 
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label htmlFor="invoice-prefix">بادئة رقم الفاتورة</Label>
                  <Input id="invoice-prefix" defaultValue="INV-" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-invoice">إنشاء فاتورة تلقائياً</Label>
                    <p className="text-sm text-muted-foreground">إنشاء فاتورة تلقائياً عند إتمام عملية البيع</p>
                  </div>
                  <Switch id="auto-invoice" defaultChecked />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveBillingSettings}>حفظ إعدادات الفوترة</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات الإشعارات</CardTitle>
                <CardDescription>
                  قم بتعديل تفضيلات الإشعارات
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifications-enabled">تفعيل الإشعارات</Label>
                    <p className="text-sm text-muted-foreground">إظهار إشعارات النظام</p>
                  </div>
                  <Switch 
                    id="notifications-enabled" 
                    checked={notificationsEnabled} 
                    onCheckedChange={setNotificationsEnabled} 
                  />
                </div>
                
                {notificationsEnabled && (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sales-notifications">إشعارات المبيعات</Label>
                        <p className="text-sm text-muted-foreground">إشعارات عند إتمام عملية بيع جديدة</p>
                      </div>
                      <Switch id="sales-notifications" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="inventory-notifications">إشعارات المخزون</Label>
                        <p className="text-sm text-muted-foreground">إشعارات عند انخفاض المخزون</p>
                      </div>
                      <Switch id="inventory-notifications" defaultChecked />
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveNotificationSettings} disabled={!notificationsEnabled}>
                  حفظ إعدادات الإشعارات
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="permissions">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات الصلاحيات</CardTitle>
                <CardDescription>
                  قم بإدارة صلاحيات المستخدمين
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="default-role">الدور الافتراضي للمستخدمين الجدد</Label>
                    <Select defaultValue="user">
                      <SelectTrigger id="default-role">
                        <SelectValue placeholder="اختر الدور الافتراضي" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">مدير</SelectItem>
                        <SelectItem value="manager">مشرف</SelectItem>
                        <SelectItem value="user">مستخدم</SelectItem>
                        <SelectItem value="guest">ضيف</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="rounded-md border p-4">
                    <h3 className="font-medium mb-2">أدوار المستخدمين</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>مدير</span>
                        <span className="text-sm text-muted-foreground">وصول كامل لجميع الميزات</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>مشرف</span>
                        <span className="text-sm text-muted-foreground">وصول للمبيعات والمخزون والتقارير</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>مستخدم</span>
                        <span className="text-sm text-muted-foreground">وصول للمبيعات فقط</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>ضيف</span>
                        <span className="text-sm text-muted-foreground">وصول للعرض فقط</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>حفظ إعدادات الصلاحيات</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarLayout>
  );
};

export default SettingsPage;
