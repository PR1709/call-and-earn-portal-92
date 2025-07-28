
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Bell, Package, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Seller {
  id: number;
  name: string;
  email: string;
}

interface SellerSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  seller: Seller | null;
}

export const SellerSettingsModal: React.FC<SellerSettingsModalProps> = ({
  isOpen,
  onClose,
  seller
}) => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    promotionalEmails: true,
    lowStockAlerts: true,
    orderNotifications: true,
    promotionsEnabled: true,
    featuredListings: false,
    analyticsAccess: true,
    bulkUpload: true,
    advancedReporting: false
  });

  const handleSettingChange = (setting: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleSaveSettings = () => {
    console.log('Saving seller settings:', settings);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onClose}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <DialogTitle className="text-2xl">
              Settings for {seller?.name}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6 overflow-y-auto">
          {/* Notification Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="smsNotifications">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive urgent notifications via SMS</p>
                </div>
                <Switch
                  id="smsNotifications"
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked) => handleSettingChange('smsNotifications', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="lowStockAlerts">Low Stock Alerts</Label>
                  <p className="text-sm text-muted-foreground">Get notified when products are low in stock</p>
                </div>
                <Switch
                  id="lowStockAlerts"
                  checked={settings.lowStockAlerts}
                  onCheckedChange={(checked) => handleSettingChange('lowStockAlerts', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="orderNotifications">Order Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications for new orders</p>
                </div>
                <Switch
                  id="orderNotifications"
                  checked={settings.orderNotifications}
                  onCheckedChange={(checked) => handleSettingChange('orderNotifications', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Alert Thresholds */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Alert Thresholds
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Low Stock Threshold</Label>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">5 items</Badge>
                    <span className="text-sm text-muted-foreground">Current setting</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>High Value Order Alert</Label>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">₹10,000</Badge>
                    <span className="text-sm text-muted-foreground">Current setting</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seller Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Seller Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="promotionsEnabled">Enable Promotions</Label>
                  <p className="text-sm text-muted-foreground">Allow seller to create promotional campaigns</p>
                </div>
                <Switch
                  id="promotionsEnabled"
                  checked={settings.promotionsEnabled}
                  onCheckedChange={(checked) => handleSettingChange('promotionsEnabled', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="featuredListings">Featured Listings</Label>
                  <p className="text-sm text-muted-foreground">Enable featured product listings</p>
                </div>
                <Switch
                  id="featuredListings"
                  checked={settings.featuredListings}
                  onCheckedChange={(checked) => handleSettingChange('featuredListings', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="analyticsAccess">Analytics Access</Label>
                  <p className="text-sm text-muted-foreground">Provide access to detailed analytics</p>
                </div>
                <Switch
                  id="analyticsAccess"
                  checked={settings.analyticsAccess}
                  onCheckedChange={(checked) => handleSettingChange('analyticsAccess', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="bulkUpload">Bulk Upload</Label>
                  <p className="text-sm text-muted-foreground">Allow bulk product uploads</p>
                </div>
                <Switch
                  id="bulkUpload"
                  checked={settings.bulkUpload}
                  onCheckedChange={(checked) => handleSettingChange('bulkUpload', checked)}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSaveSettings} className="bg-green-500 hover:bg-green-600">
              Save Settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
