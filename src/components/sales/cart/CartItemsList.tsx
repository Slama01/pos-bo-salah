
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { CartItem } from '../CartItem';
import { CartProduct } from '../AddProductToCart';

interface CartItemsListProps {
  cartItems: CartProduct[];
  onRemoveFromCart: (id: number) => void;
  onChangeQuantity: (id: number, quantity: number) => void;
}

export function CartItemsList({ 
  cartItems, 
  onRemoveFromCart, 
  onChangeQuantity 
}: CartItemsListProps) {
  return (
    <div className="h-64">
      <ScrollArea className="h-full">
        {cartItems.length > 0 ? (
          <div className="space-y-2">
            {cartItems.map((item) => (
              <CartItem 
                key={item.id}
                id={item.id}
                productName={item.productName}
                quantity={item.quantity}
                price={item.price}
                onRemove={onRemoveFromCart}
                onChangeQuantity={onChangeQuantity}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">لا توجد منتجات في السلة</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
