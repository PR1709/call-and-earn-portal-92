
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Seller {
  id: number;
  name: string;
  email: string;
  phone: string;
  products: number;
  commission: number;
  status: 'Active' | 'Inactive' | 'Suspended';
  businessName: string;
  gstNumber: string;
  address: string;
}

interface SellerEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  seller: Seller | null;
}

export const SellerEditModal: React.FC<SellerEditModalProps> = ({
  isOpen,
  onClose,
  seller
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    commission: 0,
    status: 'Active' as 'Active' | 'Inactive' | 'Suspended',
    address: '',
    gstNumber: ''
  });

  useEffect(() => {
    if (seller) {
      setFormData({
        name: seller.name,
        email: seller.email,
        phone: seller.phone,
        businessName: seller.businessName,
        commission: seller.commission,
        status: seller.status,
        address: seller.address,
        gstNumber: seller.gstNumber
      });
    }
  }, [seller]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log('Saving seller data:', formData);
    toast({
      title: "Seller Updated",
      description: `${formData.name} has been successfully updated.`,
    });
    onClose();
  };

  const handleCancel = () => {
    if (seller) {
      setFormData({
        name: seller.name,
        email: seller.email,
        phone: seller.phone,
        businessName: seller.businessName,
        commission: seller.commission,
        status: seller.status,
        address: seller.address,
        gstNumber: seller.gstNumber
      });
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={handleCancel}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <DialogTitle className="text-2xl">
              Edit Seller - {seller?.name}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6 overflow-y-auto max-h-[60vh]">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sellerName">Seller Name</Label>
                <Input
                  id="sellerName"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter seller name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  placeholder="Enter business name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter email address"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Enter business address"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gstNumber">GST Number</Label>
              <Input
                id="gstNumber"
                value={formData.gstNumber}
                onChange={(e) => handleInputChange('gstNumber', e.target.value)}
                placeholder="Enter GST number"
              />
            </div>
          </div>

          {/* Business Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Business Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="commission">Commission Percentage (%)</Label>
                <Input
                  id="commission"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.commission}
                  onChange={(e) => handleInputChange('commission', parseFloat(e.target.value) || 0)}
                  placeholder="Enter commission percentage"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Seller Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={handleCancel}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
