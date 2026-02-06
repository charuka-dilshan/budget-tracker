
import React from 'react';
import { Home, Coffee, Gift, Music, Car, ShoppingBag, Utensils, UtensilsCrossed, MoreHorizontal } from 'lucide-react';
import { Transaction, Account, MonthlyData } from './types';

export const MOCK_ACCOUNTS: Account[] = [
  { id: '1', name: 'Main Debit', balance: 4893.90, lastFour: '4848', color: '#3D5AFE' },
  { id: '2', name: 'Savings', balance: 12500.00, lastFour: '1290', color: '#10B981' },
];

export const MOCK_CHART_DATA: MonthlyData[] = [
  { day: 'Mon', amount: 0 },
  { day: 'Tue', amount: 0 },
  { day: 'Wed', amount: 0 },
  { day: 'Thu', amount: 0 },
  { day: 'Fri', amount: 0 },
  { day: 'Sat', amount: 0 },
  { day: 'Sun', amount: 0 },
];

export const getIcon = (iconName: string) => {
  const props = { size: 20, className: "text-slate-600" };
  switch (iconName) {
    case 'home': return <Home {...props} />;
    case 'breakfast':
    case 'coffee': return <Coffee {...props} />;
    case 'lunch': return <Utensils {...props} />;
    case 'dinner': return <UtensilsCrossed {...props} />;
    case 'gift': return <Gift {...props} />;
    case 'music': return <Music {...props} />;
    case 'car': return <Car {...props} />;
    case 'shopping-bag': return <ShoppingBag {...props} />;
    case 'other-things':
    case 'more-horizontal': return <MoreHorizontal {...props} />;
    default: return <ShoppingBag {...props} />;
  }
};
