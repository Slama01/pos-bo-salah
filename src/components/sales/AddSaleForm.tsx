
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// تعريف مخطط التحقق من صحة البيانات
const saleFormSchema = z.object({
  customerName: z.string({ required_error: "الرجاء إدخال اسم العميل" }).min(2, {
    message: "اسم العميل يجب أن يكون أكثر من حرفين",
  }),
  items: z.string().transform(val => parseInt(val, 10)).refine(val => !isNaN(val) && val > 0, {
    message: "الرجاء إدخال عدد صحيح للمنتجات",
  }),
  total: z.string().transform(val => parseFloat(val)).refine(val => !isNaN(val) && val > 0, {
    message: "الرجاء إدخال قيمة صحيحة للمبلغ",
  }),
  status: z.enum(["مكتملة", "معلقة", "ملغية"], {
    required_error: "الرجاء اختيار حالة البيع",
  }),
});

type SaleFormValues = z.infer<typeof saleFormSchema>;

interface AddSaleFormProps {
  onClose: () => void;
  onSave: (data: any) => void;
}

export function AddSaleForm({ onClose, onSave }: AddSaleFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // إعداد نموذج React Hook Form
  const form = useForm<SaleFormValues>({
    resolver: zodResolver(saleFormSchema),
    defaultValues: {
      customerName: "",
      items: "1",
      total: "",
      status: "مكتملة",
    },
  });

  function onSubmit(data: SaleFormValues) {
    setIsSubmitting(true);
    try {
      // تجهيز بيانات عملية البيع الجديدة
      const newSale = {
        id: Math.floor(Math.random() * 1000) + 5, // توليد معرف عشوائي
        date: new Date().toISOString().split('T')[0], // تاريخ اليوم
        customer: data.customerName,
        total: parseFloat(data.total.toString()),
        items: parseInt(data.items.toString()),
        status: data.status,
      };

      // حفظ البيانات
      onSave(newSale);
      
      // إظهار رسالة نجاح
      toast({
        title: "تمت العملية بنجاح",
        description: "تم إضافة عملية البيع بنجاح",
      });

      // إغلاق النموذج
      onClose();
    } catch (error) {
      console.error("فشل إضافة عملية البيع:", error);
      toast({
        variant: "destructive",
        title: "حدث خطأ",
        description: "فشل إضافة عملية البيع. الرجاء المحاولة مرة أخرى.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>اسم العميل</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="items"
          render={({ field }) => (
            <FormItem>
              <FormLabel>عدد المنتجات</FormLabel>
              <FormControl>
                <Input type="number" min="1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="total"
          render={({ field }) => (
            <FormItem>
              <FormLabel>إجمالي المبلغ (ر.س)</FormLabel>
              <FormControl>
                <Input type="number" min="0" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>حالة البيع</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر حالة البيع" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="مكتملة">مكتملة</SelectItem>
                  <SelectItem value="معلقة">معلقة</SelectItem>
                  <SelectItem value="ملغية">ملغية</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
            className="ml-2"
          >
            إلغاء
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "جاري الحفظ..." : "إضافة عملية البيع"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
