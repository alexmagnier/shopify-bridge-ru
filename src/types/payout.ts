// types/payout.ts

export interface Payout {
  id: string;
  partnerId: string;
  
  amount: number;
  currency: 'USDT';
  
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  
  // Детали
  paymentMethod: 'usdt_trc20' | 'usdt_erc20' | 'bank_card';
  paymentDetails: string;         // Адрес кошелька или номер карты
  
  // Транзакция
  transactionId?: string;         // Hash транзакции (для крипты)
  
  // Даты
  requestedAt: Date;
  processedAt?: Date;
  
  // Комментарии
  partnerNote?: string;
  adminNote?: string;
}

export interface PayoutRequest {
  amount: number;
  paymentMethod: 'usdt_trc20' | 'usdt_erc20' | 'bank_card';
  paymentDetails: string;
  partnerNote?: string;
}

export const PAYOUT_STATUS_CONFIG = {
  pending: {
    label: 'Ожидает',
    color: 'yellow',
    icon: '⏳'
  },
  processing: {
    label: 'В обработке',
    color: 'blue',
    icon: '⚙️'
  },
  completed: {
    label: 'Выплачено',
    color: 'green',
    icon: '✅'
  },
  failed: {
    label: 'Ошибка',
    color: 'red',
    icon: '❌'
  },
  cancelled: {
    label: 'Отменено',
    color: 'gray',
    icon: '🚫'
  }
} as const;

export const MIN_PAYOUT_AMOUNT = 50; // $50

