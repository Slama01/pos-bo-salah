
import { useState } from 'react';
import { CustomerDebt } from '@/contexts/DashboardContext';
import { useDashboard } from '@/contexts/DashboardContext';
import { useToast } from "@/hooks/use-toast";

export function useDebtManagement() {
  const { toast } = useToast();
  const { customerDebts, updateDebtStatus } = useDashboard();
  
  const [selectedDebt, setSelectedDebt] = useState<CustomerDebt | null>(null);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);

  const today = new Date().toISOString().split('T')[0];
  const overdueDebts = customerDebts.filter(
    debt => debt.status !== "مدفوع بالكامل" && debt.dueDate < today
  );
  const activeDebts = customerDebts.filter(
    debt => debt.status !== "مدفوع بالكامل" && debt.dueDate >= today
  );
  const paidDebts = customerDebts.filter(
    debt => debt.status === "مدفوع بالكامل"
  );

  const totalDebtAmount = customerDebts
    .filter(debt => debt.status !== "مدفوع بالكامل")
    .reduce((total, debt) => total + debt.remainingAmount, 0);

  const handlePayment = (debt: CustomerDebt) => {
    setSelectedDebt(debt);
    setPaymentAmount(debt.remainingAmount);
    setIsPaymentDialogOpen(true);
  };

  const processPayment = () => {
    if (!selectedDebt) return;
    
    if (paymentAmount <= 0 || paymentAmount > selectedDebt.remainingAmount) {
      toast({
        variant: "destructive",
        title: "قيمة غير صالحة",
        description: "الرجاء إدخال قيمة صالحة للدفع"
      });
      return;
    }
    
    updateDebtStatus(
      selectedDebt.id, 
      paymentAmount === selectedDebt.remainingAmount ? "مدفوع بالكامل" : "مدفوع جزئياً",
      paymentAmount
    );
    
    toast({
      title: "تم تسجيل الدفعة",
      description: `تم تسجيل دفعة بقيمة ${paymentAmount} ₪ لـ ${selectedDebt.customerName}`
    });
    
    setIsPaymentDialogOpen(false);
    setSelectedDebt(null);
    setPaymentAmount(0);
  };

  return {
    overdueDebts,
    activeDebts,
    paidDebts,
    totalDebtAmount,
    selectedDebt,
    isPaymentDialogOpen,
    setIsPaymentDialogOpen,
    paymentAmount,
    setPaymentAmount,
    handlePayment,
    processPayment
  };
}
