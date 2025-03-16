
import React from 'react';
import SidebarLayout from '@/components/layouts/SidebarLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const SettingsPage = () => {
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
              <CardContent className="space-y-2">
                <div className="rounded-md border p-6 text-center">
                  <p className="text-muted-foreground">سيتم إضافة إعدادات المتجر وخيارات العملة هنا</p>
                </div>
              </CardContent>
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
              <CardContent className="space-y-2">
                <div className="rounded-md border p-6 text-center">
                  <p className="text-muted-foreground">سيتم إضافة إعدادات الضرائب والفوترة هنا</p>
                </div>
              </CardContent>
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
              <CardContent className="space-y-2">
                <div className="rounded-md border p-6 text-center">
                  <p className="text-muted-foreground">سيتم إضافة إعدادات الإشعارات هنا</p>
                </div>
              </CardContent>
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
              <CardContent className="space-y-2">
                <div className="rounded-md border p-6 text-center">
                  <p className="text-muted-foreground">سيتم إضافة إعدادات إدارة الصلاحيات هنا</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarLayout>
  );
};

export default SettingsPage;
