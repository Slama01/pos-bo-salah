
import React from 'react';
import { Separator } from "@/components/ui/separator";
import { Product } from '@/contexts/ProductContext';
import { AddProductToCart, CartProduct } from './AddProductToCart';
import { CustomerInfoForm } from './cart/CustomerInfoForm';
import { CartItemsList } from './cart/CartItemsList';
import { CartSummary } from './cart/CartSummary';
import { CartFooter } from './cart/CartFooter';
import { InsufficientStockAlert } from './cart/InsufficientStockAlert';
import { useSalesCart } from './cart/useSalesCart';

export interface SaleData {
  id: number;
  date: string;
  customer: string;
  total: number;
  items: number;
  status: string;
  products: CartProduct[];
}

interface SalesCartProps {
  products: Product[];
  onComplete: (sale: SaleData) => void;
  onCancel: () => void;
}

export function SalesCart({ products, onComplete, onCancel }: SalesCartProps) {
  const {
    cartItems,
    customerName,
    status,
    isSubmitting,
    insufficientStock,
    setCustomerName,
    setStatus,
    handleAddToCart,
    handleRemoveFromCart,
    handleChangeQuantity,
    handleCompleteSale
  } = useSalesCart(products, onComplete);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* قسم إضافة المنتجات للسلة */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">إضافة منتجات</h3>
        <AddProductToCart products={products} onAddToCart={handleAddToCart} />
      </div>

      {/* قسم السلة */}
      <div className="space-y-4 border rounded-md p-4">
        <h3 className="text-lg font-medium">سلة المشتريات</h3>
        
        <InsufficientStockAlert insufficientStock={insufficientStock} />
        
        <CustomerInfoForm 
          customerName={customerName}
          setCustomerName={setCustomerName}
          status={status}
          setStatus={setStatus}
        />

        <Separator />
        
        <CartItemsList 
          cartItems={cartItems}
          onRemoveFromCart={handleRemoveFromCart}
          onChangeQuantity={handleChangeQuantity}
        />

        <Separator />
        
        <CartSummary cartItems={cartItems} />

        <CartFooter 
          onCancel={onCancel}
          onComplete={handleCompleteSale}
          isSubmitting={isSubmitting}
          isCartEmpty={cartItems.length === 0}
        />
      </div>
    </div>
  );
}
