import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product } from '@/contexts/ProductContext';

// Define the cart product interface
export interface CartProduct {
  id: number;
  productId: string;  // Changed from number to string to match Product.id
  productName: string;
  quantity: number;
  price: number;
}

// Schema validation
const addProductSchema = z.object({
  productId: z.string().min(1, { message: "الرجاء اختيار منتج" }),
  quantity: z.coerce.number().min(1, { message: "الرجاء إدخال كمية صحيحة" }),
});

type AddProductFormValues = z.infer<typeof addProductSchema>;

interface AddProductToCartProps {
  products: Product[];
  onAddToCart: (product: CartProduct) => void;
}

export function AddProductToCart({ products, onAddToCart }: AddProductToCartProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const form = useForm<AddProductFormValues>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      productId: "",
      quantity: 1,
    },
  });

  const handleProductChange = (productId: string) => {
    const product = products.find(p => p.id === productId);
    setSelectedProduct(product || null);
    form.setValue("productId", productId);
  };

  const onSubmit = (data: AddProductFormValues) => {
    if (!selectedProduct) return;

    const cartItem: CartProduct = {
      id: Math.floor(Math.random() * 10000),
      productId: data.productId,
      productName: selectedProduct.name,
      quantity: data.quantity,
      price: selectedProduct.price,
    };

    onAddToCart(cartItem);
    form.reset({ productId: "", quantity: 1 });
    setSelectedProduct(null);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>المنتج</FormLabel>
                <Select 
                  onValueChange={handleProductChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر منتج" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id.toString()}>
                        {product.name} - {product.price} ₪
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الكمية</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="1" 
                    {...field} 
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button 
          type="submit" 
          disabled={!selectedProduct}
          className="mt-2"
        >
          إضافة إلى السلة
        </Button>
      </form>
    </Form>
  );
}
