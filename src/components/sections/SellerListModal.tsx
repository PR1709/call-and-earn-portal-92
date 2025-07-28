
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, ArrowLeft, Eye } from 'lucide-react';
import { SellerDetailModal } from './SellerDetailModal';

interface Seller {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  businessName: string;
  gstNumber: string;
  totalProducts: number;
  totalSales: number;
  status: 'Active' | 'Inactive' | 'Suspended';
  commission: number;
  joinDate: string;
  tier?: 'Premium' | 'Non-Premium';
}

interface SellerListModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  sellers?: Seller[];
  useTabs?: boolean;
}

const defaultSellers: Seller[] = [
  {
    id: 1,
    name: "Rajesh Electronics",
    email: "rajesh@electronics.com",
    phone: "+91 9876543210",
    address: "Mumbai, Maharashtra",
    businessName: "Electronics Hub PvLtd",
    gstNumber: "27AAAAA0000A1Z5",
    totalProducts: 245,
    totalSales: 1250000,
    status: "Active",
    commission: 85000,
    joinDate: "2024-01-15",
    tier: "Premium"
  },
  {
    id: 2,
    name: "Fashion World",
    email: "info@fashionworld.com",
    phone: "+91 9876543211",
    address: "Delhi, India",
    businessName: "Fashion World Enterprises",
    gstNumber: "07BBBBB0000B2Y4",
    totalProducts: 180,
    totalSales: 890000,
    status: "Active",
    commission: 125000,
    joinDate: "2024-01-20",
    tier: "Non-Premium"
  }
];

export const SellerListModal: React.FC<SellerListModalProps> = ({
  isOpen,
  onClose,
  title,
  sellers = defaultSellers,
  useTabs = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleViewSeller = (seller: Seller) => {
    setSelectedSeller(seller);
    setIsDetailModalOpen(true);
  };

  const filteredSellers = sellers.filter(seller =>
    seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    seller.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    seller.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    seller.phone.includes(searchTerm)
  );

  const premiumSellers = filteredSellers.filter(seller => seller.tier === 'Premium');
  const nonPremiumSellers = filteredSellers.filter(seller => seller.tier === 'Non-Premium');

  const getStatusColor = (status: string) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-yellow-100 text-yellow-800',
      'Suspended': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const SellerTable = ({ sellers }: { sellers: Seller[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Seller Name</TableHead>
          <TableHead>Business Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Total Products</TableHead>
          <TableHead>Total Sales</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sellers.map((seller) => (
          <TableRow key={seller.id}>
            <TableCell className="font-medium">{seller.name}</TableCell>
            <TableCell>{seller.businessName}</TableCell>
            <TableCell>{seller.email}</TableCell>
            <TableCell>{seller.phone}</TableCell>
            <TableCell>{seller.totalProducts}</TableCell>
            <TableCell>₹{seller.totalSales.toLocaleString()}</TableCell>
            <TableCell>
              <Badge className={getStatusColor(seller.status)}>
                {seller.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleViewSeller(seller)}
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
                  placeholder="Search sellers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {useTabs ? (
              <Tabs defaultValue="premium" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="premium">Premium ({premiumSellers.length})</TabsTrigger>
                  <TabsTrigger value="non-premium">Non-Premium ({nonPremiumSellers.length})</TabsTrigger>
                </TabsList>
                <TabsContent value="premium">
                  <SellerTable sellers={premiumSellers} />
                </TabsContent>
                <TabsContent value="non-premium">
                  <SellerTable sellers={nonPremiumSellers} />
                </TabsContent>
              </Tabs>
            ) : (
              <SellerTable sellers={filteredSellers} />
            )}
          </div>
        </DialogContent>
      </Dialog>

      <SellerDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        seller={selectedSeller}
      />
    </>
  );
};
