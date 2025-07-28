
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Edit, Trash2, Crown, User } from 'lucide-react';
import { CreatorDetailModal } from './CreatorDetailModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

interface CreatorListModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onViewCreator?: (creator: any) => void;
  onEditCreator?: (creator: any) => void;
  onDeleteCreator?: (creator: any) => void;
}

export const CreatorListModal: React.FC<CreatorListModalProps> = ({
  isOpen,
  onClose,
  title,
  onViewCreator,
  onEditCreator,
  onDeleteCreator
}) => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState(null);

  const premiumCreators = creators.filter(creator => creator.tier === 'Premium');
  const nonPremiumCreators = creators.filter(creator => creator.tier === 'Non-Premium');

  const getTierIcon = (tier: string) => {
    return tier === 'Premium' ? Crown : User;
  };

  const getTierColor = (tier: string) => {
    return tier === 'Premium' ? 'text-yellow-600' : 'text-gray-600';
  };

  const handleViewCreator = (creator: any) => {
    setSelectedCreator(creator);
    setIsDetailModalOpen(true);
  };

  const renderCreatorTable = (creatorList: typeof creators, tierType: string) => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold">{tierType} Creators</h3>
        <Badge variant="secondary">{creatorList.length} creators</Badge>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Creator Name</TableHead>
            <TableHead>Tier</TableHead>
            <TableHead>Videos</TableHead>
            <TableHead>Total Views</TableHead>
            <TableHead>Earnings</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {creatorList.map((creator) => {
            const TierIcon = getTierIcon(creator.tier);
            return (
              <TableRow key={creator.id}>
                <TableCell className="font-medium">{creator.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <TierIcon className={`h-4 w-4 ${getTierColor(creator.tier)}`} />
                    <Badge 
                      variant={creator.tier === 'Premium' ? 'default' : 'secondary'}
                      className={creator.tier === 'Premium' ? 'bg-yellow-100 text-yellow-800' : ''}
                    >
                      {creator.tier}
                    </Badge>
                  </div>
                </TableCell>
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
                <TableCell>{creator.contentCategory}</TableCell>
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
                    {onEditCreator && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onEditCreator(creator)}
                        title="Edit Settings"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                    {onDeleteCreator && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onDeleteCreator(creator)}
                        title="Delete Creator"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-7xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {title}
              <Badge variant="secondary">{creators.length} total creators</Badge>
            </DialogTitle>
          </DialogHeader>
          
          <div className="mt-4">
            <Tabs defaultValue="premium" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="premium" className="flex items-center gap-2">
                  <Crown className="h-4 w-4" />
                  Premium ({premiumCreators.length})
                </TabsTrigger>
                <TabsTrigger value="non-premium" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Non-Premium ({nonPremiumCreators.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="premium" className="mt-6">
                {renderCreatorTable(premiumCreators, "Premium")}
              </TabsContent>
              
              <TabsContent value="non-premium" className="mt-6">
                {renderCreatorTable(nonPremiumCreators, "Non-Premium")}
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>

      <CreatorDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        creator={selectedCreator}
      />
    </>
  );
};
