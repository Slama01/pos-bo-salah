
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { CustomerDebt } from '@/contexts/DashboardContext';

interface DebtPaymentDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedDebt: CustomerDebt | null;
  paymentAmount: number;
  setPaymentAmount: (amount: number) => void;
  onProcessPayment: () => void;
}

export function DebtPaymentDialog({
  isOpen,
  setIsOpen,
  selectedDebt,
  paymentAmount,
  setPaymentAmount,
  onProcessPayment
}: DebtPaymentDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-right">تسجيل دفعة</DialogTitle>
          <DialogDescription className="text-right">
            تسجيل دفعة لـ {selectedDebt?.customerName}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4 mt-4">
          <div>
            <Label htmlFor="total-amount">المبلغ الإجمالي</Label>
            <Input 
              id="total-amount" 
              value={selectedDebt?.amount.toFixed(2) || "0"} 
              readOnly 
              className="bg-gray-50"
            />
          </div>
          <div>
            <Label htmlFor="remaining-amount">المبلغ المتبقي</Label>
            <Input 
              id="remaining-amount" 
              value={selectedDebt?.remainingAmount.toFixed(2) || "0"} 
              readOnly 
              className="bg-gray-50"
            />
          </div>
          <div>
            <Label htmlFor="payment-amount">مبلغ الدفعة</Label>
            <Input 
              id="payment-amount" 
              type="number"
              step="0.01"
              min="0"
              max={selectedDebt?.remainingAmount || 0}
              value={paymentAmount} 
              onChange={(e) => setPaymentAmount(parseFloat(e.target.value) || 0)} 
            />
          </div>
        </div>
        <DialogFooter className="mt-4">
          <Button 
            variant="outline" 
            onClick={() => setIsOpen(false)}
          >
            إلغاء
          </Button>
          <Button onClick={onProcessPayment}>
            تسجيل الدفعة
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
