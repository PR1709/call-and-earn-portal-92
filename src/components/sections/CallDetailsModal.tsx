
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, ArrowLeft, Phone, Clock, Eye } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ConsumerDetailModal } from './ConsumerDetailModal';

interface CallDetail {
  id: number;
  caller: string;
  receiver: string;
  duration: string;
  type: 'Video Call' | 'Voice Call';
  amount: number;
  date: string;
  status: 'Completed' | 'Dropped' | 'Missed';
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  status: string;
  tier: 'Premium' | 'Non-Premium';
  walletBalance: number;
  totalEarnings: number;
  totalLosses: number;
  averageTimeSpent: string;
  conversionRate: string;
  isActive: boolean;
}

interface CallDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const todayCalls: CallDetail[] = [
  { 
    id: 1, 
    caller: "Rahul Sharma", 
    receiver: "Priya Patel", 
    duration: "25:10", 
    type: "Video Call", 
    amount: 250, 
    date: "2024-06-10 11:45",
    status: "Completed"
  },
  { 
    id: 2, 
    caller: "Priya Patel", 
    receiver: "Amit Kumar", 
    duration: "18:45", 
    type: "Video Call", 
    amount: 190, 
    date: "2024-06-10 16:10",
    status: "Dropped"
  },
  { 
    id: 3, 
    caller: "Rahul Sharma", 
    receiver: "Priya Patel", 
    duration: "12:45", 
    type: "Video Call", 
    amount: 125, 
    date: "2024-06-10 14:30",
    status: "Completed"
  },
  { 
    id: 4, 
    caller: "Amit Kumar", 
    receiver: "Sneha Singh", 
    duration: "08:20", 
    type: "Voice Call", 
    amount: 85, 
    date: "2024-06-10 13:15",
    status: "Completed"
  },
  { 
    id: 5, 
    caller: "Sneha Singh", 
    receiver: "Rahul Sharma", 
    duration: "05:30", 
    type: "Voice Call", 
    amount: 55, 
    date: "2024-06-10 19:20",
    status: "Completed"
  },
  { 
    id: 6, 
    caller: "Vikash Yadav", 
    receiver: "Priya Patel", 
    duration: "15:30", 
    type: "Video Call", 
    amount: 155, 
    date: "2024-06-10 09:20",
    status: "Completed"
  },
  { 
    id: 7, 
    caller: "Amit Kumar", 
    receiver: "Rahul Sharma", 
    duration: "03:15", 
    type: "Voice Call", 
    amount: 35, 
    date: "2024-06-10 20:45",
    status: "Missed"
  }
];

// Mock user data for the callers/receivers
const mockUsers: Record<string, User> = {
  "Rahul Sharma": {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "+91 98765 43210",
    address: "Mumbai, Maharashtra",
    joinDate: "2024-01-15",
    status: "Active",
    tier: "Premium",
    walletBalance: 1250,
    totalEarnings: 2500,
    totalLosses: 800,
    averageTimeSpent: "2.5 hours",
    conversionRate: "12.5%",
    isActive: true
  },
  "Priya Patel": {
    id: 2,
    name: "Priya Patel",
    email: "priya@example.com",
    phone: "+91 87654 32109",
    address: "Delhi, India",
    joinDate: "2024-01-10",
    status: "Active",
    tier: "Premium",
    walletBalance: 2300,
    totalEarnings: 3200,
    totalLosses: 950,
    averageTimeSpent: "3.1 hours",
    conversionRate: "15.2%",
    isActive: true
  },
  "Amit Kumar": {
    id: 3,
    name: "Amit Kumar",
    email: "amit@example.com",
    phone: "+91 76543 21098",
    address: "Bangalore, Karnataka",
    joinDate: "2024-01-25",
    status: "Active",
    tier: "Non-Premium",
    walletBalance: 3200,
    totalEarnings: 1800,
    totalLosses: 600,
    averageTimeSpent: "1.8 hours",
    conversionRate: "10.2%",
    isActive: true
  },
  "Sneha Singh": {
    id: 4,
    name: "Sneha Singh",
    email: "sneha@example.com",
    phone: "+91 65432 10987",
    address: "Chennai, Tamil Nadu",
    joinDate: "2024-02-01",
    status: "Active",
    tier: "Non-Premium",
    walletBalance: 1500,
    totalEarnings: 1200,
    totalLosses: 300,
    averageTimeSpent: "2.0 hours",
    conversionRate: "11.5%",
    isActive: true
  },
  "Vikash Yadav": {
    id: 5,
    name: "Vikash Yadav",
    email: "vikash@example.com",
    phone: "+91 54321 09876",
    address: "Pune, Maharashtra",
    joinDate: "2024-02-10",
    status: "Active",
    tier: "Premium",
    walletBalance: 1800,
    totalEarnings: 2200,
    totalLosses: 400,
    averageTimeSpent: "2.8 hours",
    conversionRate: "13.2%",
    isActive: true
  }
};

export const CallDetailsModal: React.FC<CallDetailsModalProps> = ({ 
  isOpen, 
  onClose 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserDetailOpen, setIsUserDetailOpen] = useState(false);

  const handleViewUser = (userName: string) => {
    const user = mockUsers[userName];
    if (user) {
      setSelectedUser(user);
      setIsUserDetailOpen(true);
    }
  };

  const getFilteredCalls = (statusFilter?: 'completed' | 'dropped' | 'missed') => {
    let filteredCalls = [...todayCalls];

    // Filter by status if specified
    if (statusFilter === 'completed') {
      filteredCalls = filteredCalls.filter(call => call.status === 'Completed');
    } else if (statusFilter === 'dropped') {
      filteredCalls = filteredCalls.filter(call => call.status === 'Dropped');
    } else if (statusFilter === 'missed') {
      filteredCalls = filteredCalls.filter(call => call.status === 'Missed');
    }

    // Filter by search term
    if (searchTerm) {
      filteredCalls = filteredCalls.filter(call =>
        call.caller.toLowerCase().includes(searchTerm.toLowerCase()) ||
        call.receiver.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by type
    if (typeFilter !== 'all') {
      filteredCalls = filteredCalls.filter(call => 
        call.type.toLowerCase().includes(typeFilter.toLowerCase())
      );
    }

    return filteredCalls;
  };

  const getCallTypeColor = (type: string) => {
    return type === 'Video Call' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'Completed': 'bg-green-100 text-green-800',
      'Dropped': 'bg-red-100 text-red-800',
      'Missed': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatDuration = (duration: string) => {
    const [minutes, seconds] = duration.split(':');
    return `${minutes}m ${seconds}s`;
  };

  const CallTable = ({ calls }: { calls: CallDetail[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Caller</TableHead>
          <TableHead>Receiver</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {calls.map((call) => (
          <TableRow key={call.id}>
            <TableCell className="font-medium">{call.caller}</TableCell>
            <TableCell>{call.receiver}</TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatDuration(call.duration)}
              </div>
            </TableCell>
            <TableCell>
              <Badge className={getCallTypeColor(call.type)}>
                {call.type}
              </Badge>
            </TableCell>
            <TableCell className="font-semibold text-green-600">₹{call.amount}</TableCell>
            <TableCell>{call.date.split(' ')[1]}</TableCell>
            <TableCell>
              <Badge className={getStatusColor(call.status)}>
                {call.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center gap-2 justify-end">
                <Button variant="ghost" size="sm" onClick={() => handleViewUser(call.caller)} title="View Caller Details">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleViewUser(call.receiver)} title="View Receiver Details">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const completedCalls = getFilteredCalls('completed');
  const droppedCalls = getFilteredCalls('dropped');
  const missedCalls = getFilteredCalls('missed');
  const allCalls = getFilteredCalls();

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onClose}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <DialogTitle className="text-2xl">Today's Call Details</DialogTitle>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6 overflow-y-auto">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by caller or receiver..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Call Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="video">Video Call</SelectItem>
                  <SelectItem value="voice">Voice Call</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Calls ({allCalls.length})</TabsTrigger>
                <TabsTrigger value="completed">Completed ({completedCalls.length})</TabsTrigger>
                <TabsTrigger value="dropped">Dropped ({droppedCalls.length})</TabsTrigger>
                <TabsTrigger value="missed">Missed ({missedCalls.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                <CallTable calls={allCalls} />
              </TabsContent>

              <TabsContent value="completed" className="space-y-4">
                <CallTable calls={completedCalls} />
              </TabsContent>

              <TabsContent value="dropped" className="space-y-4">
                <CallTable calls={droppedCalls} />
              </TabsContent>

              <TabsContent value="missed" className="space-y-4">
                <CallTable calls={missedCalls} />
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>

      <ConsumerDetailModal
        isOpen={isUserDetailOpen}
        onClose={() => setIsUserDetailOpen(false)}
        consumer={selectedUser}
      />
    </>
  );
};
