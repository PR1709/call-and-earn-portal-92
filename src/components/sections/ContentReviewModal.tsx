
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, CheckCircle, XCircle, Flag, Crown, User } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mockContentData = {
  pending: [
    { id: 1, title: 'Comedy Skit #12', creator: 'FunnyGuy123', tier: 'Premium', category: 'Comedy', uploadDate: '2024-06-08', duration: '2:45' },
    { id: 2, title: 'Cooking Tutorial', creator: 'ChefMaster', tier: 'Premium', category: 'Cooking', uploadDate: '2024-06-08', duration: '5:20' },
    { id: 3, title: 'Tech Review', creator: 'TechBro', tier: 'Non-Premium', category: 'Technology', uploadDate: '2024-06-07', duration: '8:15' },
    { id: 4, title: 'Dance Performance', creator: 'DanceQueen', tier: 'Premium', category: 'Dance', uploadDate: '2024-06-07', duration: '3:30' },
    { id: 5, title: 'DIY Project', creator: 'CraftLover', tier: 'Non-Premium', category: 'DIY', uploadDate: '2024-06-06', duration: '12:10' }
  ],
  flagged: [
    { id: 6, title: 'Controversial Opinion', creator: 'TechBro', tier: 'Non-Premium', category: 'Technology', uploadDate: '2024-06-05', duration: '6:45', reason: 'Inappropriate content' },
    { id: 7, title: 'Prank Video', creator: 'FunnyGuy123', tier: 'Premium', category: 'Comedy', uploadDate: '2024-06-04', duration: '4:20', reason: 'Community guidelines' },
    { id: 8, title: 'Recipe Challenge', creator: 'ChefMaster', tier: 'Premium', category: 'Cooking', uploadDate: '2024-06-03', duration: '7:55', reason: 'Copyright concern' }
  ],
  approved: [
    { id: 9, title: 'Morning Routine', creator: 'DanceQueen', tier: 'Premium', category: 'Lifestyle', uploadDate: '2024-06-08', duration: '4:12' },
    { id: 10, title: 'Quick Recipe', creator: 'ChefMaster', tier: 'Premium', category: 'Cooking', uploadDate: '2024-06-08', duration: '3:45' },
    { id: 11, title: 'Comedy Special', creator: 'FunnyGuy123', tier: 'Premium', category: 'Comedy', uploadDate: '2024-06-08', duration: '15:30' },
    { id: 12, title: 'Home Decor Tips', creator: 'CraftLover', tier: 'Non-Premium', category: 'DIY', uploadDate: '2024-06-08', duration: '9:20' }
  ]
};

interface ContentReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'pending' | 'flagged' | 'approved';
}

export const ContentReviewModal: React.FC<ContentReviewModalProps> = ({
  isOpen,
  onClose,
  type
}) => {
  const getTitle = () => {
    switch (type) {
      case 'pending':
        return 'Pending Reviews';
      case 'flagged':
        return 'Flagged Content';
      case 'approved':
        return 'Approved Today';
      default:
        return 'Content Review';
    }
  };

  const getStatusBadge = (type: string) => {
    switch (type) {
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'flagged':
        return <Badge variant="destructive">Flagged</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      default:
        return null;
    }
  };

  const getTierIcon = (tier: string) => {
    return tier === 'Premium' ? Crown : User;
  };

  const getTierColor = (tier: string) => {
    return tier === 'Premium' ? 'text-yellow-600' : 'text-gray-600';
  };

  const handleApprove = (contentId: number) => {
    console.log('Approving content:', contentId);
  };

  const handleReject = (contentId: number) => {
    console.log('Rejecting content:', contentId);
  };

  const handleFlag = (contentId: number) => {
    console.log('Flagging content:', contentId);
  };

  const content = mockContentData[type] || [];
  const premiumContent = content.filter(item => item.tier === 'Premium');
  const nonPremiumContent = content.filter(item => item.tier === 'Non-Premium');

  const renderContentTable = (contentList: typeof content, tierType: string) => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold">{tierType} Creators</h3>
        <Badge variant="secondary">{contentList.length} items</Badge>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Creator</TableHead>
            <TableHead>Tier</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Upload Date</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Status</TableHead>
            {type === 'flagged' && <TableHead>Reason</TableHead>}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contentList.map((item) => {
            const TierIcon = getTierIcon(item.tier);
            return (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>{item.creator}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <TierIcon className={`h-4 w-4 ${getTierColor(item.tier)}`} />
                    <Badge 
                      variant={item.tier === 'Premium' ? 'default' : 'secondary'}
                      className={item.tier === 'Premium' ? 'bg-yellow-100 text-yellow-800' : ''}
                    >
                      {item.tier}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.uploadDate}</TableCell>
                <TableCell>{item.duration}</TableCell>
                <TableCell>{getStatusBadge(type)}</TableCell>
                {type === 'flagged' && <TableCell>{(item as any).reason}</TableCell>}
                <TableCell className="text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      title="View Content"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {type === 'pending' && (
                      <>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleApprove(item.id)}
                          title="Approve"
                          className="text-green-600 hover:text-green-700"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleReject(item.id)}
                          title="Reject"
                          className="text-red-600 hover:text-red-700"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    {type === 'approved' && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleFlag(item.id)}
                        title="Flag Content"
                        className="text-orange-600 hover:text-orange-700"
                      >
                        <Flag className="h-4 w-4" />
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getTitle()}
            <Badge variant="secondary">{content.length} total items</Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <Tabs defaultValue="premium" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="premium" className="flex items-center gap-2">
                <Crown className="h-4 w-4" />
                Premium ({premiumContent.length})
              </TabsTrigger>
              <TabsTrigger value="non-premium" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Non-Premium ({nonPremiumContent.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="premium" className="mt-6">
              {renderContentTable(premiumContent, "Premium")}
            </TabsContent>
            
            <TabsContent value="non-premium" className="mt-6">
              {renderContentTable(nonPremiumContent, "Non-Premium")}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
