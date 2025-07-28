
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Download, Eye, Edit, AlertTriangle, Package, TrendingUp, DollarSign, Bell, Settings } from 'lucide-react';
import { SellerListModal } from './SellerListModal';
import { SellerDetailModal } from './SellerDetailModal';
import { SellerEditModal } from './SellerEditModal';
import { SellerSettingsModal } from './SellerSettingsModal';

const sellers = [
  { 
    id: 1, 
    name: "Electronics Hub", 
    products: 24, 
    sales: 45620, 
    status: "Active" as const, 
    commission: 8,
    lowStock: 3,
    email: "electronics@hub.com",
    phone: "+91 9876543210",
    address: "Mumbai, Maharashtra",
    businessName: "Electronics Hub Pvt Ltd",
    gstNumber: "27AAAAA0000A1Z5",
    totalProducts: 24,
    totalSales: 45620,
    joinDate: "2024-01-15",
    tier: "Premium" as const
  },
  { 
    id: 2, 
    name: "Fashion World", 
    products: 156, 
    sales: 89340, 
    status: "Active" as const, 
    commission: 12,
    lowStock: 8,
    email: "fashion@world.com",
    phone: "+91 9876543211",
    address: "Delhi, India",
    businessName: "Fashion World Enterprises",
    gstNumber: "07BBBBB0000B2Y4",
    totalProducts: 156,
    totalSales: 89340,
    joinDate: "2024-01-20",
    tier: "Premium" as const
  },
  { 
    id: 3, 
    name: "Home Essentials", 
    products: 89, 
    sales: 23450, 
    status: "Suspended" as const, 
    commission: 10,
    lowStock: 12,
    email: "home@essentials.com",
    phone: "+91 9876543212",
    address: "Bangalore, Karnataka",
    businessName: "Home Essentials Co.",
    gstNumber: "29CCCCC0000C3X3",
    totalProducts: 89,
    totalSales: 23450,
    joinDate: "2024-02-01",
    tier: "Non-Premium" as const
  },
  { 
    id: 4, 
    name: "Sports Central", 
    products: 67, 
    sales: 34120, 
    status: "Active" as const, 
    commission: 15,
    lowStock: 5,
    email: "sports@central.com",
    phone: "+91 9876543213",
    address: "Pune, Maharashtra",
    businessName: "Sports Central Ltd",
    gstNumber: "27DDDDD0000D4W2",
    totalProducts: 67,
    totalSales: 34120,
    joinDate: "2024-02-10",
    tier: "Non-Premium" as const
  },
  { 
    id: 5, 
    name: "Tech Gadgets Pro", 
    products: 134, 
    sales: 76540, 
    status: "Active" as const, 
    commission: 9,
    lowStock: 2,
    email: "tech@gadgetspro.com",
    phone: "+91 9876543214",
    address: "Hyderabad, Telangana",
    businessName: "Tech Gadgets Pro Pvt Ltd",
    gstNumber: "36EEEEE0000E5V1",
    totalProducts: 134,
    totalSales: 76540,
    joinDate: "2024-01-25",
    tier: "Premium" as const
  },
  { 
    id: 6, 
    name: "Kitchen Essentials", 
    products: 45, 
    sales: 18900, 
    status: "Active" as const, 
    commission: 11,
    lowStock: 7,
    email: "kitchen@essentials.com",
    phone: "+91 9876543215",
    address: "Chennai, Tamil Nadu",
    businessName: "Kitchen Essentials Ltd",
    gstNumber: "33FFFFF0000F6U0",
    totalProducts: 45,
    totalSales: 18900,
    joinDate: "2024-02-05",
    tier: "Non-Premium" as const
  }
];

export const Sellers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isSellerListOpen, setIsSellerListOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [listType, setListType] = useState('');
  const [useTabs, setUseTabs] = useState(false);

  const filteredSellers = sellers.filter(seller => {
    const matchesSearch = seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         seller.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         seller.phone.includes(searchTerm) ||
                         seller.businessName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || seller.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-yellow-100 text-yellow-800',
      'Suspended': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const handleCardClick = (type: string) => {
    setListType(type);
    // Enable tabs specifically for active sellers to show Premium/Non-Premium
    setUseTabs(type === 'active');
    setIsSellerListOpen(true);
  };

  const handleViewSeller = (seller: any) => {
    setSelectedSeller(seller);
    setIsDetailModalOpen(true);
  };

  const handleEditSeller = (seller: any) => {
    setSelectedSeller(seller);
    setIsEditModalOpen(true);
  };

  const handleSellerSettings = (seller: any) => {
    setSelectedSeller(seller);
    setIsSettingsModalOpen(true);
  };

  const handleNotifySeller = (sellerId: number) => {
    console.log('Notifying seller:', sellerId);
  };

  // Calculate stats from actual data
  const activeSellers = sellers.filter(s => s.status === 'Active').length;
  const totalProducts = sellers.reduce((sum, seller) => sum + seller.products, 0);
  const totalSales = sellers.reduce((sum, seller) => sum + seller.sales, 0);
  const totalCommission = sellers.reduce((sum, seller) => sum + (seller.sales * seller.commission / 100), 0);
  const lowStockAlerts = sellers.reduce((sum, seller) => sum + seller.lowStock, 0);

  const getFilteredSellersForModal = () => {
    switch (listType) {
      case 'active':
        return sellers.filter(s => s.status === 'Active');
      case 'products':
      case 'sales':
      case 'commission':
        return sellers;
      default:
        return sellers;
    }
  };

  return (
    <>
      <div className="space-y-8 p-8 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Seller Management Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage sellers, products, and commissions</p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-green-100 to-green-200 text-green-800 border-green-200 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleCardClick('active')}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Active Sellers</CardTitle>
                <TrendingUp className="h-8 w-8 opacity-80" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{activeSellers}</div>
              <p className="text-green-600 text-sm mt-1">77% of total</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-100 to-purple-200 text-purple-800 border-purple-200 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleCardClick('products')}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Total Products</CardTitle>
                <Package className="h-8 w-8 opacity-80" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalProducts}</div>
              <p className="text-purple-600 text-sm mt-1">Across all sellers</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-100 to-blue-200 text-blue-800 border-blue-200 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleCardClick('sales')}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Total Sales</CardTitle>
                <DollarSign className="h-8 w-8 opacity-80" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₹{totalSales.toLocaleString()}</div>
              <p className="text-blue-600 text-sm mt-1">+12 this month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-100 to-orange-200 text-orange-800 border-orange-200 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleCardClick('commission')}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Commission Earned</CardTitle>
                <AlertTriangle className="h-8 w-8 opacity-80" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₹{Math.round(totalCommission).toLocaleString()}</div>
              <p className="text-orange-600 text-sm mt-1">{lowStockAlerts} low stock alerts</p>
            </CardContent>
          </Card>
        </div>

        {/* Sellers List */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <CardTitle>Sellers List</CardTitle>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by name, email, phone..."
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
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Seller Name</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Total Sales</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Alerts</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSellers.map((seller) => (
                  <TableRow key={seller.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{seller.name}</span>
                        {seller.lowStock > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {seller.lowStock} alerts
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{seller.products}</TableCell>
                    <TableCell className="font-semibold">₹{seller.sales.toLocaleString()}</TableCell>
                    <TableCell>{seller.commission}%</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(seller.status)}>
                        {seller.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {seller.lowStock > 0 && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex items-center gap-1 text-orange-600 border-orange-300"
                          onClick={() => handleNotifySeller(seller.id)}
                        >
                          <Bell className="h-3 w-3" />
                          Notify
                        </Button>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewSeller(seller)}
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditSeller(seller)}
                          title="Edit Seller"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSellerSettings(seller)}
                          title="Seller Settings"
                        >
                          <Settings className="h-4 w-4" />
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

      <SellerListModal
        isOpen={isSellerListOpen}
        onClose={() => {
          setIsSellerListOpen(false);
          setUseTabs(false);
        }}
        title={`${listType.charAt(0).toUpperCase() + listType.slice(1)} Sellers`}
        sellers={getFilteredSellersForModal()}
        useTabs={useTabs}
      />

      <SellerDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        seller={selectedSeller}
      />

      <SellerEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        seller={selectedSeller}
      />

      <SellerSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        seller={selectedSeller}
      />
    </>
  );
};
