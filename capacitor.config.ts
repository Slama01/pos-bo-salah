
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.759c682d0d1e47baa6cb8be8a870e7d9',
  appName: 'نظام إدارة المبيعات',
  webDir: 'dist',
  server: {
    url: 'https://759c682d-0d1e-47ba-a6cb-8be8a870e7d9.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  // إعدادات iOS
  ios: {
    contentInset: 'always',
  },
  // إعدادات Android
  android: {
    backgroundColor: '#FFFFFF',
  },
};

export default config;
