
import React from 'react';
import { CustomerDebt } from '@/contexts/DashboardContext';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check } from 'lucide-react';

interface PaidDebtsSectionProps {
  paidDebts: CustomerDebt[];
}

export function PaidDebtsSection({ paidDebts }: PaidDebtsSectionProps) {
  if (paidDebts.length === 0) return null;
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Check className="text-green-500 h-5 w-5" />
        <h2 className="text-lg font-medium">ديون مدفوعة</h2>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableCaption>الديون المدفوعة بالكامل</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">الرقم</TableHead>
              <TableHead className="text-right">العميل</TableHead>
              <TableHead className="text-right">المبلغ</TableHead>
              <TableHead className="text-right">تاريخ الدين</TableHead>
              <TableHead className="text-right">تاريخ السداد</TableHead>
              <TableHead className="text-right">الوصف</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paidDebts.map((debt) => (
              <TableRow key={debt.id}>
                <TableCell className="font-medium">{debt.id}</TableCell>
                <TableCell>{debt.customerName}</TableCell>
                <TableCell>{debt.amount.toFixed(2)} ₪</TableCell>
                <TableCell>{debt.date}</TableCell>
                <TableCell>{debt.dueDate}</TableCell>
                <TableCell>{debt.description || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
