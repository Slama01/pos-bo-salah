
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types
interface DailySummary {
  totalSales: number;
  customerCount: number;
}

interface CustomerDebt {
  id: string;
  customerId: string;
  customerName: string;
  amount: number;
  remainingAmount: number;
  dueDate: string;
  date: string;
  status: string;
  description?: string;
}

// Context type definition
interface DashboardContextType {
  dailySummary: DailySummary;
  customerDebts: CustomerDebt[];
  updateDebtStatus: (id: string, status: string, paymentAmount?: number) => void;
}

// Create the context
const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

// Provider component
export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [dailySummary, setDailySummary] = useState<DailySummary>({
    totalSales: 0,
    customerCount: 0
  });
  
  const [customerDebts, setCustomerDebts] = useState<CustomerDebt[]>([]);

  const updateDebtStatus = (id: string, status: string, paymentAmount?: number) => {
    setCustomerDebts(
      customerDebts.map(debt => {
        if (debt.id === id) {
          // إذا تم تحديد مبلغ الدفع، فقم بخصمه من المبلغ المتبقي
          if (paymentAmount && paymentAmount > 0) {
            const newRemainingAmount = Math.max(0, debt.remainingAmount - paymentAmount);
            return { 
              ...debt, 
              status, 
              remainingAmount: newRemainingAmount 
            };
          }
          // إذا لم يتم تحديد مبلغ الدفع، فقط قم بتحديث الحالة
          return { ...debt, status };
        }
        return debt;
      })
    );
  };

  return (
    <DashboardContext.Provider value={{
      dailySummary,
      customerDebts,
      updateDebtStatus
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

// Custom hook to use the context
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

export type { CustomerDebt };
