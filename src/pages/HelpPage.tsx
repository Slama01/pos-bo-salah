
import React from 'react';
import SidebarLayout from '@/components/layouts/SidebarLayout';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import UserManual from '@/components/help/UserManual';
import { Info } from 'lucide-react';

const HelpPage = () => {
  return (
    <SidebarLayout>
      <div className="flex flex-col p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">المساعدة والدعم</h1>
        </div>

        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>مرحباً بك في مركز المساعدة</AlertTitle>
          <AlertDescription>
            اكتشف كيفية استخدام نظام إدارة المبيعات بكامل إمكانياته من خلال دليل المستخدم الشامل أدناه.
          </AlertDescription>
        </Alert>

        <UserManual />
      </div>
    </SidebarLayout>
  );
};

export default HelpPage;
