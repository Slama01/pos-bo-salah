
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  BarChart3, 
  Users, 
  Package, 
  ShoppingCart, 
  Settings,
  ListChecks,
  Receipt,
  Bell,
  Menu,
  LogOut,
  UserCog,
  CreditCard
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

const SidebarItem = ({ icon, label, href, active }: SidebarItemProps) => {
  return (
    <Link to={href}>
      <div 
        className={cn("flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-accent",
          active ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
        )}
      >
        {icon}
        <span>{label}</span>
      </div>
    </Link>
  );
};

interface SidebarLayoutProps {
  children: React.ReactNode;
}

const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  // قائمة عناصر التنقل في الشريط الجانبي
  const sidebarItems = [
    { label: "لوحة التحكم", href: "/", icon: <BarChart3 className="h-5 w-5" /> },
    { label: "المبيعات", href: "/sales", icon: <ShoppingCart className="h-5 w-5" /> },
    { label: "المنتجات", href: "/products", icon: <Package className="h-5 w-5" /> },
    { label: "العملاء", href: "/customers", icon: <Users className="h-5 w-5" /> },
    { label: "ديون العملاء", href: "/customer-debts", icon: <CreditCard className="h-5 w-5" /> },
    { label: "المخزون", href: "/inventory", icon: <ListChecks className="h-5 w-5" /> },
    { label: "الفواتير", href: "/invoices", icon: <Receipt className="h-5 w-5" /> },
    { label: "التنبيهات", href: "/alerts", icon: <Bell className="h-5 w-5" /> },
    { label: "المستخدمين", href: "/users", icon: <UserCog className="h-5 w-5" /> },
    { label: "الإعدادات", href: "/settings", icon: <Settings className="h-5 w-5" /> },
    { label: "المساعدة", href: "/help", icon: <Bell className="h-5 w-5" /> },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* الرأس */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">فتح القائمة</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 p-0 pt-10">
            <nav className="flex flex-col gap-4 p-6">
              {sidebarItems.map((item) => (
                <SidebarItem 
                  key={item.href} 
                  icon={item.icon} 
                  label={item.label} 
                  href={item.href}
                  active={currentPath === item.href}
                />
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">نظام المبيعات</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* المحتوى الرئيسي */}
      <div className="flex flex-1">
        {/* الشريط الجانبي الثابت للأجهزة المتوسطة والكبيرة */}
        <nav className="hidden border-r bg-background md:block w-64 overflow-y-auto">
          <div className="flex flex-col gap-2 p-6">
            {sidebarItems.map((item) => (
              <SidebarItem 
                key={item.href} 
                icon={item.icon} 
                label={item.label} 
                href={item.href}
                active={currentPath === item.href}
              />
            ))}
          </div>
        </nav>

        {/* محتوى الصفحة */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;
