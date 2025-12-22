// types/index.ts - Централизованный экспорт всех типов

export * from './partner';
export * from './referral';
export * from './payout';
export * from './admin';

// Общие типы
export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface SelectOption {
  value: string;
  label: string;
}

