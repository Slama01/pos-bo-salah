
import React, { useState } from 'react';
import SidebarLayout from '@/components/layouts/SidebarLayout';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
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
import { AddCustomerForm } from '@/components/customers/AddCustomerForm';
import { useToast } from "@/hooks/use-toast";

const CustomersPage = () => {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  // بيانات العملاء النموذجية - في التطبيق الحقيقي ستأتي من API
  const [customers, setCustomers] = useState([
    { id: 1, name: "أحمد محمد علي", phone: "0512345678", email: "ahmed@example.com", totalPurchases: 12500, lastPurchase: "2023-10-10" },
    { id: 2, name: "سارة خالد العمري", phone: "0523456789", email: "sara@example.com", totalPurchases: 8700, lastPurchase: "2023-10-05" },
    { id: 3, name: "محمد عبدالله القحطاني", phone: "0534567890", email: "mohammed@example.com", totalPurchases: 5200, lastPurchase: "2023-09-30" },
    { id: 4, name: "فاطمة علي الشمري", phone: "0545678901", email: "fatima@example.com", totalPurchases: 14600, lastPurchase: "2023-09-25" },
    { id: 5, name: "خالد سعيد الدوسري", phone: "0556789012", email: "khaled@example.com", totalPurchases: 3800, lastPurchase: "2023-09-20" },
  ]);

  const handleAddCustomer = () => {
    setIsAddDialogOpen(true);
  };

  const handleSaveCustomer = (newCustomer: any) => {
    setCustomers([newCustomer, ...customers]);
  };

  const handleDeleteCustomer = (id: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذا العميل؟")) {
      setCustomers(customers.filter(customer => customer.id !== id));
      toast({
        title: "تم الحذف",
        description: "تم حذف العميل بنجاح",
      });
    }
  };

  return (
    <SidebarLayout>
      <div className="flex flex-col p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">العملاء</h1>
          <Button onClick={handleAddCustomer}>
            <Plus className="mr-2 h-4 w-4" />
            إضافة عميل
          </Button>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableCaption>قائمة العملاء</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">الرقم</TableHead>
                <TableHead className="text-right">الاسم</TableHead>
                <TableHead className="text-right">رقم الهاتف</TableHead>
                <TableHead className="text-right">البريد الإلكتروني</TableHead>
                <TableHead className="text-right">إجمالي المشتريات</TableHead>
                <TableHead className="text-right">آخر عملية شراء</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.id}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell><a href={`tel:${customer.phone}`} className="text-blue-600 hover:underline">{customer.phone}</a></TableCell>
                  <TableCell><a href={`mailto:${customer.email}`} className="text-blue-600 hover:underline">{customer.email}</a></TableCell>
                  <TableCell>{customer.totalPurchases} ر.س</TableCell>
                  <TableCell>{customer.lastPurchase}</TableCell>
                  <TableCell className="flex space-x-2">
                    <Button variant="outline" size="sm">عرض</Button>
                    <Button variant="outline" size="sm">تعديل</Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteCustomer(customer.id)}
                    >
                      حذف
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* نافذة إضافة عميل جديد */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-right">إضافة عميل جديد</DialogTitle>
            </DialogHeader>
            <AddCustomerForm 
              onClose={() => setIsAddDialogOpen(false)} 
              onSave={handleSaveCustomer} 
            />
          </DialogContent>
        </Dialog>
      </div>
    </SidebarLayout>
  );
};

export default CustomersPage;
