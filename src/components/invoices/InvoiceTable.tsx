
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import PrintInvoice from "@/components/print/PrintInvoice";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Eye, Download, Copy, MoreVertical, Printer, Send, FileOutput, FileX } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

export interface Invoice {
  id: string;
  date: string;
  dueDate: string;
  customer: string;
  email: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
}

export function InvoiceTable() {
  const { toast } = useToast();
  
  const [invoices, setInvoices] = useState<Invoice[]>([
    { 
      id: "INV-2023-001", 
      date: "2023-12-15", 
      dueDate: "2023-12-30", 
      customer: "شركة الأمل للتجارة", 
      email: "info@alamal.com", 
      amount: 12500, 
      status: "paid" 
    },
    { 
      id: "INV-2023-002", 
      date: "2023-12-10", 
      dueDate: "2023-12-25", 
      customer: "مؤسسة الفجر", 
      email: "info@alfajr.com", 
      amount: 7800, 
      status: "paid" 
    },
    { 
      id: "INV-2023-003", 
      date: "2023-12-05", 
      dueDate: "2023-12-20", 
      customer: "شركة النور للإلكترونيات", 
      email: "accounts@alnoor.com", 
      amount: 5400, 
      status: "pending" 
    },
    { 
      id: "INV-2023-004", 
      date: "2023-11-28", 
      dueDate: "2023-12-13", 
      customer: "مكتبة المعرفة", 
      email: "finance@almarifa.com", 
      amount: 3200, 
      status: "overdue" 
    },
    { 
      id: "INV-2023-005", 
      date: "2023-11-20", 
      dueDate: "2023-12-05", 
      customer: "مطعم السلطان", 
      email: "info@sultan-rest.com", 
      amount: 1800, 
      status: "overdue" 
    },
  ]);

  const getStatusBadge = (status: Invoice['status']) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">مدفوعة</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">قيد الانتظار</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">متأخرة</Badge>;
      default:
        return null;
    }
  };

  const handleViewInvoice = (invoice: Invoice) => {
    toast({
      title: "عرض الفاتورة",
      description: `جاري عرض الفاتورة ${invoice.id}`,
    });
  };

  const handleDownloadInvoice = (invoice: Invoice) => {
    toast({
      title: "تحميل الفاتورة",
      description: `جاري تحميل الفاتورة ${invoice.id}`,
    });
  };

  const handleSendInvoice = (invoice: Invoice) => {
    toast({
      title: "إرسال الفاتورة",
      description: `تم إرسال الفاتورة ${invoice.id} إلى ${invoice.email}`,
    });
  };

  const handleMarkAsPaid = (invoiceId: string) => {
    setInvoices(
      invoices.map((invoice) =>
        invoice.id === invoiceId ? { ...invoice, status: 'paid' as const } : invoice
      )
    );
    
    toast({
      title: "تم تحديث الحالة",
      description: `تم تعديل حالة الفاتورة ${invoiceId} إلى مدفوعة`,
    });
  };

  const handleMarkAsVoid = (invoiceId: string) => {
    toast({
      title: "تم إلغاء الفاتورة",
      description: `تم إلغاء الفاتورة ${invoiceId}`,
    });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableCaption>قائمة الفواتير</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">رقم الفاتورة</TableHead>
            <TableHead className="text-right">التاريخ</TableHead>
            <TableHead className="text-right">تاريخ الاستحقاق</TableHead>
            <TableHead className="text-right">العميل</TableHead>
            <TableHead className="text-right">المبلغ</TableHead>
            <TableHead className="text-right">الحالة</TableHead>
            <TableHead className="text-right">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.id}</TableCell>
              <TableCell>{invoice.date}</TableCell>
              <TableCell>{invoice.dueDate}</TableCell>
              <TableCell>
                <div>
                  <p>{invoice.customer}</p>
                  <p className="text-sm text-muted-foreground">{invoice.email}</p>
                </div>
              </TableCell>
              <TableCell>{invoice.amount.toLocaleString()} ₪</TableCell>
              <TableCell>{getStatusBadge(invoice.status)}</TableCell>
              <TableCell>
                <div className="flex space-x-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewInvoice(invoice)}
                  >
                    <Eye className="h-4 w-4 ml-1" />
                    عرض
                  </Button>
                  
                  <PrintInvoice 
                    invoiceId={invoice.id}
                    customerName={invoice.customer}
                  />
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>خيارات الفاتورة</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleDownloadInvoice(invoice)}>
                        <Download className="ml-2 h-4 w-4" />
                        <span>تحميل PDF</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSendInvoice(invoice)}>
                        <Send className="ml-2 h-4 w-4" />
                        <span>إرسال بالبريد</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigator.clipboard.writeText(invoice.id)}>
                        <Copy className="ml-2 h-4 w-4" />
                        <span>نسخ الرقم</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {invoice.status !== 'paid' && (
                        <DropdownMenuItem onClick={() => handleMarkAsPaid(invoice.id)}>
                          <FileOutput className="ml-2 h-4 w-4" />
                          <span>تعيين كمدفوعة</span>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem 
                        onClick={() => handleMarkAsVoid(invoice.id)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <FileX className="ml-2 h-4 w-4" />
                        <span>إلغاء الفاتورة</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
