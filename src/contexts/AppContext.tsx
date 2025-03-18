
import React, { createContext, useState, useContext, useEffect } from 'react';
import { SaleData } from '@/components/sales/SalesCart';

// تعريف أنواع البيانات
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

export interface DailySummary {
  totalSales: number;
  totalProfit: number;
  totalItems: number;
  customerCount: number;
}

interface AppContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  sales: SaleData[];
  setSales: React.Dispatch<React.SetStateAction<SaleData[]>>;
  dailySummary: DailySummary;
  updateDailySummary: () => void;
  processSale: (sale: SaleData) => void;
}

const defaultSummary: DailySummary = {
  totalSales: 0,
  totalProfit: 0,
  totalItems: 0,
  customerCount: 0,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // بيانات المنتجات النموذجية - في التطبيق الحقيقي ستأتي من API
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "لابتوب HP", category: "إلكترونيات", price: 3500, stock: 15 },
    { id: 2, name: "سماعات بلوتوث", category: "إلكترونيات", price: 200, stock: 50 },
    { id: 3, name: "كرسي مكتب", category: "أثاث", price: 450, stock: 8 },
    { id: 4, name: "هاتف ذكي", category: "إلكترونيات", price: 2000, stock: 25 },
    { id: 5, name: "طاولة خشبية", category: "أثاث", price: 650, stock: 5 },
  ]);

  // بيانات المبيعات النموذجية
  const [sales, setSales] = useState<SaleData[]>([
    { 
      id: 1, 
      date: "2023-10-15", 
      customer: "أحمد محمد", 
      total: 4500, 
      items: 3, 
      status: "مكتملة",
      products: [
        { id: 101, productId: 1, productName: "لابتوب HP", quantity: 1, price: 3500 },
        { id: 102, productId: 2, productName: "سماعات بلوتوث", quantity: 2, price: 500 }
      ]
    },
    { 
      id: 2, 
      date: "2023-10-14", 
      customer: "سارة علي", 
      total: 2700, 
      items: 5, 
      status: "مكتملة",
      products: [
        { id: 103, productId: 4, productName: "هاتف ذكي", quantity: 1, price: 2000 },
        { id: 104, productId: 2, productName: "سماعات بلوتوث", quantity: 2, price: 200 },
        { id: 105, productId: 3, productName: "كرسي مكتب", quantity: 1, price: 300 }
      ]
    },
    { 
      id: 3, 
      date: "2023-10-13", 
      customer: "محمد خالد", 
      total: 1200, 
      items: 2, 
      status: "معلقة",
      products: [
        { id: 106, productId: 5, productName: "طاولة خشبية", quantity: 1, price: 650 },
        { id: 107, productId: 3, productName: "كرسي مكتب", quantity: 1, price: 550 }
      ]
    },
    { 
      id: 4, 
      date: "2023-10-12", 
      customer: "فاطمة عمر", 
      total: 3450, 
      items: 4, 
      status: "مكتملة",
      products: [
        { id: 108, productId: 4, productName: "هاتف ذكي", quantity: 1, price: 2000 },
        { id: 109, productId: 2, productName: "سماعات بلوتوث", quantity: 3, price: 150 },
        { id: 110, productId: 1, productName: "لابتوب HP", quantity: 1, price: 1000 }
      ]
    },
    { 
      id: 5, 
      date: "2023-10-10", 
      customer: "خالد سعيد", 
      total: 800, 
      items: 1, 
      status: "ملغية",
      products: [
        { id: 111, productId: 3, productName: "كرسي مكتب", quantity: 1, price: 800 }
      ]
    },
  ]);

  const [dailySummary, setDailySummary] = useState<DailySummary>(defaultSummary);

  // تحديث الملخص اليومي
  const updateDailySummary = () => {
    const today = new Date().toISOString().split('T')[0];
    
    // فلترة المبيعات لليوم الحالي
    const todaySales = sales.filter(sale => 
      sale.date === today && sale.status === "مكتملة"
    );
    
    // حساب إجمالي المبيعات
    const totalSales = todaySales.reduce((sum, sale) => sum + sale.total, 0);
    
    // حساب إجمالي العناصر المباعة
    const totalItems = todaySales.reduce((sum, sale) => sum + sale.items, 0);
    
    // احتساب عدد العملاء (بدون تكرار)
    const uniqueCustomers = new Set(todaySales.map(sale => sale.customer));
    
    // تقدير الربح (في حالة حقيقية سيتم حسابه بشكل أدق)
    const totalProfit = totalSales * 0.3; // افتراض هامش ربح 30%
    
    setDailySummary({
      totalSales,
      totalProfit,
      totalItems,
      customerCount: uniqueCustomers.size
    });
  };

  // معالجة عملية البيع الجديدة
  const processSale = (sale: SaleData) => {
    // إضافة عملية البيع الجديدة
    setSales(prevSales => [sale, ...prevSales]);
    
    // تحديث المخزون
    if (sale.status === "مكتملة") {
      const updatedProducts = [...products];
      
      sale.products.forEach(saleProduct => {
        const productIndex = updatedProducts.findIndex(p => p.id === saleProduct.productId);
        if (productIndex !== -1) {
          updatedProducts[productIndex] = {
            ...updatedProducts[productIndex],
            stock: updatedProducts[productIndex].stock - saleProduct.quantity
          };
        }
      });
      
      setProducts(updatedProducts);
    }
    
    // تحديث الملخص اليومي
    updateDailySummary();
  };

  // تحديث الملخص اليومي عند تحميل الصفحة أو تغيير المبيعات
  useEffect(() => {
    updateDailySummary();
  }, [sales]);

  return (
    <AppContext.Provider 
      value={{ 
        products, 
        setProducts, 
        sales, 
        setSales, 
        dailySummary, 
        updateDailySummary,
        processSale
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
