
export interface Consumer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  status: string;
  tier: 'Premium' | 'Non-Premium';
  walletBalance: number;
  totalEarnings: number;
  totalLosses: number;
  averageTimeSpent: string;
  conversionRate: string;
  isActive: boolean;
}
