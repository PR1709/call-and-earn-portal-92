
import React from 'react';
import { 
  Home, 
  Users, 
  Video, 
  ShoppingBag, 
  PlayCircle, 
  Wallet, 
  CreditCard, 
  Phone, 
  Gamepad2, 
  MessageSquare, 
  BarChart3, 
  Shield, 
  Settings,
  ChevronDown,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isCollapsed: boolean;
  onToggle: () => void;
}

const menuItems = [
  { id: 'dashboard', icon: Home, label: 'Dashboard' },
  { id: 'users', icon: Users, label: 'Users' },
  { id: 'creators', icon: Video, label: 'Content Creators' },
  { id: 'sellers', icon: ShoppingBag, label: 'Sellers' },
  { id: 'video-ads', icon: PlayCircle, label: 'Video Ads' },
  { id: 'wallet', icon: Wallet, label: 'Wallet & Earnings' },
  { id: 'withdrawals', icon: CreditCard, label: 'Withdrawals' },
  { id: 'tip-call', icon: Phone, label: 'TipCall' },
  { id: 'pay-ludo', icon: Gamepad2, label: 'Pay Ludo' },
  { id: 'support', icon: MessageSquare, label: 'Complaints & Support' },
  { id: 'analytics', icon: BarChart3, label: 'Analytics & Reports' },
  { id: 'admin-roles', icon: Shield, label: 'Admin Roles' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  onSectionChange, 
  isCollapsed, 
  onToggle 
}) => {
  return (
    <div className={cn(
      "bg-card border-r border-border h-screen transition-all duration-300 flex flex-col",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 border-b border-border flex items-center justify-between">
        {!isCollapsed && (
          <h1 className="text-xl font-bold text-foreground">Analytics Dashboard</h1>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="h-8 w-8"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>
      
      <nav className="flex-1 p-2 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start text-left",
                isCollapsed ? "px-2" : "px-3"
              )}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon className="h-4 w-4" />
              {!isCollapsed && <span className="ml-2">{item.label}</span>}
            </Button>
          );
        })}
      </nav>
    </div>
  );
};
