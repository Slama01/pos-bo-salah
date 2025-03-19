
import React, { useState } from 'react';
import SidebarLayout from '@/components/layouts/SidebarLayout';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { useAppContext, CustomerDebt } from '@/contexts/AppContext';
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
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { 
  Wallet, 
  Receipt, 
  AlertTriangle, 
  Check, 
  CircleAlert, 
  Clock 
} from 'lucide-react';

const CustomerDebtsPage = () => {
  const { toast } = useToast();
  const { customerDebts, updateDebtStatus } = useAppContext();
  
  const [selectedDebt, setSelectedDebt] = useState<CustomerDebt | null>(null);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);

  const today = new Date().toISOString().split('T')[0];
  const overdueDebts = customerDebts.filter(
    debt => debt.status !== "مدفوع بالكامل" && debt.dueDate < today
  );
  const activeDebts = customerDebts.filter(
    debt => debt.status !== "مدفوع بالكامل" && debt.dueDate >= today
  );
  const paidDebts = customerDebts.filter(
    debt => debt.status === "مدفوع بالكامل"
  );

  const totalDebtAmount = customerDebts
    .filter(debt => debt.status !== "مدفوع بالكامل")
    .reduce((total, debt) => total + debt.remainingAmount, 0);

  const handlePayment = (debt: CustomerDebt) => {
    setSelectedDebt(debt);
    setPaymentAmount(debt.remainingAmount);
    setIsPaymentDialogOpen(true);
  };

  const processPayment = () => {
    if (!selectedDebt) return;
    
    if (paymentAmount <= 0 || paymentAmount > selectedDebt.remainingAmount) {
      toast({
        variant: "destructive",
        title: "قيمة غير صالحة",
        description: "الرجاء إدخال قيمة صالحة للدفع"
      });
      return;
    }
    
    updateDebtStatus(
      selectedDebt.id, 
      paymentAmount === selectedDebt.remainingAmount ? "مدفوع بالكامل" : "مدفوع جزئياً",
      paymentAmount
    );
    
    toast({
      title: "تم تسجيل الدفعة",
      description: `تم تسجيل دفعة بقيمة ${paymentAmount} ₪ لـ ${selectedDebt.customerName}`
    });
    
    setIsPaymentDialogOpen(false);
    setSelectedDebt(null);
    setPaymentAmount(0);
  };

  return (
    <SidebarLayout>
      <div className="flex flex-col p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">ديون العملاء</h1>
          <div className="flex items-center gap-4">
            <div className="text-lg">
              إجمالي الديون: <span className="font-bold">{totalDebtAmount.toFixed(2)} ₪</span>
            </div>
          </div>
        </div>
        
        {overdueDebts.length > 0 && (
          <Alert variant="destructive" className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>ديون متأخرة</AlertTitle>
            <AlertDescription>
              يوجد {overdueDebts.length} من الديون المتأخرة التي تحتاج إلى متابعة
            </AlertDescription>
          </Alert>
        )}
        
        {/* ديون متأخرة */}
        {overdueDebts.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CircleAlert className="text-red-500 h-5 w-5" />
              <h2 className="text-lg font-medium">ديون متأخرة</h2>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableCaption>الديون المتأخرة عن موعد السداد</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">الرقم</TableHead>
                    <TableHead className="text-right">العميل</TableHead>
                    <TableHead className="text-right">المبلغ الإجمالي</TableHead>
                    <TableHead className="text-right">المبلغ المتبقي</TableHead>
                    <TableHead className="text-right">تاريخ الدين</TableHead>
                    <TableHead className="text-right">تاريخ الاستحقاق</TableHead>
                    <TableHead className="text-right">الوصف</TableHead>
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {overdueDebts.map((debt) => (
                    <TableRow key={debt.id}>
                      <TableCell className="font-medium">{debt.id}</TableCell>
                      <TableCell>{debt.customerName}</TableCell>
                      <TableCell>{debt.amount.toFixed(2)} ₪</TableCell>
                      <TableCell className="text-red-600 font-bold">{debt.remainingAmount.toFixed(2)} ₪</TableCell>
                      <TableCell>{debt.date}</TableCell>
                      <TableCell className="text-red-600 font-bold">{debt.dueDate}</TableCell>
                      <TableCell>{debt.description || "-"}</TableCell>
                      <TableCell>
                        <Button 
                          variant="default" 
                          size="sm"
                          onClick={() => handlePayment(debt)}
                        >
                          <Receipt className="ml-1 h-4 w-4" />
                          تسجيل دفعة
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
        
        {/* ديون نشطة */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="text-amber-500 h-5 w-5" />
            <h2 className="text-lg font-medium">ديون نشطة</h2>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableCaption>الديون النشطة غير المتأخرة</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">الرقم</TableHead>
                  <TableHead className="text-right">العميل</TableHead>
                  <TableHead className="text-right">المبلغ الإجمالي</TableHead>
                  <TableHead className="text-right">المبلغ المتبقي</TableHead>
                  <TableHead className="text-right">تاريخ الدين</TableHead>
                  <TableHead className="text-right">تاريخ الاستحقاق</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeDebts.map((debt) => (
                  <TableRow key={debt.id}>
                    <TableCell className="font-medium">{debt.id}</TableCell>
                    <TableCell>{debt.customerName}</TableCell>
                    <TableCell>{debt.amount.toFixed(2)} ₪</TableCell>
                    <TableCell>{debt.remainingAmount.toFixed(2)} ₪</TableCell>
                    <TableCell>{debt.date}</TableCell>
                    <TableCell>{debt.dueDate}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        debt.status === "معلق" ? "bg-yellow-100 text-yellow-800" :
                        debt.status === "مدفوع جزئياً" ? "bg-blue-100 text-blue-800" :
                        "bg-green-100 text-green-800"
                      }`}>
                        {debt.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handlePayment(debt)}
                      >
                        <Wallet className="ml-1 h-4 w-4" />
                        تسجيل دفعة
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* ديون مدفوعة */}
        {paidDebts.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Check className="text-green-500 h-5 w-5" />
              <h2 className="text-lg font-medium">ديون مدفوعة</h2>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableCaption>الديون المدفوعة بالكامل</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">الرقم</TableHead>
                    <TableHead className="text-right">العميل</TableHead>
                    <TableHead className="text-right">المبلغ</TableHead>
                    <TableHead className="text-right">تاريخ الدين</TableHead>
                    <TableHead className="text-right">تاريخ السداد</TableHead>
                    <TableHead className="text-right">الوصف</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paidDebts.map((debt) => (
                    <TableRow key={debt.id}>
                      <TableCell className="font-medium">{debt.id}</TableCell>
                      <TableCell>{debt.customerName}</TableCell>
                      <TableCell>{debt.amount.toFixed(2)} ₪</TableCell>
                      <TableCell>{debt.date}</TableCell>
                      <TableCell>{debt.dueDate}</TableCell>
                      <TableCell>{debt.description || "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {/* نافذة تسجيل الدفعة */}
        <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-right">تسجيل دفعة</DialogTitle>
              <DialogDescription className="text-right">
                تسجيل دفعة لـ {selectedDebt?.customerName}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col space-y-4 mt-4">
              <div>
                <Label htmlFor="total-amount">المبلغ الإجمالي</Label>
                <Input 
                  id="total-amount" 
                  value={selectedDebt?.amount.toFixed(2) || "0"} 
                  readOnly 
                  className="bg-gray-50"
                />
              </div>
              <div>
                <Label htmlFor="remaining-amount">المبلغ المتبقي</Label>
                <Input 
                  id="remaining-amount" 
                  value={selectedDebt?.remainingAmount.toFixed(2) || "0"} 
                  readOnly 
                  className="bg-gray-50"
                />
              </div>
              <div>
                <Label htmlFor="payment-amount">مبلغ الدفعة</Label>
                <Input 
                  id="payment-amount" 
                  type="number"
                  step="0.01"
                  min="0"
                  max={selectedDebt?.remainingAmount || 0}
                  value={paymentAmount} 
                  onChange={(e) => setPaymentAmount(parseFloat(e.target.value) || 0)} 
                />
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsPaymentDialogOpen(false)}
              >
                إلغاء
              </Button>
              <Button onClick={processPayment}>
                تسجيل الدفعة
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </SidebarLayout>
  );
};

export default CustomerDebtsPage;
