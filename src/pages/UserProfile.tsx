import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ArrowLeft, User, Wallet, GamepadIcon, MessageSquare, Eye, Upload, CreditCard, Phone, Mail, MapPin, Calendar, ChevronDown, Target, Heart, Video, Image, QrCode, Share, Users, PhoneCall, TrendingUp, Crown, Banknote } from 'lucide-react';

interface UserProfile {
  id: string;
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

// Mock user data mapping for search results
const getUserBySearchId = (searchId: string): UserProfile | null => {
  const userMap: { [key: string]: UserProfile } = {
    'user-1': {
      id: 'user-1',
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
      id: 'user-2',
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
      id: 'user-3',
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
    },
    'user-4': {
      id: 'user-4',
      name: "FunnyGuy123",
      email: "funnyguy123@creator.com",
      phone: "+91 9876543210",
      type: "Creator",
      status: "Active",
      joinDate: "2024-01-12",
      lastActive: "3 hours ago",
      tier: "Premium",
      walletBalance: 4200,
      address: "Kolkata, West Bengal",
      totalEarnings: 5500,
      totalLosses: 1300,
      averageTimeSpent: "4.2 hours",
      conversionRate: "18.5%",
      isActive: true
    },
    'user-5': {
      id: 'user-5',
      name: "ChefMaster",
      email: "chefmaster@creator.com",
      phone: "+91 9876543211",
      type: "Creator",
      status: "Active",
      joinDate: "2024-01-08",
      lastActive: "1 hour ago",
      tier: "Premium",
      walletBalance: 3800,
      address: "Hyderabad, Telangana",
      totalEarnings: 4200,
      totalLosses: 400,
      averageTimeSpent: "3.8 hours",
      conversionRate: "22.1%",
      isActive: true
    }
  };
  
  return userMap[searchId] || null;
};

// Mock data for user activities
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

// New earning features data
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

export const UserProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  
  const user = userId ? getUserBySearchId(userId) : null;

  if (!user) {
    return (
      <div className="space-y-6 p-8 bg-gray-50 min-h-screen">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold text-foreground">User Not Found</h1>
        </div>
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">The requested user could not be found.</p>
            <Button onClick={() => navigate('/')} className="mt-4">
              Go Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'blocked':
      case 'suspended':
        return 'bg-red-100 text-red-800';
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalVideoInteractions = 245 + 12; // watched + uploaded

  return (
    <div className="space-y-6 p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-blue-500 text-white">
            <User className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
            <p className="text-muted-foreground">{user.type} • {user.email}</p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Contact Information
            </span>
            <div className="flex items-center gap-2">
              <Badge variant={user.tier === 'Premium' ? 'default' : 'secondary'}>
                {user.tier}
              </Badge>
              <Badge className={getStatusColor(user.status)}>
                {user.status}
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{user.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{user.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{user.address}</span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Joined: {user.joinDate}</span>
            </div>
            <div>
              <span>Last Active: {user.lastActive}</span>
            </div>
            <div>
              <span>Average Time Spent: {user.averageTimeSpent}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Wallet Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{user.walletBalance?.toLocaleString() || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Total Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹{user.totalEarnings.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Total Losses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">₹{user.totalLosses.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.conversionRate}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="ludo">Ludo Earnings</TabsTrigger>
          <TabsTrigger value="complaints">Complaints</TabsTrigger>
          <TabsTrigger value="ads">Ad Interactions</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="earning-features">Earning Features</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Video Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Videos Watched</p>
                    <p className="text-2xl font-bold">245</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Videos Uploaded</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subscription Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Tier</p>
                    <p className="font-semibold">{user.tier}</p>
                  </div>
                  {user.tier === 'Premium' && (
                    <>
                      <div>
                        <p className="text-sm text-muted-foreground">Subscribed Date</p>
                        <p className="font-semibold">2024-01-15</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Expiry Date</p>
                        <p className="font-semibold">2025-01-15</p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ludo" className="space-y-4">
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
                    <TableHead>Matches Played</TableHead>
                    <TableHead>Total Earnings</TableHead>
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

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Wallet Transactions
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

        <TabsContent value="earning-features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                🎯 Earning Features in AdTip
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {earningFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="p-2 rounded-full bg-blue-100 text-blue-600 flex-shrink-0">
                      <feature.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
