
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '@/contexts/LanguageContext';
import { Check, Globe } from 'lucide-react';

export const LanguageSettings = () => {
  const { language, setLanguage, availableLanguages, t } = useLanguage();
  const { toast } = useToast();

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    
    toast({
      title: t('language') === 'اللغة' ? 'تم تغيير اللغة' : 'Language Changed',
      description: t('language') === 'اللغة' 
        ? `تم تغيير لغة التطبيق إلى ${lang === 'ar' ? 'العربية' : 'الإنجليزية'}`
        : `Application language changed to ${lang === 'ar' ? 'Arabic' : 'English'}`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('language')}</CardTitle>
        <CardDescription>
          {language === 'ar' 
            ? 'تغيير لغة واجهة المستخدم' 
            : 'Change the user interface language'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableLanguages.map((lang) => (
            <div 
              key={lang.code}
              className={`flex items-center p-3 border rounded-md cursor-pointer ${
                language === lang.code ? 'bg-primary/10 border-primary/50' : 'bg-card'
              }`}
              onClick={() => handleLanguageChange(lang.code)}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background border">
                <Globe className="h-5 w-5" />
              </div>
              <div className="mx-4">
                <p className="font-medium">{lang.name}</p>
                <p className="text-sm text-muted-foreground">
                  {lang.code === 'ar' ? 'اللغة العربية' : 'English language'}
                </p>
              </div>
              {language === lang.code && (
                <div className="mr-auto">
                  <Check className="h-5 w-5 text-primary" />
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LanguageSettings;
