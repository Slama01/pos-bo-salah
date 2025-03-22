
import React from 'react';
import { Button } from "@/components/ui/button";

interface CartFooterProps {
  onCancel: () => void;
  onComplete: () => void;
  isSubmitting: boolean;
  isCartEmpty: boolean;
}

export function CartFooter({ 
  onCancel, 
  onComplete, 
  isSubmitting, 
  isCartEmpty 
}: CartFooterProps) {
  return (
    <div className="flex justify-end space-x-2 pt-4">
      <Button 
        variant="outline" 
        onClick={onCancel}
        className="ml-2"
      >
        إلغاء
      </Button>
      <Button 
        onClick={onComplete}
        disabled={isSubmitting || isCartEmpty}
      >
        {isSubmitting ? "جاري الإتمام..." : "إتمام عملية البيع"}
      </Button>
    </div>
  );
}
