
import React, { createContext, useState, useContext, useEffect } from 'react';

// إعداد الترجمات المتوفرة
interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  // الترجمات العربية
  ar: {
    // العامة
    appName: "نظام إدارة المبيعات",
    dashboard: "لوحة التحكم",
    products: "المنتجات",
    sales: "المبيعات",
    customers: "العملاء",
    inventory: "المخزون",
    invoices: "الفواتير",
    reports: "التقارير",
    settings: "الإعدادات",
    users: "المستخدمين",
    logout: "تسجيل الخروج",
    save: "حفظ",
    cancel: "إلغاء",
    delete: "حذف",
    edit: "تعديل",
    add: "إضافة",
    search: "بحث",
    filter: "تصفية",
    
    // المنتجات
    productName: "اسم المنتج",
    category: "التصنيف",
    price: "السعر",
    stock: "المخزون",
    addProduct: "إضافة منتج",
    editProduct: "تعديل منتج",
    deleteProduct: "حذف منتج",
    
    // المبيعات
    newSale: "بيع جديد",
    saleDate: "تاريخ البيع",
    customer: "العميل",
    total: "المجموع",
    items: "العناصر",
    status: "الحالة",
    
    // العملاء
    customerName: "اسم العميل",
    phone: "رقم الهاتف",
    email: "البريد الإلكتروني",
    address: "العنوان",
    
    // الفواتير
    invoiceId: "رقم الفاتورة",
    dueDate: "تاريخ الاستحقاق",
    paid: "مدفوعة",
    pending: "قيد الانتظار",
    overdue: "متأخرة",
    
    // التنبيهات
    alerts: "التنبيهات",
    markAsRead: "تعيين كمقروء",
    markAllAsRead: "تعيين الكل كمقروء",
    
    // الإعدادات
    language: "اللغة",
    theme: "المظهر",
    backupSettings: "إعدادات النسخ الاحتياطي",
    printSettings: "إعدادات الطباعة",
    companyInfo: "معلومات الشركة",
  },
  
  // الترجمات الإنجليزية
  en: {
    // General
    appName: "Sales Management System",
    dashboard: "Dashboard",
    products: "Products",
    sales: "Sales",
    customers: "Customers",
    inventory: "Inventory",
    invoices: "Invoices",
    reports: "Reports",
    settings: "Settings",
    users: "Users",
    logout: "Logout",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    add: "Add",
    search: "Search",
    filter: "Filter",
    
    // Products
    productName: "Product Name",
    category: "Category",
    price: "Price",
    stock: "Stock",
    addProduct: "Add Product",
    editProduct: "Edit Product",
    deleteProduct: "Delete Product",
    
    // Sales
    newSale: "New Sale",
    saleDate: "Sale Date",
    customer: "Customer",
    total: "Total",
    items: "Items",
    status: "Status",
    
    // Customers
    customerName: "Customer Name",
    phone: "Phone",
    email: "Email",
    address: "Address",
    
    // Invoices
    invoiceId: "Invoice ID",
    dueDate: "Due Date",
    paid: "Paid",
    pending: "Pending",
    overdue: "Overdue",
    
    // Alerts
    alerts: "Alerts",
    markAsRead: "Mark as Read",
    markAllAsRead: "Mark All as Read",
    
    // Settings
    language: "Language",
    theme: "Theme",
    backupSettings: "Backup Settings",
    printSettings: "Print Settings",
    companyInfo: "Company Information",
  }
};

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  availableLanguages: { code: string; name: string }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // استخدم اللغة المحفوظة في التخزين المحلي أو الافتراضية
  const [language, setLanguageState] = useState<string>(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'ar';
  });

  const availableLanguages = [
    { code: 'ar', name: 'العربية' },
    { code: 'en', name: 'English' }
  ];

  // ترجمة النص حسب المفتاح
  const t = (key: string): string => {
    if (translations[language] && translations[language][key]) {
      return translations[language][key];
    }
    
    // إذا لم يتم العثور على الترجمة، أعد المفتاح كما هو
    console.warn(`Translation missing for key: ${key} in language: ${language}`);
    return key;
  };

  // تعيين اللغة وحفظها في التخزين المحلي
  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    
    // تعيين اتجاه الصفحة حسب اللغة
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  // تعيين اتجاه الصفحة عند تحميل المكون
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
