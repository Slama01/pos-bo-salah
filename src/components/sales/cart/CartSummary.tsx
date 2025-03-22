
import React from 'react';
import { CartProduct } from '../AddProductToCart';

interface CartSummaryProps {
  cartItems: CartProduct[];
}

export function CartSummary({ cartItems }: CartSummaryProps) {
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + (item.price * item.quantity), 
      0
    );
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span>المجموع:</span>
        <span className="font-bold">{calculateTotal().toFixed(2)} ₪</span>
      </div>
      <div className="flex justify-between">
        <span>عدد المنتجات:</span>
        <span>{cartItems.reduce((count, item) => count + item.quantity, 0)}</span>
      </div>
    </div>
  );
}
