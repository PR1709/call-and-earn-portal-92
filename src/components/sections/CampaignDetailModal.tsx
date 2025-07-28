
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Calendar, DollarSign, Eye, Target, TrendingUp } from 'lucide-react';

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
}

interface CampaignDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: Campaign | null;
}

export const CampaignDetailModal: React.FC<CampaignDetailModalProps> = ({
  isOpen,
  onClose,
  campaign
}) => {
  if (!campaign) return null;

  const remainingBudget = campaign.budget - campaign.spent;
  const budgetUtilization = ((campaign.spent / campaign.budget) * 100).toFixed(1);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onClose}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <DialogTitle className="text-2xl">Campaign Details</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Campaign Overview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">{campaign.title}</h3>
                <p className="text-muted-foreground">by {campaign.advertiser}</p>
              </div>
              <Badge variant="default">{campaign.status}</Badge>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Total Views
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{campaign.views.toLocaleString()}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Click Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{campaign.ctr}%</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Budget Used
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{campaign.spent.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-1">{budgetUtilization}% of budget</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Remaining
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{remainingBudget.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-1">Available budget</p>
              </CardContent>
            </Card>
          </div>

          {/* Campaign Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Campaign Duration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Start Date</p>
                  <p className="font-medium">{campaign.startDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">End Date</p>
                  <p className="font-medium">{campaign.endDate}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Budget Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Total Budget</p>
                  <p className="font-medium">₹{campaign.budget.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Amount Spent</p>
                  <p className="font-medium">₹{campaign.spent.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Remaining Budget</p>
                  <p className="font-medium text-green-600">₹{remainingBudget.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800">Strong Performance</h4>
                  <p className="text-sm text-green-700 mt-1">
                    This campaign is performing well with a CTR of {campaign.ctr}%, which is above the industry average.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Average Daily Views</p>
                    <p className="font-medium">{Math.round(campaign.views / 30).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Cost Per View</p>
                    <p className="font-medium">₹{(campaign.spent / campaign.views).toFixed(3)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Estimated Clicks</p>
                    <p className="font-medium">{Math.round(campaign.views * (campaign.ctr / 100)).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
