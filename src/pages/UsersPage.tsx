
import React from 'react';
import SidebarLayout from '@/components/layouts/SidebarLayout';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const UsersPage = () => {
  return (
    <SidebarLayout>
      <div className="flex flex-col p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">المستخدمين</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            إضافة مستخدم
          </Button>
        </div>
        
        <div className="rounded-md border p-8 text-center">
          <h2 className="text-lg font-medium">صفحة إدارة المستخدمين</h2>
          <p className="mt-2 text-muted-foreground">سيتم إضافة قائمة المستخدمين ووظائف الإدارة هنا</p>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default UsersPage;
