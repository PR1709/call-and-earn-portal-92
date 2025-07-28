
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, ArrowLeft, Eye } from 'lucide-react';
import { AdvertiserDetailModal } from './AdvertiserDetailModal';

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

interface AdvertiserListModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const mockAdvertisers: Advertiser[] = [
  {
    id: 1,
    name: "TechCorp India",
    email: "marketing@techcorp.com",
    phone: "+91 9876543210",
    address: "Mumbai, Maharashtra",
    companyName: "TechCorp India Pvt Ltd",
    gstNumber: "27AAAAA0000A1Z5",
    campaignsCount: 12,
    status: "Active",
    revenue: 250000,
    ctr: "4.2%",
    totalSpent: 180000,
    joinDate: "2024-01-10"
  },
  {
    id: 2,
    name: "Fashion Brand Co",
    email: "ads@fashionbrand.com",
    phone: "+91 9876543211",
    address: "Delhi, India",
    companyName: "Fashion Brand Co Ltd",
    gstNumber: "07BBBBB0000B2Y4",
    campaignsCount: 8,
    status: "Active",
    revenue: 180000,
    ctr: "3.8%",
    totalSpent: 125000,
    joinDate: "2024-01-15"
  },
  {
    id: 3,
    name: "Food Delivery App",
    email: "marketing@foodapp.com",
    phone: "+91 9876543212",
    address: "Bangalore, Karnataka",
    companyName: "Food Delivery App Inc",
    gstNumber: "29CCCCC0000C3X3",
    campaignsCount: 15,
    status: "Active",
    revenue: 320000,
    ctr: "5.1%",
    totalSpent: 220000,
    joinDate: "2024-01-20"
  },
  {
    id: 4,
    name: "Gaming Studio",
    email: "promotion@gamingstudio.com",
    phone: "+91 9876543213",
    address: "Pune, Maharashtra",
    companyName: "Gaming Studio Pvt Ltd",
    gstNumber: "27DDDDD0000D4W2",
    campaignsCount: 6,
    status: "Inactive",
    revenue: 95000,
    ctr: "2.9%",
    totalSpent: 75000,
    joinDate: "2024-02-01"
  }
];

export const AdvertiserListModal: React.FC<AdvertiserListModalProps> = ({
  isOpen,
  onClose,
  title
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAdvertiser, setSelectedAdvertiser] = useState<Advertiser | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleViewAdvertiser = (advertiser: Advertiser) => {
    setSelectedAdvertiser(advertiser);
    setIsDetailModalOpen(true);
  };

  const filteredAdvertisers = mockAdvertisers.filter(advertiser =>
    advertiser.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    advertiser.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-yellow-100 text-yellow-800',
      'Suspended': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onClose}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <DialogTitle className="text-2xl">{title}</DialogTitle>
            </div>
          </DialogHeader>

          <div className="space-y-6 overflow-y-auto">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search advertisers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Advertiser Name</TableHead>
                  <TableHead>Company Name</TableHead>
                  <TableHead>Campaigns</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>CTR</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAdvertisers.map((advertiser) => (
                  <TableRow key={advertiser.id}>
                    <TableCell className="font-medium">{advertiser.name}</TableCell>
                    <TableCell>{advertiser.companyName}</TableCell>
                    <TableCell>{advertiser.campaignsCount}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(advertiser.status)}>
                        {advertiser.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-green-600">₹{advertiser.revenue.toLocaleString()}</TableCell>
                    <TableCell className="font-semibold">{advertiser.ctr}</TableCell>
                    <TableCell>₹{advertiser.totalSpent.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewAdvertiser(advertiser)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>

      <AdvertiserDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        advertiser={selectedAdvertiser}
      />
    </>
  );
};
