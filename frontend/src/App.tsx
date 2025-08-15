import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Search, 
  Filter,
  Calendar,
  Download,
  Eye,
  Edit,
  Trash2,
  Home,
  BookOpen,
  CreditCard,
  BarChart3,
  Settings,
  User
} from 'lucide-react';

// Types
interface Account {
  id: string;
  code: string;
  name: string;
  type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
  balance: number;
  parentAccount?: string;
}

interface Transaction {
  id: string;
  date: string;
  reference: string;
  description: string;
  debitAccount: string;
  creditAccount: string;
  amount: number;
  status: 'pending' | 'posted' | 'cancelled';
}

interface DashboardMetrics {
  totalAssets: number;
  totalLiabilities: number;
  totalEquity: number;
  monthlyRevenue: number;
  monthlyExpenses: number;
  netIncome: number;
}

// Sample data
const sampleAccounts: Account[] = [
  { id: '1', code: '1000', name: 'Cash', type: 'asset', balance: 25000 },
  { id: '2', code: '1200', name: 'Accounts Receivable', type: 'asset', balance: 15000 },
  { id: '3', code: '1500', name: 'Equipment', type: 'asset', balance: 50000 },
  { id: '4', code: '2000', name: 'Accounts Payable', type: 'liability', balance: 8000 },
  { id: '5', code: '2100', name: 'Bank Loan', type: 'liability', balance: 20000 },
  { id: '6', code: '3000', name: 'Owner\'s Equity', type: 'equity', balance: 62000 },
  { id: '7', code: '4000', name: 'Sales Revenue', type: 'revenue', balance: 45000 },
  { id: '8', code: '5000', name: 'Office Expenses', type: 'expense', balance: 12000 },
  { id: '9', code: '5100', name: 'Rent Expense', type: 'expense', balance: 8000 }
];

const sampleTransactions: Transaction[] = [
  {
    id: '1',
    date: '2025-01-15',
    reference: 'INV-001',
    description: 'Sales to Customer A',
    debitAccount: '1000',
    creditAccount: '4000',
    amount: 5000,
    status: 'posted'
  },
  {
    id: '2',
    date: '2025-01-14',
    reference: 'RENT-001',
    description: 'Monthly office rent',
    debitAccount: '5100',
    creditAccount: '1000',
    amount: 2000,
    status: 'posted'
  },
  {
    id: '3',
    date: '2025-01-13',
    reference: 'SUP-001',
    description: 'Office supplies purchase',
    debitAccount: '5000',
    creditAccount: '2000',
    amount: 500,
    status: 'pending'
  }
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'accounts' | 'transactions' | 'reports'>('dashboard');
  const [accounts, setAccounts] = useState<Account[]>(sampleAccounts);
  const [transactions, setTransactions] = useState<Transaction[]>(sampleTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewTransactionModal, setShowNewTransactionModal] = useState(false);

  // Calculate dashboard metrics
  const dashboardMetrics: DashboardMetrics = {
    totalAssets: accounts.filter(a => a.type === 'asset').reduce((sum, a) => sum + a.balance, 0),
    totalLiabilities: accounts.filter(a => a.type === 'liability').reduce((sum, a) => sum + a.balance, 0),
    totalEquity: accounts.filter(a => a.type === 'equity').reduce((sum, a) => sum + a.balance, 0),
    monthlyRevenue: accounts.filter(a => a.type === 'revenue').reduce((sum, a) => sum + a.balance, 0),
    monthlyExpenses: accounts.filter(a => a.type === 'expense').reduce((sum, a) => sum + a.balance, 0),
    netIncome: accounts.filter(a => a.type === 'revenue').reduce((sum, a) => sum + a.balance, 0) - 
              accounts.filter(a => a.type === 'expense').reduce((sum, a) => sum + a.balance, 0)
  };

  // Sidebar Navigation
  const Sidebar = () => (
    <div className="w-64 bg-slate-900 text-white h-screen flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold text-green-400">AccountsPro</h1>
        <p className="text-sm text-slate-400">Professional Accounting</p>
      </div>
      
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          <NavItem 
            icon={<Home size={20} />} 
            label="Dashboard" 
            active={currentView === 'dashboard'}
            onClick={() => setCurrentView('dashboard')}
          />
          <NavItem 
            icon={<BookOpen size={20} />} 
            label="Chart of Accounts" 
            active={currentView === 'accounts'}
            onClick={() => setCurrentView('accounts')}
          />
          <NavItem 
            icon={<CreditCard size={20} />} 
            label="Transactions" 
            active={currentView === 'transactions'}
            onClick={() => setCurrentView('transactions')}
          />
          <NavItem 
            icon={<BarChart3 size={20} />} 
            label="Reports" 
            active={currentView === 'reports'}
            onClick={() => setCurrentView('reports')}
          />
        </div>
        
        <div className="mt-8 pt-4 border-t border-slate-700">
          <NavItem icon={<Settings size={20} />} label="Settings" />
          <NavItem icon={<User size={20} />} label="Profile" />
        </div>
      </nav>
    </div>
  );

  const NavItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    onClick?: () => void;
  }> = ({ icon, label, active, onClick }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
        active 
          ? 'bg-green-600 text-white' 
          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  // Dashboard View
  const Dashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Total Assets"
          value={dashboardMetrics.totalAssets}
          icon={<TrendingUp className="text-green-500" />}
          trend="+5.2%"
          trendUp={true}
        />
        <MetricCard
          title="Total Liabilities"
          value={dashboardMetrics.totalLiabilities}
          icon={<TrendingDown className="text-red-500" />}
          trend="-2.1%"
          trendUp={false}
        />
        <MetricCard
          title="Net Income"
          value={dashboardMetrics.netIncome}
          icon={<DollarSign className="text-blue-500" />}
          trend="+12.5%"
          trendUp={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {transactions.slice(0, 5).map(transaction => (
              <div key={transaction.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{transaction.reference}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${transaction.amount.toLocaleString()}</p>
                  <span className={`text-xs px-2 py-1 rounded ${
                    transaction.status === 'posted' ? 'bg-green-100 text-green-800' :
                    transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Account Balances by Type</h3>
          <div className="space-y-4">
            {['asset', 'liability', 'equity', 'revenue', 'expense'].map(type => {
              const total = accounts.filter(a => a.type === type).reduce((sum, a) => sum + a.balance, 0);
              return (
                <div key={type} className="flex justify-between items-center">
                  <span className="capitalize font-medium">{type}s</span>
                  <span className="font-semibold">${total.toLocaleString()}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const MetricCard: React.FC<{
    title: string;
    value: number;
    icon: React.ReactNode;
    trend: string;
    trendUp: boolean;
  }> = ({ title, value, icon, trend, trendUp }) => (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">${value.toLocaleString()}</p>
        </div>
        {icon}
      </div>
      <div className="mt-4 flex items-center">
        <span className={`text-sm font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
          {trend}
        </span>
        <span className="text-sm text-gray-500 ml-2">from last month</span>
      </div>
    </div>
  );

  // Accounts View
  const AccountsView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Chart of Accounts</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700">
          <Plus size={16} />
          <span>New Account</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search accounts..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Filter size={16} />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {accounts
                .filter(account => 
                  account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  account.code.includes(searchTerm)
                )
                .map(account => (
                <tr key={account.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {account.code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {account.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      account.type === 'asset' ? 'bg-blue-100 text-blue-800' :
                      account.type === 'liability' ? 'bg-red-100 text-red-800' :
                      account.type === 'equity' ? 'bg-purple-100 text-purple-800' :
                      account.type === 'revenue' ? 'bg-green-100 text-green-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {account.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium">
                    ${account.balance.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye size={16} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Edit size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Transactions View
  const TransactionsView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Transactions</h2>
        <button 
          onClick={() => setShowNewTransactionModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700"
        >
          <Plus size={16} />
          <span>New Transaction</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Calendar size={16} />
              <span>Date Range</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Filter size={16} />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Accounts</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map(transaction => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transaction.reference}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="space-y-1">
                      <div>Dr: {accounts.find(a => a.id === transaction.debitAccount)?.name}</div>
                      <div>Cr: {accounts.find(a => a.id === transaction.creditAccount)?.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium">
                    ${transaction.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      transaction.status === 'posted' ? 'bg-green-100 text-green-800' :
                      transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye size={16} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Edit size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Reports View
  const ReportsView = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Financial Reports</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ReportCard
          title="Trial Balance"
          description="Summary of all account balances"
          icon={<BarChart3 className="text-blue-500" />}
        />
        <ReportCard
          title="Income Statement"
          description="Revenue and expenses for the period"
          icon={<TrendingUp className="text-green-500" />}
        />
        <ReportCard
          title="Balance Sheet"
          description="Assets, liabilities, and equity snapshot"
          icon={<DollarSign className="text-purple-500" />}
        />
        <ReportCard
          title="Cash Flow Statement"
          description="Cash inflows and outflows"
          icon={<TrendingDown className="text-orange-500" />}
        />
        <ReportCard
          title="Aged Receivables"
          description="Outstanding customer invoices by age"
          icon={<Calendar className="text-red-500" />}
        />
        <ReportCard
          title="Aged Payables"
          description="Outstanding supplier bills by age"
          icon={<CreditCard className="text-indigo-500" />}
        />
      </div>
    </div>
  );

  const ReportCard: React.FC<{
    title: string;
    description: string;
    icon: React.ReactNode;
  }> = ({ title, description, icon }) => (
    <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-gray-100 rounded-lg">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
        <Download size={20} className="text-gray-400" />
      </div>
    </div>
  );

  // New Transaction Modal
  const NewTransactionModal = () => {
    const [formData, setFormData] = useState({
      date: new Date().toISOString().split('T')[0],
      reference: '',
      description: '',
      debitAccount: '',
      creditAccount: '',
      amount: ''
    });

    const handleSubmit = () => {
      if (!formData.date || !formData.reference || !formData.description || !formData.debitAccount || !formData.creditAccount || !formData.amount) {
        return;
      }
      const newTransaction: Transaction = {
        id: (transactions.length + 1).toString(),
        ...formData,
        amount: parseFloat(formData.amount),
        status: 'pending'
      };
      setTransactions([...transactions, newTransaction]);
      setShowNewTransactionModal(false);
      setFormData({
        date: new Date().toISOString().split('T')[0],
        reference: '',
        description: '',
        debitAccount: '',
        creditAccount: '',
        amount: ''
      });
    };

    if (!showNewTransactionModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4">New Transaction</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                className="w-full border rounded-lg px-3 py-2"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reference</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2"
                value={formData.reference}
                onChange={(e) => setFormData({...formData, reference: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Debit Account</label>
              <select
                className="w-full border rounded-lg px-3 py-2"
                value={formData.debitAccount}
                onChange={(e) => setFormData({...formData, debitAccount: e.target.value})}
                required
              >
                <option value="">Select account...</option>
                {accounts.map(account => (
                  <option key={account.id} value={account.id}>
                    {account.code} - {account.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Credit Account</label>
              <select
                className="w-full border rounded-lg px-3 py-2"
                value={formData.creditAccount}
                onChange={(e) => setFormData({...formData, creditAccount: e.target.value})}
                required
              >
                <option value="">Select account...</option>
                {accounts.map(account => (
                  <option key={account.id} value={account.id}>
                    {account.code} - {account.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <input
                type="number"
                step="0.01"
                className="w-full border rounded-lg px-3 py-2"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                required
              />
            </div>
            <div className="flex space-x-3 pt-4">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                Create Transaction
              </button>
              <button
                onClick={() => setShowNewTransactionModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {currentView === 'dashboard' && 'Dashboard'}
                {currentView === 'accounts' && 'Chart of Accounts'}
                {currentView === 'transactions' && 'Transactions'}
                {currentView === 'reports' && 'Reports'}
              </h1>
              <p className="text-sm text-gray-500">
                {currentView === 'dashboard' && 'Welcome back! Here\'s your financial overview.'}
                {currentView === 'accounts' && 'Manage your chart of accounts'}
                {currentView === 'transactions' && 'Record and manage transactions'}
                {currentView === 'reports' && 'Generate financial reports'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
                Export
              </button>
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {currentView === 'dashboard' && <Dashboard />}
          {currentView === 'accounts' && <AccountsView />}
          {currentView === 'transactions' && <TransactionsView />}
          {currentView === 'reports' && <ReportsView />}
        </main>
      </div>

      <NewTransactionModal />
    </div>
  );
};

export default App;