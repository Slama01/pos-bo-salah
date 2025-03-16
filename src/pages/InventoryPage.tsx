
import React from 'react';
import SidebarLayout from '@/components/layouts/SidebarLayout';
import { Button } from '@/components/ui/button';
import { Download, Upload } from 'lucide-react';

const InventoryPage = () => {
  return (
    <SidebarLayout>
      <div className="flex flex-col p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">المخزون</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              استيراد
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              تصدير
            </Button>
          </div>
        </div>
        
        <div className="rounded-md border p-8 text-center">
          <h2 className="text-lg font-medium">صفحة إدارة المخزون</h2>
          <p className="mt-2 text-muted-foreground">سيتم إضافة تفاصيل المخزون ووظائف الإدارة هنا</p>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default InventoryPage;
