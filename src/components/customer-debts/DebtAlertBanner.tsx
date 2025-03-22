
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from 'lucide-react';
import { CustomerDebt } from '@/contexts/DashboardContext';

interface DebtAlertBannerProps {
  overdueDebts: CustomerDebt[];
}

export function DebtAlertBanner({ overdueDebts }: DebtAlertBannerProps) {
  if (overdueDebts.length === 0) return null;
  
  return (
    <Alert variant="destructive" className="mt-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>ديون متأخرة</AlertTitle>
      <AlertDescription>
        يوجد {overdueDebts.length} من الديون المتأخرة التي تحتاج إلى متابعة
      </AlertDescription>
    </Alert>
  );
}
