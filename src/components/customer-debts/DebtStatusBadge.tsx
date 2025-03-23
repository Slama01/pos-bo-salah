
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';

interface DebtStatusBadgeProps {
  status: string;
}

export function DebtStatusBadge({ status }: DebtStatusBadgeProps) {
  return (
    <Badge className={cn(
      "px-2 py-1 text-xs font-medium capitalize",
      status === "معلق" ? "bg-yellow-200 text-yellow-800 hover:bg-yellow-200" :
      status === "مدفوع جزئياً" ? "bg-blue-200 text-blue-800 hover:bg-blue-200" :
      status === "متأخر" ? "bg-red-200 text-red-800 hover:bg-red-200" :
      "bg-green-200 text-green-800 hover:bg-green-200"
    )}>
      {status}
    </Badge>
  );
}
