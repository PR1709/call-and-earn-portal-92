
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ArrowLeft, Filter } from 'lucide-react';

interface AnalyticsDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'revenue' | 'users' | 'content' | 'sales';
  title: string;
}

const revenueData = [
  { id: 1, seller: 'Electronics Hub', category: 'Electronics', amount: 45620, date: '2024-12-09', percentage: 28.5 },
  { id: 2, seller: 'Fashion World', category: 'Fashion', amount: 89340, date: '2024-12-08', percentage: 55.8 },
  { id: 3, seller: 'Home Essentials', category: 'Home & Garden', amount: 23450, date: '2024-12-07', percentage: 14.6 },
  { id: 4, seller: 'Sports Central', category: 'Sports', amount: 34120, date: '2024-12-06', percentage: 21.3 }
];

const usersData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', joinDate: '2024-12-09', role: 'Viewer', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', joinDate: '2024-12-08', role: 'Creator', status: 'Active' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', joinDate: '2024-12-07', role: 'Seller', status: 'Inactive' },
  { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', joinDate: '2024-12-06', role: 'Creator', status: 'Active' }
];

const contentData = [
  { id: 1, title: 'Funny Cooking Show', creator: 'Comedy Central', uploadDate: '2024-12-09', views: 12500, category: 'Comedy' },
  { id: 2, title: 'Tech Review: Latest Phone', creator: 'Tech Guru', uploadDate: '2024-12-08', views: 8900, category: 'Technology' },
  { id: 3, title: 'Dance Tutorial', creator: 'Dance Queen', uploadDate: '2024-12-07', views: 15600, category: 'Dance' },
  { id: 4, title: 'DIY Craft Project', creator: 'Craft Lover', uploadDate: '2024-12-06', views: 7200, category: 'Crafts' }
];

const salesData = [
  { id: 1, product: 'Wireless Headphones', seller: 'Electronics Hub', buyer: 'John Doe', date: '2024-12-09', amount: 2500 },
  { id: 2, product: 'Designer T-shirt', seller: 'Fashion World', buyer: 'Jane Smith', date: '2024-12-08', amount: 1200 },
  { id: 3, product: 'Kitchen Utensils Set', seller: 'Home Essentials', buyer: 'Mike Johnson', date: '2024-12-07', amount: 850 },
  { id: 4, product: 'Basketball', seller: 'Sports Central', buyer: 'Sarah Wilson', date: '2024-12-06', amount: 1500 }
];

export const AnalyticsDetailModal: React.FC<AnalyticsDetailModalProps> = ({
  isOpen,
  onClose,
  type,
  title
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('all');

  const getData = () => {
    switch (type) {
      case 'revenue': return revenueData;
      case 'users': return usersData;
      case 'content': return contentData;
      case 'sales': return salesData;
      default: return [];
    }
  };

  const getFilteredData = () => {
    const data = getData();
    return data.filter(item => {
      const matchesSearch = Object.values(item).some(value => 
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesFilter = filterValue === 'all' || 
        (type === 'users' && (item as any).role === filterValue) ||
        (type === 'content' && (item as any).category === filterValue) ||
        (type === 'revenue' && (item as any).category === filterValue);
      return matchesSearch && matchesFilter;
    });
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-yellow-100 text-yellow-800',
      'Suspended': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const renderTable = () => {
    const filteredData = getFilteredData();

    switch (type) {
      case 'revenue':
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Seller</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Percentage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.seller}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>₹{item.amount.toLocaleString()}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.percentage}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );

      case 'users':
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.joinDate}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );

      case 'content':
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Creator</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>{item.creator}</TableCell>
                  <TableCell>{item.uploadDate}</TableCell>
                  <TableCell>{item.views.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.category}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );

      case 'sales':
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Seller</TableHead>
                <TableHead>Buyer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.product}</TableCell>
                  <TableCell>{item.seller}</TableCell>
                  <TableCell>{item.buyer}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>₹{item.amount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );

      default:
        return null;
    }
  };

  const getFilterOptions = () => {
    switch (type) {
      case 'users':
        return [
          { value: 'all', label: 'All Roles' },
          { value: 'Viewer', label: 'Viewer' },
          { value: 'Creator', label: 'Creator' },
          { value: 'Seller', label: 'Seller' }
        ];
      case 'content':
        return [
          { value: 'all', label: 'All Categories' },
          { value: 'Comedy', label: 'Comedy' },
          { value: 'Technology', label: 'Technology' },
          { value: 'Dance', label: 'Dance' },
          { value: 'Crafts', label: 'Crafts' }
        ];
      case 'revenue':
        return [
          { value: 'all', label: 'All Categories' },
          { value: 'Electronics', label: 'Electronics' },
          { value: 'Fashion', label: 'Fashion' },
          { value: 'Home & Garden', label: 'Home & Garden' },
          { value: 'Sports', label: 'Sports' }
        ];
      default:
        return [{ value: 'all', label: 'All' }];
    }
  };

  return (
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
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterValue} onValueChange={setFilterValue}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                {getFilterOptions().map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            {renderTable()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
