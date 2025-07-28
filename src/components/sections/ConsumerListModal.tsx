
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ConsumerDetailModal } from './ConsumerDetailModal';
import { ConsumerTable } from './ConsumerTable';
import { Consumer } from '@/types/Consumer';
import { defaultConsumers } from '@/data/mockConsumers';

interface ConsumerListModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  users?: Consumer[];
}

export const ConsumerListModal: React.FC<ConsumerListModalProps> = ({
  isOpen,
  onClose,
  title,
  users = defaultConsumers
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConsumer, setSelectedConsumer] = useState<Consumer | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleViewConsumer = (consumer: Consumer) => {
    setSelectedConsumer(consumer);
    setIsDetailModalOpen(true);
  };

  const getFilteredConsumers = (tierFilter?: 'Premium' | 'Non-Premium') => {
    let filteredConsumers = [...users];

    if (tierFilter) {
      filteredConsumers = filteredConsumers.filter(consumer => consumer.tier === tierFilter);
    }

    if (searchTerm) {
      filteredConsumers = filteredConsumers.filter(consumer =>
        consumer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        consumer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        consumer.phone.includes(searchTerm)
      );
    }

    return filteredConsumers;
  };

  const allConsumers = getFilteredConsumers();
  const premiumConsumers = getFilteredConsumers('Premium');
  const nonPremiumConsumers = getFilteredConsumers('Non-Premium');

  return (
    <>
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
                  placeholder="Search consumers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All Consumers ({allConsumers.length})</TabsTrigger>
                <TabsTrigger value="premium">Premium ({premiumConsumers.length})</TabsTrigger>
                <TabsTrigger value="non-premium">Non-Premium ({nonPremiumConsumers.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                <ConsumerTable consumers={allConsumers} onViewConsumer={handleViewConsumer} />
              </TabsContent>

              <TabsContent value="premium" className="space-y-4">
                <ConsumerTable consumers={premiumConsumers} onViewConsumer={handleViewConsumer} />
              </TabsContent>

              <TabsContent value="non-premium" className="space-y-4">
                <ConsumerTable consumers={nonPremiumConsumers} onViewConsumer={handleViewConsumer} />
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>

      <ConsumerDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        consumer={selectedConsumer}
      />
    </>
  );
};
