import React, { useState } from 'react';
import { StatsCard } from '../StatsCard';
import { Users, Video, ShoppingBag, TrendingUp, Eye, DollarSign, Phone, Gamepad2, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { ConsumerListModal } from './ConsumerListModal';
import { CreatorListModal } from './CreatorListModal';
import { ConsumerMetricsModal } from './ConsumerMetricsModal';
import { SellerListModal } from './SellerListModal';
import { AdvertiserListModal } from './AdvertiserListModal';

const monthlyGrowthData = [
  { name: 'Jan', consumers: 1500, creators: 120, sellers: 45, advertisers: 25 },
  { name: 'Feb', consumers: 1300, creators: 135, sellers: 52, advertisers: 28 },
  { name: 'Mar', consumers: 1100, creators: 148, sellers: 48, advertisers: 32 },
  { name: 'Apr', consumers: 500, creators: 165, sellers: 55, advertisers: 35 },
  { name: 'May', consumers: 800, creators: 178, sellers: 62, advertisers: 38 },
  { name: 'Jun', consumers: 1200, creators: 192, sellers: 58, advertisers: 42 },
  { name: 'Jul', consumers: 1180, creators: 205, sellers: 65, advertisers: 45 },
  { name: 'Aug', consumers: 1150, creators: 218, sellers: 68, advertisers: 48 },
  { name: 'Sep', consumers: 800, creators: 232, sellers: 72, advertisers: 52 },
  { name: 'Oct', consumers: 780, creators: 245, sellers: 75, advertisers: 55 },
  { name: 'Nov', consumers: 1300, creators: 258, sellers: 78, advertisers: 58 },
  { name: 'Dec', consumers: 850, creators: 272, sellers: 82, advertisers: 62 },
];

const revenueData = [
  { name: 'Jan', revenue: 45000, views: 2400000 },
  { name: 'Feb', revenue: 38000, views: 1950000 },
  { name: 'Mar', revenue: 52000, views: 2800000 },
  { name: 'Apr', revenue: 48000, views: 2650000 },
  { name: 'May', revenue: 62000, views: 3200000 },
  { name: 'Jun', revenue: 58000, views: 3100000 },
];

const pieData = [
  { name: 'Video Ads', value: 45, color: '#8884d8' },
  { name: 'TipCall', value: 30, color: '#82ca9d' },
  { name: 'Pay Ludo', value: 15, color: '#ffc658' },
  { name: 'E-commerce', value: 10, color: '#ff7300' },
];

export const Dashboard: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState('');
  const [metricType, setMetricType] = useState<'timeSpent' | 'conversionRate' | 'activeUsers'>('timeSpent');

  const handleStatsCardClick = (type: string, title: string, metric?: 'timeSpent' | 'conversionRate' | 'activeUsers') => {
    setModalTitle(title);
    if (metric) {
      setMetricType(metric);
    }
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalTitle('');
  };

  const ClickableStatsCard = ({ 
    title, 
    value, 
    change, 
    icon, 
    trend, 
    onClick 
  }: {
    title: string;
    value: string;
    change?: string;
    icon: any;
    trend?: 'up' | 'down';
    onClick: () => void;
  }) => (
    <div onClick={onClick} className="cursor-pointer">
      <StatsCard
        title={title}
        value={value}
        change={change}
        icon={icon}
        trend={trend}
      />
    </div>
  );

  return (
    <>
      <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Platform Analytics</h1>
            <p className="text-muted-foreground">Comprehensive overview of your platform performance</p>
          </div>
          <Button className="bg-green-500 hover:bg-green-600">
            <ArrowUpRight className="h-4 w-4 mr-2" />
            Create Post
          </Button>
        </div>

        {/* Category Tabs */}
        <Tabs defaultValue="consumers" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white">
            <TabsTrigger value="consumers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Consumers
            </TabsTrigger>
            <TabsTrigger value="creators" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Content Creators
            </TabsTrigger>
            <TabsTrigger value="sellers" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              Sellers
            </TabsTrigger>
            <TabsTrigger value="advertisers" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Advertisers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="consumers" className="space-y-6">
            {/* Consumer Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <ClickableStatsCard
                title="Total Consumers"
                value="8,745"
                change="+12.3% from last month"
                icon={Users}
                trend="up"
                onClick={() => handleStatsCardClick('consumers', 'All Consumers')}
              />
              <ClickableStatsCard
                title="Average Time Spent"
                value="14.2 min"
                change="+3.5% from last month"
                icon={Eye}
                trend="up"
                onClick={() => handleStatsCardClick('metrics', 'Average Time Spent Details', 'timeSpent')}
              />
              <ClickableStatsCard
                title="Purchase Conversion Rate"
                value="3.8%"
                change="-0.2% from last month"
                icon={DollarSign}
                trend="down"
                onClick={() => handleStatsCardClick('metrics', 'Purchase Conversion Rate Details', 'conversionRate')}
              />
              <ClickableStatsCard
                title="Monthly Active Users"
                value="6,234"
                change="+8.1% from last month"
                icon={TrendingUp}
                trend="up"
                onClick={() => handleStatsCardClick('metrics', 'Monthly Active Users Details', 'activeUsers')}
              />
            </div>

            {/* Consumer Growth Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Consumer Growth</CardTitle>
                  <p className="text-sm text-muted-foreground">Monthly active consumers over time</p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={monthlyGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" stroke="#666" />
                      <YAxis stroke="#666" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e0e0e0',
                          borderRadius: '8px'
                        }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="consumers" 
                        stroke="#10b981" 
                        strokeWidth={3}
                        dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Consumer Statistics</CardTitle>
                  <p className="text-sm text-muted-foreground">Key consumer metrics</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Total Consumers</span>
                      <span className="font-bold text-2xl">8,745</span>
                    </div>
                    <div className="flex items-center text-green-600 text-sm">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      12.3% from last month
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Average Time Spent</span>
                      <span className="font-bold text-2xl">14.2 min</span>
                    </div>
                    <div className="flex items-center text-green-600 text-sm">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      3.5% from last month
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Purchase Conversion Rate</span>
                      <span className="font-bold text-2xl">3.8%</span>
                    </div>
                    <div className="flex items-center text-red-600 text-sm">
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                      0.2% from last month
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="creators" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <ClickableStatsCard
                title="Total Creators"
                value="2,345"
                change="+18% from last month"
                icon={Video}
                trend="up"
                onClick={() => handleStatsCardClick('creators', 'All Creators')}
              />
              <ClickableStatsCard
                title="Total Videos"
                value="15,432"
                change="+22% from last month"
                icon={Eye}
                trend="up"
                onClick={() => handleStatsCardClick('creators', 'Total Videos Details')}
              />
              <ClickableStatsCard
                title="Total Views"
                value="2.8M"
                change="+15% from last month"
                icon={TrendingUp}
                trend="up"
                onClick={() => handleStatsCardClick('creators', 'Total Views Details')}
              />
              <ClickableStatsCard
                title="Creator Earnings"
                value="₹8,75,432"
                change="+25% from last month"
                icon={DollarSign}
                trend="up"
                onClick={() => handleStatsCardClick('creators', 'Creator Earnings Details')}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Video Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="views" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sellers" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <ClickableStatsCard
                title="Active Sellers"
                value="1,234"
                change="+12% from last month"
                icon={ShoppingBag}
                trend="up"
                onClick={() => handleStatsCardClick('sellers', 'Active Sellers Details')}
              />
              <ClickableStatsCard
                title="Total Products"
                value="8,567"
                change="+8% from last month"
                icon={TrendingUp}
                trend="up"
                onClick={() => handleStatsCardClick('sellers', 'Total Products Details')}
              />
              <ClickableStatsCard
                title="Total Sales"
                value="₹12,34,567"
                change="+15% from last month"
                icon={DollarSign}
                trend="up"
                onClick={() => handleStatsCardClick('sellers', 'Total Sales Details')}
              />
              <ClickableStatsCard
                title="Commission Earned"
                value="₹1,23,456"
                change="+18% from last month"
                icon={Eye}
                trend="up"
                onClick={() => handleStatsCardClick('sellers', 'Commission Earned Details')}
              />
            </div>
          </TabsContent>

          <TabsContent value="advertisers" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <ClickableStatsCard
                title="Total Advertisers"
                value="456"
                change="+28% from last month"
                icon={TrendingUp}
                trend="up"
                onClick={() => handleStatsCardClick('advertisers', 'Total Advertisers Details')}
              />
              <ClickableStatsCard
                title="Active Campaigns"
                value="89"
                change="+12% from last month"
                icon={Eye}
                trend="up"
                onClick={() => handleStatsCardClick('advertisers', 'Active Campaigns Details')}
              />
              <ClickableStatsCard
                title="Ad Revenue"
                value="₹5,67,890"
                change="+22% from last month"
                icon={DollarSign}
                trend="up"
                onClick={() => handleStatsCardClick('advertisers', 'Ad Revenue Details')}
              />
              <ClickableStatsCard
                title="Click Through Rate"
                value="4.2%"
                change="+0.8% from last month"
                icon={ArrowUpRight}
                trend="up"
                onClick={() => handleStatsCardClick('advertisers', 'Click Through Rate Details')}
              />
            </div>
          </TabsContent>
        </Tabs>

        {/* Top Performers Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Top 5 Videos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "Comedy Skit #45", creator: "FunnyGuy123", views: "95K", earnings: "₹45K" },
                  { title: "Cooking Tutorial", creator: "ChefMaster", views: "87K", earnings: "₹42K" },
                  { title: "Tech Review", creator: "TechBro", views: "79K", earnings: "₹38K" },
                  { title: "Dance Challenge", creator: "DanceQueen", views: "71K", earnings: "₹35K" },
                  { title: "DIY Project", creator: "CraftLover", views: "63K", earnings: "₹32K" }
                ].map((video, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{video.title}</p>
                      <p className="text-sm text-muted-foreground">{video.creator}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{video.views} views</p>
                      <p className="text-sm text-green-600">{video.earnings}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top 5 Creators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "FunnyGuy123", videos: 45, earnings: "₹2,50,000", views: "1.2M" },
                  { name: "ChefMaster", videos: 38, earnings: "₹2,20,000", views: "950K" },
                  { name: "TechBro", videos: 42, earnings: "₹2,10,000", views: "890K" },
                  { name: "DanceQueen", videos: 35, earnings: "₹1,95,000", views: "780K" },
                  { name: "CraftLover", videos: 40, earnings: "₹1,85,000", views: "720K" }
                ].map((creator, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{creator.name}</p>
                      <p className="text-sm text-muted-foreground">{creator.videos} videos</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{creator.earnings}</p>
                      <p className="text-sm text-muted-foreground">{creator.views} views</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top 5 Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Wireless Headphones", seller: "TechStore", sales: 180, revenue: "₹27K" },
                  { name: "Fitness Tracker", seller: "HealthGadgets", sales: 165, revenue: "₹25K" },
                  { name: "Smartphone Case", seller: "MobileAccess", sales: 142, revenue: "₹21K" },
                  { name: "Bluetooth Speaker", seller: "AudioWorld", sales: 128, revenue: "₹19K" },
                  { name: "Power Bank", seller: "ChargeMaster", sales: 115, revenue: "₹17K" }
                ].map((product, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.seller}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{product.sales} sales</p>
                      <p className="text-sm text-green-600">{product.revenue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <ConsumerListModal
        isOpen={activeModal === 'consumers'}
        onClose={closeModal}
        title={modalTitle}
      />

      <CreatorListModal
        isOpen={activeModal === 'creators'}
        onClose={closeModal}
        title={modalTitle}
      />

      <ConsumerMetricsModal
        isOpen={activeModal === 'metrics'}
        onClose={closeModal}
        title={modalTitle}
        metricType={metricType}
      />

      <SellerListModal
        isOpen={activeModal === 'sellers'}
        onClose={closeModal}
        title={modalTitle}
      />

      <AdvertiserListModal
        isOpen={activeModal === 'advertisers'}
        onClose={closeModal}
        title={modalTitle}
      />
    </>
  );
};
