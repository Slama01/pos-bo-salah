
import React, { useEffect, useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, BellOff, Settings, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CustomerDebt } from '@/contexts/DashboardContext';

interface Alert {
  id: number;
  type: 'inventory' | 'debt' | 'system';
  title: string;
  message: string;
  date: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

const AlertSystem = () => {
  const { products, customerDebts } = useApp();
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    // توليد تنبيهات المخزون
    const inventoryAlerts = products
      .filter(product => product.stock < 5)
      .map((product, index) => ({
        id: 100 + index,
        type: 'inventory' as const,
        title: 'تنبيه مخزون',
        message: `المنتج "${product.name}" قليل في المخزون (${product.stock} قطعة متبقية)`,
        date: new Date().toISOString(),
        read: false,
        priority: product.stock <= 2 ? 'high' as const : 'medium' as const
      }));

    // توليد تنبيهات الديون
    const debtAlerts = customerDebts
      .filter(debt => debt.status !== 'مدفوع بالكامل' && new Date(debt.dueDate) < new Date())
      .map((debt, index) => ({
        id: 200 + index,
        type: 'debt' as const,
        title: 'دين مستحق',
        message: `الدين المستحق للعميل "${debt.customerName}" بقيمة ${debt.amount} ₪ تجاوز تاريخ الاستحقاق`,
        date: new Date().toISOString(),
        read: false,
        priority: 'high' as const
      }));

    setAlerts([...inventoryAlerts, ...debtAlerts]);
  }, [products, customerDebts]);

  const markAsRead = (id: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, read: true } : alert
    ));
    
    toast({
      title: "تم تحديث التنبيه",
      description: "تم تعيين التنبيه كمقروء",
    });
  };

  const markAllAsRead = () => {
    setAlerts(alerts.map(alert => ({ ...alert, read: true })));
    
    toast({
      title: "تم تحديث التنبيهات",
      description: "تم تعيين جميع التنبيهات كمقروءة",
    });
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    
    toast({
      title: "تم تحديث الإعدادات",
      description: notificationsEnabled ? "تم إيقاف التنبيهات" : "تم تفعيل التنبيهات",
    });
  };

  const getPriorityBadge = (priority: Alert['priority']) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">عالي</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500">متوسط</Badge>;
      case 'low':
        return <Badge variant="outline">منخفض</Badge>;
      default:
        return null;
    }
  };

  const unreadCount = alerts.filter(alert => !alert.read).length;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>التنبيهات والإشعارات</CardTitle>
          <CardDescription>
            آخر التنبيهات والإشعارات المهمة للنظام
          </CardDescription>
        </div>
        <div className="flex space-x-2 gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleNotifications}
          >
            {notificationsEnabled ? <BellOff className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {unreadCount > 0 && (
          <div className="mb-4 p-2 bg-yellow-50 border border-yellow-200 rounded-md text-center">
            <span className="text-sm font-medium text-yellow-800">
              لديك {unreadCount} تنبيه جديد
            </span>
          </div>
        )}
        
        <div className="space-y-4">
          {alerts.length === 0 ? (
            <div className="text-center p-6 text-muted-foreground">
              لا توجد تنبيهات جديدة
            </div>
          ) : (
            alerts.map(alert => (
              <div
                key={alert.id}
                className={`border p-4 rounded-md ${
                  !alert.read ? 'bg-slate-50' : ''
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2 gap-2">
                      <h4 className="font-semibold">{alert.title}</h4>
                      {getPriorityBadge(alert.priority)}
                      {!alert.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <p className="mt-1 text-sm">{alert.message}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {new Date(alert.date).toLocaleString('ar-SA')}
                    </p>
                  </div>
                  {!alert.read && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => markAsRead(alert.id)}
                    >
                      تعيين كمقروء
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertSystem;
