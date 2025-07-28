
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';

interface Creator {
  id: number;
  name: string;
  email: string;
  phone: string;
  followers: number;
  videosPosted: number;
  earnings: number;
  joinDate: string;
  status: 'Active' | 'Inactive' | 'Suspended';
}

interface CreatorEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  creator: Creator | null;
}

export const CreatorEditModal: React.FC<CreatorEditModalProps> = ({
  isOpen,
  onClose,
  creator
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'Active' as 'Active' | 'Inactive' | 'Suspended'
  });

  useEffect(() => {
    if (creator) {
      setFormData({
        name: creator.name,
        email: creator.email,
        phone: creator.phone,
        status: creator.status
      });
    }
  }, [creator]);

  const handleSave = () => {
    console.log('Saving creator settings:', formData);
    // Here you would typically make an API call to update the creator
    onClose();
  };

  if (!creator) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onClose}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <DialogTitle className="text-2xl">Edit Creator Settings</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Creator Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter creator name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email address"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Enter phone number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value: 'Active' | 'Inactive' | 'Suspended') => 
                  setFormData({ ...formData, status: value })
                }
              >
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Followers</Label>
              <Input 
                value={creator.followers.toLocaleString()} 
                disabled 
                className="bg-gray-100"
              />
            </div>
            <div className="space-y-2">
              <Label>Videos Posted</Label>
              <Input 
                value={creator.videosPosted.toLocaleString()} 
                disabled 
                className="bg-gray-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Total Earnings</Label>
              <Input 
                value={`₹${creator.earnings.toLocaleString()}`} 
                disabled 
                className="bg-gray-100"
              />
            </div>
            <div className="space-y-2">
              <Label>Join Date</Label>
              <Input 
                value={creator.joinDate} 
                disabled 
                className="bg-gray-100"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
