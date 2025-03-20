
import React, { createContext, useContext, useState, ReactNode } from 'react';

// تعريف الأنواع
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  image?: string;
  barcode?: string;
  stock: number; // إضافة خاصية المخزون
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  address?: string;
  email?: string;
}

export interface Sale {
  id: string;
  customerId: string;
  products: { productId: string; quantity: number }[];
  totalAmount: number;
  date: string;
  paymentMethod: 'cash' | 'credit';
}

export interface Invoice {
  id: string;
  saleId: string;
  invoiceNumber: string;
  date: string;
  totalAmount: number;
  customerId: string;
}

export interface Alert {
  id: string;
  type: 'stock' | 'debt';
  message: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// تعريف نوع السياق
interface AppContextType {
  products: Product[];
  customers: Customer[];
  sales: Sale[];
  invoices: Invoice[];
  alerts: Alert[];
  users: User[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  addCustomer: (customer: Customer) => void;
  updateCustomer: (customer: Customer) => void;
  deleteCustomer: (id: string) => void;
  addSale: (sale: Sale) => void;
  updateSale: (sale: Sale) => void;
  deleteSale: (id: string) => void;
  addInvoice: (invoice: Invoice) => void;
  updateInvoice: (invoice: Invoice) => void;
  deleteInvoice: (id: string) => void;
  addAlert: (alert: Alert) => void;
  updateAlert: (alert: Alert) => void;
  deleteAlert: (id: string) => void;
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const addProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  const updateProduct = (product: Product) => {
    setProducts(products.map(p => p.id === product.id ? product : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const addCustomer = (customer: Customer) => {
    setCustomers([...customers, customer]);
  };

  const updateCustomer = (customer: Customer) => {
    setCustomers(customers.map(c => c.id === customer.id ? customer : c));
  };

  const deleteCustomer = (id: string) => {
    setCustomers(customers.filter(c => c.id !== id));
  };

  const addSale = (sale: Sale) => {
    setSales([...sales, sale]);
  };

  const updateSale = (sale: Sale) => {
    setSales(sales.map(s => s.id === sale.id ? sale : s));
  };

  const deleteSale = (id: string) => {
    setSales(sales.filter(s => s.id !== id));
  };

  const addInvoice = (invoice: Invoice) => {
    setInvoices([...invoices, invoice]);
  };

  const updateInvoice = (invoice: Invoice) => {
    setInvoices(invoices.map(i => i.id === invoice.id ? invoice : i));
  };

  const deleteInvoice = (id: string) => {
    setInvoices(invoices.filter(i => i.id !== id));
  };

  const addAlert = (alert: Alert) => {
    setAlerts([...alerts, alert]);
  };

  const updateAlert = (alert: Alert) => {
    setAlerts(alerts.map(a => a.id === alert.id ? alert : a));
  };

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

   const addUser = (user: User) => {
    setUsers([...users, user]);
  };

  const updateUser = (user: User) => {
    setUsers(users.map(u => u.id === user.id ? user : u));
  };

  const deleteUser = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <AppContext.Provider value={{
      products,
      customers,
      sales,
      invoices,
      alerts,
      users,
      addProduct,
      updateProduct,
      deleteProduct,
      addCustomer,
      updateCustomer,
      deleteCustomer,
      addSale,
      updateSale,
      deleteSale,
      addInvoice,
      updateInvoice,
      deleteInvoice,
      addAlert,
      updateAlert,
      deleteAlert,
      addUser,
      updateUser,
      deleteUser,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// يضاف هذا السطر لتوافق المكونات التي تستخدم useAppContext
export const useAppContext = useApp;
