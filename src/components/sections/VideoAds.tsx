import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Upload, Play, Pause, MoreHorizontal, Download, BarChart3, Calendar, Eye, Edit, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CampaignListModal } from './CampaignListModal';
import { CampaignDetailModal } from './CampaignDetailModal';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

const videoAds = [
  { id: 1, title: "Summer Sale Campaign", advertiser: "FashionHub", status: "Active", views: 125000, ctr: 3.2, budget: 50000, spent: 32000, startDate: "2024-05-01", endDate: "2024-05-31" },
  { id: 2, title: "New Product Launch", advertiser: "TechWorld", status: "Paused", views: 89000, ctr: 2.8, budget: 75000, spent: 28000, startDate: "2024-05-15", endDate: "2024-06-15" },
  { id: 3, title: "Festival Offers", advertiser: "MegaMart", status: "Active", views: 156000, ctr: 4.1, budget: 100000, spent: 67000, startDate: "2024-04-20", endDate: "2024-06-20" },
  { id: 4, title: "App Download Campaign", advertiser: "GameStudio", status: "Completed", views: 95000, ctr: 2.5, budget: 30000, spent: 30000, startDate: "2024-03-01", endDate: "2024-04-30" },
];

export const VideoAds: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCampaignListOpen, setIsCampaignListOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [isCampaignDetailOpen, setIsCampaignDetailOpen] = useState(false);
  const [campaignStatuses, setCampaignStatuses] = useState<{[key: number]: string}>({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState<any>(null);
  const [useTabs, setUseTabs] = useState(false);

  // Initialize campaign statuses
  React.useEffect(() => {
    const initialStatuses: {[key: number]: string} = {};
    videoAds.forEach(ad => {
      initialStatuses[ad.id] = ad.status;
    });
    setCampaignStatuses(initialStatuses);
  }, []);

  const filteredAds = videoAds.filter(ad => {
    const currentStatus = campaignStatuses[ad.id] || ad.status;
    return statusFilter === 'all' || currentStatus.toLowerCase() === statusFilter;
  });

  const handleActiveCampaignsClick = () => {
    setUseTabs(true);
    setIsCampaignListOpen(true);
  };

  const handlePlayPause = (adId: number, currentStatus: string) => {
    const newStatus = currentStatus === 'Active' ? 'Paused' : 'Active';
    setCampaignStatuses(prev => ({
      ...prev,
      [adId]: newStatus
    }));
    console.log(`Campaign ${adId} status changed to: ${newStatus}`);
  };

  const handleAnalytics = (ad: any) => {
    setSelectedCampaign(ad);
    setIsCampaignDetailOpen(true);
    console.log('Opening analytics for campaign:', ad.title);
  };

  const handleEdit = (ad: any) => {
    setSelectedCampaign(ad);
    setIsEditModalOpen(true);
    console.log('Opening edit modal for campaign:', ad.title);
  };

  const handleDelete = (ad: any) => {
    setCampaignToDelete(ad);
    setIsDeleteModalOpen(true);
    console.log('Opening delete confirmation for campaign:', ad.title);
  };

  const handleConfirmDelete = () => {
    console.log('Campaign deleted:', campaignToDelete?.title);
    // Here you would typically make an API call to delete the campaign
    setIsDeleteModalOpen(false);
    setCampaignToDelete(null);
  };

  const handleDuplicate = (ad: any) => {
    console.log('Duplicating campaign:', ad.title);
    // Here you would typically create a copy of the campaign
    alert(`Campaign "${ad.title}" duplicated successfully!`);
  };

  const handleDownloadReport = (ad: any) => {
    console.log('Downloading report for campaign:', ad.title);
    // Here you would typically generate and download a report
    alert(`Report for "${ad.title}" is being downloaded...`);
  };

  const handleViewCampaign = (ad: any) => {
    setSelectedCampaign(ad);
    setIsCampaignDetailOpen(true);
    console.log('Opening campaign details for:', ad.title);
  };

  const handleSaveEdit = () => {
    console.log('Campaign updated:', selectedCampaign?.title);
    // Here you would typically make an API call to update the campaign
    setIsEditModalOpen(false);
    setSelectedCampaign(null);
  };

  return (
    <>
      <div className="space-y-6 p-8 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Video Ads Management</h1>
            <p className="text-muted-foreground mt-2">Manage advertising campaigns and monitor performance</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </Button>
            <Button className="bg-green-500 hover:bg-green-600 flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload Ad
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={handleActiveCampaignsClick}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-green-600 mt-1">+3 new this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4M</div>
              <p className="text-xs text-green-600 mt-1">+15% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average CTR</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2%</div>
              <p className="text-xs text-green-600 mt-1">+0.3% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹5,67,890</div>
              <p className="text-xs text-green-600 mt-1">+22% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Today's Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Views</span>
                  <span className="font-medium">45,230</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Clicks</span>
                  <span className="font-medium">1,456</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Revenue</span>
                  <span className="font-medium text-green-600">₹12,340</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Top Performing Ad</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="font-medium">Festival Offers</div>
                <div className="text-sm text-muted-foreground">MegaMart</div>
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-muted-foreground">CTR</span>
                  <span className="font-medium text-green-600">4.1%</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">8</div>
              <p className="text-xs text-muted-foreground mt-1">Ads awaiting review</p>
            </CardContent>
          </Card>
        </div>

        {/* Video Ads Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <CardTitle>All Video Ads</CardTitle>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Date Range
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Advertiser</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>CTR</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Spent</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAds.map((ad) => {
                  const currentStatus = campaignStatuses[ad.id] || ad.status;
                  return (
                    <TableRow key={ad.id}>
                      <TableCell className="font-medium">{ad.title}</TableCell>
                      <TableCell>{ad.advertiser}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            currentStatus === 'Active'
                              ? 'default'
                              : currentStatus === 'Completed'
                              ? 'secondary'
                              : 'outline'
                          }
                        >
                          {currentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>{ad.views ? ad.views.toLocaleString() : 'N/A'}</TableCell>
                      <TableCell>{ad.ctr ? `${ad.ctr}%` : 'N/A'}</TableCell>
                      <TableCell>₹{ad.budget ? ad.budget.toLocaleString() : 'N/A'}</TableCell>
                      <TableCell>₹{ad.spent ? ad.spent.toLocaleString() : 'N/A'}</TableCell>
                      <TableCell>{ad.startDate} to {ad.endDate}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handlePlayPause(ad.id, currentStatus)}
                            title={currentStatus === 'Active' ? 'Pause Campaign' : 'Resume Campaign'}
                            disabled={currentStatus === 'Completed'}
                          >
                            {currentStatus === 'Active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleAnalytics(ad)}
                            title="View Analytics"
                          >
                            <BarChart3 className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" title="More Options">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewCampaign(ad)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Campaign
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEdit(ad)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Campaign
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDuplicate(ad)}>
                                <Eye className="h-4 w-4 mr-2" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDownloadReport(ad)}>
                                <Download className="h-4 w-4 mr-2" />
                                Download Report
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDelete(ad)}
                                className="text-destructive"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Campaign
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <CampaignListModal
        isOpen={isCampaignListOpen}
        onClose={() => {
          setIsCampaignListOpen(false);
          setUseTabs(false);
        }}
        title="Active Campaigns"
        useTabs={useTabs}
      />

      <CampaignDetailModal
        isOpen={isCampaignDetailOpen}
        onClose={() => setIsCampaignDetailOpen(false)}
        campaign={selectedCampaign}
      />

      {/* Edit Campaign Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Campaign</DialogTitle>
          </DialogHeader>
          {selectedCampaign && (
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium">Campaign Title</label>
                <Input defaultValue={selectedCampaign.title} className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Advertiser</label>
                <Input defaultValue={selectedCampaign.advertiser} className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Budget</label>
                <Input defaultValue={selectedCampaign.budget} type="number" className="mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Start Date</label>
                  <Input defaultValue={selectedCampaign.startDate} type="date" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">End Date</label>
                  <Input defaultValue={selectedCampaign.endDate} type="date" className="mt-1" />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Campaign</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete the campaign "{campaignToDelete?.title}"?</p>
            <p className="text-sm text-muted-foreground mt-2">This action cannot be undone.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete Campaign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
