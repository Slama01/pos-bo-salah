
import React, { useState } from 'react';
import SidebarLayout from '@/components/layouts/SidebarLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InvoiceTable } from '@/components/invoices/InvoiceTable';
import { Plus, FileText, Printer, FilePlus, Download, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const InvoicesPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleCreateInvoice = () => {
    toast({
      title: "إنشاء فاتورة جديدة",
      description: "جاري فتح نموذج إنشاء فاتورة جديدة",
    });
  };

  const handleExportInvoices = () => {
    toast({
      title: "تصدير الفواتير",
      description: "جاري تصدير الفواتير إلى Excel",
    });
  };

  return (
    <SidebarLayout>
      <div className="flex flex-col p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">الفواتير</h1>
            <p className="text-muted-foreground">إدارة الفواتير وعرض المدفوعات</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleExportInvoices} className="ml-2">
              <Download className="ml-2 h-4 w-4" />
              تصدير
            </Button>
            <Button onClick={handleCreateInvoice}>
              <Plus className="ml-2 h-4 w-4" />
              إنشاء فاتورة
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الفواتير</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">30,700 ₪</div>
              <p className="text-xs text-muted-foreground">+20% عن الشهر الماضي</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الفواتير المدفوعة</CardTitle>
              <FilePlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">20,300 ₪</div>
              <p className="text-xs text-muted-foreground">66% من إجمالي الفواتير</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الفواتير المستحقة</CardTitle>
              <Printer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">10,400 ₪</div>
              <p className="text-xs text-muted-foreground">34% من إجمالي الفواتير</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="w-full max-w-sm flex items-center space-x-2">
              <Search className="h-4 w-4 absolute text-muted-foreground mr-2" />
              <Input
                placeholder="بحث عن الفواتير..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Tabs defaultValue="all" className="w-[400px]">
              <TabsList>
                <TabsTrigger value="all">جميع الفواتير</TabsTrigger>
                <TabsTrigger value="paid">المدفوعة</TabsTrigger>
                <TabsTrigger value="pending">قيد الانتظار</TabsTrigger>
                <TabsTrigger value="overdue">المتأخرة</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <InvoiceTable />
        </div>
      </div>
    </SidebarLayout>
  );
};

export default InvoicesPage;
