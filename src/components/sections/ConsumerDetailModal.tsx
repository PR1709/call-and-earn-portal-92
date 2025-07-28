import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, User, Wallet, GamepadIcon, MessageSquare, Eye, Upload, CreditCard, Phone, Mail, MapPin, Heart, Video, Image, QrCode, Share, Users, PhoneCall, TrendingUp, Crown, Banknote } from 'lucide-react';
import { Consumer } from '@/types/Consumer';
import { EarningFeaturesManager } from './EarningFeaturesManager';

interface ConsumerDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  consumer: Consumer | null;
}

const mockLudoEarnings = [
  { tier: '₹1', matches: 45, earnings: 32 },
  { tier: '₹5', matches: 23, earnings: 95 },
  { tier: '₹10', matches: 12, earnings: 108 },
  { tier: '₹50', matches: 8, earnings: 350 },
  { tier: '₹100', matches: 3, earnings: 270 },
];

const mockComplaints = [
  { id: 1, date: '2024-01-15', issue: 'Payment not received', status: 'Resolved' },
  { id: 2, date: '2024-02-20', issue: 'Game disconnection', status: 'In Progress' },
];

const mockAdInteractions = [
  { date: '2024-03-01', clicks: 15, impressions: 120, ctr: '12.5%' },
  { date: '2024-03-02', clicks: 8, impressions: 95, ctr: '8.4%' },
];

const mockTransactions = [
  { id: 1, date: '2024-03-01', type: 'Credit', amount: 150, description: 'Ludo Win' },
  { id: 2, date: '2024-03-02', type: 'Debit', amount: 50, description: 'Game Entry' },
  { id: 3, date: '2024-03-03', type: 'Credit', amount: 25, description: 'Video Reward' },
];

// Earning features data
const earningFeatures = [
  {
    icon: Heart,
    title: "Watch & Like Ads",
    description: "Earn cash by viewing and liking advertisements (\"paid ads\")."
  },
  {
    icon: Video,
    title: "Tip Tube (Video Uploads)",
    description: "Upload videos or watch others' content to earn—creators get ₹500 for 10,000 views."
  },
  {
    icon: Image,
    title: "Post & Earn",
    description: "Share posts (images/status updates) and earn from ad viewer engagement."
  },
  {
    icon: QrCode,
    title: "Scan & Earn",
    description: "Scan QR codes in ads to unlock instant rewards."
  },
  {
    icon: Share,
    title: "Share & Earn",
    description: "Share ads/videos with friends—earn when they engage."
  },
  {
    icon: Users,
    title: "Refer & Earn",
    description: "Invite friends and earn ₹5 per referral (withdrawable after 1,000 app downloads)."
  },
  {
    icon: PhoneCall,
    title: "Chat & Voice Calls",
    description: "Earn by interacting through in-app chat or voice calls (Invoice Call – Earn While Talking)."
  },
  {
    icon: TrendingUp,
    title: "Lead Generation for Sellers",
    description: "Participate in lead-gen campaigns and earn while helping sellers."
  },
  {
    icon: Crown,
    title: "Premium Membership",
    description: "Unlock more earnings and exclusive perks by upgrading to premium."
  },
  {
    icon: Banknote,
    title: "Withdraw to Bank/UPI",
    description: "Transfer your earnings directly to your bank account or UPI."
  }
];

export const ConsumerDetailModal: React.FC<ConsumerDetailModalProps> = ({
  isOpen,
  onClose,
  consumer
}) => {
  if (!consumer) return null;

  const totalVideoInteractions = 245 + 12; // watched + uploaded
  const totalAdClicks = mockAdInteractions.reduce((sum, interaction) => sum + interaction.clicks, 0);
  const totalAdImpressions = mockAdInteractions.reduce((sum, interaction) => sum + interaction.impressions, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onClose}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <DialogTitle className="text-2xl">{consumer.name}</DialogTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={consumer.tier === 'Premium' ? 'default' : 'secondary'}>
                  {consumer.tier}
                </Badge>
                <Badge variant={consumer.status === 'Active' ? 'default' : 'destructive'}>
                  {consumer.status}
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Contact Info and Overview */}
          <div className="space-y-4">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{consumer.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{consumer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{consumer.address}</span>
                  </div>
                </div>
                <div className="mt-4 text-sm text-muted-foreground space-y-1">
                  <p>Joined: {consumer.joinDate}</p>
                  <p>Average Time Spent: {consumer.averageTimeSpent}</p>
                  <p>Conversion Rate: {consumer.conversionRate}</p>
                </div>
              </CardContent>
            </Card>

            {/* Overview Cards */}
            <div className="grid grid-cols-2 gap-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs flex items-center gap-2">
                    <Wallet className="h-3 w-3" />
                    Wallet Balance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">₹{consumer.walletBalance?.toLocaleString() || 0}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs flex items-center gap-2">
                    <Wallet className="h-3 w-3" />
                    Total Earnings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold text-green-600">₹{consumer.totalEarnings.toLocaleString()}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs flex items-center gap-2">
                    <CreditCard className="h-3 w-3" />
                    Total Losses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold text-red-600">₹{consumer.totalLosses.toLocaleString()}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs">Video Interactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">{totalVideoInteractions}</div>
                  <p className="text-xs text-muted-foreground">Watched + Uploaded</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column - Ludo Earnings */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GamepadIcon className="h-5 w-5" />
                  Ludo Earnings by Match Tier
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Match Tier</TableHead>
                      <TableHead>Matches</TableHead>
                      <TableHead>Earnings</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockLudoEarnings.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.tier}</TableCell>
                        <TableCell>{item.matches}</TableCell>
                        <TableCell className="text-green-600">₹{item.earnings}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs">Ad Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold text-blue-600">{totalAdClicks}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs">Ad Impressions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold text-purple-600">{totalAdImpressions}</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Full Width Tabs Section */}
        <div className="mt-6">
          <Tabs defaultValue="earning-features" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="earning-features">Earning Features</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="complaints">Complaints</TabsTrigger>
              <TabsTrigger value="ads">Ad Details</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="premium">Premium</TabsTrigger>
            </TabsList>

            <TabsContent value="earning-features" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Interactive Earning Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <EarningFeaturesManager userId={consumer.id.toString()} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transactions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5" />
                    Recent Wallet Transactions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>
                            <Badge variant={transaction.type === 'Credit' ? 'default' : 'destructive'}>
                              {transaction.type}
                            </Badge>
                          </TableCell>
                          <TableCell className={transaction.type === 'Credit' ? 'text-green-600' : 'text-red-600'}>
                            ₹{transaction.amount}
                          </TableCell>
                          <TableCell>{transaction.description}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="complaints" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Complaint History
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

            <TabsContent value="ads" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Advertisement Interactions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Clicks</TableHead>
                        <TableHead>Impressions</TableHead>
                        <TableHead>CTR</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockAdInteractions.map((interaction, index) => (
                        <TableRow key={index}>
                          <TableCell>{interaction.date}</TableCell>
                          <TableCell>{interaction.clicks}</TableCell>
                          <TableCell>{interaction.impressions}</TableCell>
                          <TableCell>{interaction.ctr}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="videos" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Video Activity Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">245</p>
                      <p className="text-sm text-muted-foreground">Videos Watched</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-green-600">12</p>
                      <p className="text-sm text-muted-foreground">Videos Uploaded</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">25,430</p>
                      <p className="text-sm text-muted-foreground">Total Views</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-orange-600">₹1,271</p>
                      <p className="text-sm text-muted-foreground">Video Earnings</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="premium" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="h-5 w-5" />
                    Premium Membership Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-xl font-bold text-yellow-600">
                        {consumer.tier === 'Premium' ? 'Active' : 'Inactive'}
                      </p>
                      <p className="text-sm text-muted-foreground">Membership Status</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-xl font-bold text-purple-600">127</p>
                      <p className="text-sm text-muted-foreground">Days Remaining</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-xl font-bold text-green-600">₹847</p>
                      <p className="text-sm text-muted-foreground">Extra Earnings</p>
                    </div>
                  </div>
                  {consumer.tier === 'Premium' && (
                    <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <strong>Premium benefits:</strong> 2x ad rewards, exclusive campaigns, priority support
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
