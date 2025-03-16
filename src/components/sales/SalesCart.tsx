
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AddProductToCart, CartProduct, Product } from './AddProductToCart';
import { CartItem } from './CartItem';
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [status, setStatus] = useState("مكتملة");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddToCart = (product: CartProduct) => {
    // التحقق مما إذا كان المنتج موجودًا بالفعل في السلة
    const existingItemIndex = cartItems.findIndex(
      item => item.productId === product.productId
    );

    if (existingItemIndex >= 0) {
      // تحديث الكمية إذا كان المنتج موجودًا بالفعل
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += product.quantity;
      setCartItems(updatedItems);
      
      toast({
        title: "تم تحديث الكمية",
        description: `تم تحديث كمية ${product.productName} في السلة`,
      });
    } else {
      // إضافة المنتج إذا لم يكن موجودًا
      setCartItems([...cartItems, product]);
      
      toast({
        title: "تمت الإضافة",
        description: `تمت إضافة ${product.productName} إلى السلة`,
      });
    }
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleChangeQuantity = (id: number, quantity: number) => {
    setCartItems(
      cartItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + (item.price * item.quantity), 
      0
    );
  };

  const handleCompleteSale = () => {
    if (cartItems.length === 0) {
      toast({
        variant: "destructive",
        title: "السلة فارغة",
        description: "الرجاء إضافة منتجات إلى السلة قبل إتمام عملية البيع",
      });
      return;
    }

    if (!customerName.trim()) {
      toast({
        variant: "destructive",
        title: "بيانات ناقصة",
        description: "الرجاء إدخال اسم العميل",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const saleData: SaleData = {
        id: Math.floor(Math.random() * 1000) + 5,
        date: new Date().toISOString().split('T')[0],
        customer: customerName,
        total: calculateTotal(),
        items: cartItems.reduce((count, item) => count + item.quantity, 0),
        status: status,
        products: [...cartItems],
      };

      onComplete(saleData);
      
      toast({
        title: "تمت العملية بنجاح",
        description: "تم إتمام عملية البيع وإنشاء الفاتورة بنجاح",
      });
    } catch (error) {
      console.error("فشل إتمام عملية البيع:", error);
      toast({
        variant: "destructive",
        title: "حدث خطأ",
        description: "فشل إتمام عملية البيع. الرجاء المحاولة مرة أخرى.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
        
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="customer-name">اسم العميل</Label>
            <Input 
              id="customer-name" 
              value={customerName} 
              onChange={(e) => setCustomerName(e.target.value)} 
              placeholder="أدخل اسم العميل" 
            />
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="status">حالة البيع</Label>
            <Select 
              value={status} 
              onValueChange={setStatus}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="اختر حالة البيع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="مكتملة">مكتملة</SelectItem>
                <SelectItem value="معلقة">معلقة</SelectItem>
                <SelectItem value="ملغية">ملغية</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />
        
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
                    onRemove={handleRemoveFromCart}
                    onChangeQuantity={handleChangeQuantity}
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

        <Separator />
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>المجموع:</span>
            <span className="font-bold">{calculateTotal().toFixed(2)} ر.س</span>
          </div>
          <div className="flex justify-between">
            <span>عدد المنتجات:</span>
            <span>{cartItems.reduce((count, item) => count + item.quantity, 0)}</span>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button 
            variant="outline" 
            onClick={onCancel}
            className="ml-2"
          >
            إلغاء
          </Button>
          <Button 
            onClick={handleCompleteSale}
            disabled={isSubmitting || cartItems.length === 0}
          >
            {isSubmitting ? "جاري الإتمام..." : "إتمام عملية البيع"}
          </Button>
        </div>
      </div>
    </div>
  );
}
