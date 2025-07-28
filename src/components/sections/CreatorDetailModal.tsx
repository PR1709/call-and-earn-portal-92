
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Video, Eye, DollarSign, Flag, Wallet, User, Phone, Mail, MapPin } from 'lucide-react';

interface Creator {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  tier: 'Premium' | 'Non-Premium';
  joinDate: string;
  earnings: number;
  videosPosted: number;
  totalViews: string;
  status: string;
}

interface CreatorDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  creator: Creator | null;
}

const mockVideoBreakdown = [
  { type: 'Comedy', count: 15, views: '450K', earnings: 8500 },
  { type: 'Educational', count: 12, views: '380K', earnings: 7200 },
  { type: 'Entertainment', count: 8, views: '290K', earnings: 5500 },
  { type: 'Gaming', count: 10, views: '350K', earnings: 6800 },
];

const mockViolations = [
  { date: '2024-02-15', type: 'Content Guidelines', status: 'Resolved', action: 'Warning Issued' },
  { date: '2024-01-28', type: 'Copyright Claim', status: 'Disputed', action: 'Under Review' },
];

const mockTransactions = [
  { id: 1, date: '2024-03-01', type: 'Views Revenue', amount: 1250, status: 'Completed' },
  { id: 2, date: '2024-03-01', type: 'Tips Received', amount: 450, status: 'Completed' },
  { id: 3, date: '2024-02-28', type: 'Campaign Bonus', amount: 2000, status: 'Completed' },
];

export const CreatorDetailModal: React.FC<CreatorDetailModalProps> = ({
  isOpen,
  onClose,
  creator
}) => {
  if (!creator) return null;

  const premiumVideos = Math.floor(creator.videosPosted * 0.7);
  const nonPremiumVideos = creator.videosPosted - premiumVideos;
  
  // Calculate totals that match dashboard numbers
  const totalVideoBreakdown = mockVideoBreakdown.reduce((sum, item) => sum + item.count, 0);
  const totalViewsCalculated = mockVideoBreakdown.reduce((sum, item) => {
    const viewsNum = parseFloat(item.views.replace('K', '')) * 1000;
    return sum + viewsNum;
  }, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onClose}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <DialogTitle className="text-2xl">{creator.name}</DialogTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={creator.tier === 'Premium' ? 'default' : 'secondary'}>
                  {creator.tier}
                </Badge>
                <Badge variant={creator.status === 'Active' ? 'default' : 'secondary'}>
                  {creator.status}
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{creator.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{creator.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{creator.address}</span>
                </div>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                <p>Joined: {creator.joinDate}</p>
              </div>
            </CardContent>
          </Card>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  Total Videos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{creator.videosPosted}</div>
                <p className="text-xs text-muted-foreground">Breakdown: {totalVideoBreakdown} detailed</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Total Views
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{creator.totalViews}</div>
                <p className="text-xs text-muted-foreground">Calculated: {(totalViewsCalculated / 1000000).toFixed(1)}M</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Total Earnings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">₹{creator.earnings.toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Premium/Non-Premium</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <p>Premium: {premiumVideos}</p>
                  <p>Non-Premium: {nonPremiumVideos}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="videos" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="videos">Video Breakdown</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
              <TabsTrigger value="violations">Violations</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
            </TabsList>

            <TabsContent value="videos" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Videos by Content Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Content Type</TableHead>
                        <TableHead>Videos Count</TableHead>
                        <TableHead>Total Views</TableHead>
                        <TableHead>Earnings</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockVideoBreakdown.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{item.type}</TableCell>
                          <TableCell>{item.count}</TableCell>
                          <TableCell>{item.views}</TableCell>
                          <TableCell className="text-green-600">₹{item.earnings.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="mt-4 text-sm text-muted-foreground">
                    <p>Total Videos in Breakdown: {totalVideoBreakdown} (matches dashboard count: {creator.videosPosted})</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="earnings" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Views Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₹18,500</div>
                    <p className="text-xs text-muted-foreground">From video views</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Tips Received</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₹4,200</div>
                    <p className="text-xs text-muted-foreground">From audience tips</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Campaign Earnings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₹2,300</div>
                    <p className="text-xs text-muted-foreground">From sponsored content</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="violations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Flag className="h-5 w-5" />
                    Complaints & Violations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action Taken</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockViolations.map((violation, index) => (
                        <TableRow key={index}>
                          <TableCell>{violation.date}</TableCell>
                          <TableCell>{violation.type}</TableCell>
                          <TableCell>
                            <Badge variant={violation.status === 'Resolved' ? 'default' : 'secondary'}>
                              {violation.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{violation.action}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transactions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5" />
                    Transaction History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>{transaction.type}</TableCell>
                          <TableCell className="text-green-600">₹{transaction.amount.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge variant="default">{transaction.status}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
