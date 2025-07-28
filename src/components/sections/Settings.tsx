
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Save, Eye, AlertCircle, CheckCircle } from 'lucide-react';

export const Settings = () => {
  const { toast } = useToast();
  
  // Update Policies state
  const [termsAndConditions, setTermsAndConditions] = useState('Enter your terms and conditions here...');
  const [privacyPolicy, setPrivacyPolicy] = useState('Enter your privacy policy here...');
  const [payoutSettings, setPayoutSettings] = useState('Configure payout settings and requirements...');
  
  // Global App Status state
  const [isAppLive, setIsAppLive] = useState(true);
  
  // Commission & Rates state
  const [commissionPercentage, setCommissionPercentage] = useState(10);
  const [isRatesModalOpen, setIsRatesModalOpen] = useState(false);

  const handleSavePolicy = (policyType: string) => {
    toast({
      title: "Policy Updated",
      description: `${policyType} has been saved successfully.`,
    });
  };

  const handleAppStatusChange = (checked: boolean) => {
    setIsAppLive(checked);
    toast({
      title: "App Status Updated",
      description: `App is now in ${checked ? 'Live' : 'Maintenance'} mode.`,
      variant: checked ? "default" : "destructive",
    });
  };

  const handleCommissionSave = () => {
    toast({
      title: "Commission Updated",
      description: `Platform commission set to ${commissionPercentage}%.`,
    });
  };

  const rateBreakdown = [
    { feature: 'TipCall', commission: '15%', baseRate: '$0.10/min' },
    { feature: 'Pay Ludo', commission: '8%', baseRate: '5% of pot' },
    { feature: 'Video Ads', commission: '12%', baseRate: '$0.05/view' },
    { feature: 'Content Creator', commission: '10%', baseRate: '10% of earnings' },
    { feature: 'Seller Commission', commission: '7%', baseRate: '7% of sale' },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your platform configuration and policies</p>
        </div>
      </div>

      {/* Update Policies Section */}
      <Card>
        <CardHeader>
          <CardTitle>Update Policies</CardTitle>
          <CardDescription>
            Manage platform policies and legal documents
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Terms & Conditions */}
          <div className="space-y-2">
            <Label htmlFor="terms">Terms & Conditions</Label>
            <Textarea
              id="terms"
              value={termsAndConditions}
              onChange={(e) => setTermsAndConditions(e.target.value)}
              className="min-h-[120px]"
              placeholder="Enter your terms and conditions..."
            />
            <Button 
              onClick={() => handleSavePolicy('Terms & Conditions')}
              className="w-full sm:w-auto"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Terms & Conditions
            </Button>
          </div>

          {/* Privacy Policy */}
          <div className="space-y-2">
            <Label htmlFor="privacy">Privacy Policy</Label>
            <Textarea
              id="privacy"
              value={privacyPolicy}
              onChange={(e) => setPrivacyPolicy(e.target.value)}
              className="min-h-[120px]"
              placeholder="Enter your privacy policy..."
            />
            <Button 
              onClick={() => handleSavePolicy('Privacy Policy')}
              className="w-full sm:w-auto"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Privacy Policy
            </Button>
          </div>

          {/* Payout Settings */}
          <div className="space-y-2">
            <Label htmlFor="payout">Payout Settings</Label>
            <Textarea
              id="payout"
              value={payoutSettings}
              onChange={(e) => setPayoutSettings(e.target.value)}
              className="min-h-[120px]"
              placeholder="Configure payout settings and requirements..."
            />
            <Button 
              onClick={() => handleSavePolicy('Payout Settings')}
              className="w-full sm:w-auto"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Payout Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Global App Status Section */}
      <Card>
        <CardHeader>
          <CardTitle>Global App Status</CardTitle>
          <CardDescription>
            Control the overall status of your platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="app-status" className="text-base font-medium">App Status</Label>
                <p className="text-sm text-muted-foreground">
                  Toggle between live mode and maintenance mode
                </p>
              </div>
              <Switch
                id="app-status"
                checked={isAppLive}
                onCheckedChange={handleAppStatusChange}
              />
            </div>
            
            {/* Live Mode Status Indicator */}
            <div className={`p-4 rounded-lg border ${isAppLive ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}>
              <div className="flex items-center gap-3">
                {isAppLive ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                )}
                <div>
                  <h4 className={`font-medium ${isAppLive ? 'text-green-700' : 'text-orange-700'}`}>
                    {isAppLive ? 'Live Mode' : 'Maintenance Mode'}
                  </h4>
                  <p className={`text-sm ${isAppLive ? 'text-green-600' : 'text-orange-600'}`}>
                    {isAppLive 
                      ? 'Platform is accessible to all users with full functionality.'
                      : 'Users will see a maintenance notice during this mode.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Commission & Rates Section */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Commission Settings</CardTitle>
          <CardDescription>
            Manage commission rates and view current fee structure
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="commission">Commission Percentage (%)</Label>
              <Input
                id="commission"
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={commissionPercentage}
                onChange={(e) => setCommissionPercentage(Number(e.target.value))}
                placeholder="10"
              />
            </div>
            <div className="flex items-end">
              <Dialog open={isRatesModalOpen} onOpenChange={setIsRatesModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Eye className="w-4 h-4 mr-2" />
                    View Current Rates
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Current Rate Breakdown</DialogTitle>
                  </DialogHeader>
                  <div className="mt-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Feature</TableHead>
                          <TableHead>Commission</TableHead>
                          <TableHead>Base Rate</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {rateBreakdown.map((rate) => (
                          <TableRow key={rate.feature}>
                            <TableCell className="font-medium">{rate.feature}</TableCell>
                            <TableCell>{rate.commission}</TableCell>
                            <TableCell>{rate.baseRate}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <Button onClick={handleCommissionSave} className="w-full sm:w-auto">
            <Save className="w-4 h-4 mr-2" />
            Save Commission Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
