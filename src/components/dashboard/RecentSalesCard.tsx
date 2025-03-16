
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';

const RecentSalesCard = () => {
  // بيانات عمليات البيع الأخيرة (سيتم استبدالها بالبيانات الفعلية)
  const recentSales = [
    {
      id: 1,
      customer: "أحمد محمد",
      email: "ahmed@example.com",
      amount: "١٢٠٠ ر.س",
      date: "منذ ٥ دقائق",
    },
    {
      id: 2,
      customer: "سارة عبدالله",
      email: "sara@example.com",
      amount: "٨٥٠ ر.س",
      date: "منذ ٢٠ دقيقة",
    },
    {
      id: 3,
      customer: "محمد سالم",
      email: "mohd@example.com",
      amount: "٣٣٠ ر.س",
      date: "منذ ساعة",
    },
    {
      id: 4,
      customer: "نورة خالد",
      email: "noura@example.com",
      amount: "١٦٥٠ ر.س",
      date: "منذ ساعتين",
    },
    {
      id: 5,
      customer: "فهد العتيبي",
      email: "fahad@example.com",
      amount: "٧٢٠ ر.س",
      date: "منذ ٣ ساعات",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>أحدث المبيعات</CardTitle>
        <CardDescription>تم إجراء ٥ مبيعات اليوم</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {recentSales.map((sale) => (
            <div key={sale.id} className="flex items-center">
              <Avatar className="h-9 w-9 border">
                <div className="flex h-full items-center justify-center bg-primary text-white text-sm font-medium">
                  {sale.customer.charAt(0)}
                </div>
              </Avatar>
              <div className="mr-4 space-y-1">
                <p className="text-sm font-medium leading-none">{sale.customer}</p>
                <p className="text-sm text-muted-foreground">{sale.email}</p>
              </div>
              <div className="mr-auto flex flex-col items-end">
                <span className="font-medium">{sale.amount}</span>
                <span className="text-xs text-muted-foreground">{sale.date}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentSalesCard;
