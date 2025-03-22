
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
import { Wallet, Clock } from 'lucide-react';
import { DebtStatusBadge } from './DebtStatusBadge';

interface ActiveDebtsSectionProps {
  activeDebts: CustomerDebt[];
  onHandlePayment: (debt: CustomerDebt) => void;
}

export function ActiveDebtsSection({ activeDebts, onHandlePayment }: ActiveDebtsSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Clock className="text-amber-500 h-5 w-5" />
        <h2 className="text-lg font-medium">ديون نشطة</h2>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableCaption>الديون النشطة غير المتأخرة</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">الرقم</TableHead>
              <TableHead className="text-right">العميل</TableHead>
              <TableHead className="text-right">المبلغ الإجمالي</TableHead>
              <TableHead className="text-right">المبلغ المتبقي</TableHead>
              <TableHead className="text-right">تاريخ الدين</TableHead>
              <TableHead className="text-right">تاريخ الاستحقاق</TableHead>
              <TableHead className="text-right">الحالة</TableHead>
              <TableHead className="text-right">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activeDebts.map((debt) => (
              <TableRow key={debt.id}>
                <TableCell className="font-medium">{debt.id}</TableCell>
                <TableCell>{debt.customerName}</TableCell>
                <TableCell>{debt.amount.toFixed(2)} ₪</TableCell>
                <TableCell>{debt.remainingAmount.toFixed(2)} ₪</TableCell>
                <TableCell>{debt.date}</TableCell>
                <TableCell>{debt.dueDate}</TableCell>
                <TableCell>
                  <DebtStatusBadge status={debt.status} />
                </TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onHandlePayment(debt)}
                  >
                    <Wallet className="ml-1 h-4 w-4" />
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
