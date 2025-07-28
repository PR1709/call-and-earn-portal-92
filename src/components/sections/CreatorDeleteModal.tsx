
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash2, AlertTriangle } from 'lucide-react';

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

interface CreatorDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  creator: Creator | null;
}

export const CreatorDeleteModal: React.FC<CreatorDeleteModalProps> = ({
  isOpen,
  onClose,
  creator
}) => {
  const handleDelete = () => {
    console.log('Deleting creator:', creator?.id);
    // Here you would typically make an API call to delete the creator
    onClose();
  };

  if (!creator) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onClose}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <DialogTitle className="text-2xl">Delete Creator</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex items-center gap-4 p-4 bg-red-50 rounded-lg border border-red-200">
            <AlertTriangle className="h-8 w-8 text-red-600" />
            <div>
              <h3 className="font-semibold text-red-800">Warning</h3>
              <p className="text-sm text-red-700">This action cannot be undone.</p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-gray-700">
              Are you sure you want to delete the creator <span className="font-semibold">{creator.name}</span>?
            </p>
            <div className="bg-gray-50 p-3 rounded-lg space-y-1">
              <p className="text-sm"><span className="font-medium">Email:</span> {creator.email}</p>
              <p className="text-sm"><span className="font-medium">Phone:</span> {creator.phone}</p>
              <p className="text-sm"><span className="font-medium">Followers:</span> {creator.followers.toLocaleString()}</p>
              <p className="text-sm"><span className="font-medium">Videos:</span> {creator.videosPosted}</p>
              <p className="text-sm"><span className="font-medium">Earnings:</span> ₹{creator.earnings.toLocaleString()}</p>
            </div>
            <p className="text-sm text-gray-600">
              Deleting this creator will remove all their data, including videos, earnings history, and follower information.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete Creator
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
