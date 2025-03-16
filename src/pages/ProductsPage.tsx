
import React, { useState } from 'react';
import SidebarLayout from '@/components/layouts/SidebarLayout';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

const ProductsPage = () => {
  // بيانات المنتجات النموذجية - في التطبيق الحقيقي ستأتي من API
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "لابتوب HP", category: "إلكترونيات", price: 3500, stock: 15 },
    { id: 2, name: "سماعات بلوتوث", category: "إلكترونيات", price: 200, stock: 50 },
    { id: 3, name: "كرسي مكتب", category: "أثاث", price: 450, stock: 8 },
    { id: 4, name: "هاتف ذكي", category: "إلكترونيات", price: 2000, stock: 25 },
    { id: 5, name: "طاولة خشبية", category: "أثاث", price: 650, stock: 5 },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    category: '',
    price: 0,
    stock: 0
  });

  // إضافة منتج جديد
  const handleAddProduct = () => {
    const productToAdd = {
      ...newProduct,
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1
    };
    
    setProducts([...products, productToAdd]);
    setNewProduct({ name: '', category: '', price: 0, stock: 0 });
    setIsAddDialogOpen(false);
    toast({
      title: "تمت الإضافة بنجاح",
      description: `تمت إضافة ${productToAdd.name} إلى قائمة المنتجات`,
    });
  };

  // تعديل منتج
  const handleEditProduct = () => {
    if (!currentProduct) return;
    
    const updatedProducts = products.map(product => 
      product.id === currentProduct.id ? currentProduct : product
    );
    
    setProducts(updatedProducts);
    setIsEditDialogOpen(false);
    toast({
      title: "تم التعديل بنجاح",
      description: `تم تحديث بيانات ${currentProduct.name}`,
    });
  };

  // حذف منتج
  const handleDeleteProduct = (id: number) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    toast({
      title: "تم الحذف بنجاح",
      description: "تم حذف المنتج من قائمة المنتجات",
      variant: "destructive",
    });
  };

  // تحضير المنتج للتعديل
  const prepareProductForEdit = (product: Product) => {
    setCurrentProduct({ ...product });
    setIsEditDialogOpen(true);
  };

  return (
    <SidebarLayout>
      <div className="flex flex-col p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">المنتجات</h1>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="ml-2 h-4 w-4" />
                إضافة منتج
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>إضافة منتج جديد</DialogTitle>
                <DialogDescription>
                  أدخل بيانات المنتج الجديد هنا. اضغط على حفظ عند الانتهاء.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    اسم المنتج
                  </Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    التصنيف
                  </Label>
                  <Input
                    id="category"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    السعر
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="stock" className="text-right">
                    المخزون
                  </Label>
                  <Input
                    id="stock"
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddProduct}>
                  حفظ
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableCaption>قائمة المنتجات المتوفرة</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">الرقم</TableHead>
                <TableHead className="text-right">اسم المنتج</TableHead>
                <TableHead className="text-right">التصنيف</TableHead>
                <TableHead className="text-right">السعر</TableHead>
                <TableHead className="text-right">المخزون</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.price} ر.س</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => prepareProductForEdit(product)}
                      >
                        <Pencil className="h-4 w-4 ml-1" />
                        تعديل
                      </Button>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4 ml-1" />
                            حذف
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
                            <AlertDialogDescription>
                              هذا الإجراء لا يمكن التراجع عنه. سيؤدي هذا إلى حذف المنتج
                              بشكل دائم من قاعدة البيانات الخاصة بك.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>إلغاء</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteProduct(product.id)}>
                              تأكيد الحذف
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* مربع حوار تعديل المنتج */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>تعديل المنتج</DialogTitle>
            <DialogDescription>
              قم بتعديل بيانات المنتج. اضغط على حفظ التغييرات عند الانتهاء.
            </DialogDescription>
          </DialogHeader>
          {currentProduct && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  اسم المنتج
                </Label>
                <Input
                  id="edit-name"
                  value={currentProduct.name}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-category" className="text-right">
                  التصنيف
                </Label>
                <Input
                  id="edit-category"
                  value={currentProduct.category}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-price" className="text-right">
                  السعر
                </Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={currentProduct.price}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, price: Number(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-stock" className="text-right">
                  المخزون
                </Label>
                <Input
                  id="edit-stock"
                  type="number"
                  value={currentProduct.stock}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, stock: Number(e.target.value) })}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="submit" onClick={handleEditProduct}>
              حفظ التغييرات
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarLayout>
  );
};

export default ProductsPage;
