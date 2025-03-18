
import React from 'react';
import SidebarLayout from '@/components/layouts/SidebarLayout';
import { Button } from '@/components/ui/button';
import { Download, Upload, AlertTriangle } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const InventoryPage = () => {
  const { products } = useAppContext();

  // تصنيف المنتجات حسب حالة المخزون
  const lowStockProducts = products.filter(product => product.stock < 10);
  const healthyStockProducts = products.filter(product => product.stock >= 10);

  return (
    <SidebarLayout>
      <div className="flex flex-col p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">المخزون</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              استيراد
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              تصدير
            </Button>
          </div>
        </div>
        
        {/* منتجات ذات مخزون منخفض */}
        {lowStockProducts.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-amber-500 h-5 w-5" />
              <h2 className="text-lg font-medium">منتجات ذات مخزون منخفض</h2>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableCaption>المنتجات التي يجب إعادة تخزينها</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">الرقم</TableHead>
                    <TableHead className="text-right">اسم المنتج</TableHead>
                    <TableHead className="text-right">التصنيف</TableHead>
                    <TableHead className="text-right">السعر</TableHead>
                    <TableHead className="text-right">المخزون الحالي</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lowStockProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.price} ₪</TableCell>
                      <TableCell className="text-red-600 font-bold">{product.stock}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
        
        {/* جميع المنتجات */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium">جميع المنتجات في المخزون</h2>
          <div className="rounded-md border">
            <Table>
              <TableCaption>قائمة المنتجات في المخزون</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">الرقم</TableHead>
                  <TableHead className="text-right">اسم المنتج</TableHead>
                  <TableHead className="text-right">التصنيف</TableHead>
                  <TableHead className="text-right">السعر</TableHead>
                  <TableHead className="text-right">المخزون</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.price} ₪</TableCell>
                    <TableCell className={product.stock < 10 ? "text-red-600 font-bold" : ""}>{product.stock}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default InventoryPage;
