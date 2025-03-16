
import React from 'react';
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export interface CartItemProps {
  id: number;
  productName: string;
  quantity: number;
  price: number;
  onRemove: (id: number) => void;
  onChangeQuantity: (id: number, quantity: number) => void;
}

export function CartItem({ 
  id, 
  productName, 
  quantity, 
  price, 
  onRemove, 
  onChangeQuantity 
}: CartItemProps) {
  return (
    <div className="flex items-center justify-between p-2 border-b last:border-0">
      <div className="flex-1">
        <p className="font-medium">{productName}</p>
        <div className="flex justify-between mt-1">
          <div className="flex items-center gap-2">
            <button 
              className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded"
              onClick={() => quantity > 1 && onChangeQuantity(id, quantity - 1)}
            >
              -
            </button>
            <span className="mx-1">{quantity}</span>
            <button 
              className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded"
              onClick={() => onChangeQuantity(id, quantity + 1)}
            >
              +
            </button>
          </div>
          <p className="text-sm text-gray-600">{price} ر.س</p>
        </div>
      </div>
      <p className="mx-4 font-medium">{(price * quantity).toFixed(2)} ر.س</p>
      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => onRemove(id)}
      >
        <Trash2 className="h-4 w-4 text-red-500" />
      </Button>
    </div>
  );
}
