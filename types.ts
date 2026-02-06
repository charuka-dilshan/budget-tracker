
export interface Transaction {
  id: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  type: 'expense' | 'income';
  icon: string;
}

export interface Account {
  id: string;
  name: string;
  balance: number;
  lastFour: string;
  color: string;
}

export interface MonthlyData {
  day: string;
  amount: number;
}

export type ThemeColor = 'indigo' | 'emerald' | 'rose' | 'slate';

export enum View {
  DASHBOARD = 'DASHBOARD',
  EXPENSES = 'EXPENSES',
  ACCOUNTS = 'ACCOUNTS',
  AI_ADVISOR = 'AI_ADVISOR',
  SETTINGS = 'SETTINGS'
}
