import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, UserPlus } from 'lucide-react';
import { UserDetailModal } from './UserDetailModal';
import { ConsumerDetailModal } from './ConsumerDetailModal';
import { ActiveUsersModal } from './ActiveUsersModal';
import { UserStatsCards } from './UserStatsCards';
import { EnhancedUserTable } from './EnhancedUserTable';
import { useToast } from '@/hooks/use-toast';

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

const users: User[] = [
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

// Mock user data mapping for search results
const getUserBySearchId = (searchId: string) => {
  const userMap: { [key: string]: User } = {
    'user-1': {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@example.com",
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
    'user-2': {
      id: 2,
      name: "Priya Patel",
      email: "priya@example.com",
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
    'user-3': {
      id: 3,
      name: "Amit Kumar",
      email: "amit@example.com",
      phone: "+91 76543 21098",
      type: "Consumer",
      status: "Blocked",
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
    }
  };
  
  return userMap[searchId];
};

export const Users: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [lastActiveFilter, setLastActiveFilter] = useState('all');
  const [selectedModal, setSelectedModal] = useState<{
    isOpen: boolean;
    type: 'total' | 'active' | 'blocked';
    title: string;
  }>({
    isOpen: false,
    type: 'total',
    title: ''
  });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserDetailOpen, setIsUserDetailOpen] = useState(false);
  const [isActiveUsersModalOpen, setIsActiveUsersModalOpen] = useState(false);
  const { toast } = useToast();

  const handleCardClick = (type: 'total' | 'active' | 'blocked', title: string) => {
    if (type === 'active') {
      setIsActiveUsersModalOpen(true);
    } else {
      setSelectedModal({
        isOpen: true,
        type,
        title
      });
    }
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsUserDetailOpen(true);
  };

  const handleUserAction = (user: User, action: string) => {
    switch (action) {
      case 'manage-wallet':
        toast({
          title: "Wallet Management",
          description: `Opening wallet management for ${user.name}`,
        });
        break;
      case 'suspend':
        toast({
          title: "User Suspended",
          description: `${user.name} has been suspended`,
          variant: "destructive"
        });
        break;
      case 'settings':
        toast({
          title: "User Settings",
          description: `Opening settings for ${user.name}`,
        });
        break;
      default:
        console.log('User action:', action, user);
    }
  };

  const handleSearchResultClick = (result: any) => {
    if (result.type === 'user') {
      const user = getUserBySearchId(result.id);
      if (user) {
        handleViewUser(user);
      }
    }
    console.log('Search result details:', result);
  };

  return (
    <>
      <div className="space-y-6 p-8 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">User Management</h1>
            <p className="text-muted-foreground mt-2">Manage all users across the platform with enhanced earning features</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="bg-green-500 hover:bg-green-600 flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Add User
            </Button>
          </div>
        </div>

        <UserStatsCards onCardClick={handleCardClick} />

        <EnhancedUserTable
          users={users}
          searchTerm={searchTerm}
          typeFilter={typeFilter}
          statusFilter={statusFilter}
          lastActiveFilter={lastActiveFilter}
          onSearchChange={setSearchTerm}
          onTypeFilterChange={setTypeFilter}
          onStatusFilterChange={setStatusFilter}
          onLastActiveFilterChange={setLastActiveFilter}
          onViewUser={handleViewUser}
          onUserAction={handleUserAction}
        />

        <UserDetailModal
          isOpen={selectedModal.isOpen}
          onClose={() => setSelectedModal({ ...selectedModal, isOpen: false })}
          title={selectedModal.title}
          userType={selectedModal.type}
        />

        <ActiveUsersModal
          isOpen={isActiveUsersModalOpen}
          onClose={() => setIsActiveUsersModalOpen(false)}
          onViewUser={handleViewUser}
        />

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
      </div>
    </>
  );
};
