
import React from 'react';
import SidebarLayout from '@/components/layouts/SidebarLayout';
import { Button } from '@/components/ui/button';
import { Plus, Printer } from 'lucide-react';

const InvoicesPage = () => {
  return (
    <SidebarLayout>
      <div className="flex flex-col p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">الفواتير</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <Printer className="mr-2 h-4 w-4" />
              طباعة
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              إنشاء فاتورة
            </Button>
          </div>
        </div>
        
        <div className="rounded-md border p-8 text-center">
          <h2 className="text-lg font-medium">صفحة إدارة الفواتير</h2>
          <p className="mt-2 text-muted-foreground">سيتم إضافة قائمة الفواتير ووظائف الإدارة هنا</p>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default InvoicesPage;
