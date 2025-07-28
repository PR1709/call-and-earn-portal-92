
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, ArrowLeft, Eye } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  type: string;
  status: string;
  joinDate: string;
  lastActive: string;
  tier: 'Premium' | 'Non-Premium';
  walletBalance: number;
  address: string;
  totalEarnings: number;
  totalLosses: number;
  averageTimeSpent: string;
  conversionRate: string;
  isActive: boolean;
}

interface ActiveUsersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewUser: (user: User) => void;
}

const activeUsers: User[] = [
  { 
    id: 1, 
    name: "John Doe", 
    email: "john@example.com", 
    phone: "+91 98765 43210",
    type: "Consumer", 
    status: "Active", 
    joinDate: "2024-01-15", 
    lastActive: "25 minutes ago",
    tier: "Premium",
    walletBalance: 1250,
    address: "Mumbai, Maharashtra",
    totalEarnings: 2500,
    totalLosses: 800,
    averageTimeSpent: "2.5 hours",
    conversionRate: "12.5%",
    isActive: true
  },
  { 
    id: 2, 
    name: "Jane Smith", 
    email: "jane@example.com", 
    phone: "+91 87654 32109",
    type: "Creator", 
    status: "Active", 
    joinDate: "2024-01-10", 
    lastActive: "1 hour ago",
    tier: "Premium",
    walletBalance: 2300,
    address: "Delhi, India",
    totalEarnings: 3200,
    totalLosses: 950,
    averageTimeSpent: "3.1 hours",
    conversionRate: "15.2%",
    isActive: true
  },
  { 
    id: 4, 
    name: "Sarah Wilson", 
    email: "sarah@example.com", 
    phone: "+91 65432 10987",
    type: "Seller", 
    status: "Active", 
    joinDate: "2024-01-25", 
    lastActive: "15 minutes ago",
    tier: "Non-Premium",
    walletBalance: 3200,
    address: "Chennai, Tamil Nadu",
    totalEarnings: 1800,
    totalLosses: 600,
    averageTimeSpent: "1.8 hours",
    conversionRate: "10.2%",
    isActive: true
  }
];

export const ActiveUsersModal: React.FC<ActiveUsersModalProps> = ({ 
  isOpen, 
  onClose, 
  onViewUser 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const isUserActiveNow = (lastActive: string): boolean => {
    if (lastActive.includes('minutes ago')) {
      const minutes = parseInt(lastActive);
      return minutes <= 30;
    }
    if (lastActive.includes('hour ago')) {
      return true; // "1 hour ago" is within active range
    }
    if (lastActive.includes('hours ago')) {
      const hours = parseInt(lastActive);
      return hours <= 2; // Up to 2 hours ago is considered active now
    }
    return false;
  };

  const getOnlineSinceTime = (lastActive: string): string => {
    if (lastActive.includes('minutes ago')) {
      const minutes = parseInt(lastActive);
      return `Online since ${minutes}m`;
    }
    if (lastActive.includes('hour ago')) {
      return `Online since 1h`;
    }
    if (lastActive.includes('hours ago')) {
      const hours = parseInt(lastActive);
      return `Online since ${hours}h`;
    }
    return lastActive;
  };

  const getFilteredUsers = (tierFilter?: 'premium' | 'non-premium') => {
    let filteredUsers = [...activeUsers];

    // Filter by tier if specified
    if (tierFilter === 'premium') {
      filteredUsers = filteredUsers.filter(user => user.tier === 'Premium');
    } else if (tierFilter === 'non-premium') {
      filteredUsers = filteredUsers.filter(user => user.tier === 'Non-Premium');
    }

    // Filter by search term
    if (searchTerm) {
      filteredUsers = filteredUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filteredUsers = filteredUsers.filter(user => 
        user.status.toLowerCase() === statusFilter
      );
    }

    return filteredUsers;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'Consumer': 'bg-blue-100 text-blue-800',
      'Creator': 'bg-purple-100 text-purple-800',
      'Seller': 'bg-orange-100 text-orange-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

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

  const UserTable = ({ users }: { users: User[] }) => (
    <>
      <style>{`
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .flicker-dot {
          animation: flicker 2s infinite;
        }
      `}</style>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Wallet Balance</TableHead>
            <TableHead>Tier</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Online Since</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => {
            const isActiveNow = isUserActiveNow(user.lastActive);
            return (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {isActiveNow && (
                      <div className="w-2 h-2 bg-green-500 rounded-full flicker-dot"></div>
                    )}
                    {user.name}
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  <Badge className={getTypeColor(user.type)}>
                    {user.type}
                  </Badge>
                </TableCell>
                <TableCell>₹{user.walletBalance.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge className={getTierColor(user.tier)}>
                    {user.tier}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(user.status)}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {isActiveNow 
                    ? getOnlineSinceTime(user.lastActive)
                    : user.lastActive
                  }
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => onViewUser(user)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );

  const premiumUsers = getFilteredUsers('premium');
  const nonPremiumUsers = getFilteredUsers('non-premium');
  const allUsers = getFilteredUsers();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onClose}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <DialogTitle className="text-2xl">Active Users</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6 overflow-y-auto">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by name, phone, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All Users ({allUsers.length})</TabsTrigger>
              <TabsTrigger value="premium">Premium ({premiumUsers.length})</TabsTrigger>
              <TabsTrigger value="non-premium">Non-Premium ({nonPremiumUsers.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <UserTable users={allUsers} />
            </TabsContent>

            <TabsContent value="premium" className="space-y-4">
              <UserTable users={premiumUsers} />
            </TabsContent>

            <TabsContent value="non-premium" className="space-y-4">
              <UserTable users={nonPremiumUsers} />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
