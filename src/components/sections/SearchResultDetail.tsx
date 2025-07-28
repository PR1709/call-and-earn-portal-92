
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, User, CreditCard, FileText, Phone, Mail, MapPin, Calendar, DollarSign, Clock, TrendingUp, TrendingDown } from 'lucide-react';

interface SearchResult {
  id: string;
  type: 'user' | 'transaction' | 'content' | 'withdrawal';
  title: string;
  description: string;
  status?: string;
  amount?: number;
  date?: string;
  category?: string;
}

interface SearchResultDetailProps {
  result: SearchResult;
  onBack: () => void;
}

export const SearchResultDetail: React.FC<SearchResultDetailProps> = ({ result, onBack }) => {
  const getIcon = () => {
    switch (result.type) {
      case 'user':
        return <User className="h-6 w-6" />;
      case 'transaction':
        return <CreditCard className="h-6 w-6" />;
      case 'content':
        return <FileText className="h-6 w-6" />;
      case 'withdrawal':
        return <CreditCard className="h-6 w-6" />;
      default:
        return <FileText className="h-6 w-6" />;
    }
  };

  const getTypeColor = () => {
    switch (result.type) {
      case 'user':
        return 'bg-blue-500';
      case 'transaction':
        return 'bg-green-500';
      case 'content':
        return 'bg-purple-500';
      case 'withdrawal':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'completed':
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
      case 'under review':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
      case 'rejected':
      case 'blocked':
      case 'flagged':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderUserDetails = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Email</label>
            <p className="text-sm">user@example.com</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Phone</label>
            <p className="text-sm">+91 98765 43210</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Address</label>
            <p className="text-sm">Mumbai, Maharashtra, India</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Financial Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Wallet Balance</label>
            <p className="text-lg font-semibold">₹1,250.00</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Total Earnings</label>
            <p className="text-sm text-green-600">₹2,500.00</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Total Losses</label>
            <p className="text-sm text-red-600">₹800.00</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTransactionDetails = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Transaction Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Transaction ID</label>
            <p className="text-sm font-mono">{result.id}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Type</label>
            <p className="text-sm">{result.category || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Date & Time</label>
            <p className="text-sm">{result.date || 'N/A'}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Amount Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Amount</label>
            <p className="text-2xl font-bold text-green-600">
              ₹{result.amount?.toLocaleString() || '0'}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Processing Fee</label>
            <p className="text-sm">₹5.00</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Net Amount</label>
            <p className="text-sm font-semibold">
              ₹{((result.amount || 0) - 5).toLocaleString()}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContentDetails = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Content Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Content ID</label>
            <p className="text-sm font-mono">{result.id}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Category</label>
            <p className="text-sm">{result.category || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Upload Date</label>
            <p className="text-sm">{result.date || 'N/A'}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Views</label>
            <p className="text-lg font-semibold">25,000</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Likes</label>
            <p className="text-sm">1,200</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Engagement Rate</label>
            <p className="text-sm">4.8%</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderWithdrawalDetails = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Withdrawal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Request ID</label>
            <p className="text-sm font-mono">{result.id}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Request Date</label>
            <p className="text-sm">{result.date || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Payment Method</label>
            <p className="text-sm">Bank Transfer</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Amount Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Requested Amount</label>
            <p className="text-2xl font-bold">₹{result.amount?.toLocaleString() || '0'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Processing Fee</label>
            <p className="text-sm">₹25.00</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Net Amount</label>
            <p className="text-sm font-semibold">
              ₹{((result.amount || 0) - 25).toLocaleString()}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDetails = () => {
    switch (result.type) {
      case 'user':
        return renderUserDetails();
      case 'transaction':
        return renderTransactionDetails();
      case 'content':
        return renderContentDetails();
      case 'withdrawal':
        return renderWithdrawalDetails();
      default:
        return <div>No additional details available.</div>;
    }
  };

  return (
    <div className="space-y-6 p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${getTypeColor()} text-white`}>
            {getIcon()}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{result.title}</h1>
            <p className="text-muted-foreground">{result.description}</p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="capitalize">{result.type} Overview</span>
            {result.status && (
              <Badge className={getStatusColor(result.status)}>
                {result.status}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Type</label>
              <p className="text-sm capitalize">{result.type}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">ID</label>
              <p className="text-sm font-mono">{result.id}</p>
            </div>
            {result.date && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Date</label>
                <p className="text-sm">{result.date}</p>
              </div>
            )}
            {result.amount && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Amount</label>
                <p className="text-sm font-semibold">₹{result.amount.toLocaleString()}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {renderDetails()}
    </div>
  );
};
