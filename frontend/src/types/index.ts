export interface Account {
  id: string;
  code: string;
  name: string;
  account_type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
  parent_account?: string;
  parent_account_name?: string;
  is_active: boolean;
  description: string;
  balance: number;
  created_at: string;
  updated_at: string;
}

export interface TransactionEntry {
  id?: string;
  account: string;
  account_code?: string;
  account_name?: string;
  entry_type: 'debit' | 'credit';
  amount: number;
  description?: string;
}

export interface Transaction {
  id: string;
  reference: string;
  date: string;
  description: string;
  status: 'draft' | 'pending' | 'posted' | 'cancelled';
  total_amount: number;
  entries: TransactionEntry[];
  created_by_username?: string;
  posted_by_username?: string;
  created_at: string;
  updated_at: string;
  posted_at?: string;
}

export interface DashboardMetrics {
  total_assets: number;
  total_liabilities: number;
  total_equity: number;
  total_revenues: number;
  total_expenses: number;
  net_income: number;
  recent_transactions: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}