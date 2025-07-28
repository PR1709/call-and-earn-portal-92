
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Eye } from 'lucide-react';
import { CampaignDetailModal } from './CampaignDetailModal';

interface Campaign {
  id: number;
  title: string;
  advertiser: string;
  status: string;
  views: number;
  ctr: number;
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  tier?: 'Premium' | 'Non-Premium';
}

interface CampaignListModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  useTabs?: boolean;
}

const mockCampaigns: Campaign[] = [
  { id: 1, title: "Summer Sale Campaign", advertiser: "FashionHub", status: "Active", views: 125000, ctr: 3.2, budget: 50000, spent: 32000, startDate: "2024-05-01", endDate: "2024-05-31", tier: "Premium" },
  { id: 2, title: "New Product Launch", advertiser: "TechWorld", status: "Active", views: 89000, ctr: 2.8, budget: 75000, spent: 28000, startDate: "2024-05-15", endDate: "2024-06-15", tier: "Non-Premium" },
  { id: 3, title: "Festival Offers", advertiser: "MegaMart", status: "Active", views: 156000, ctr: 4.1, budget: 100000, spent: 67000, startDate: "2024-04-20", endDate: "2024-06-20", tier: "Premium" },
  { id: 4, title: "Brand Awareness", advertiser: "StartupXYZ", status: "Active", views: 75000, ctr: 2.9, budget: 40000, spent: 25000, startDate: "2024-05-10", endDate: "2024-06-10", tier: "Non-Premium" },
];

export const CampaignListModal: React.FC<CampaignListModalProps> = ({
  isOpen,
  onClose,
  title,
  useTabs = false
}) => {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleViewCampaign = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsDetailModalOpen(true);
  };

  const premiumCampaigns = mockCampaigns.filter(campaign => campaign.tier === 'Premium');
  const nonPremiumCampaigns = mockCampaigns.filter(campaign => campaign.tier === 'Non-Premium');

  const CampaignTable = ({ campaigns }: { campaigns: Campaign[] }) => (
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
        {campaigns.map((campaign) => (
          <TableRow key={campaign.id}>
            <TableCell className="font-medium">{campaign.title}</TableCell>
            <TableCell>{campaign.advertiser}</TableCell>
            <TableCell>
              <Badge variant="default">
                {campaign.status}
              </Badge>
            </TableCell>
            <TableCell>{campaign.views.toLocaleString()}</TableCell>
            <TableCell>{campaign.ctr}%</TableCell>
            <TableCell>₹{campaign.budget.toLocaleString()}</TableCell>
            <TableCell>₹{campaign.spent.toLocaleString()}</TableCell>
            <TableCell>{campaign.startDate} to {campaign.endDate}</TableCell>
            <TableCell className="text-right">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleViewCampaign(campaign)}
                title="View Campaign Details"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onClose}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <DialogTitle className="text-2xl">{title}</DialogTitle>
            </div>
          </DialogHeader>

          <div className="mt-6">
            {useTabs ? (
              <Tabs defaultValue="premium" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="premium">Premium ({premiumCampaigns.length})</TabsTrigger>
                  <TabsTrigger value="non-premium">Non-Premium ({nonPremiumCampaigns.length})</TabsTrigger>
                </TabsList>
                <TabsContent value="premium">
                  <CampaignTable campaigns={premiumCampaigns} />
                </TabsContent>
                <TabsContent value="non-premium">
                  <CampaignTable campaigns={nonPremiumCampaigns} />
                </TabsContent>
              </Tabs>
            ) : (
              <CampaignTable campaigns={mockCampaigns} />
            )}
          </div>
        </DialogContent>
      </Dialog>

      <CampaignDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        campaign={selectedCampaign}
      />
    </>
  );
};
