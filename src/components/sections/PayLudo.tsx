
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Gamepad2, TrendingUp, TrendingDown, Trophy, Target, Users, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const ludoGameData = [
  { entryFee: 1, gamesPlayed: 1250, wins: 625, losses: 625, amountEarned: 6250, amountLost: 6250, netProfitLoss: 0 },
  { entryFee: 5, gamesPlayed: 890, wins: 460, losses: 430, amountEarned: 23000, amountLost: 21500, netProfitLoss: 1500 },
  { entryFee: 10, gamesPlayed: 650, wins: 320, losses: 330, amountEarned: 32000, amountLost: 33000, netProfitLoss: -1000 },
  { entryFee: 50, gamesPlayed: 420, wins: 230, losses: 190, amountEarned: 115000, amountLost: 95000, netProfitLoss: 20000 },
  { entryFee: 75, gamesPlayed: 280, wins: 150, losses: 130, amountEarned: 112500, amountLost: 97500, netProfitLoss: 15000 },
  { entryFee: 100, gamesPlayed: 350, wins: 180, losses: 170, amountEarned: 180000, amountLost: 170000, netProfitLoss: 10000 },
  { entryFee: 250, gamesPlayed: 180, wins: 95, losses: 85, amountEarned: 237500, amountLost: 212500, netProfitLoss: 25000 },
  { entryFee: 500, gamesPlayed: 120, wins: 65, losses: 55, amountEarned: 325000, amountLost: 275000, netProfitLoss: 50000 }
];

const recentGames = [
  { id: 1, player1: "Rahul123", player2: "Priya456", entryFee: 100, winner: "Rahul123", duration: "15m 30s", timestamp: "2024-05-20 14:30" },
  { id: 2, player1: "Amit789", player2: "Sneha012", entryFee: 50, winner: "Sneha012", duration: "12m 45s", timestamp: "2024-05-20 14:25" },
  { id: 3, player1: "Vikash345", player2: "Anita678", entryFee: 250, winner: "Vikash345", duration: "18m 20s", timestamp: "2024-05-20 14:20" },
  { id: 4, player1: "Ravi901", player2: "Meera234", entryFee: 75, winner: "Meera234", duration: "14m 10s", timestamp: "2024-05-20 14:15" },
  { id: 5, player1: "Suresh567", player2: "Kavita890", entryFee: 500, winner: "Suresh567", duration: "22m 05s", timestamp: "2024-05-20 14:10" }
];

export const PayLudo: React.FC = () => {
  const [viewMode, setViewMode] = useState('earnings');
  const [sortBy, setSortBy] = useState('mostPlayed');

  // Calculate totals
  const totalGamesPlayed = ludoGameData.reduce((sum, item) => sum + item.gamesPlayed, 0);
  const totalWins = ludoGameData.reduce((sum, item) => sum + item.wins, 0);
  const totalLosses = ludoGameData.reduce((sum, item) => sum + item.losses, 0);
  const totalNetProfitLoss = ludoGameData.reduce((sum, item) => sum + item.netProfitLoss, 0);
  const winRate = totalGamesPlayed > 0 ? ((totalWins / totalGamesPlayed) * 100).toFixed(1) : 0;

  // Sort data based on selection
  const sortedData = [...ludoGameData].sort((a, b) => {
    switch (sortBy) {
      case 'mostPlayed':
        return b.gamesPlayed - a.gamesPlayed;
      case 'highestProfit':
        return b.netProfitLoss - a.netProfitLoss;
      case 'highestLoss':
        return a.netProfitLoss - b.netProfitLoss;
      default:
        return 0;
    }
  });

  const getProfitLossColor = (value: number) => {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getProfitLossIcon = (value: number) => {
    if (value > 0) return <ArrowUpRight className="h-4 w-4" />;
    if (value < 0) return <ArrowDownRight className="h-4 w-4" />;
    return null;
  };

  return (
    <div className="space-y-6 p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pay Ludo Management</h1>
          <p className="text-muted-foreground mt-2">Monitor game performance, earnings, and player statistics</p>
        </div>
        <div className="flex gap-3">
          <Select value={viewMode} onValueChange={setViewMode}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="earnings">Earnings View</SelectItem>
              <SelectItem value="history">Game History</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Total Summary */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gamepad2 className="h-5 w-5" />
            Total Ludo Earnings Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className={`text-3xl font-bold ${getProfitLossColor(totalNetProfitLoss)} flex items-center justify-center gap-2`}>
                {getProfitLossIcon(totalNetProfitLoss)}
                ₹{Math.abs(totalNetProfitLoss).toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {totalNetProfitLoss >= 0 ? 'Total Profit' : 'Total Loss'}
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{totalGamesPlayed.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground mt-1">Total Games Played</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{winRate}%</div>
              <p className="text-sm text-muted-foreground mt-1">Overall Win Rate</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{totalWins.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground mt-1">Total Wins</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={viewMode} onValueChange={setViewMode} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-white">
          <TabsTrigger value="earnings" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Earnings View
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Game History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="earnings" className="space-y-6">
          {/* Controls */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Earnings by Entry Fee</h2>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mostPlayed">Most Played</SelectItem>
                <SelectItem value="highestProfit">Highest Profit</SelectItem>
                <SelectItem value="highestLoss">Highest Loss</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Entry Fee Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedData.map((data) => (
              <Card key={data.entryFee} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-bold text-center">
                    ₹{data.entryFee} Entry Fee
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getProfitLossColor(data.netProfitLoss)} flex items-center justify-center gap-2`}>
                      {getProfitLossIcon(data.netProfitLoss)}
                      ₹{Math.abs(data.netProfitLoss).toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {data.netProfitLoss >= 0 ? 'Net Profit' : 'Net Loss'}
                    </p>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Games Played</span>
                      <span className="font-medium">{data.gamesPlayed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Wins</span>
                      <span className="font-medium text-green-600">{data.wins}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Losses</span>
                      <span className="font-medium text-red-600">{data.losses}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Win Rate</span>
                      <span className="font-medium">
                        {data.gamesPlayed > 0 ? ((data.wins / data.gamesPlayed) * 100).toFixed(1) : 0}%
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Earned</span>
                      <span className="text-green-600 font-medium">₹{data.amountEarned.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lost</span>
                      <span className="text-red-600 font-medium">₹{data.amountLost.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Games Today</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-green-600 mt-1">+12% from yesterday</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Players</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-green-600 mt-1">Currently online</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Revenue Today</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹45,670</div>
                <p className="text-xs text-green-600 mt-1">+8% from yesterday</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Avg Game Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">16m 42s</div>
                <p className="text-xs text-muted-foreground mt-1">Average time</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Games Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Game History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Player 1</TableHead>
                    <TableHead>Player 2</TableHead>
                    <TableHead>Entry Fee</TableHead>
                    <TableHead>Winner</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentGames.map((game) => (
                    <TableRow key={game.id}>
                      <TableCell className="font-medium">{game.player1}</TableCell>
                      <TableCell>{game.player2}</TableCell>
                      <TableCell>
                        <Badge variant="outline">₹{game.entryFee}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">
                          <Trophy className="h-3 w-3 mr-1" />
                          {game.winner}
                        </Badge>
                      </TableCell>
                      <TableCell>{game.duration}</TableCell>
                      <TableCell className="text-muted-foreground">{game.timestamp}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
