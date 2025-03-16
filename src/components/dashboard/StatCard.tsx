
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
}

const StatCard = ({ title, value, icon, change }: StatCardProps) => {
  const isPositive = change.startsWith('+');
  const isNeutral = change === '0%';

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-2 tracking-tight">{value}</h3>
          </div>
          <div className="rounded-full p-2 bg-muted">{icon}</div>
        </div>
        <div className="mt-4">
          <span 
            className={cn("text-xs font-medium", {
              "text-green-600": isPositive && !isNeutral,
              "text-red-600": !isPositive && !isNeutral,
              "text-gray-500": isNeutral
            })}
          >
            {change}
          </span>
          <span className="text-xs text-muted-foreground ml-1">مقارنة بالفترة السابقة</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
