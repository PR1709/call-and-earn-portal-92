
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye } from 'lucide-react';
import { UserFilters } from './UserFilters';

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

interface UserTableProps {
  users: User[];
  searchTerm: string;
  typeFilter: string;
  statusFilter: string;
  lastActiveFilter: string;
  onSearchChange: (value: string) => void;
  onTypeFilterChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onLastActiveFilterChange: (value: string) => void;
  onViewUser: (user: User) => void;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  searchTerm,
  typeFilter,
  statusFilter,
  lastActiveFilter,
  onSearchChange,
  onTypeFilterChange,
  onStatusFilterChange,
  onLastActiveFilterChange,
  onViewUser
}) => {
  const getActivityTimeFrame = (lastActive: string): string => {
    const now = new Date();
    
    if (lastActive.includes('minutes ago') || lastActive.includes('hour ago') || lastActive.includes('hours ago')) {
      const timeValue = parseInt(lastActive);
      if (lastActive.includes('minutes ago') && timeValue <= 30) return 'now';
      if (lastActive.includes('hour ago') || (lastActive.includes('hours ago') && timeValue <= 2)) return 'now';
      if (lastActive.includes('hours ago') && timeValue <= 24) return '24h';
    }
    
    if (lastActive.includes('day ago') || lastActive.includes('days ago')) {
      const days = parseInt(lastActive);
      if (days === 1) return '24h';
      if (days <= 7) return '7d';
      if (days <= 30) return '30d';
    }
    
    if (lastActive.includes('week ago') || lastActive.includes('weeks ago')) {
      const weeks = parseInt(lastActive);
      if (weeks <= 4) return '30d';
    }
    
    return 'inactive';
  };

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

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || user.type.toLowerCase() === typeFilter;
    const matchesStatus = statusFilter === 'all' || user.status.toLowerCase() === statusFilter;
    
    let matchesLastActive = true;
    if (lastActiveFilter !== 'all') {
      const userActivityFrame = getActivityTimeFrame(user.lastActive);
      matchesLastActive = userActivityFrame === lastActiveFilter;
    }
    
    return matchesSearch && matchesType && matchesStatus && matchesLastActive;
  });

  const getStatusColor = (status: string) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-yellow-100 text-yellow-800',
      'Suspended': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'Consumer': 'bg-blue-100 text-blue-800',
      'Creator': 'bg-purple-100 text-purple-800',
      'Seller': 'bg-orange-100 text-orange-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <CardTitle>All Users</CardTitle>
          <UserFilters
            searchTerm={searchTerm}
            typeFilter={typeFilter}
            statusFilter={statusFilter}
            lastActiveFilter={lastActiveFilter}
            onSearchChange={onSearchChange}
            onTypeFilterChange={onTypeFilterChange}
            onStatusFilterChange={onStatusFilterChange}
            onLastActiveFilterChange={onLastActiveFilterChange}
          />
        </div>
      </CardHeader>
      <CardContent>
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
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => {
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
                  <TableCell>
                    <Badge className={getTypeColor(user.type)}>
                      {user.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.joinDate}</TableCell>
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
      </CardContent>
    </Card>
  );
};
