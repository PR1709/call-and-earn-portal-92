
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Package, DollarSign, TrendingUp, History, User, Phone, Mail, MapPin, Building } from 'lucide-react';

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
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  sales: number;
  commission: number;
  status: string;
}

interface SellerDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  seller: Seller | null;
}

const mockProducts: Product[] = [
  { id: 1, name: "iPhone 14 Pro", category: "Mobiles & Accessories", price: 95000, stock: 25, sales: 120, commission: 8, status: "Active" },
  { id: 2, name: "Samsung Smart TV 55\"", category: "Electronics", price: 65000, stock: 15, sales: 45, commission: 5, status: "Active" },
  { id: 3, name: "Nike Air Max", category: "Footwear", price: 8500, stock: 50, sales: 200, commission: 13, status: "Active" },
  { id: 4, name: "MacBook Pro M2", category: "Electronics", price: 125000, stock: 8, sales: 35, commission: 6, status: "Low Stock" },
];

const mockTransactionHistory = [
  { id: 1, date: "2024-03-01", type: "Payout", amount: 25000, description: "Monthly Commission" },
  { id: 2, date: "2024-02-28", type: "Product Update", amount: 0, description: "Added new products" },
  { id: 3, date: "2024-02-25", type: "Sale", amount: 5000, description: "Commission from sales" },
];

export const SellerDetailModal: React.FC<SellerDetailModalProps> = ({
  isOpen,
  onClose,
  seller
}) => {
  if (!seller) return null;

  const getStatusColor = (status: string) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Low Stock': 'bg-yellow-100 text-yellow-800',
      'Out of Stock': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  // Calculate totals that match dashboard numbers
  const totalProductsCalculated = mockProducts.length;
  const totalSalesCalculated = mockProducts.reduce((sum, product) => sum + (product.price * product.sales), 0);
  const totalCommissionCalculated = mockProducts.reduce((sum, product) => sum + ((product.price * product.sales * product.commission) / 100), 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onClose}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <DialogTitle className="text-2xl">{seller.name}</DialogTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={seller.status === 'Active' ? 'default' : 'destructive'}>
                  {seller.status}
                </Badge>
                <span className="text-sm text-muted-foreground">Joined: {seller.joinDate}</span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Contact & Business Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{seller.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{seller.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{seller.address}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{seller.businessName}</span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">GST Number</p>
                    <p className="text-sm font-mono">{seller.gstNumber}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Total Products
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{seller.totalProducts}</div>
                <p className="text-xs text-muted-foreground">Calculated: {totalProductsCalculated}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Total Sales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">₹{seller.totalSales.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Calculated: ₹{totalSalesCalculated.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Commission Earned
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">₹{seller.commission.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Calculated: ₹{Math.round(totalCommissionCalculated).toLocaleString()}</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="products" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="products">Product List</TabsTrigger>
              <TabsTrigger value="history">Transaction History</TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Product Inventory
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Sales</TableHead>
                        <TableHead>Commission %</TableHead>
                        <TableHead>Total Revenue</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>₹{product.price.toLocaleString()}</TableCell>
                          <TableCell>{product.stock}</TableCell>
                          <TableCell>{product.sales}</TableCell>
                          <TableCell>{product.commission}%</TableCell>
                          <TableCell className="text-green-600">₹{(product.price * product.sales).toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(product.status)}>
                              {product.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="mt-4 text-sm text-muted-foreground">
                    <p>Total Products: {totalProductsCalculated}</p>
                    <p>Total Sales Value: ₹{totalSalesCalculated.toLocaleString()}</p>
                    <p>Total Commission: ₹{Math.round(totalCommissionCalculated).toLocaleString()}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="h-5 w-5" />
                    Transaction History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockTransactionHistory.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>
                            <Badge variant={transaction.type === 'Payout' ? 'default' : 'secondary'}>
                              {transaction.type}
                            </Badge>
                          </TableCell>
                          <TableCell className={transaction.amount > 0 ? 'text-green-600' : ''}>
                            {transaction.amount > 0 ? `₹${transaction.amount.toLocaleString()}` : '-'}
                          </TableCell>
                          <TableCell>{transaction.description}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
