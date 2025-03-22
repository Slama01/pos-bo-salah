
import React, { ReactNode } from 'react';
import { ProductProvider, useProducts, Product } from './ProductContext';
import { CustomerProvider, useCustomers, Customer } from './CustomerContext';
import { SaleProvider, useSales, Sale } from './SaleContext';
import { InvoiceProvider, useInvoices, Invoice } from './InvoiceContext';
import { AlertProvider, useAlerts, Alert } from './AlertContext';
import { UserProvider, useUsers, User } from './UserContext';
import { DashboardProvider, useDashboard, CustomerDebt } from './DashboardContext';

// Combine all context providers
export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ProductProvider>
      <CustomerProvider>
        <SaleProvider>
          <InvoiceProvider>
            <AlertProvider>
              <UserProvider>
                <DashboardProvider>
                  {children}
                </DashboardProvider>
              </UserProvider>
            </AlertProvider>
          </InvoiceProvider>
        </SaleProvider>
      </CustomerProvider>
    </ProductProvider>
  );
};

// Create a unified hook that provides access to all contexts
export const useApp = () => {
  const productContext = useProducts();
  const customerContext = useCustomers();
  const saleContext = useSales();
  const invoiceContext = useInvoices();
  const alertContext = useAlerts();
  const userContext = useUsers();
  const dashboardContext = useDashboard();

  return {
    ...productContext,
    ...customerContext,
    ...saleContext,
    ...invoiceContext,
    ...alertContext,
    ...userContext,
    ...dashboardContext,
  };
};

// Add backward compatibility
export const useAppContext = useApp;

// Export all types
export type {
  Product,
  Customer,
  Sale,
  Invoice,
  Alert,
  User,
  CustomerDebt
};
