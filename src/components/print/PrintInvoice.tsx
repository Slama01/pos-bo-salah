
import React from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Printer, FileText, Download } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface PrintInvoiceProps {
  invoiceId: string;
  customerName: string;
}

export const PrintInvoice: React.FC<PrintInvoiceProps> = ({ invoiceId, customerName }) => {
  const { toast } = useToast();
  const [paperSize, setPaperSize] = React.useState("a4");
  const [orientation, setOrientation] = React.useState("portrait");
  const [copies, setCopies] = React.useState("1");

  const handlePrint = () => {
    // في تطبيق حقيقي، هنا سيتم استدعاء API للطباعة
    toast({
      title: "تمت الطباعة بنجاح",
      description: `تم إرسال الفاتورة ${invoiceId} للطباعة (${copies} نسخة)`,
    });
  };

  const handleExportPDF = () => {
    toast({
      title: "تم تصدير PDF",
      description: `تم تصدير الفاتورة ${invoiceId} بصيغة PDF`,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center">
          <Printer className="ml-2 h-4 w-4" />
          طباعة
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>طباعة الفاتورة</DialogTitle>
          <DialogDescription>
            {`طباعة الفاتورة رقم ${invoiceId} للعميل ${customerName}`}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="paperSize" className="text-right">
              حجم الورق
            </Label>
            <div className="col-span-3">
              <Select value={paperSize} onValueChange={setPaperSize}>
                <SelectTrigger id="paperSize">
                  <SelectValue placeholder="اختر حجم الورق" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a4">A4</SelectItem>
                  <SelectItem value="a5">A5</SelectItem>
                  <SelectItem value="letter">Letter</SelectItem>
                  <SelectItem value="thermal">حراري</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="orientation" className="text-right">
              الاتجاه
            </Label>
            <div className="col-span-3">
              <Select value={orientation} onValueChange={setOrientation}>
                <SelectTrigger id="orientation">
                  <SelectValue placeholder="اختر اتجاه الطباعة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="portrait">عمودي</SelectItem>
                  <SelectItem value="landscape">أفقي</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="copies" className="text-right">
              عدد النسخ
            </Label>
            <div className="col-span-3">
              <Select value={copies} onValueChange={setCopies}>
                <SelectTrigger id="copies">
                  <SelectValue placeholder="اختر عدد النسخ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter className="flex space-x-2 gap-2">
          <Button variant="outline" onClick={handleExportPDF}>
            <Download className="ml-2 h-4 w-4" />
            تصدير PDF
          </Button>
          <Button onClick={handlePrint}>
            <Printer className="ml-2 h-4 w-4" />
            طباعة
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PrintInvoice;
