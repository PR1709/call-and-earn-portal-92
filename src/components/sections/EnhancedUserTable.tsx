
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Eye, User, Wallet, GamepadIcon, Video, TrendingUp, Ban, Settings, Heart } from 'lucide-react';
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

interface EnhancedUserTableProps {
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
  onUserAction?: (user: User, action: string) => void;
}

interface UserQuickStats {
  adsWatched: number;
  videosUploaded: number;
  referrals: number;
  gameWins: number;
  earningStreak: number;
}

const generateUserStats = (userId: number): UserQuickStats => ({
  adsWatched: Math.floor(Math.random() * 100) + 10,
  videosUploaded: Math.floor(Math.random() * 20) + 1,
  referrals: Math.floor(Math.random() * 15) + 1,
  gameWins: Math.floor(Math.random() * 50) + 5,
  earningStreak: Math.floor(Math.random() * 30) + 1
});

export const EnhancedUserTable: React.FC<EnhancedUserTableProps> = ({
  users,
  searchTerm,
  typeFilter,
  statusFilter,
  lastActiveFilter,
  onSearchChange,
  onTypeFilterChange,
  onStatusFilterChange,
  onLastActiveFilterChange,
  onViewUser,
  onUserAction
}) => {
  const [userStats] = useState<Record<number, UserQuickStats>>(
    users.reduce((acc, user) => ({
      ...acc,
      [user.id]: generateUserStats(user.id)
    }), {})
  );

  const getActivityTimeFrame = (lastActive: string): string => {
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
      return true;
    }
    if (lastActive.includes('hours ago')) {
      const hours = parseInt(lastActive);
      return hours <= 2;
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

  const handleUserAction = (user: User, action: string) => {
    if (onUserAction) {
      onUserAction(user, action);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <CardTitle>All Users ({filteredUsers.length})</CardTitle>
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
              <TableHead>Earnings</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => {
              const isActiveNow = isUserActiveNow(user.lastActive);
              const stats = userStats[user.id];
              return (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {isActiveNow && (
                        <div className="w-2 h-2 bg-green-500 rounded-full flicker-dot"></div>
                      )}
                      <div>
                        <div>{user.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {user.tier} • {stats?.earningStreak || 0} day streak
                        </div>
                      </div>
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
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium text-green-600">
                        ₹{user.totalEarnings.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Wallet: ₹{user.walletBalance.toLocaleString()}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {isActiveNow 
                      ? getOnlineSinceTime(user.lastActive)
                      : user.lastActive
                    }
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-80 bg-white border shadow-lg">
                        {/* Quick User Overview */}
                        <div className="p-3 border-b">
                          <div className="flex items-center gap-2 mb-2">
                            <User className="h-4 w-4" />
                            <span className="font-medium">{user.name}</span>
                            <Badge className={getStatusColor(user.status)}>
                              {user.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex items-center gap-1">
                              <Heart className="h-3 w-3 text-red-500" />
                              <span>{stats?.adsWatched || 0} ads watched</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Video className="h-3 w-3 text-blue-500" />
                              <span>{stats?.videosUploaded || 0} videos</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <GamepadIcon className="h-3 w-3 text-purple-500" />
                              <span>{stats?.gameWins || 0} game wins</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="h-3 w-3 text-green-500" />
                              <span>{stats?.referrals || 0} referrals</span>
                            </div>
                          </div>
                          <div className="mt-2 pt-2 border-t">
                            <div className="flex justify-between text-xs">
                              <span>Total Earnings:</span>
                              <span className="font-medium text-green-600">
                                ₹{user.totalEarnings.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span>Wallet Balance:</span>
                              <span className="font-medium">
                                ₹{user.walletBalance.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <DropdownMenuItem onClick={() => onViewUser(user)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Full Details
                        </DropdownMenuItem>
                        
                        <DropdownMenuItem onClick={() => handleUserAction(user, 'manage-wallet')}>
                          <Wallet className="mr-2 h-4 w-4" />
                          Manage Wallet
                        </DropdownMenuItem>
                        
                        {user.status !== 'Suspended' && (
                          <DropdownMenuItem 
                            onClick={() => handleUserAction(user, 'suspend')}
                            className="text-red-600"
                          >
                            <Ban className="mr-2 h-4 w-4" />
                            Suspend User
                          </DropdownMenuItem>
                        )}
                        
                        <DropdownMenuSeparator />
                        
                        <DropdownMenuItem onClick={() => handleUserAction(user, 'settings')}>
                          <Settings className="mr-2 h-4 w-4" />
                          User Settings
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
