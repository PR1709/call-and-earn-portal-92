
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface UserStatsCardsProps {
  onCardClick: (type: 'total' | 'active' | 'blocked', title: string) => void;
}

export const UserStatsCards: React.FC<UserStatsCardsProps> = ({ onCardClick }) => {
  const ClickableStatsCard = ({ 
    title, 
    value, 
    change, 
    onClick 
  }: {
    title: string;
    value: string;
    change?: string;
    onClick: () => void;
  }) => (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={onClick}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && <p className="text-xs text-green-600 mt-1">{change}</p>}
      </CardContent>
    </Card>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <ClickableStatsCard
        title="Total Users"
        value="5"
        change="+12% from last month"
        onClick={() => onCardClick('total', 'Total Users')}
      />
      <ClickableStatsCard
        title="Active Users"
        value="3"
        change="+8% from last month"
        onClick={() => onCardClick('active', 'Active Users')}
      />
      <ClickableStatsCard
        title="Blocked Users"
        value="1"
        change="+3% from last month"
        onClick={() => onCardClick('blocked', 'Blocked Users')}
      />
    </div>
  );
};
