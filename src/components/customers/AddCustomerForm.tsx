
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
import { useToast } from "@/hooks/use-toast";

// تعريف مخطط التحقق من صحة البيانات
const customerFormSchema = z.object({
  name: z.string({ required_error: "الرجاء إدخال اسم العميل" }).min(3, {
    message: "اسم العميل يجب أن يكون أكثر من 3 أحرف",
  }),
  phone: z.string({ required_error: "الرجاء إدخال رقم الهاتف" })
    .min(10, { message: "رقم الهاتف يجب أن يكون على الأقل 10 أرقام" }),
  email: z.string({ required_error: "الرجاء إدخال البريد الإلكتروني" })
    .email({ message: "الرجاء إدخال بريد إلكتروني صحيح" }),
  totalPurchases: z.string().transform(val => parseFloat(val)).refine(val => !isNaN(val) && val >= 0, {
    message: "الرجاء إدخال قيمة صحيحة",
  }),
});

type CustomerFormValues = z.infer<typeof customerFormSchema>;

interface AddCustomerFormProps {
  onClose: () => void;
  onSave: (data: any) => void;
}

export function AddCustomerForm({ onClose, onSave }: AddCustomerFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // إعداد نموذج React Hook Form
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      totalPurchases: "0",
    },
  });

  function onSubmit(data: CustomerFormValues) {
    setIsSubmitting(true);
    try {
      // تجهيز بيانات العميل الجديد
      const newCustomer = {
        id: Math.floor(Math.random() * 1000) + 5, // توليد معرف عشوائي
        name: data.name,
        phone: data.phone,
        email: data.email,
        totalPurchases: data.totalPurchases,
        lastPurchase: new Date().toISOString().split('T')[0], // تاريخ اليوم
      };

      // حفظ البيانات
      onSave(newCustomer);
      
      // إظهار رسالة نجاح
      toast({
        title: "تمت العملية بنجاح",
        description: "تم إضافة العميل بنجاح",
      });

      // إغلاق النموذج
      onClose();
    } catch (error) {
      console.error("فشل إضافة العميل:", error);
      toast({
        variant: "destructive",
        title: "حدث خطأ",
        description: "فشل إضافة العميل. الرجاء المحاولة مرة أخرى.",
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
          name="name"
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
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رقم الهاتف</FormLabel>
              <FormControl>
                <Input type="tel" {...field} dir="ltr" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>البريد الإلكتروني</FormLabel>
              <FormControl>
                <Input type="email" {...field} dir="ltr" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="totalPurchases"
          render={({ field }) => (
            <FormItem>
              <FormLabel>إجمالي المشتريات (ر.س)</FormLabel>
              <FormControl>
                <Input type="number" min="0" step="0.01" {...field} />
              </FormControl>
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
            {isSubmitting ? "جاري الحفظ..." : "إضافة العميل"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
