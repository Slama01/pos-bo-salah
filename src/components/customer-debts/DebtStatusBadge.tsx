
import React from 'react';

interface DebtStatusBadgeProps {
  status: string;
}

export function DebtStatusBadge({ status }: DebtStatusBadgeProps) {
  return (
    <span className={`px-2 py-1 rounded-full text-xs ${
      status === "معلق" ? "bg-yellow-100 text-yellow-800" :
      status === "مدفوع جزئياً" ? "bg-blue-100 text-blue-800" :
      "bg-green-100 text-green-800"
    }`}>
      {status}
    </span>
  );
}
