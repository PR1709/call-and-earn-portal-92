
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, ArrowLeft, Clock, TrendingUp, Users } from 'lucide-react';

interface ConsumerMetric {
  id: number;
  name: string;
  tier: 'Premium' | 'Non-Premium';
  value: string;
  trend: 'up' | 'down' | 'stable';
  lastActive: string;
}

interface ConsumerMetricsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  metricType: 'timeSpent' | 'conversionRate' | 'activeUsers';
}

const mockTimeSpentData: ConsumerMetric[] = [
  { id: 1, name: "Rahul Sharma", tier: "Premium", value: "32 min", trend: "up", lastActive: "2024-03-15" },
  { id: 2, name: "Priya Patel", tier: "Premium", value: "28 min", trend: "stable", lastActive: "2024-03-14" },
  { id: 3, name: "Amit Kumar", tier: "Non-Premium", value: "18 min", trend: "down", lastActive: "2024-03-13" },
  { id: 4, name: "Sneha Singh", tier: "Non-Premium", value: "15 min", trend: "up", lastActive: "2024-03-12" },
];

const mockConversionData: ConsumerMetric[] = [
  { id: 1, name: "Rahul Sharma", tier: "Premium", value: "8.2%", trend: "up", lastActive: "2024-03-15" },
  { id: 2, name: "Priya Patel", tier: "Premium", value: "6.5%", trend: "stable", lastActive: "2024-03-14" },
  { id: 3, name: "Amit Kumar", tier: "Non-Premium", value: "3.1%", trend: "down", lastActive: "2024-03-13" },
  { id: 4, name: "Sneha Singh", tier: "Non-Premium", value: "2.8%", trend: "up", lastActive: "2024-03-12" },
];

const mockActiveUsersData: ConsumerMetric[] = [
  { id: 1, name: "Rahul Sharma", tier: "Premium", value: "25 days", trend: "up", lastActive: "2024-03-15" },
  { id: 2, name: "Priya Patel", tier: "Premium", value: "22 days", trend: "stable", lastActive: "2024-03-14" },
  { id: 3, name: "Amit Kumar", tier: "Non-Premium", value: "12 days", trend: "down", lastActive: "2024-03-13" },
  { id: 4, name: "Sneha Singh", tier: "Non-Premium", value: "8 days", trend: "up", lastActive: "2024-03-12" },
];

export const ConsumerMetricsModal: React.FC<ConsumerMetricsModalProps> = ({
  isOpen,
  onClose,
  title,
  metricType
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const getDataByType = () => {
    switch (metricType) {
      case 'timeSpent':
        return mockTimeSpentData;
      case 'conversionRate':
        return mockConversionData;
      case 'activeUsers':
        return mockActiveUsersData;
      default:
        return [];
    }
  };

  const getIcon = () => {
    switch (metricType) {
      case 'timeSpent':
        return <Clock className="h-5 w-5" />;
      case 'conversionRate':
        return <TrendingUp className="h-5 w-5" />;
      case 'activeUsers':
        return <Users className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const data = getDataByType();
  const premiumData = data.filter(item => item.tier === 'Premium');
  const nonPremiumData = data.filter(item => item.tier === 'Non-Premium');

  const MetricsTable = ({ metrics }: { metrics: ConsumerMetric[] }) => {
    const filteredMetrics = metrics.filter(metric =>
      metric.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Tier</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Trend</TableHead>
            <TableHead>Last Active</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMetrics.map((metric) => (
            <TableRow key={metric.id}>
              <TableCell className="font-medium">{metric.name}</TableCell>
              <TableCell>
                <Badge variant={metric.tier === 'Premium' ? 'default' : 'secondary'}>
                  {metric.tier}
                </Badge>
              </TableCell>
              <TableCell className="font-semibold">{metric.value}</TableCell>
              <TableCell>
                <Badge variant={
                  metric.trend === 'up' ? 'default' : 
                  metric.trend === 'down' ? 'destructive' : 'secondary'
                }>
                  {metric.trend}
                </Badge>
              </TableCell>
              <TableCell>{metric.lastActive}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onClose}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              {getIcon()}
              <DialogTitle className="text-2xl">{title}</DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 overflow-y-auto">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search consumers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Tabs defaultValue="premium" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="premium">
                Premium Consumers ({premiumData.length})
              </TabsTrigger>
              <TabsTrigger value="non-premium">
                Non-Premium Consumers ({nonPremiumData.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="premium" className="space-y-4">
              <MetricsTable metrics={premiumData} />
            </TabsContent>

            <TabsContent value="non-premium" className="space-y-4">
              <MetricsTable metrics={nonPremiumData} />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
