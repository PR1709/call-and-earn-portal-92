
import { useState, useEffect, useMemo } from 'react';

interface SearchResult {
  id: string;
  type: 'user' | 'transaction' | 'content' | 'withdrawal';
  title: string;
  description: string;
  status?: string;
  amount?: number;
  date?: string;
  category?: string;
}

// Mock data for search results
const mockData = {
  users: [
    { id: 'user-1', name: 'Rahul Sharma', email: 'rahul@example.com', phone: '+91 98765 43210', status: 'Active', type: 'Consumer' },
    { id: 'user-2', name: 'Priya Patel', email: 'priya@example.com', phone: '+91 87654 32109', status: 'Active', type: 'Creator' },
    { id: 'user-3', name: 'Amit Kumar', email: 'amit@example.com', phone: '+91 76543 21098', status: 'Blocked', type: 'Consumer' },
    { id: 'user-4', name: 'FunnyGuy123', email: 'funnyguy123@creator.com', phone: '+91 9876543210', status: 'Active', type: 'Creator' },
    { id: 'user-5', name: 'ChefMaster', email: 'chefmaster@creator.com', phone: '+91 9876543211', status: 'Active', type: 'Creator' },
  ],
  transactions: [
    { id: 'tx-1', user: 'Rahul Sharma', type: 'Game Win', amount: 150, date: '2024-06-08', status: 'Completed' },
    { id: 'tx-2', user: 'Priya Patel', type: 'Video View', amount: 25, date: '2024-06-08', status: 'Completed' },
    { id: 'tx-3', user: 'Amit Kumar', type: 'Admin Deduction', amount: 100, date: '2024-06-07', status: 'Completed' },
    { id: 'tx-4', user: 'Sneha Singh', type: 'Call Earning', amount: 75, date: '2024-06-07', status: 'Completed' },
    { id: 'tx-5', user: 'Vikash Yadav', type: 'Top-up', amount: 500, date: '2024-06-06', status: 'Completed' },
  ],
  withdrawals: [
    { id: 'wd-1', user: 'Rahul Sharma', amount: 2500, status: 'Pending', date: '2024-06-08', phone: '+91 98765 43210' },
    { id: 'wd-2', user: 'Priya Patel', amount: 1800, status: 'Approved', date: '2024-06-07', phone: '+91 87654 32109' },
    { id: 'wd-3', user: 'Amit Kumar', amount: 5000, status: 'Rejected', date: '2024-06-07', phone: '+91 76543 21098' },
  ],
  content: [
    { id: 'content-1', title: 'Comedy Video #45', creator: 'FunnyGuy123', category: 'Comedy', status: 'Approved', views: 25000 },
    { id: 'content-2', title: 'Cooking Tutorial', creator: 'ChefMaster', category: 'Cooking', status: 'Under Review', views: 12000 },
    { id: 'content-3', title: 'Tech Review', creator: 'TechBro', category: 'Technology', status: 'Flagged', views: 8500 },
  ]
};

export const useSearch = (onResultClick?: (result: SearchResult) => void) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const results: SearchResult[] = [];
    const searchTerm = query.toLowerCase();

    // Search users
    mockData.users.forEach(user => {
      if (
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.phone.includes(searchTerm) ||
        user.status.toLowerCase().includes(searchTerm) ||
        user.type.toLowerCase().includes(searchTerm)
      ) {
        results.push({
          id: user.id,
          type: 'user',
          title: user.name,
          description: `${user.type} • ${user.email}`,
          status: user.status,
          category: user.type
        });
      }
    });

    // Search transactions
    mockData.transactions.forEach(transaction => {
      if (
        transaction.user.toLowerCase().includes(searchTerm) ||
        transaction.type.toLowerCase().includes(searchTerm) ||
        transaction.status.toLowerCase().includes(searchTerm) ||
        transaction.id.toLowerCase().includes(searchTerm)
      ) {
        results.push({
          id: transaction.id,
          type: 'transaction',
          title: `${transaction.type} - ${transaction.user}`,
          description: `Transaction ID: ${transaction.id}`,
          status: transaction.status,
          amount: transaction.amount,
          date: transaction.date
        });
      }
    });

    // Search withdrawals
    mockData.withdrawals.forEach(withdrawal => {
      if (
        withdrawal.user.toLowerCase().includes(searchTerm) ||
        withdrawal.status.toLowerCase().includes(searchTerm) ||
        withdrawal.phone.includes(searchTerm) ||
        withdrawal.id.toLowerCase().includes(searchTerm)
      ) {
        results.push({
          id: withdrawal.id,
          type: 'withdrawal',
          title: `Withdrawal - ${withdrawal.user}`,
          description: `Withdrawal request for ₹${withdrawal.amount}`,
          status: withdrawal.status,
          amount: withdrawal.amount,
          date: withdrawal.date
        });
      }
    });

    // Search content
    mockData.content.forEach(content => {
      if (
        content.title.toLowerCase().includes(searchTerm) ||
        content.creator.toLowerCase().includes(searchTerm) ||
        content.category.toLowerCase().includes(searchTerm) ||
        content.status.toLowerCase().includes(searchTerm)
      ) {
        results.push({
          id: content.id,
          type: 'content',
          title: content.title,
          description: `By ${content.creator} • ${content.views.toLocaleString()} views`,
          status: content.status,
          category: content.category
        });
      }
    });

    return results.slice(0, 10); // Limit to 10 results
  }, [query]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.trim()) {
      setIsSearching(true);
      setShowResults(true);
      // Simulate search delay
      setTimeout(() => {
        setIsSearching(false);
      }, 300);
    } else {
      setShowResults(false);
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setShowResults(false);
    setIsSearching(false);
  };

  const handleResultClick = (result: SearchResult) => {
    console.log('Search result clicked:', result);
    setShowResults(false);
    
    // For user results, navigate to the user profile page
    if (result.type === 'user') {
      window.location.href = `/user/${result.id}`;
      return;
    }
    
    // Call the provided callback if available for other result types
    if (onResultClick) {
      onResultClick(result);
    }
  };

  return {
    query,
    searchResults,
    isSearching,
    showResults,
    handleSearch,
    clearSearch,
    handleResultClick,
    setShowResults
  };
};
