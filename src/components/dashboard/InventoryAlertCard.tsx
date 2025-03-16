
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const InventoryAlertCard = () => {
  // بيانات المخزون المنخفض (سيتم استبدالها بالبيانات الفعلية)
  const lowStockItems = [
    {
      id: 1,
      name: "هاتف ذكي - موديل X",
      category: "إلكترونيات",
      currentStock: 3,
      minStock: 5,
    },
    {
      id: 2,
      name: "لابتوب - برو سيريز",
      category: "إلكترونيات",
      currentStock: 2,
      minStock: 4,
    },
    {
      id: 3,
      name: "سماعات لاسلكية",
      category: "إكسسوارات",
      currentStock: 4,
      minStock: 10,
    },
    {
      id: 4,
      name: "شاحن سريع",
      category: "إكسسوارات",
      currentStock: 6,
      minStock: 15,
    },
    {
      id: 5,
      name: "حافظة هاتف - موديل Y",
      category: "إكسسوارات",
      currentStock: 7,
      minStock: 20,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>تنبيهات المخزون</CardTitle>
        <CardDescription>المنتجات التي تحتاج إلى إعادة تعبئة</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>المنتج</TableHead>
              <TableHead>التصنيف</TableHead>
              <TableHead>المخزون الحالي</TableHead>
              <TableHead>الحالة</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lowStockItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.currentStock}</TableCell>
                <TableCell>
                  <Badge variant={item.currentStock <= 3 ? "destructive" : "outline"}>
                    {item.currentStock <= 3 ? "منخفض جداً" : "منخفض"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default InventoryAlertCard;
