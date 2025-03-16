
import React from 'react';
import SidebarLayout from '@/components/layouts/SidebarLayout';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const SalesPage = () => {
  // بيانات المبيعات النموذجية - في التطبيق الحقيقي ستأتي من API
  const sales = [
    { id: 1, date: "2023-10-15", customer: "أحمد محمد", total: 4500, items: 3, status: "مكتملة" },
    { id: 2, date: "2023-10-14", customer: "سارة علي", total: 2700, items: 5, status: "مكتملة" },
    { id: 3, date: "2023-10-13", customer: "محمد خالد", total: 1200, items: 2, status: "معلقة" },
    { id: 4, date: "2023-10-12", customer: "فاطمة عمر", total: 3450, items: 4, status: "مكتملة" },
    { id: 5, date: "2023-10-10", customer: "خالد سعيد", total: 800, items: 1, status: "ملغية" },
  ];

  return (
    <SidebarLayout>
      <div className="flex flex-col p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">المبيعات</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            إضافة عملية بيع
          </Button>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableCaption>سجل عمليات البيع</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">رقم العملية</TableHead>
                <TableHead className="text-right">التاريخ</TableHead>
                <TableHead className="text-right">العميل</TableHead>
                <TableHead className="text-right">إجمالي المبلغ</TableHead>
                <TableHead className="text-right">عدد المنتجات</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="font-medium">{sale.id}</TableCell>
                  <TableCell>{sale.date}</TableCell>
                  <TableCell>{sale.customer}</TableCell>
                  <TableCell>{sale.total} ر.س</TableCell>
                  <TableCell>{sale.items}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      sale.status === "مكتملة" ? "bg-green-100 text-green-800" :
                      sale.status === "معلقة" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {sale.status}
                    </span>
                  </TableCell>
                  <TableCell className="flex space-x-2">
                    <Button variant="outline" size="sm">عرض</Button>
                    <Button variant="outline" size="sm">تعديل</Button>
                    <Button variant="destructive" size="sm">حذف</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default SalesPage;
