
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
} from "@/components/ui/alert-dialog";
import { AddSaleForm } from '@/components/sales/AddSaleForm';
import { SalesCart } from '@/components/sales/SalesCart';
import { useToast } from "@/hooks/use-toast";
import { useApp } from '@/contexts/AppContext';

const SalesPage = () => {
  const { toast } = useToast();
  const { products, sales, setSales, processSale } = useApp();
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isCartDialogOpen, setIsCartDialogOpen] = useState(false);
  const [saleToDelete, setSaleToDelete] = useState<string | null>(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const handleAddSale = () => {
    setIsCartDialogOpen(true);
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

  const handleDeleteSale = (id: string) => {
    setSaleToDelete(id);
    setIsDeleteAlertOpen(true);
  };

  const handleViewInvoice = (saleId: string) => {
    const sale = sales.find(s => s.id === saleId);
    if (sale) {
      // إعداد بيانات الفاتورة
      const invoiceData = {
        number: `INV-${new Date().getFullYear()}-${String(sale.id).padStart(3, '0')}`,
        date: sale.date,
        customerName: sale.customer || "",
        total: sale.totalAmount,
        products: sale.products,
      };
      
      toast({
        title: "عرض الفاتورة",
        description: `تم فتح فاتورة العميل ${sale.customer || ""}`,
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
              onSave={(newSale) => {
                processSale(newSale);
                setIsAddDialogOpen(false);
              }} 
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
                processSale(saleData);
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
