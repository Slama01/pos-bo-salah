
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Invoice type definition
export interface Invoice {
  id: string;
  saleId: string;
  invoiceNumber: string;
  date: string;
  totalAmount: number;
  customerId: string;
}

// Context type definition
interface InvoiceContextType {
  invoices: Invoice[];
  addInvoice: (invoice: Invoice) => void;
  updateInvoice: (invoice: Invoice) => void;
  deleteInvoice: (id: string) => void;
}

// Create the context
const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

// Provider component
export const InvoiceProvider = ({ children }: { children: ReactNode }) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const addInvoice = (invoice: Invoice) => {
    setInvoices([...invoices, invoice]);
  };

  const updateInvoice = (invoice: Invoice) => {
    setInvoices(invoices.map(i => i.id === invoice.id ? invoice : i));
  };

  const deleteInvoice = (id: string) => {
    setInvoices(invoices.filter(i => i.id !== id));
  };

  return (
    <InvoiceContext.Provider value={{
      invoices,
      addInvoice,
      updateInvoice,
      deleteInvoice,
    }}>
      {children}
    </InvoiceContext.Provider>
  );
};

// Custom hook to use the context
export const useInvoices = () => {
  const context = useContext(InvoiceContext);
  if (context === undefined) {
    throw new Error('useInvoices must be used within an InvoiceProvider');
  }
  return context;
};
