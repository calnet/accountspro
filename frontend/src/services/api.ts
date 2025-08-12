import axios from 'axios';
import { Account, Transaction, DashboardMetrics, AuthTokens } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh/`, {
            refresh: refreshToken,
          });
          
          const { access } = response.data;
          localStorage.setItem('access_token', access);
          
          return api(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
        }
      }
    }
    
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (username: string, password: string): Promise<AuthTokens> => {
    const response = await api.post('/auth/login/', { username, password });
    return response.data;
  },
  
  refresh: async (refreshToken: string): Promise<{ access: string }> => {
    const response = await api.post('/auth/refresh/', { refresh: refreshToken });
    return response.data;
  },
};

// Accounts API
export const accountsAPI = {
  getAll: async (): Promise<Account[]> => {
    const response = await api.get('/accounts/');
    return response.data.results;
  },
  
  getById: async (id: string): Promise<Account> => {
    const response = await api.get(`/accounts/${id}/`);
    return response.data;
  },
  
  create: async (account: Partial<Account>): Promise<Account> => {
    const response = await api.post('/accounts/', account);
    return response.data;
  },
  
  update: async (id: string, account: Partial<Account>): Promise<Account> => {
    const response = await api.patch(`/accounts/${id}/`, account);
    return response.data;
  },
  
  delete: async (id: string): Promise<void> => {
    await api.delete(`/accounts/${id}/`);
  },
  
  getByType: async (): Promise<Record<string, Account[]>> => {
    const response = await api.get('/accounts/by_type/');
    return response.data;
  },
  
  getChartSummary: async (): Promise<any> => {
    const response = await api.get('/accounts/chart_summary/');
    return response.data;
  },
};

// Transactions API
export const transactionsAPI = {
  getAll: async (): Promise<Transaction[]> => {
    const response = await api.get('/transactions/');
    return response.data.results;
  },
  
  getById: async (id: string): Promise<Transaction> => {
    const response = await api.get(`/transactions/${id}/`);
    return response.data;
  },
  
  create: async (transaction: Partial<Transaction>): Promise<Transaction> => {
    const response = await api.post('/transactions/', transaction);
    return response.data;
  },
  
  update: async (id: string, transaction: Partial<Transaction>): Promise<Transaction> => {
    const response = await api.patch(`/transactions/${id}/`, transaction);
    return response.data;
  },
  
  delete: async (id: string): Promise<void> => {
    await api.delete(`/transactions/${id}/`);
  },
  
  post: async (id: string): Promise<void> => {
    await api.post(`/transactions/${id}/post_transaction/`);
  },
  
  cancel: async (id: string): Promise<void> => {
    await api.post(`/transactions/${id}/cancel_transaction/`);
  },
  
  getDashboardMetrics: async (): Promise<DashboardMetrics> => {
    const response = await api.get('/transactions/dashboard_metrics/');
    return response.data;
  },
};