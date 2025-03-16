
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

const ProductsPage = () => {
  // بيانات المنتجات النموذجية - في التطبيق الحقيقي ستأتي من API
  const products = [
    { id: 1, name: "لابتوب HP", category: "إلكترونيات", price: 3500, stock: 15 },
    { id: 2, name: "سماعات بلوتوث", category: "إلكترونيات", price: 200, stock: 50 },
    { id: 3, name: "كرسي مكتب", category: "أثاث", price: 450, stock: 8 },
    { id: 4, name: "هاتف ذكي", category: "إلكترونيات", price: 2000, stock: 25 },
    { id: 5, name: "طاولة خشبية", category: "أثاث", price: 650, stock: 5 },
  ];

  return (
    <SidebarLayout>
      <div className="flex flex-col p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">المنتجات</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            إضافة منتج
          </Button>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableCaption>قائمة المنتجات المتوفرة</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">الرقم</TableHead>
                <TableHead className="text-right">اسم المنتج</TableHead>
                <TableHead className="text-right">التصنيف</TableHead>
                <TableHead className="text-right">السعر</TableHead>
                <TableHead className="text-right">المخزون</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.price} ر.س</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell className="flex space-x-2">
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

export default ProductsPage;
