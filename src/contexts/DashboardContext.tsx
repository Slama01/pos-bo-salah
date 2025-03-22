
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
  dueDate: string;
  status: string;
}

// Context type definition
interface DashboardContextType {
  dailySummary: DailySummary;
  customerDebts: CustomerDebt[];
  updateDebtStatus: (id: string, status: string) => void;
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

  const updateDebtStatus = (id: string, status: string) => {
    setCustomerDebts(
      customerDebts.map(debt => debt.id === id ? { ...debt, status } : debt)
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
