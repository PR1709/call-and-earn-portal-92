import React, { useState, useRef, useEffect } from 'react';
import { Search, User, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NotificationsDropdown } from './NotificationsDropdown';
import { SearchResults } from './SearchResults';
import { useSearch } from '@/hooks/useSearch';

interface HeaderProps {
  onProfileClick?: () => void;
  onSearchResultClick?: (result: any) => void;
}

export const Header: React.FC<HeaderProps> = ({ onProfileClick, onSearchResultClick }) => {
  const {
    query,
    searchResults,
    isSearching,
    showResults,
    handleSearch,
    clearSearch,
    handleResultClick,
    setShowResults
  } = useSearch(onSearchResultClick);

  const [searchValue, setSearchValue] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside to close search results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowResults]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    handleSearch(value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      handleSearch(searchValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowResults(false);
      setSearchValue('');
      clearSearch();
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-4 flex-1">
        <div className="relative max-w-md w-full" ref={searchRef}>
          <form onSubmit={handleSearchSubmit}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search users, transactions, content..."
              className="pl-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
              value={searchValue}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
            />
          </form>
          
          {showResults && (
            <SearchResults
              query={query}
              results={searchResults}
              onResultClick={handleResultClick}
              onClose={() => {
                setShowResults(false);
                setSearchValue('');
                clearSearch();
              }}
            />
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <NotificationsDropdown />
        
        <div 
          className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
          onClick={onProfileClick}
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face" />
            <AvatarFallback className="bg-green-500 text-white">JD</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">John</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
