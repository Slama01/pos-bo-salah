
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  BarChart3, 
  Users, 
  Package, 
  ShoppingCart, 
  Settings, 
  ListChecks,
  Receipt, 
  Bell
} from 'lucide-react';
import SidebarLayout from '@/components/layouts/SidebarLayout';
import StatCard from '@/components/dashboard/StatCard';
import RecentSalesCard from '@/components/dashboard/RecentSalesCard';
import InventoryAlertCard from '@/components/dashboard/InventoryAlertCard';

const Index = () => {
  const { toast } = useToast();

  // سيتم استبدال هذه البيانات بالبيانات الفعلية من قاعدة البيانات
  const stats = [
    { title: "إجمالي المبيعات اليوم", value: "٤٣٢٠ ر.س", icon: <ShoppingCart className="text-blue-500" />, change: "+12%" },
    { title: "إجمالي العملاء", value: "١٢٤", icon: <Users className="text-green-500" />, change: "+3%" },
    { title: "المنتجات", value: "٨٩", icon: <Package className="text-purple-500" />, change: "0%" },
    { title: "إنذارات المخزون", value: "٥", icon: <Bell className="text-red-500" />, change: "-2" },
  ];

  return (
    <SidebarLayout>
      <div className="flex flex-col p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">لوحة التحكم</h1>
          <Tabs defaultValue="daily" className="w-[300px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="daily">يومي</TabsTrigger>
              <TabsTrigger value="weekly">أسبوعي</TabsTrigger>
              <TabsTrigger value="monthly">شهري</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* بطاقات الإحصائيات */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard 
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              change={stat.change}
            />
          ))}
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {/* إحصائيات المبيعات */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>تحليل المبيعات</CardTitle>
              <CardDescription>مقارنة المبيعات خلال الفترة الحالية</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                {/* هنا يمكن إضافة رسم بياني باستخدام recharts */}
                <div className="flex h-full items-center justify-center border border-dashed rounded-md">
                  <p className="text-muted-foreground text-sm">سيتم إضافة الرسم البياني هنا</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* أحدث المبيعات */}
          <RecentSalesCard />
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          {/* إنذارات المخزون */}
          <InventoryAlertCard />

          {/* أداء المنتجات */}
          <Card>
            <CardHeader>
              <CardTitle>أداء المنتجات الأفضل</CardTitle>
              <CardDescription>المنتجات الأكثر مبيعاً</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <div className="flex h-full items-center justify-center border border-dashed rounded-md">
                  <p className="text-muted-foreground text-sm">سيتم إضافة مخطط أداء المنتجات هنا</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Index;
