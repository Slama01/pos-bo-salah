
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ClockIcon, UserIcon, Settings2 } from 'lucide-react';

export const DemoModeSettings = () => {
  const { toast } = useToast();
  const [demoModeEnabled, setDemoModeEnabled] = useState(true);
  const [daysLimit, setDaysLimit] = useState(14);
  const [restrictions, setRestrictions] = useState({
    limitProducts: true,
    limitCustomers: true,
    limitSales: true,
    watermark: true
  });

  const handleDemoModeToggle = (checked: boolean) => {
    setDemoModeEnabled(checked);
    toast({
      title: checked ? "تم تفعيل وضع العرض التجريبي" : "تم إلغاء تفعيل وضع العرض التجريبي",
      description: checked 
        ? "يمكن للعملاء الآن تجربة النظام قبل الشراء" 
        : "تم إلغاء خاصية العرض التجريبي للعملاء",
    });
  };

  const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setDaysLimit(value);
    }
  };

  const handleRestrictionChange = (key: keyof typeof restrictions) => {
    setRestrictions({
      ...restrictions,
      [key]: !restrictions[key]
    });
  };

  const handleSaveSettings = () => {
    toast({
      title: "تم حفظ الإعدادات",
      description: "تم حفظ إعدادات وضع العرض التجريبي بنجاح",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ClockIcon className="ml-2 h-5 w-5" />
          إعدادات وضع العرض التجريبي
        </CardTitle>
        <CardDescription>
          ضبط إعدادات النظام للعملاء المحتملين قبل الشراء
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">تفعيل وضع العرض التجريبي</Label>
            <p className="text-sm text-muted-foreground">
              السماح للعملاء بتجربة النظام قبل الشراء
            </p>
          </div>
          <Switch
            checked={demoModeEnabled}
            onCheckedChange={handleDemoModeToggle}
          />
        </div>

        {demoModeEnabled && (
          <>
            <div className="space-y-2">
              <Label htmlFor="days-limit">مدة النسخة التجريبية (بالأيام)</Label>
              <Input
                id="days-limit"
                type="number"
                min="1"
                value={daysLimit}
                onChange={handleDaysChange}
              />
            </div>

            <div className="space-y-3">
              <Label>قيود النسخة التجريبية</Label>
              
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="limit-products" className="flex items-center">
                    <span className="ml-2">تحديد عدد المنتجات (15 منتج)</span>
                  </Label>
                </div>
                <Switch
                  id="limit-products"
                  checked={restrictions.limitProducts}
                  onCheckedChange={() => handleRestrictionChange('limitProducts')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="limit-customers" className="flex items-center">
                    <span className="ml-2">تحديد عدد العملاء (10 عملاء)</span>
                  </Label>
                </div>
                <Switch
                  id="limit-customers"
                  checked={restrictions.limitCustomers}
                  onCheckedChange={() => handleRestrictionChange('limitCustomers')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="limit-sales" className="flex items-center">
                    <span className="ml-2">تحديد عدد عمليات البيع (20 عملية)</span>
                  </Label>
                </div>
                <Switch
                  id="limit-sales"
                  checked={restrictions.limitSales}
                  onCheckedChange={() => handleRestrictionChange('limitSales')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="watermark" className="flex items-center">
                    <span className="ml-2">إظهار علامة مائية "نسخة تجريبية"</span>
                  </Label>
                </div>
                <Switch
                  id="watermark"
                  checked={restrictions.watermark}
                  onCheckedChange={() => handleRestrictionChange('watermark')}
                />
              </div>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveSettings}>
          حفظ الإعدادات
        </Button>
      </CardFooter>
    </Card>
  );
};
