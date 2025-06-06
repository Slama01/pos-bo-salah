
import { useState } from 'react';
import { Product } from '@/contexts/ProductContext';
import { CartProduct } from '../AddProductToCart';
import { useToast } from "@/hooks/use-toast";
import { SaleData } from '../SalesCart';

export function useSalesCart(products: Product[], onComplete: (sale: SaleData) => void) {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [status, setStatus] = useState("مكتملة");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [insufficientStock, setInsufficientStock] = useState<{productName: string, available: number}[]>([]);

  const handleAddToCart = (product: CartProduct) => {
    // التحقق من توفر المخزون الكافي
    const productInInventory = products.find(p => p.id === product.productId);
    
    if (!productInInventory || productInInventory.stock < product.quantity) {
      const availableStock = productInInventory ? productInInventory.stock : 0;
      
      toast({
        variant: "destructive",
        title: "المخزون غير كافٍ",
        description: `المتوفر من ${product.productName} هو ${availableStock} فقط`,
      });
      return;
    }
    
    // التحقق مما إذا كان المنتج موجودًا بالفعل في السلة
    const existingItemIndex = cartItems.findIndex(
      item => item.productId === product.productId
    );

    if (existingItemIndex >= 0) {
      // التحقق من إجمالي الكمية المطلوبة مع المخزون المتوفر
      const totalQuantity = cartItems[existingItemIndex].quantity + product.quantity;
      
      if (totalQuantity > productInInventory.stock) {
        const remainingStock = productInInventory.stock - cartItems[existingItemIndex].quantity;
        
        toast({
          variant: "destructive",
          title: "المخزون غير كافٍ",
          description: `يمكنك إضافة ${remainingStock} فقط من ${product.productName}`,
        });
        return;
      }
      
      // تحديث الكمية إذا كان المنتج موجودًا بالفعل والمخزون كافٍ
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += product.quantity;
      setCartItems(updatedItems);
      
      toast({
        title: "تم تحديث الكمية",
        description: `تم تحديث كمية ${product.productName} في السلة`,
      });
    } else {
      // إضافة المنتج إذا لم يكن موجودًا والمخزون كافٍ
      setCartItems([...cartItems, product]);
      
      toast({
        title: "تمت الإضافة",
        description: `تمت إضافة ${product.productName} إلى السلة`,
      });
    }
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    setInsufficientStock([]);
  };

  const handleChangeQuantity = (id: number, quantity: number) => {
    const itemIndex = cartItems.findIndex(item => item.id === id);
    const productId = cartItems[itemIndex].productId;
    const productInInventory = products.find(p => p.id === productId);
    
    // التحقق من توفر المخزون الكافي
    if (!productInInventory || quantity > productInInventory.stock) {
      toast({
        variant: "destructive",
        title: "المخزون غير كافٍ",
        description: `المتوفر من ${cartItems[itemIndex].productName} هو ${productInInventory?.stock || 0} فقط`,
      });
      return;
    }
    
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

  const validateStock = (): boolean => {
    const insufficientItems: {productName: string, available: number}[] = [];
    
    for (const item of cartItems) {
      const productInInventory = products.find(p => p.id === item.productId);
      if (!productInInventory || productInInventory.stock < item.quantity) {
        insufficientItems.push({
          productName: item.productName,
          available: productInInventory?.stock || 0
        });
      }
    }
    
    setInsufficientStock(insufficientItems);
    return insufficientItems.length === 0;
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

    // التحقق من توفر المخزون قبل إتمام عملية البيع
    if (!validateStock()) {
      toast({
        variant: "destructive",
        title: "المخزون غير كافٍ",
        description: "الرجاء تعديل الكميات المطلوبة",
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

  return {
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
    handleCompleteSale,
    calculateTotal
  };
}
