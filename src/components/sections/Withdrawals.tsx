
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Search, Filter, Download, Check, X, AlertTriangle, Flag } from 'lucide-react';
import { WithdrawalCategoryModal } from './WithdrawalCategoryModal';

const withdrawalRequests = [
  { id: 1, user: "Rahul Sharma", amount: 2500, status: "Pending", date: "2024-06-08", phone: "+91 98765 43210", suspicious: false },
  { id: 2, user: "Priya Patel", amount: 1800, status: "Approved", date: "2024-06-07", phone: "+91 87654 32109", suspicious: false },
  { id: 3, user: "Amit Kumar", amount: 5000, status: "Rejected", date: "2024-06-07", phone: "+91 76543 21098", suspicious: true },
  { id: 4, user: "Sneha Singh", amount: 3200, status: "Pending", date: "2024-06-06", phone: "+91 65432 10987", suspicious: false },
  { id: 5, user: "Vikash Yadav", amount: 750, status: "Approved", date: "2024-06-05", phone: "+91 54321 09876", suspicious: false },
  { id: 6, user: "Deepak Gupta", amount: 4200, status: "Pending", date: "2024-06-08", phone: "+91 43210 98765", suspicious: false },
  { id: 7, user: "Riya Sharma", amount: 1500, status: "Approved", date: "2024-06-07", phone: "+91 32109 87654", suspicious: false },
  { id: 8, user: "Arjun Singh", amount: 3800, status: "Rejected", date: "2024-06-06", phone: "+91 21098 76543", suspicious: false },
  { id: 9, user: "Kavita Joshi", amount: 2200, status: "Pending", date: "2024-06-08", phone: "+91 10987 65432", suspicious: true },
  { id: 10, user: "Manish Kumar", amount: 6500, status: "Pending", date: "2024-06-07", phone: "+91 09876 54321", suspicious: true },
];

export const Withdrawals: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [actionReason, setActionReason] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'pending' | 'approved' | 'rejected' | 'suspicious'>('pending');
  const [categoryModalTitle, setCategoryModalTitle] = useState('');

  const filteredRequests = withdrawalRequests.filter(request => {
    const matchesSearch = request.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.phone.includes(searchTerm);
    const matchesStatus = activeTab === 'all' || request.status.toLowerCase() === activeTab;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Approved': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800'
    };
    return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800';
  };

  const handleApprove = (request: any) => {
    console.log('Approving withdrawal:', request.id, 'Reason:', actionReason);
    setActionReason('');
  };

  const handleReject = (request: any) => {
    console.log('Rejecting withdrawal:', request.id, 'Reason:', actionReason);
    setActionReason('');
  };

  const toggleSuspicious = (requestId: number) => {
    console.log('Toggling suspicious flag for request:', requestId);
  };

  const handleCategoryClick = (category: 'pending' | 'approved' | 'rejected' | 'suspicious', title: string) => {
    setSelectedCategory(category);
    setCategoryModalTitle(title);
    setCategoryModalOpen(true);
  };

  const ClickableStatsCard = ({ 
    title, 
    value, 
    subtitle, 
    textColor, 
    onClick 
  }: {
    title: string;
    value: string;
    subtitle: string;
    textColor: string;
    onClick: () => void;
  }) => (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${textColor}`}>{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
      </CardContent>
    </Card>
  );

  return (
    <>
      <div className="space-y-8 p-8 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Withdrawals</h1>
            <p className="text-muted-foreground mt-2">Manage withdrawal requests and suspicious activities</p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <ClickableStatsCard
            title="Pending Requests"
            value="12"
            subtitle="₹45,200 total"
            textColor="text-yellow-600"
            onClick={() => handleCategoryClick('pending', 'Pending Withdrawal Requests')}
          />
          <ClickableStatsCard
            title="Approved Today"
            value="8"
            subtitle="₹28,500 processed"
            textColor="text-green-600"
            onClick={() => handleCategoryClick('approved', 'Approved Withdrawal Requests (Today)')}
          />
          <ClickableStatsCard
            title="Rejected Today"
            value="3"
            subtitle="₹8,750 blocked"
            textColor="text-red-600"
            onClick={() => handleCategoryClick('rejected', 'Rejected Withdrawal Requests (Today)')}
          />
          <ClickableStatsCard
            title="Suspicious Flags"
            value="5"
            subtitle="Require review"
            textColor="text-orange-600"
            onClick={() => handleCategoryClick('suspicious', 'Suspicious Withdrawal Requests')}
          />
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <CardTitle>Withdrawal Requests</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Flags</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.map((request) => (
                      <TableRow key={request.id} className={request.suspicious ? 'bg-red-50' : ''}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{request.user}</div>
                            <div className="text-sm text-muted-foreground">{request.phone}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold">₹{request.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadge(request.status)}>
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{request.date}</TableCell>
                        <TableCell>
                          {request.suspicious && (
                            <Badge variant="destructive" className="flex items-center gap-1 w-fit">
                              <Flag className="h-3 w-3" />
                              Suspicious
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center gap-2 justify-end">
                            {request.status === 'Pending' && (
                              <>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button size="sm" className="bg-green-500 hover:bg-green-600">
                                      <Check className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Approve Withdrawal</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <p>Approve withdrawal of ₹{request.amount} for {request.user}?</p>
                                      <Input
                                        placeholder="Approval reason (optional)"
                                        value={actionReason}
                                        onChange={(e) => setActionReason(e.target.value)}
                                      />
                                      <div className="flex gap-2">
                                        <Button 
                                          className="flex-1 bg-green-500 hover:bg-green-600"
                                          onClick={() => handleApprove(request)}
                                        >
                                          Approve
                                        </Button>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>

                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button size="sm" variant="destructive">
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Reject Withdrawal</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <p>Reject withdrawal of ₹{request.amount} for {request.user}?</p>
                                      <Input
                                        placeholder="Rejection reason (required)"
                                        value={actionReason}
                                        onChange={(e) => setActionReason(e.target.value)}
                                      />
                                      <div className="flex gap-2">
                                        <Button 
                                          variant="destructive" 
                                          className="flex-1"
                                          onClick={() => handleReject(request)}
                                        >
                                          Reject
                                        </Button>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </>
                            )}
                            
                            <Button
                              size="sm"
                              variant={request.suspicious ? "destructive" : "outline"}
                              onClick={() => toggleSuspicious(request.id)}
                            >
                              <Flag className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <WithdrawalCategoryModal
        isOpen={categoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
        title={categoryModalTitle}
        category={selectedCategory}
        requests={withdrawalRequests}
      />
    </>
  );
};
