import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Download, Filter, TrendingUp, Users, Video, ShoppingBag, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { StatsCard } from '../StatsCard';
import { format } from 'date-fns';
import { AnalyticsDetailModal } from './AnalyticsDetailModal';
import { ConsumerListModal } from './ConsumerListModal';
import { CreatorListModal } from './CreatorListModal';
import { SellerListModal } from './SellerListModal';
import { AdvertiserListModal } from './AdvertiserListModal';

const analyticsData = [
  { month: 'Jan', revenue: 45000, users: 1200, videos: 450, sales: 180 },
  { month: 'Feb', revenue: 52000, users: 1350, videos: 520, sales: 220 },
  { month: 'Mar', revenue: 48000, users: 1280, videos: 480, sales: 195 },
  { month: 'Apr', revenue: 61000, users: 1450, videos: 580, sales: 250 },
  { month: 'May', revenue: 58000, users: 1380, videos: 550, sales: 235 },
  { month: 'Jun', revenue: 67000, users: 1520, videos: 620, sales: 280 },
];

const trafficSources = [
  { name: 'Direct', value: 35, color: '#8884d8' },
  { name: 'Social Media', value: 28, color: '#82ca9d' },
  { name: 'Search', value: 22, color: '#ffc658' },
  { name: 'Referral', value: 15, color: '#ff7300' },
];

const deviceStats = [
  { name: 'Mobile', users: 4200, percentage: 65 },
  { name: 'Desktop', users: 1800, percentage: 28 },
  { name: 'Tablet', users: 450, percentage: 7 },
];

export const AnalyticsReports: React.FC = () => {
  const [date, setDate] = React.useState<Date>();
  const [isDetailModalOpen, setIsDetailModalOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState<'revenue' | 'users' | 'content' | 'sales'>('revenue');
  const [modalTitle, setModalTitle] = React.useState('');
  const [activeModal, setActiveModal] = React.useState<string | null>(null);

  const handleMetricCardClick = (type: 'revenue' | 'users' | 'content' | 'sales', title: string) => {
    setModalType(type);
    setModalTitle(title);
    setActiveModal(type);
  };

  const closeModal = () => {
    setIsDetailModalOpen(false);
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
            <h1 className="text-3xl font-bold text-foreground">Analytics & Reports</h1>
            <p className="text-muted-foreground">Comprehensive platform analytics and detailed reports</p>
          </div>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Select defaultValue="30days">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1day">1 Day</SelectItem>
                <SelectItem value="7days">7 Days</SelectItem>
                <SelectItem value="30days">30 Days</SelectItem>
                <SelectItem value="90days">90 Days</SelectItem>
                <SelectItem value="1year">1 Year</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ClickableStatsCard
            title="Total Revenue"
            value="₹3,31,000"
            change="+15.2% from last month"
            icon={DollarSign}
            trend="up"
            onClick={() => handleMetricCardClick('revenue', 'Total Revenue Details')}
          />
          <ClickableStatsCard
            title="Total Users"
            value="8,180"
            change="+12.8% from last month"
            icon={Users}
            trend="up"
            onClick={() => handleMetricCardClick('users', 'Total Users Details')}
          />
          <ClickableStatsCard
            title="Content Uploaded"
            value="3,200"
            change="+18.5% from last month"
            icon={Video}
            trend="up"
            onClick={() => handleMetricCardClick('content', 'Content Uploaded Details')}
          />
          <ClickableStatsCard
            title="Total Sales"
            value="1,360"
            change="+22.3% from last month"
            icon={ShoppingBag}
            trend="up"
            onClick={() => handleMetricCardClick('sales', 'Total Sales Details')}
          />
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-white">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="traffic">Traffic</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                  <p className="text-sm text-muted-foreground">Monthly revenue over the last 6 months</p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={analyticsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Platform Growth</CardTitle>
                  <p className="text-sm text-muted-foreground">User and content growth metrics</p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={analyticsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="users" stroke="#82ca9d" strokeWidth={2} />
                      <Line type="monotone" dataKey="videos" stroke="#ffc658" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={trafficSources}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {trafficSources.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Device Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {deviceStats.map((device, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{device.name}</span>
                          <span className="text-sm text-muted-foreground">{device.users.toLocaleString()} users</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${device.percentage}%` }}
                          ></div>
                        </div>
                        <div className="text-right text-xs text-muted-foreground">{device.percentage}%</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Avg. Session Duration</span>
                    <span className="font-medium">8m 32s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Bounce Rate</span>
                    <span className="font-medium">23.4%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Pages per Session</span>
                    <span className="font-medium">4.2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Conversion Rate</span>
                    <span className="font-medium">3.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Return Visitors</span>
                    <span className="font-medium">67.2%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
                <p className="text-sm text-muted-foreground">Detailed revenue breakdown and trends</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Analytics</CardTitle>
                <p className="text-sm text-muted-foreground">User growth and engagement metrics</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="users" stroke="#82ca9d" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Analytics</CardTitle>
                <p className="text-sm text-muted-foreground">Content upload and performance metrics</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="videos" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="traffic" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={trafficSources}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {trafficSources.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Device Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {deviceStats.map((device, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{device.name}</span>
                          <span className="text-sm text-muted-foreground">{device.users.toLocaleString()} users</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${device.percentage}%` }}
                          ></div>
                        </div>
                        <div className="text-right text-sm font-medium">{device.percentage}%</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      <AnalyticsDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        type={modalType}
        title={modalTitle}
      />

      <ConsumerListModal
        isOpen={activeModal === 'users'}
        onClose={closeModal}
        title={modalTitle}
      />

      <CreatorListModal
        isOpen={activeModal === 'content'}
        onClose={closeModal}
        title={modalTitle}
      />

      <SellerListModal
        isOpen={activeModal === 'sales'}
        onClose={closeModal}
        title={modalTitle}
      />

      <AdvertiserListModal
        isOpen={activeModal === 'revenue'}
        onClose={closeModal}
        title={modalTitle}
      />
    </>
  );
};
