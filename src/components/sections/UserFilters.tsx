
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

interface UserFiltersProps {
  searchTerm: string;
  typeFilter: string;
  statusFilter: string;
  lastActiveFilter?: string;
  onSearchChange: (value: string) => void;
  onTypeFilterChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onLastActiveFilterChange?: (value: string) => void;
}

export const UserFilters: React.FC<UserFiltersProps> = ({
  searchTerm,
  typeFilter,
  statusFilter,
  lastActiveFilter = 'all',
  onSearchChange,
  onTypeFilterChange,
  onStatusFilterChange,
  onLastActiveFilterChange
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 w-full sm:w-64"
        />
      </div>
      <Select value={typeFilter} onValueChange={onTypeFilterChange}>
        <SelectTrigger className="w-full sm:w-32">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="consumer">Consumer</SelectItem>
          <SelectItem value="creator">Creator</SelectItem>
          <SelectItem value="seller">Seller</SelectItem>
        </SelectContent>
      </Select>
      <Select value={statusFilter} onValueChange={onStatusFilterChange}>
        <SelectTrigger className="w-full sm:w-32">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
          <SelectItem value="suspended">Suspended</SelectItem>
        </SelectContent>
      </Select>
      {onLastActiveFilterChange && (
        <Select value={lastActiveFilter} onValueChange={onLastActiveFilterChange}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Last Active" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Activity</SelectItem>
            <SelectItem value="now">Active Now</SelectItem>
            <SelectItem value="24h">Last 24 Hours</SelectItem>
            <SelectItem value="7d">Last 7 Days</SelectItem>
            <SelectItem value="30d">Last 30 Days</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      )}
    </div>
  );
};
