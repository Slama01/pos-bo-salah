
import React, { useState } from 'react';
import SidebarLayout from '@/components/layouts/SidebarLayout';
import { Button } from '@/components/ui/button';
import { Plus, Eye, FileText, Trash2 } from 'lucide-react';
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
  DialogHeader,
  DialogTitle,
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
import { AddSaleForm } from '@/components/sales/AddSaleForm';
import { SalesCart, SaleData } from '@/components/sales/SalesCart';
import { useToast } from "@/hooks/use-toast";

// تعريف أنواع البيانات
interface Product {
  id: number;
  name: string;
  price: number;
}

const SalesPage = () => {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isCartDialogOpen, setIsCartDialogOpen] = useState(false);
  const [saleToDelete, setSaleToDelete] = useState<number | null>(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  
  // بيانات المبيعات النموذجية - في التطبيق الحقيقي ستأتي من API
  const [sales, setSales] = useState<SaleData[]>([
    { 
      id: 1, 
      date: "2023-10-15", 
      customer: "أحمد محمد", 
      total: 4500, 
      items: 3, 
      status: "مكتملة",
      products: [
        { id: 101, productId: 1, productName: "لابتوب HP", quantity: 1, price: 3500 },
        { id: 102, productId: 2, productName: "سماعات بلوتوث", quantity: 2, price: 500 }
      ]
    },
    { 
      id: 2, 
      date: "2023-10-14", 
      customer: "سارة علي", 
      total: 2700, 
      items: 5, 
      status: "مكتملة",
      products: [
        { id: 103, productId: 4, productName: "هاتف ذكي", quantity: 1, price: 2000 },
        { id: 104, productId: 2, productName: "سماعات بلوتوث", quantity: 2, price: 200 },
        { id: 105, productId: 3, productName: "كرسي مكتب", quantity: 1, price: 300 }
      ]
    },
    { 
      id: 3, 
      date: "2023-10-13", 
      customer: "محمد خالد", 
      total: 1200, 
      items: 2, 
      status: "معلقة",
      products: [
        { id: 106, productId: 5, productName: "طاولة خشبية", quantity: 1, price: 650 },
        { id: 107, productId: 3, productName: "كرسي مكتب", quantity: 1, price: 550 }
      ]
    },
    { 
      id: 4, 
      date: "2023-10-12", 
      customer: "فاطمة عمر", 
      total: 3450, 
      items: 4, 
      status: "مكتملة",
      products: [
        { id: 108, productId: 4, productName: "هاتف ذكي", quantity: 1, price: 2000 },
        { id: 109, productId: 2, productName: "سماعات بلوتوث", quantity: 3, price: 150 },
        { id: 110, productId: 1, productName: "لابتوب HP", quantity: 1, price: 1000 }
      ]
    },
    { 
      id: 5, 
      date: "2023-10-10", 
      customer: "خالد سعيد", 
      total: 800, 
      items: 1, 
      status: "ملغية",
      products: [
        { id: 111, productId: 3, productName: "كرسي مكتب", quantity: 1, price: 800 }
      ]
    },
  ]);

  // بيانات المنتجات النموذجية - في التطبيق الحقيقي ستأتي من API
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "لابتوب HP", price: 3500 },
    { id: 2, name: "سماعات بلوتوث", price: 200 },
    { id: 3, name: "كرسي مكتب", price: 450 },
    { id: 4, name: "هاتف ذكي", price: 2000 },
    { id: 5, name: "طاولة خشبية", price: 650 },
  ]);

  const handleAddSale = () => {
    setIsCartDialogOpen(true);
  };

  const handleSaveSale = (newSale: any) => {
    setSales([newSale, ...sales]);
  };

  const handleDeleteConfirm = () => {
    if (saleToDelete !== null) {
      setSales(sales.filter(sale => sale.id !== saleToDelete));
      toast({
        title: "تم الحذف",
        description: "تم حذف عملية البيع بنجاح",
      });
      setIsDeleteAlertOpen(false);
      setSaleToDelete(null);
    }
  };

  const handleDeleteSale = (id: number) => {
    setSaleToDelete(id);
    setIsDeleteAlertOpen(true);
  };

  const handleViewInvoice = (saleId: number) => {
    const sale = sales.find(s => s.id === saleId);
    if (sale) {
      // إعداد بيانات الفاتورة
      const invoiceData = {
        number: `INV-${new Date().getFullYear()}-${String(sale.id).padStart(3, '0')}`,
        date: sale.date,
        customerName: sale.customer,
        total: sale.total,
        products: sale.products,
      };
      
      toast({
        title: "عرض الفاتورة",
        description: `تم فتح فاتورة العميل ${sale.customer}`,
      });
      
      // في النسخة الحقيقية يمكن توجيه المستخدم لصفحة الفاتورة
      console.log("Invoice Data:", invoiceData);
    }
  };

  return (
    <SidebarLayout>
      <div className="flex flex-col p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">المبيعات</h1>
          <Button onClick={handleAddSale}>
            <Plus className="mr-2 h-4 w-4" />
            إضافة عملية بيع
          </Button>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableCaption>سجل عمليات البيع</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">رقم العملية</TableHead>
                <TableHead className="text-right">التاريخ</TableHead>
                <TableHead className="text-right">العميل</TableHead>
                <TableHead className="text-right">إجمالي المبلغ</TableHead>
                <TableHead className="text-right">عدد المنتجات</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="font-medium">{sale.id}</TableCell>
                  <TableCell>{sale.date}</TableCell>
                  <TableCell>{sale.customer}</TableCell>
                  <TableCell>{sale.total.toFixed(2)} ₪</TableCell>
                  <TableCell>{sale.items}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      sale.status === "مكتملة" ? "bg-green-100 text-green-800" :
                      sale.status === "معلقة" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {sale.status}
                    </span>
                  </TableCell>
                  <TableCell className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewInvoice(sale.id)}
                    >
                      <Eye className="ml-1 h-4 w-4" />
                      عرض
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewInvoice(sale.id)}
                    >
                      <FileText className="ml-1 h-4 w-4" />
                      الفاتورة
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteSale(sale.id)}
                    >
                      <Trash2 className="ml-1 h-4 w-4" />
                      حذف
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* نافذة إضافة عملية بيع جديدة (الطريقة القديمة) */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-right">إضافة عملية بيع جديدة</DialogTitle>
            </DialogHeader>
            <AddSaleForm 
              onClose={() => setIsAddDialogOpen(false)} 
              onSave={handleSaveSale} 
            />
          </DialogContent>
        </Dialog>

        {/* نافذة سلة المشتريات (الطريقة الجديدة) */}
        <Dialog open={isCartDialogOpen} onOpenChange={setIsCartDialogOpen}>
          <DialogContent className="sm:max-w-[900px]">
            <DialogHeader>
              <DialogTitle className="text-right">إضافة عملية بيع جديدة مع سلة المشتريات</DialogTitle>
            </DialogHeader>
            <SalesCart 
              products={products}
              onComplete={(saleData) => {
                setSales([saleData, ...sales]);
                setIsCartDialogOpen(false);
              }}
              onCancel={() => setIsCartDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>

        {/* مربع حوار تأكيد الحذف */}
        <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
              <AlertDialogDescription>
                هل أنت متأكد من رغبتك في حذف عملية البيع هذه؟ لا يمكن التراجع عن هذا الإجراء.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setSaleToDelete(null)}>إلغاء</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteConfirm}>تأكيد الحذف</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </SidebarLayout>
  );
};

export default SalesPage;
