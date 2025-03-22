
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface InsufficientStockAlertProps {
  insufficientStock: {productName: string, available: number}[];
}

export function InsufficientStockAlert({ insufficientStock }: InsufficientStockAlertProps) {
  if (insufficientStock.length === 0) {
    return null;
  }
  
  return (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>المخزون غير كافٍ</AlertTitle>
      <AlertDescription>
        <ul className="list-disc mr-6 mt-2">
          {insufficientStock.map((item, index) => (
            <li key={index}>
              {item.productName}: المتوفر {item.available} فقط
            </li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
}
