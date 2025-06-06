
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.759c682d0d1e47baa6cb8be8a870e7d9',
  appName: 'نظام إدارة المبيعات',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  // إعدادات iOS
  ios: {
    contentInset: 'always',
  },
  // إعدادات Android
  android: {
    backgroundColor: '#FFFFFF',
  },
  // إضافة إعدادات Windows لتطبيق سطح المكتب
  windows: {
    backgroundColor: '#FFFFFF',
  }
};

export default config;
