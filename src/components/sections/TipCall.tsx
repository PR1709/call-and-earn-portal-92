import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Download, Phone, Clock, TrendingUp, Users } from 'lucide-react';
import { TipCallActiveUsersModal } from './TipCallActiveUsersModal';
import { ConsumerDetailModal } from './ConsumerDetailModal';
import { CallDetailsModal } from './CallDetailsModal';

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

const callLogs = [
  { 
    id: 1, 
    caller: "Rahul Sharma", 
    receiver: "Priya Patel", 
    duration: "25:10", 
    type: "Video Call", 
    amount: 250, 
    date: "2024-06-08 11:45",
    status: "Completed"
  },
  { 
    id: 2, 
    caller: "Priya Patel", 
    receiver: "Amit Kumar", 
    duration: "18:45", 
    type: "Video Call", 
    amount: 190, 
    date: "2024-06-07 16:10",
    status: "Dropped"
  },
  { 
    id: 3, 
    caller: "Rahul Sharma", 
    receiver: "Priya Patel", 
    duration: "12:45", 
    type: "Video Call", 
    amount: 125, 
    date: "2024-06-08 14:30",
    status: "Completed"
  },
  { 
    id: 4, 
    caller: "Amit Kumar", 
    receiver: "Sneha Singh", 
    duration: "08:20", 
    type: "Voice Call", 
    amount: 85, 
    date: "2024-06-08 13:15",
    status: "Completed"
  },
  { 
    id: 5, 
    caller: "Sneha Singh", 
    receiver: "Rahul Sharma", 
    duration: "05:30", 
    type: "Voice Call", 
    amount: 55, 
    date: "2024-06-07 19:20",
    status: "Completed"
  },
];

export const TipCall: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [isActiveUsersModalOpen, setIsActiveUsersModalOpen] = useState(false);
  const [isCallDetailsModalOpen, setIsCallDetailsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserDetailOpen, setIsUserDetailOpen] = useState(false);

  // Convert duration to total seconds for sorting
  const getDurationInSeconds = (duration: string) => {
    const [minutes, seconds] = duration.split(':').map(Number);
    return minutes * 60 + seconds;
  };

  // Sort call logs by duration (highest to lowest)
  const sortedCallLogs = [...callLogs].sort((a, b) => 
    getDurationInSeconds(b.duration) - getDurationInSeconds(a.duration)
  );

  const filteredLogs = sortedCallLogs.filter(log => {
    const matchesSearch = log.caller.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.receiver.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || log.type.toLowerCase().includes(filterType.toLowerCase());
    return matchesSearch && matchesType;
  });

  const formatDuration = (duration: string) => {
    const [minutes, seconds] = duration.split(':');
    return `${minutes}m ${seconds}s`;
  };

  const getCallTypeColor = (type: string) => {
    return type === 'Video Call' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700';
  };

  const getStatusColor = (status: string) => {
    return status === 'Completed' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700';
  };

  const handleActiveUsersClick = () => {
    setIsActiveUsersModalOpen(true);
  };

  const handleCallDetailsClick = () => {
    setIsCallDetailsModalOpen(true);
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsUserDetailOpen(true);
    setIsActiveUsersModalOpen(false);
  };

  return (
    <>
      <div className="space-y-8 p-8 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">TipCall Management</h1>
            <p className="text-muted-foreground mt-2">Monitor call logs and earnings</p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Logs
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card 
            className="bg-gradient-to-br from-blue-100 to-blue-200 text-blue-800 border-blue-200 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={handleCallDetailsClick}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Total Calls Today</CardTitle>
                <Phone className="h-8 w-8 opacity-80" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">156</div>
              <p className="text-blue-600 text-sm mt-1">+12% from yesterday</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-100 to-green-200 text-green-800 border-green-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Total Earnings</CardTitle>
                <TrendingUp className="h-8 w-8 opacity-80" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₹18,450</div>
              <p className="text-green-600 text-sm mt-1">Today's revenue</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-100 to-purple-200 text-purple-800 border-purple-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Avg Call Duration</CardTitle>
                <Clock className="h-8 w-8 opacity-80" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">14m 32s</div>
              <p className="text-purple-600 text-sm mt-1">Average session</p>
            </CardContent>
          </Card>

          <Card 
            className="bg-gradient-to-br from-orange-100 to-orange-200 text-orange-800 border-orange-200 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={handleActiveUsersClick}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Active Users</CardTitle>
                <Users className="h-8 w-8 opacity-80" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">89</div>
              <p className="text-orange-600 text-sm mt-1">Currently online</p>
            </CardContent>
          </Card>
        </div>

        {/* Call Logs */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Call Logs
              </CardTitle>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Call type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="video">Video Call</SelectItem>
                    <SelectItem value="voice">Voice Call</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredLogs.map((log) => (
                <div 
                  key={log.id} 
                  className="flex items-center justify-between p-4 rounded-lg border bg-white hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50">
                      <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{log.caller}</span>
                        <span className="text-muted-foreground">→</span>
                        <span className="font-medium">{log.receiver}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Badge className={getCallTypeColor(log.type)}>
                          {log.type}
                        </Badge>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDuration(log.duration)}
                        </span>
                        <span>{log.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-lg font-semibold text-green-600 mb-1">
                        ₹{log.amount}
                      </div>
                      <Badge className={getStatusColor(log.status)}>
                        {log.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-6">
              <Button variant="outline">Load More</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <TipCallActiveUsersModal
        isOpen={isActiveUsersModalOpen}
        onClose={() => setIsActiveUsersModalOpen(false)}
        onViewUser={handleViewUser}
      />

      <CallDetailsModal
        isOpen={isCallDetailsModalOpen}
        onClose={() => setIsCallDetailsModalOpen(false)}
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
    </>
  );
};
