
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, FileText, CreditCard, Eye } from 'lucide-react';

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

interface SearchResultsProps {
  query: string;
  results: SearchResult[];
  onResultClick: (result: SearchResult) => void;
  onClose: () => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  query,
  results,
  onResultClick,
  onClose
}) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'user':
        return <User className="h-4 w-4" />;
      case 'transaction':
        return <CreditCard className="h-4 w-4" />;
      case 'content':
        return <FileText className="h-4 w-4" />;
      case 'withdrawal':
        return <CreditCard className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'user':
        return 'bg-blue-100 text-blue-800';
      case 'transaction':
        return 'bg-green-100 text-green-800';
      case 'content':
        return 'bg-purple-100 text-purple-800';
      case 'withdrawal':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (results.length === 0) {
    return (
      <Card className="absolute top-full left-0 right-0 mt-2 z-50 shadow-lg">
        <CardContent className="p-4">
          <div className="text-center text-muted-foreground">
            <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No results found for "{query}"</p>
            <p className="text-sm">Try searching for users, transactions, or content</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="absolute top-full left-0 right-0 mt-2 z-50 shadow-lg max-h-96 overflow-y-auto">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Search Results for "{query}"</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ×
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          {results.map((result) => (
            <div
              key={result.id}
              className="p-3 hover:bg-muted cursor-pointer border-b border-border last:border-b-0"
              onClick={() => onResultClick(result)}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">{getIcon(result.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm truncate">{result.title}</h4>
                    <Badge variant="secondary" className={`text-xs ${getTypeColor(result.type)}`}>
                      {result.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{result.description}</p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                    {result.amount && (
                      <span className="font-medium">₹{result.amount.toLocaleString()}</span>
                    )}
                    {result.status && (
                      <Badge variant="outline" className="text-xs">
                        {result.status}
                      </Badge>
                    )}
                    {result.date && <span>{result.date}</span>}
                    {result.category && <span>{result.category}</span>}
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">
                  <Eye className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
