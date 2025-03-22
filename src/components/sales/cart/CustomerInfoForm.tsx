
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CustomerInfoFormProps {
  customerName: string;
  setCustomerName: (name: string) => void;
  status: string;
  setStatus: (status: string) => void;
}

export function CustomerInfoForm({ 
  customerName, 
  setCustomerName, 
  status, 
  setStatus 
}: CustomerInfoFormProps) {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="customer-name">اسم العميل</Label>
        <Input 
          id="customer-name" 
          value={customerName} 
          onChange={(e) => setCustomerName(e.target.value)} 
          placeholder="أدخل اسم العميل" 
        />
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="status">حالة البيع</Label>
        <Select 
          value={status} 
          onValueChange={setStatus}
        >
          <SelectTrigger id="status">
            <SelectValue placeholder="اختر حالة البيع" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="مكتملة">مكتملة</SelectItem>
            <SelectItem value="معلقة">معلقة</SelectItem>
            <SelectItem value="ملغية">ملغية</SelectItem>
            <SelectItem value="آجل">آجل (دين)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
