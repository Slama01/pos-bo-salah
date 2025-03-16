
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
  name: z.string().min(2, {
    message: "اسم العميل يجب أن يكون أكثر من حرفين",
  }),
  email: z.string().email({
    message: "يرجى إدخال بريد إلكتروني صحيح",
  }),
  phone: z.string().min(10, {
    message: "رقم الهاتف يجب أن يكون على الأقل 10 أرقام",
  }),
  address: z.string().min(5, {
    message: "العنوان يجب أن يكون أكثر من 5 أحرف",
  }),
  salesCount: z.string().transform(val => parseInt(val, 10)).refine(val => !isNaN(val) && val >= 0, {
    message: "يرجى إدخال رقم صحيح",
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

  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      salesCount: "0",
    },
  });

  function onSubmit(data: CustomerFormValues) {
    setIsSubmitting(true);
    
    try {
      // تجهيز بيانات العميل الجديد
      const newCustomer = {
        id: Math.floor(Math.random() * 1000) + 5, // توليد معرف عشوائي
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        salesCount: Number(data.salesCount), // تحويل قيمة data.salesCount إلى رقم
        lastPurchase: new Date().toISOString().split('T')[0], // تاريخ اليوم
      };

      onSave(newCustomer);
      
      toast({
        title: "تمت الإضافة بنجاح",
        description: "تم إضافة العميل الجديد",
      });
      
      onClose();
    } catch (error) {
      console.error("فشل إضافة العميل:", error);
      toast({
        variant: "destructive",
        title: "حدث خطأ",
        description: "فشل إضافة العميل الجديد. يرجى المحاولة مرة أخرى.",
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
              <FormLabel>الاسم</FormLabel>
              <FormControl>
                <Input {...field} />
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
                <Input type="email" {...field} />
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
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>العنوان</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="salesCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>عدد المشتريات</FormLabel>
              <FormControl>
                <Input type="number" min="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2 pt-4">
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
