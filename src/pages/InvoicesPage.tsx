
import React, { useState } from 'react';
import SidebarLayout from '@/components/layouts/SidebarLayout';
import { Button } from '@/components/ui/button';
import { Plus, Printer, Download, Eye } from 'lucide-react';
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface Invoice {
  id: number;
  number: string;
  date: string;
  customerName: string;
  total: number;
  status: string;
  saleId: number;
}

const InvoicesPage = () => {
  const { toast } = useToast();
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  // بيانات الفواتير النموذجية - في التطبيق الحقيقي ستأتي من API
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: 1,
      number: "INV-2023-001",
      date: "2023-10-15",
      customerName: "أحمد محمد",
      total: 4500,
      status: "مدفوعة",
      saleId: 1,
    },
    {
      id: 2,
      number: "INV-2023-002",
      date: "2023-10-14",
      customerName: "سارة علي",
      total: 2700,
      status: "مدفوعة",
      saleId: 2,
    },
    {
      id: 3,
      number: "INV-2023-003",
      date: "2023-10-13",
      customerName: "محمد خالد",
      total: 1200,
      status: "غير مدفوعة",
      saleId: 3,
    },
    {
      id: 4,
      number: "INV-2023-004",
      date: "2023-10-12",
      customerName: "فاطمة عمر",
      total: 3450,
      status: "مدفوعة",
      saleId: 4,
    },
  ]);

  // فتح الفاتورة للعرض
  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsViewDialogOpen(true);
  };

  // طباعة الفاتورة
  const handlePrintInvoice = (invoice: Invoice) => {
    toast({
      title: "جارِ الطباعة",
      description: `جارِ طباعة الفاتورة ${invoice.number}`,
    });
    // في الإصدار الحقيقي سيتم هنا فتح نافذة الطباعة
    window.print();
  };

  // تنزيل الفاتورة
  const handleDownloadInvoice = (invoice: Invoice) => {
    toast({
      title: "جارِ التنزيل",
      description: `جارِ تنزيل الفاتورة ${invoice.number}`,
    });
    // في الإصدار الحقيقي سيتم هنا تنزيل ملف PDF
  };

  // إنشاء فاتورة جديدة
  const handleCreateInvoice = () => {
    const newId = invoices.length > 0 ? Math.max(...invoices.map(inv => inv.id)) + 1 : 1;
    const newInvoice: Invoice = {
      id: newId,
      number: `INV-${new Date().getFullYear()}-${String(newId).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      customerName: "عميل جديد",
      total: 0,
      status: "غير مدفوعة",
      saleId: 0
    };
    
    setInvoices([newInvoice, ...invoices]);
    
    toast({
      title: "تم إنشاء فاتورة جديدة",
      description: `تم إنشاء الفاتورة رقم ${newInvoice.number} بنجاح`,
    });
    
    setSelectedInvoice(newInvoice);
    setIsViewDialogOpen(true);
  };

  // حذف فاتورة
  const handleDeleteInvoice = (id: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذه الفاتورة؟")) {
      setInvoices(invoices.filter(invoice => invoice.id !== id));
      toast({
        title: "تم الحذف",
        description: "تم حذف الفاتورة بنجاح",
        variant: "destructive",
      });
    }
  };

  return (
    <SidebarLayout>
      <div className="flex flex-col p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">الفواتير</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => {
              toast({
                title: "طباعة الكل",
                description: "جارِ طباعة جميع الفواتير",
              });
              window.print();
            }}>
              <Printer className="mr-2 h-4 w-4" />
              طباعة الكل
            </Button>
            <Button onClick={handleCreateInvoice}>
              <Plus className="mr-2 h-4 w-4" />
              إنشاء فاتورة
            </Button>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableCaption>قائمة الفواتير</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">رقم الفاتورة</TableHead>
                <TableHead className="text-right">التاريخ</TableHead>
                <TableHead className="text-right">العميل</TableHead>
                <TableHead className="text-right">المبلغ الإجمالي</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.number}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.customerName}</TableCell>
                  <TableCell>{invoice.total.toFixed(2)} ₪</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      invoice.status === "مدفوعة" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {invoice.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewInvoice(invoice)}
                      >
                        <Eye className="ml-1 h-4 w-4" />
                        عرض
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handlePrintInvoice(invoice)}
                      >
                        <Printer className="ml-1 h-4 w-4" />
                        طباعة
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownloadInvoice(invoice)}
                      >
                        <Download className="ml-1 h-4 w-4" />
                        تنزيل
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteInvoice(invoice.id)}
                      >
                        حذف
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* نافذة عرض الفاتورة */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>
                {selectedInvoice ? `الفاتورة رقم: ${selectedInvoice.number}` : "عرض الفاتورة"}
              </DialogTitle>
              <DialogDescription>
                تفاصيل الفاتورة وبنودها
              </DialogDescription>
            </DialogHeader>
            
            {selectedInvoice && (
              <div className="space-y-4">
                <div className="border rounded-md p-4 space-y-2">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold">بيانات الفاتورة</h3>
                      <p>رقم الفاتورة: {selectedInvoice.number}</p>
                      <p>التاريخ: {selectedInvoice.date}</p>
                      <p>حالة الدفع: {selectedInvoice.status}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">بيانات العميل</h3>
                      <p>الاسم: {selectedInvoice.customerName}</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-semibold mb-2">بنود الفاتورة</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-right">المنتج</TableHead>
                        <TableHead className="text-right">الكمية</TableHead>
                        <TableHead className="text-right">السعر</TableHead>
                        <TableHead className="text-right">الإجمالي</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {/* في الإصدار الحقيقي ستأتي بنود الفاتورة من API */}
                      <TableRow>
                        <TableCell>منتج تجريبي 1</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>500 ₪</TableCell>
                        <TableCell>1000 ₪</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>منتج تجريبي 2</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>1500 ₪</TableCell>
                        <TableCell>1500 ₪</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                <div className="flex justify-between border-t pt-2">
                  <div></div>
                  <div className="text-right">
                    <p>المجموع: {selectedInvoice.total.toFixed(2)} ₪</p>
                    <p>الضريبة (15%): {(selectedInvoice.total * 0.15).toFixed(2)} ₪</p>
                    <p className="font-bold">الإجمالي: {(selectedInvoice.total * 1.15).toFixed(2)} ₪</p>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => handlePrintInvoice(selectedInvoice)}
                  >
                    <Printer className="ml-1 h-4 w-4" />
                    طباعة
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleDownloadInvoice(selectedInvoice)}
                  >
                    <Download className="ml-1 h-4 w-4" />
                    تنزيل
                  </Button>
                  <Button
                    onClick={() => setIsViewDialogOpen(false)}
                  >
                    إغلاق
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </SidebarLayout>
  );
};

export default InvoicesPage;
