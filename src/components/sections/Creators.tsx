import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Download, Eye, Edit, Trash2, UserPlus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreatorListModal } from './CreatorListModal';
import { CreatorDetailModal } from './CreatorDetailModal';
import { CreatorEditModal } from './CreatorEditModal';
import { CreatorDeleteModal } from './CreatorDeleteModal';
import { ContentReviewModal } from './ContentReviewModal';

const creators = [
  { 
    id: 1, 
    name: "FunnyGuy123", 
    videos: 45, 
    views: "1.2M", 
    earnings: 25000, 
    status: "Active", 
    joinDate: "2024-01-10", 
    email: "funnyguy123@creator.com", 
    phone: "+91 9876543210", 
    tier: "Premium" as const,
    address: "Mumbai, Maharashtra",
    totalViews: 1200000,
    subscribers: 45000,
    averageViews: 26667,
    contentCategory: "Comedy",
    // Add fields expected by modals
    followers: 45000,
    videosPosted: 45
  },
  { 
    id: 2, 
    name: "ChefMaster", 
    videos: 38, 
    views: "950K", 
    earnings: 22000, 
    status: "Active", 
    joinDate: "2024-01-15", 
    email: "chefmaster@creator.com", 
    phone: "+91 9876543211", 
    tier: "Premium" as const,
    address: "Delhi, India",
    totalViews: 950000,
    subscribers: 38000,
    averageViews: 25000,
    contentCategory: "Cooking",
    followers: 38000,
    videosPosted: 38
  },
  { 
    id: 3, 
    name: "TechBro", 
    videos: 42, 
    views: "890K", 
    earnings: 21000, 
    status: "Under Review", 
    joinDate: "2024-01-20", 
    email: "techbro@creator.com", 
    phone: "+91 9876543212", 
    tier: "Non-Premium" as const,
    address: "Bangalore, Karnataka",
    totalViews: 890000,
    subscribers: 32000,
    averageViews: 21190,
    contentCategory: "Technology",
    followers: 32000,
    videosPosted: 42
  },
  { 
    id: 4, 
    name: "DanceQueen", 
    videos: 35, 
    views: "780K", 
    earnings: 19500, 
    status: "Active", 
    joinDate: "2024-01-25", 
    email: "dancequeen@creator.com", 
    phone: "+91 9876543213", 
    tier: "Premium" as const,
    address: "Chennai, Tamil Nadu",
    totalViews: 780000,
    subscribers: 29000,
    averageViews: 22286,
    contentCategory: "Dance",
    followers: 29000,
    videosPosted: 35
  },
  { 
    id: 5, 
    name: "CraftLover", 
    videos: 40, 
    views: "720K", 
    earnings: 18500, 
    status: "Blocked", 
    joinDate: "2024-02-01", 
    email: "craftlover@creator.com", 
    phone: "+91 9876543214", 
    tier: "Non-Premium" as const,
    address: "Pune, Maharashtra",
    totalViews: 720000,
    subscribers: 25000,
    averageViews: 18000,
    contentCategory: "DIY",
    followers: 25000,
    videosPosted: 40
  },
];

export const Creators: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreatorListOpen, setIsCreatorListOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isContentReviewOpen, setIsContentReviewOpen] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [listType, setListType] = useState('');
  const [contentReviewType, setContentReviewType] = useState<'pending' | 'flagged' | 'approved'>('pending');

  const filteredCreators = creators.filter(creator => {
    const matchesSearch = creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         creator.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         creator.phone.includes(searchTerm) ||
                         creator.contentCategory.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || creator.status.toLowerCase().replace(' ', '-') === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCardClick = (type: string) => {
    setListType(type);
    setIsCreatorListOpen(true);
  };

  const handleViewCreator = (creator: any) => {
    console.log('Opening creator profile for:', creator.name);
    setSelectedCreator(creator);
    setIsDetailModalOpen(true);
  };

  const handleEditCreator = (creator: any) => {
    console.log('Opening edit modal for:', creator.name);
    setSelectedCreator(creator);
    setIsEditModalOpen(true);
  };

  const handleDeleteCreator = (creator: any) => {
    console.log('Opening delete modal for:', creator.name);
    setSelectedCreator(creator);
    setIsDeleteModalOpen(true);
  };

  const handleContentReviewClick = (type: 'pending' | 'flagged' | 'approved') => {
    setContentReviewType(type);
    setIsContentReviewOpen(true);
  };

  const handleViewCreatorFromModal = (creator: any) => {
    console.log('Opening creator profile from modal for:', creator.name);
    setSelectedCreator(creator);
    setIsCreatorListOpen(false);
    setIsDetailModalOpen(true);
  };

  const handleEditCreatorFromModal = (creator: any) => {
    console.log('Opening edit modal from modal for:', creator.name);
    setSelectedCreator(creator);
    setIsCreatorListOpen(false);
    setIsEditModalOpen(true);
  };

  const handleDeleteCreatorFromModal = (creator: any) => {
    console.log('Opening delete modal from modal for:', creator.name);
    setSelectedCreator(creator);
    setIsCreatorListOpen(false);
    setIsDeleteModalOpen(true);
  };

  // Calculate stats from actual data
  const totalCreators = creators.length;
  const totalVideos = creators.reduce((sum, creator) => sum + creator.videos, 0);
  const totalViews = creators.reduce((sum, creator) => sum + creator.totalViews, 0);
  const totalEarnings = creators.reduce((sum, creator) => sum + creator.earnings, 0);

  const getModalTitle = () => {
    switch (listType) {
      case 'total':
        return 'Total Creators';
      case 'videos':
        return 'Total Videos';
      case 'views':
        return 'Total Views';
      case 'earnings':
        return 'Creator Earnings';
      default:
        return 'Creators';
    }
  };

  return (
    <>
      <div className="space-y-6 p-8 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Content Creator Management</h1>
            <p className="text-muted-foreground mt-2">Manage creators, review content, and track performance</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="bg-green-500 hover:bg-green-600 flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Invite Creator
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleCardClick('total')}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Creators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCreators}</div>
              <p className="text-xs text-green-600 mt-1">+18% from last month</p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleCardClick('videos')}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Videos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalVideos}</div>
              <p className="text-xs text-green-600 mt-1">+22% from last month</p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleCardClick('views')}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(totalViews / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-green-600 mt-1">+15% from last month</p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleCardClick('earnings')}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Creator Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalEarnings.toLocaleString()}</div>
              <p className="text-xs text-green-600 mt-1">+25% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Content Review Tools */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleContentReviewClick('pending')}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">23</div>
              <p className="text-xs text-muted-foreground mt-1">Videos awaiting approval</p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleContentReviewClick('flagged')}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Flagged Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">7</div>
              <p className="text-xs text-muted-foreground mt-1">Content requiring attention</p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleContentReviewClick('approved')}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">156</div>
              <p className="text-xs text-muted-foreground mt-1">Videos approved</p>
            </CardContent>
          </Card>
        </div>

        {/* Creators Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <CardTitle>All Creators</CardTitle>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by name, email, category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="under-review">Under Review</SelectItem>
                    <SelectItem value="blocked">Blocked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Creator Name</TableHead>
                  <TableHead>Videos</TableHead>
                  <TableHead>Total Views</TableHead>
                  <TableHead>Earnings</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCreators.map((creator) => (
                  <TableRow key={creator.id}>
                    <TableCell className="font-medium">{creator.name}</TableCell>
                    <TableCell>{creator.videos}</TableCell>
                    <TableCell>{creator.views}</TableCell>
                    <TableCell>₹{creator.earnings.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          creator.status === 'Active'
                            ? 'default'
                            : creator.status === 'Blocked'
                            ? 'destructive'
                            : 'secondary'
                        }
                      >
                        {creator.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{creator.joinDate}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-1 justify-end">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleViewCreator(creator)}
                          title="View Profile"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditCreator(creator)}
                          title="Edit Settings"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteCreator(creator)}
                          title="Delete Creator"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <CreatorListModal
        isOpen={isCreatorListOpen}
        onClose={() => setIsCreatorListOpen(false)}
        title={getModalTitle()}
        onViewCreator={handleViewCreatorFromModal}
        onEditCreator={handleEditCreatorFromModal}
        onDeleteCreator={handleDeleteCreatorFromModal}
      />

      <CreatorDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        creator={selectedCreator}
      />

      <CreatorEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        creator={selectedCreator}
      />

      <CreatorDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        creator={selectedCreator}
      />

      <ContentReviewModal
        isOpen={isContentReviewOpen}
        onClose={() => setIsContentReviewOpen(false)}
        type={contentReviewType}
      />
    </>
  );
};
