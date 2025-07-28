
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, TrendingUp, DollarSign, Eye, AlertTriangle, User, Phone, Mail, MapPin, Building } from 'lucide-react';

interface Advertiser {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  companyName: string;
  gstNumber: string;
  campaignsCount: number;
  status: 'Active' | 'Inactive' | 'Suspended';
  revenue: number;
  ctr: string;
  totalSpent: number;
  joinDate: string;
}

interface Campaign {
  id: number;
  name: string;
  status: 'Active' | 'Paused' | 'Completed';
  budget: number;
  spent: number;
  revenue: number;
  ctr: string;
  startDate: string;
  endDate: string;
}

interface AdvertiserDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  advertiser: Advertiser | null;
}

const mockCampaigns: Campaign[] = [
  { id: 1, name: "Summer Sale 2024", status: "Active", budget: 50000, spent: 32000, revenue: 85000, ctr: "4.2%", startDate: "2024-03-01", endDate: "2024-06-01" },
  { id: 2, name: "New Product Launch", status: "Active", budget: 75000, spent: 45000, revenue: 120000, ctr: "3.8%", startDate: "2024-02-15", endDate: "2024-05-15" },
  { id: 3, name: "Brand Awareness", status: "Completed", budget: 25000, spent: 25000, revenue: 45000, ctr: "5.1%", startDate: "2024-01-01", endDate: "2024-02-28" },
  { id: 4, name: "Holiday Campaign", status: "Paused", budget: 40000, spent: 15000, revenue: 30000, ctr: "3.5%", startDate: "2024-03-10", endDate: "2024-04-10" },
];

const mockEngagementMetrics = [
  { metric: "Total Impressions", value: "2.5M", change: "+12%" },
  { metric: "Total Clicks", value: "105K", change: "+8%" },
  { metric: "Conversion Rate", value: "3.2%", change: "+0.5%" },
  { metric: "Cost Per Click", value: "₹1.85", change: "-₹0.15" },
];

const mockComplaints = [
  { id: 1, date: "2024-03-01", issue: "Ad content violation", status: "Resolved" },
  { id: 2, date: "2024-02-15", issue: "Billing dispute", status: "In Progress" },
];

export const AdvertiserDetailModal: React.FC<AdvertiserDetailModalProps> = ({
  isOpen,
  onClose,
  advertiser
}) => {
  if (!advertiser) return null;

  const getStatusColor = (status: string) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Paused': 'bg-yellow-100 text-yellow-800',
      'Completed': 'bg-blue-100 text-blue-800',
      'Inactive': 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  // Calculate totals that match dashboard numbers
  const activeCampaigns = mockCampaigns.filter(c => c.status === 'Active').length;
  const totalCampaignsCalculated = mockCampaigns.length;
  const totalRevenueCalculated = mockCampaigns.reduce((sum, campaign) => sum + campaign.revenue, 0);
  const totalSpentCalculated = mockCampaigns.reduce((sum, campaign) => sum + campaign.spent, 0);
  const avgCTR = (mockCampaigns.reduce((sum, campaign) => sum + parseFloat(campaign.ctr), 0) / mockCampaigns.length).toFixed(1);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onClose}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <DialogTitle className="text-2xl">{advertiser.name}</DialogTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={advertiser.status === 'Active' ? 'default' : 'destructive'}>
                  {advertiser.status}
                </Badge>
                <span className="text-sm text-muted-foreground">Joined: {advertiser.joinDate}</span>
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
                Contact & Company Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{advertiser.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{advertiser.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{advertiser.address}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{advertiser.companyName}</span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">GST Number</p>
                    <p className="text-sm font-mono">{advertiser.gstNumber}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Total Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{advertiser.campaignsCount}</div>
                <p className="text-xs text-muted-foreground">Calculated: {totalCampaignsCalculated} ({activeCampaigns} active)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Revenue Generated
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">₹{advertiser.revenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Calculated: ₹{totalRevenueCalculated.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Total Spent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">₹{advertiser.totalSpent.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Calculated: ₹{totalSpentCalculated.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Average CTR
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{advertiser.ctr}</div>
                <p className="text-xs text-muted-foreground">Calculated: {avgCTR}%</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="campaigns" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
              <TabsTrigger value="metrics">Engagement Metrics</TabsTrigger>
              <TabsTrigger value="complaints">Complaints</TabsTrigger>
            </TabsList>

            <TabsContent value="campaigns" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Campaign Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Campaign Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Budget</TableHead>
                        <TableHead>Spent</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead>CTR</TableHead>
                        <TableHead>Period</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockCampaigns.map((campaign) => (
                        <TableRow key={campaign.id}>
                          <TableCell className="font-medium">{campaign.name}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(campaign.status)}>
                              {campaign.status}
                            </Badge>
                          </TableCell>
                          <TableCell>₹{campaign.budget.toLocaleString()}</TableCell>
                          <TableCell>₹{campaign.spent.toLocaleString()}</TableCell>
                          <TableCell className="text-green-600">₹{campaign.revenue.toLocaleString()}</TableCell>
                          <TableCell className="font-semibold">{campaign.ctr}</TableCell>
                          <TableCell className="text-sm">
                            {campaign.startDate} to {campaign.endDate}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="mt-4 text-sm text-muted-foreground">
                    <p>Total Campaigns: {totalCampaignsCalculated}</p>
                    <p>Total Revenue: ₹{totalRevenueCalculated.toLocaleString()}</p>
                    <p>Total Spent: ₹{totalSpentCalculated.toLocaleString()}</p>
                    <p>Average CTR: {avgCTR}%</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="metrics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockEngagementMetrics.map((metric, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">{metric.metric}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{metric.value}</div>
                      <p className="text-sm text-green-600 mt-1">{metric.change} from last month</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="complaints" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Complaint & Violation Logs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Issue</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockComplaints.map((complaint) => (
                        <TableRow key={complaint.id}>
                          <TableCell>{complaint.date}</TableCell>
                          <TableCell>{complaint.issue}</TableCell>
                          <TableCell>
                            <Badge variant={complaint.status === 'Resolved' ? 'default' : 'secondary'}>
                              {complaint.status}
                            </Badge>
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
