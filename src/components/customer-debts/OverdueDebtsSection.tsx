
import React from 'react';
import { CustomerDebt } from '@/contexts/DashboardContext';
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Receipt } from 'lucide-react';
import { CircleAlert } from 'lucide-react';

interface OverdueDebtsSectionProps {
  overdueDebts: CustomerDebt[];
  onHandlePayment: (debt: CustomerDebt) => void;
}

export function OverdueDebtsSection({ overdueDebts, onHandlePayment }: OverdueDebtsSectionProps) {
  if (overdueDebts.length === 0) return null;
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <CircleAlert className="text-red-500 h-5 w-5" />
        <h2 className="text-lg font-medium">ديون متأخرة</h2>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableCaption>الديون المتأخرة عن موعد السداد</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">الرقم</TableHead>
              <TableHead className="text-right">العميل</TableHead>
              <TableHead className="text-right">المبلغ الإجمالي</TableHead>
              <TableHead className="text-right">المبلغ المتبقي</TableHead>
              <TableHead className="text-right">تاريخ الدين</TableHead>
              <TableHead className="text-right">تاريخ الاستحقاق</TableHead>
              <TableHead className="text-right">الوصف</TableHead>
              <TableHead className="text-right">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {overdueDebts.map((debt) => (
              <TableRow key={debt.id}>
                <TableCell className="font-medium">{debt.id}</TableCell>
                <TableCell>{debt.customerName}</TableCell>
                <TableCell>{debt.amount.toFixed(2)} ₪</TableCell>
                <TableCell className="text-red-600 font-bold">{debt.remainingAmount.toFixed(2)} ₪</TableCell>
                <TableCell>{debt.date}</TableCell>
                <TableCell className="text-red-600 font-bold">{debt.dueDate}</TableCell>
                <TableCell>{debt.description || "-"}</TableCell>
                <TableCell>
                  <Button 
                    variant="default" 
                    size="sm"
                    onClick={() => onHandlePayment(debt)}
                  >
                    <Receipt className="ml-1 h-4 w-4" />
                    تسجيل دفعة
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
