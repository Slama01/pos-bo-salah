
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Download, Save } from "lucide-react";

export const AutoBackupSettings = () => {
  const { toast } = useToast();
  const [autoBackup, setAutoBackup] = useState(false);
  const [backupFrequency, setBackupFrequency] = useState("daily");
  const [backupPath, setBackupPath] = useState("./backups");

  const handleSaveSettings = () => {
    toast({
      title: "تم حفظ إعدادات النسخ الاحتياطي",
      description: "تم حفظ إعدادات النسخ الاحتياطي التلقائي بنجاح",
    });
  };

  const handleManualBackup = () => {
    toast({
      title: "تم إنشاء نسخة احتياطية",
      description: "تم إنشاء نسخة احتياطية يدوية بنجاح في " + backupPath,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>النسخ الاحتياطي التلقائي</CardTitle>
        <CardDescription>
          إدارة إعدادات النسخ الاحتياطي التلقائي للبيانات
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">تفعيل النسخ الاحتياطي التلقائي</Label>
            <p className="text-sm text-muted-foreground">
              إنشاء نسخة احتياطية من البيانات بشكل تلقائي
            </p>
          </div>
          <Switch 
            checked={autoBackup} 
            onCheckedChange={setAutoBackup} 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="backup-frequency">تكرار النسخ الاحتياطي</Label>
          <Select 
            value={backupFrequency} 
            onValueChange={setBackupFrequency}
            disabled={!autoBackup}
          >
            <SelectTrigger id="backup-frequency">
              <SelectValue placeholder="اختر التكرار" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hourly">كل ساعة</SelectItem>
              <SelectItem value="daily">يومياً</SelectItem>
              <SelectItem value="weekly">أسبوعياً</SelectItem>
              <SelectItem value="monthly">شهرياً</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="backup-path">مسار حفظ النسخ الاحتياطي</Label>
          <Input 
            id="backup-path" 
            value={backupPath} 
            onChange={(e) => setBackupPath(e.target.value)} 
            disabled={!autoBackup}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-base">إدارة النسخ الاحتياطي</Label>
          <div className="flex space-x-2 gap-2">
            <Button onClick={handleManualBackup} variant="outline">
              <Download className="ml-2 h-4 w-4" />
              نسخ احتياطي الآن
            </Button>
            <Button onClick={handleSaveSettings}>
              <Save className="ml-2 h-4 w-4" />
              حفظ الإعدادات
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutoBackupSettings;
