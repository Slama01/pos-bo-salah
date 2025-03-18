
import React, { useState } from 'react';
import SidebarLayout from '@/components/layouts/SidebarLayout';
import { Button } from '@/components/ui/button';
import { Bell, Check, Trash2, AlertCircle, Package, User, ShoppingCart, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Alert {
  id: number;
  title: string;
  message: string;
  type: 'inventory' | 'customer' | 'sales' | 'system';
  date: string;
  read: boolean;
  icon: JSX.Element;
}

const AlertsPage = () => {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 1,
      title: "انخفاض مخزون المنتج",
      message: "منتج «لابتوب HP» وصل للحد الأدنى في المخزون (3 قطع متبقية)",
      type: "inventory",
      date: "منذ 15 دقيقة",
      read: false,
      icon: <Package className="h-5 w-5 text-orange-500" />
    },
    {
      id: 2,
      title: "عميل جديد تم تسجيله",
      message: "تم تسجيل عميل جديد باسم «محمد علي» في النظام",
      type: "customer",
      date: "منذ 1 ساعة",
      read: false,
      icon: <User className="h-5 w-5 text-blue-500" />
    },
    {
      id: 3,
      title: "منتج نفذ من المخزون",
      message: "منتج «سماعات بلوتوث» نفذ من المخزون بالكامل",
      type: "inventory",
      date: "منذ 2 ساعة",
      read: false,
      icon: <AlertCircle className="h-5 w-5 text-red-500" />
    },
    {
      id: 4,
      title: "عملية بيع جديدة",
      message: "تمت عملية بيع جديدة بقيمة 3500 ₪ للعميل «شركة الأمل»",
      type: "sales",
      date: "منذ 3 ساعات",
      read: true,
      icon: <ShoppingCart className="h-5 w-5 text-green-500" />
    },
    {
      id: 5,
      title: "تحديث النظام",
      message: "تم تحديث النظام إلى الإصدار 2.5.0 بنجاح",
      type: "system",
      date: "منذ يوم واحد",
      read: true,
      icon: <Clock className="h-5 w-5 text-purple-500" />
    },
  ]);

  const handleMarkAllAsRead = () => {
    setAlerts(alerts.map(alert => ({ ...alert, read: true })));
    toast({
      title: "تم تعيين جميع التنبيهات كمقروءة",
      description: "تم وضع علامة على جميع التنبيهات كمقروءة",
    });
  };

  const handleClearAll = () => {
    setAlerts([]);
    toast({
      title: "تم مسح جميع التنبيهات",
      description: "تم حذف جميع التنبيهات من قائمة التنبيهات الخاصة بك",
    });
  };

  const handleMarkAsRead = (id: number) => {
    setAlerts(
      alerts.map(alert => 
        alert.id === id ? { ...alert, read: true } : alert
      )
    );
  };

  const handleDeleteAlert = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const totalUnread = alerts.filter(alert => !alert.read).length;
  
  // تصنيف التنبيهات حسب نوعها لمعرفة عدد كل نوع
  const inventoryAlerts = alerts.filter(alert => alert.type === 'inventory');
  const customerAlerts = alerts.filter(alert => alert.type === 'customer');
  const salesAlerts = alerts.filter(alert => alert.type === 'sales');
  const systemAlerts = alerts.filter(alert => alert.type === 'system');

  return (
    <SidebarLayout>
      <div className="flex flex-col p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">التنبيهات</h1>
            <p className="text-muted-foreground">
              {totalUnread > 0 ? `لديك ${totalUnread} تنبيهات غير مقروءة` : 'ليس لديك تنبيهات غير مقروءة'}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleMarkAllAsRead} className="ml-2">
              <Check className="ml-2 h-4 w-4" />
              تعيين الكل كمقروء
            </Button>
            <Button variant="destructive" onClick={handleClearAll}>
              <Trash2 className="ml-2 h-4 w-4" />
              مسح الكل
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">جميع التنبيهات</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{alerts.length}</div>
              <p className="text-xs text-muted-foreground">{totalUnread} غير مقروءة</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">تنبيهات المخزون</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inventoryAlerts.length}</div>
              <p className="text-xs text-muted-foreground">
                {inventoryAlerts.filter(a => !a.read).length} غير مقروءة
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">تنبيهات العملاء</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customerAlerts.length}</div>
              <p className="text-xs text-muted-foreground">
                {customerAlerts.filter(a => !a.read).length} غير مقروءة
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">تنبيهات المبيعات</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{salesAlerts.length}</div>
              <p className="text-xs text-muted-foreground">
                {salesAlerts.filter(a => !a.read).length} غير مقروءة
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-5 w-full max-w-md">
            <TabsTrigger value="all">الكل ({alerts.length})</TabsTrigger>
            <TabsTrigger value="inventory">المخزون ({inventoryAlerts.length})</TabsTrigger>
            <TabsTrigger value="customers">العملاء ({customerAlerts.length})</TabsTrigger>
            <TabsTrigger value="sales">المبيعات ({salesAlerts.length})</TabsTrigger>
            <TabsTrigger value="system">النظام ({systemAlerts.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="space-y-4">
              {alerts.length > 0 ? (
                alerts.map((alert) => (
                  <Card key={alert.id} className={`${!alert.read ? 'border-l-4 border-l-blue-500' : ''}`}>
                    <CardHeader className="flex flex-row items-start justify-between p-4">
                      <div className="flex space-x-4 items-start">
                        <div className="mt-0.5 ml-2">{alert.icon}</div>
                        <div>
                          <CardTitle className="text-base">{alert.title}</CardTitle>
                          <CardDescription className="mt-1">{alert.message}</CardDescription>
                          <div className="flex mt-2 items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {alert.date}
                            </Badge>
                            {!alert.read && (
                              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs">
                                جديد
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {!alert.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMarkAsRead(alert.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteAlert(alert.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                ))
              ) : (
                <div className="text-center p-8 border rounded-md">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">لا توجد تنبيهات</h3>
                  <p className="text-muted-foreground mt-2">
                    ستظهر هنا التنبيهات الجديدة عندما تصل
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="inventory" className="mt-6">
            <div className="space-y-4">
              {inventoryAlerts.length > 0 ? (
                inventoryAlerts.map((alert) => (
                  <Card key={alert.id} className={`${!alert.read ? 'border-l-4 border-l-blue-500' : ''}`}>
                    <CardHeader className="flex flex-row items-start justify-between p-4">
                      <div className="flex space-x-4 items-start">
                        <div className="mt-0.5 ml-2">{alert.icon}</div>
                        <div>
                          <CardTitle className="text-base">{alert.title}</CardTitle>
                          <CardDescription className="mt-1">{alert.message}</CardDescription>
                          <Badge variant="outline" className="mt-2 text-xs">
                            {alert.date}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {!alert.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMarkAsRead(alert.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteAlert(alert.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                ))
              ) : (
                <div className="text-center p-8 border rounded-md">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">لا توجد تنبيهات للمخزون</h3>
                  <p className="text-muted-foreground mt-2">
                    ستظهر هنا تنبيهات المخزون عندما تصل
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* نفس الهيكل للتبويبات الأخرى */}
          <TabsContent value="customers" className="mt-6">
            <div className="space-y-4">
              {customerAlerts.length > 0 ? (
                customerAlerts.map((alert) => (
                  <Card key={alert.id} className={`${!alert.read ? 'border-l-4 border-l-blue-500' : ''}`}>
                    {/* محتوى مشابه للتنبيهات الأخرى */}
                    <CardHeader className="flex flex-row items-start justify-between p-4">
                      <div className="flex space-x-4 items-start">
                        <div className="mt-0.5 ml-2">{alert.icon}</div>
                        <div>
                          <CardTitle className="text-base">{alert.title}</CardTitle>
                          <CardDescription className="mt-1">{alert.message}</CardDescription>
                          <Badge variant="outline" className="mt-2 text-xs">
                            {alert.date}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {!alert.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMarkAsRead(alert.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteAlert(alert.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                ))
              ) : (
                <div className="text-center p-8 border rounded-md">
                  <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">لا توجد تنبيهات للعملاء</h3>
                  <p className="text-muted-foreground mt-2">
                    ستظهر هنا تنبيهات العملاء عندما تصل
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="sales" className="mt-6">
            <div className="space-y-4">
              {salesAlerts.length > 0 ? (
                salesAlerts.map((alert) => (
                  <Card key={alert.id} className={`${!alert.read ? 'border-l-4 border-l-blue-500' : ''}`}>
                    {/* محتوى مشابه للتنبيهات الأخرى */}
                    <CardHeader className="flex flex-row items-start justify-between p-4">
                      <div className="flex space-x-4 items-start">
                        <div className="mt-0.5 ml-2">{alert.icon}</div>
                        <div>
                          <CardTitle className="text-base">{alert.title}</CardTitle>
                          <CardDescription className="mt-1">{alert.message}</CardDescription>
                          <Badge variant="outline" className="mt-2 text-xs">
                            {alert.date}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {!alert.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMarkAsRead(alert.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteAlert(alert.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                ))
              ) : (
                <div className="text-center p-8 border rounded-md">
                  <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">لا توجد تنبيهات للمبيعات</h3>
                  <p className="text-muted-foreground mt-2">
                    ستظهر هنا تنبيهات المبيعات عندما تصل
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="system" className="mt-6">
            <div className="space-y-4">
              {systemAlerts.length > 0 ? (
                systemAlerts.map((alert) => (
                  <Card key={alert.id} className={`${!alert.read ? 'border-l-4 border-l-blue-500' : ''}`}>
                    {/* محتوى مشابه للتنبيهات الأخرى */}
                    <CardHeader className="flex flex-row items-start justify-between p-4">
                      <div className="flex space-x-4 items-start">
                        <div className="mt-0.5 ml-2">{alert.icon}</div>
                        <div>
                          <CardTitle className="text-base">{alert.title}</CardTitle>
                          <CardDescription className="mt-1">{alert.message}</CardDescription>
                          <Badge variant="outline" className="mt-2 text-xs">
                            {alert.date}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {!alert.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMarkAsRead(alert.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteAlert(alert.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                ))
              ) : (
                <div className="text-center p-8 border rounded-md">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">لا توجد تنبيهات للنظام</h3>
                  <p className="text-muted-foreground mt-2">
                    ستظهر هنا تنبيهات النظام عندما تصل
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarLayout>
  );
};

export default AlertsPage;
