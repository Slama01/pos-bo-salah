
import React from 'react';
import SidebarLayout from '@/components/layouts/SidebarLayout';
import { useDebtManagement } from '@/hooks/useDebtManagement';
import { DebtAlertBanner } from '@/components/customer-debts/DebtAlertBanner';
import { OverdueDebtsSection } from '@/components/customer-debts/OverdueDebtsSection';
import { ActiveDebtsSection } from '@/components/customer-debts/ActiveDebtsSection';
import { PaidDebtsSection } from '@/components/customer-debts/PaidDebtsSection';
import { DebtPaymentDialog } from '@/components/customer-debts/DebtPaymentDialog';

const CustomerDebtsPage = () => {
  const {
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
  } = useDebtManagement();

  return (
    <SidebarLayout>
      <div className="flex flex-col p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">ديون العملاء</h1>
          <div className="flex items-center gap-4">
            <div className="text-lg">
              إجمالي الديون: <span className="font-bold">{totalDebtAmount.toFixed(2)} ₪</span>
            </div>
          </div>
        </div>
        
        <DebtAlertBanner overdueDebts={overdueDebts} />
        
        <OverdueDebtsSection 
          overdueDebts={overdueDebts}
          onHandlePayment={handlePayment}
        />
        
        <ActiveDebtsSection 
          activeDebts={activeDebts}
          onHandlePayment={handlePayment}
        />

        <PaidDebtsSection paidDebts={paidDebts} />

        <DebtPaymentDialog
          isOpen={isPaymentDialogOpen}
          setIsOpen={setIsPaymentDialogOpen}
          selectedDebt={selectedDebt}
          paymentAmount={paymentAmount}
          setPaymentAmount={setPaymentAmount}
          onProcessPayment={processPayment}
        />
      </div>
    </SidebarLayout>
  );
};

export default CustomerDebtsPage;
