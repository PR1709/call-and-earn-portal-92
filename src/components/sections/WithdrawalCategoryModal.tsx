
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, X, Flag, Search, Crown, User } from 'lucide-react';

interface WithdrawalRequest {
  id: number;
  user: string;
  amount: number;
  status: string;
  date: string;
  phone: string;
  suspicious: boolean;
  tier?: string; // Adding tier property for Premium/Non-Premium
}

interface WithdrawalCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  category: 'pending' | 'approved' | 'rejected' | 'suspicious';
  requests: WithdrawalRequest[];
}

export const WithdrawalCategoryModal: React.FC<WithdrawalCategoryModalProps> = ({
  isOpen,
  onClose,
  title,
  category,
  requests
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [actionReason, setActionReason] = React.useState('');

  // Add tier information to requests if not present (mock data)
  const requestsWithTier = requests.map(request => ({
    ...request,
    tier: request.tier || (Math.random() > 0.6 ? 'Premium' : 'Non-Premium')
  }));

  const filteredRequests = requestsWithTier.filter(request => {
    const matchesSearch = request.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.phone.includes(searchTerm);
    
    switch (category) {
      case 'pending':
        return request.status === 'Pending' && matchesSearch;
      case 'approved':
        return request.status === 'Approved' && matchesSearch;
      case 'rejected':
        return request.status === 'Rejected' && matchesSearch;
      case 'suspicious':
        return request.suspicious && matchesSearch;
      default:
        return matchesSearch;
    }
  });

  const premiumRequests = filteredRequests.filter(request => request.tier === 'Premium');
  const nonPremiumRequests = filteredRequests.filter(request => request.tier === 'Non-Premium');

  const getStatusBadge = (status: string) => {
    const variants = {
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Approved': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800'
    };
    return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800';
  };

  const getTierIcon = (tier: string) => {
    return tier === 'Premium' ? Crown : User;
  };

  const getTierColor = (tier: string) => {
    return tier === 'Premium' ? 'text-yellow-600' : 'text-gray-600';
  };

  const handleApprove = (request: WithdrawalRequest) => {
    console.log('Approving withdrawal:', request.id, 'Reason:', actionReason);
    setActionReason('');
  };

  const handleReject = (request: WithdrawalRequest) => {
    console.log('Rejecting withdrawal:', request.id, 'Reason:', actionReason);
    setActionReason('');
  };

  const toggleSuspicious = (requestId: number) => {
    console.log('Toggling suspicious flag for request:', requestId);
  };

  const renderRequestTable = (requestList: WithdrawalRequest[], tierType: string) => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold">{tierType} Users</h3>
        <Badge variant="secondary">{requestList.length} requests</Badge>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User Details</TableHead>
            <TableHead>Tier</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Flags</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requestList.map((request) => {
            const TierIcon = getTierIcon(request.tier!);
            return (
              <TableRow key={request.id} className={request.suspicious ? 'bg-red-50' : ''}>
                <TableCell>
                  <div>
                    <div className="font-medium">{request.user}</div>
                    <div className="text-sm text-muted-foreground">{request.phone}</div>
                    <div className="text-xs text-muted-foreground">ID: {request.id}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <TierIcon className={`h-4 w-4 ${getTierColor(request.tier!)}`} />
                    <Badge 
                      variant={request.tier === 'Premium' ? 'default' : 'secondary'}
                      className={request.tier === 'Premium' ? 'bg-yellow-100 text-yellow-800' : ''}
                    >
                      {request.tier}
                    </Badge>
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
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" className="bg-green-500 hover:bg-green-600">
                              <Check className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Approve Withdrawal</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to approve withdrawal of ₹{request.amount} for {request.user}?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <div className="my-4">
                              <Input
                                placeholder="Approval reason (optional)"
                                value={actionReason}
                                onChange={(e) => setActionReason(e.target.value)}
                              />
                            </div>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                className="bg-green-500 hover:bg-green-600"
                                onClick={() => handleApprove(request)}
                              >
                                Approve
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="destructive">
                              <X className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Reject Withdrawal</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to reject withdrawal of ₹{request.amount} for {request.user}?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <div className="my-4">
                              <Input
                                placeholder="Rejection reason (required)"
                                value={actionReason}
                                onChange={(e) => setActionReason(e.target.value)}
                              />
                            </div>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                onClick={() => handleReject(request)}
                              >
                                Reject
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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
            );
          })}
        </TableBody>
      </Table>
      
      {requestList.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No {tierType.toLowerCase()} withdrawal requests found for this category.
        </div>
      )}
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {title}
            <Badge variant="secondary">{filteredRequests.length} total requests</Badge>
          </DialogTitle>
          <div className="flex items-center gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by user name or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </DialogHeader>
        
        <div className="mt-4">
          <Tabs defaultValue="premium" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="premium" className="flex items-center gap-2">
                <Crown className="h-4 w-4" />
                Premium ({premiumRequests.length})
              </TabsTrigger>
              <TabsTrigger value="non-premium" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Non-Premium ({nonPremiumRequests.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="premium" className="mt-6">
              {renderRequestTable(premiumRequests, "Premium")}
            </TabsContent>
            
            <TabsContent value="non-premium" className="mt-6">
              {renderRequestTable(nonPremiumRequests, "Non-Premium")}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
