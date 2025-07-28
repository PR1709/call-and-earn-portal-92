
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wallet as WalletIcon, Plus, Minus, Search, Filter, Download, Eye, CreditCard, TrendingUp } from 'lucide-react';

const transactions = [
  { id: 1, user: "Rahul Sharma", type: "Game Win", amount: +150, date: "2024-06-08", status: "Completed" },
  { id: 2, user: "Priya Patel", type: "Video View", amount: +25, date: "2024-06-08", status: "Completed" },
  { id: 3, user: "Amit Kumar", type: "Admin Deduction", amount: -100, date: "2024-06-07", status: "Completed" },
  { id: 4, user: "Sneha Singh", type: "Call Earning", amount: +75, date: "2024-06-07", status: "Completed" },
  { id: 5, user: "Vikash Yadav", type: "Top-up", amount: +500, date: "2024-06-06", status: "Completed" },
];

const rewardRules = [
  { title: "Video View", amount: 5, icon: Eye, color: "bg-blue-50 text-blue-600" },
  { title: "Call Earnings", amount: 50, icon: CreditCard, color: "bg-green-50 text-green-600" },
  { title: "Game Win", amount: 100, icon: TrendingUp, color: "bg-purple-50 text-purple-600" },
];

export const Wallet: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [topUpAmount, setTopUpAmount] = useState('');
  const [userId, setUserId] = useState('');
  const [reason, setReason] = useState('');

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || transaction.type.toLowerCase().includes(filterType);
    return matchesSearch && matchesType;
  });

  const handleTopUp = () => {
    console.log('Top-up:', { userId, amount: topUpAmount, reason });
    // Reset form
    setTopUpAmount('');
    setUserId('');
    setReason('');
  };

  return (
    <div className="space-y-8 p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Wallet & Earnings</h1>
          <p className="text-muted-foreground mt-2">Manage user wallets and track earnings</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Wallet Balance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-100 to-blue-200 text-blue-800 border-blue-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Total Wallet Balance</CardTitle>
              <WalletIcon className="h-8 w-8 opacity-80" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹12,45,780</div>
            <p className="text-blue-600 text-sm mt-1">Across all users</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-100 to-green-200 text-green-800 border-green-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Today's Earnings</CardTitle>
              <TrendingUp className="h-8 w-8 opacity-80" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹34,560</div>
            <p className="text-green-600 text-sm mt-1">+15% from yesterday</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-100 to-purple-200 text-purple-800 border-purple-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Active Users</CardTitle>
              <CreditCard className="h-8 w-8 opacity-80" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8,234</div>
            <p className="text-purple-600 text-sm mt-1">With wallet balance</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Manual Wallet Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <WalletIcon className="h-5 w-5" />
              Manual Wallet Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">User ID</label>
              <Input
                placeholder="Enter user ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount (₹)</label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={topUpAmount}
                onChange={(e) => setTopUpAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Reason</label>
              <Input
                placeholder="Enter reason for transaction"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button 
                className="flex-1 bg-green-100 hover:bg-green-200 text-green-700 border-green-300" 
                variant="outline"
                onClick={handleTopUp}
              >
                <Plus className="h-4 w-4 mr-2" />
                Top Up
              </Button>
              <Button 
                className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 border-red-300"
                variant="outline"
                onClick={handleTopUp}
              >
                <Minus className="h-4 w-4 mr-2" />
                Deduct
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Reward Rules */}
        <Card>
          <CardHeader>
            <CardTitle>Reward Rules</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rewardRules.map((rule, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${rule.color}`}>
                      <rule.icon className="h-5 w-5" />
                    </div>
                    <span className="font-medium">{rule.title}</span>
                  </div>
                  <Badge variant="secondary" className="text-lg font-semibold">
                    ₹{rule.amount}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle>Transaction History</CardTitle>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Filter type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="game">Game</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="call">Call</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.user}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>
                    <span className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount)}
                    </span>
                  </TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>
                    <Badge variant="default">{transaction.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
