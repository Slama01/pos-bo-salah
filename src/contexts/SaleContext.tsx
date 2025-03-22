
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Sale type definition
export interface Sale {
  id: string;
  customerId: string;
  products: { productId: string; quantity: number }[];
  totalAmount: number;
  date: string;
  paymentMethod: 'cash' | 'credit';
  status?: string;
  customer?: string;
  items?: number;
  total?: number;
}

// Context type definition
interface SaleContextType {
  sales: Sale[];
  addSale: (sale: Sale) => void;
  updateSale: (sale: Sale) => void;
  deleteSale: (id: string) => void;
  setSales: (sales: Sale[]) => void;
  processSale: (sale: any) => void;
}

// Create the context
const SaleContext = createContext<SaleContextType | undefined>(undefined);

// Provider component
export const SaleProvider = ({ children }: { children: ReactNode }) => {
  const [sales, setSales] = useState<Sale[]>([]);

  const addSale = (sale: Sale) => {
    setSales([...sales, sale]);
  };

  const updateSale = (sale: Sale) => {
    setSales(sales.map(s => s.id === sale.id ? sale : s));
  };

  const deleteSale = (id: string) => {
    setSales(sales.filter(s => s.id !== id));
  };

  // Providing a simple implementation to fix build errors
  const processSale = (saleData: any) => {
    // Convert saleData to Sale type as needed
    const newSale: Sale = {
      id: typeof saleData.id === 'number' ? String(saleData.id) : saleData.id,
      customerId: saleData.customer || "",
      products: saleData.products?.map((p: any) => ({
        productId: String(p.productId),
        quantity: p.quantity
      })) || [],
      totalAmount: saleData.total || 0,
      date: saleData.date || new Date().toISOString(),
      paymentMethod: 'cash',
      status: saleData.status,
      customer: saleData.customer,
      items: saleData.items,
      total: saleData.total
    };
    
    addSale(newSale);
  };

  return (
    <SaleContext.Provider value={{
      sales,
      addSale,
      updateSale,
      deleteSale,
      setSales,
      processSale
    }}>
      {children}
    </SaleContext.Provider>
  );
};

// Custom hook to use the context
export const useSales = () => {
  const context = useContext(SaleContext);
  if (context === undefined) {
    throw new Error('useSales must be used within a SaleProvider');
  }
  return context;
};
