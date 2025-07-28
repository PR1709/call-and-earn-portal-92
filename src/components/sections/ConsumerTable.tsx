
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye } from 'lucide-react';
import { Consumer } from '@/types/Consumer';

interface ConsumerTableProps {
  consumers: Consumer[];
  onViewConsumer: (consumer: Consumer) => void;
}

export const ConsumerTable: React.FC<ConsumerTableProps> = ({ consumers, onViewConsumer }) => {
  const getStatusColor = (status: string) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Blocked': 'bg-red-100 text-red-800',
      'Pending': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getTierColor = (tier: string) => {
    return tier === 'Premium' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800';
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Wallet Balance</TableHead>
          <TableHead>Tier</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {consumers.map((consumer) => (
          <TableRow key={consumer.id}>
            <TableCell className="font-medium">{consumer.name}</TableCell>
            <TableCell>{consumer.email}</TableCell>
            <TableCell>{consumer.phone}</TableCell>
            <TableCell>₹{consumer.walletBalance.toLocaleString()}</TableCell>
            <TableCell>
              <Badge className={getTierColor(consumer.tier)}>
                {consumer.tier}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge className={getStatusColor(consumer.status)}>
                {consumer.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewConsumer(consumer)}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
