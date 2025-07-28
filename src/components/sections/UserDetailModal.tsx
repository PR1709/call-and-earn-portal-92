
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, ArrowLeft, Eye } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ConsumerDetailModal } from './ConsumerDetailModal';

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

interface UserDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  userType: 'total' | 'active' | 'blocked';
}

const totalUsers: User[] = [
  { 
    id: 1, 
    name: "John Doe", 
    email: "john@example.com", 
    phone: "+91 98765 43210",
    type: "Consumer", 
    status: "Active", 
    joinDate: "2024-01-15", 
    lastActive: "2 hours ago",
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
    lastActive: "1 day ago",
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
    id: 3, 
    name: "Mike Johnson", 
    email: "mike@example.com", 
    phone: "+91 76543 21098",
    type: "Consumer", 
    status: "Inactive", 
    joinDate: "2024-01-20", 
    lastActive: "1 week ago",
    tier: "Non-Premium",
    walletBalance: 450,
    address: "Bangalore, Karnataka",
    totalEarnings: 800,
    totalLosses: 1200,
    averageTimeSpent: "1.2 hours",
    conversionRate: "8.5%",
    isActive: false
  },
  { 
    id: 4, 
    name: "Sarah Wilson", 
    email: "sarah@example.com", 
    phone: "+91 65432 10987",
    type: "Seller", 
    status: "Active", 
    joinDate: "2024-01-25", 
    lastActive: "30 minutes ago",
    tier: "Non-Premium",
    walletBalance: 3200,
    address: "Chennai, Tamil Nadu",
    totalEarnings: 1800,
    totalLosses: 600,
    averageTimeSpent: "1.8 hours",
    conversionRate: "10.2%",
    isActive: true
  },
  { 
    id: 5, 
    name: "David Brown", 
    email: "david@example.com", 
    phone: "+91 54321 09876",
    type: "Consumer", 
    status: "Suspended", 
    joinDate: "2024-02-01", 
    lastActive: "3 days ago",
    tier: "Premium",
    walletBalance: 780,
    address: "Pune, Maharashtra",
    totalEarnings: 1200,
    totalLosses: 400,
    averageTimeSpent: "2.0 hours",
    conversionRate: "11.5%",
    isActive: false
  },
];

const blockedUsers: User[] = [
  { 
    id: 5, 
    name: "David Brown", 
    email: "david@example.com", 
    phone: "+91 54321 09876",
    type: "Consumer", 
    status: "Suspended", 
    joinDate: "2024-02-01", 
    lastActive: "3 days ago",
    tier: "Premium",
    walletBalance: 780,
    address: "Pune, Maharashtra",
    totalEarnings: 1200,
    totalLosses: 400,
    averageTimeSpent: "2.0 hours",
    conversionRate: "11.5%",
    isActive: false
  },
];

export const UserDetailModal: React.FC<UserDetailModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  userType 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserDetailOpen, setIsUserDetailOpen] = useState(false);

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsUserDetailOpen(true);
  };

  const getUsersData = () => {
    switch (userType) {
      case 'blocked':
        return blockedUsers;
      case 'total':
      default:
        return totalUsers;
    }
  };

  const getFilteredUsers = (tierFilter?: 'premium' | 'non-premium') => {
    let filteredUsers = [...getUsersData()];

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
      'Inactive': 'bg-yellow-100 text-yellow-800',
      'Suspended': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getTierColor = (tier: string) => {
    return tier === 'Premium' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800';
  };

  const UserTable = ({ users }: { users: User[] }) => (
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
          <TableHead>Join Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
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
            <TableCell>{user.joinDate}</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm" onClick={() => handleViewUser(user)}>
                <Eye className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const premiumUsers = getFilteredUsers('premium');
  const nonPremiumUsers = getFilteredUsers('non-premium');
  const allUsers = getFilteredUsers();

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onClose}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <DialogTitle className="text-2xl">{title}</DialogTitle>
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
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
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

      <ConsumerDetailModal
        isOpen={isUserDetailOpen}
        onClose={() => setIsUserDetailOpen(false)}
        consumer={selectedUser ? {
          id: selectedUser.id,
          name: selectedUser.name,
          email: selectedUser.email,
          phone: selectedUser.phone,
          address: selectedUser.address,
          joinDate: selectedUser.joinDate,
          status: selectedUser.status,
          tier: selectedUser.tier,
          walletBalance: selectedUser.walletBalance,
          totalEarnings: selectedUser.totalEarnings,
          totalLosses: selectedUser.totalLosses,
          averageTimeSpent: selectedUser.averageTimeSpent,
          conversionRate: selectedUser.conversionRate,
          isActive: selectedUser.isActive
        } : null}
      />
    </>
  );
};
