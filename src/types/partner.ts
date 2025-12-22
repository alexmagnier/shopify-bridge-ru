// types/partner.ts

export interface Partner {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  telegram?: string;
  
  // Реферальная информация
  referralCode: string;           // Уникальный код: "IVAN2024"
  referralLink: string;           // Полная ссылка: "shopifybridge.ru/?ref=IVAN2024"
  
  // Статус
  status: 'pending' | 'active' | 'suspended' | 'blocked';
  tier: 'standard' | 'silver' | 'gold' | 'platinum' | 'master';
  
  // Финансы
  totalEarnings: number;          // Всего заработано
  pendingBalance: number;         // Ожидает выплаты
  paidOut: number;                // Выплачено
  
  // Статистика
  totalReferrals: number;         // Всего приведено людей
  activeReferrals: number;        // Активные (оплатили)
  conversionRate: number;         // Конверсия в %
  
  // Выплаты
  paymentMethod?: 'usdt_trc20' | 'usdt_erc20' | 'bank_card';
  paymentDetails?: {
    wallet?: string;
    cardNumber?: string;
    cardHolder?: string;
  };
  
  // Мета
  registeredAt: Date;
  lastLoginAt?: Date;
  referredBy?: string;            // ID партнёра, который привёл этого партнёра
  
  // Настройки
  notifications: {
    newReferral: boolean;
    referralPaid: boolean;
    payoutProcessed: boolean;
    weeklyReport: boolean;
  };
}

export interface PartnerStats {
  // Клики и конверсии
  clicks: number;
  clicksChange: number;
  registrations: number;
  registrationsChange: number;
  payments: number;
  paymentsChange: number;
  
  // Финансы
  earnings: number;
  earningsChange: number;
  quarterlyEarnings: number;
  projectedQuarterly: number;
  
  // Графики
  earningsByMonth: { month: string; amount: number }[];
  referralsByStatus: { status: string; count: number }[];
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  telegram: string;
  password: string;
  confirmPassword: string;
  heardFrom?: string;
  agreeToTerms: boolean;
  agreeToNotifications: boolean;
}

export interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const TIER_CONFIG = {
  standard: {
    name: 'Стандарт',
    icon: '🥉',
    minReferrals: 0,
    commission: 10,
    color: '#9CA3AF'
  },
  silver: {
    name: 'Серебро',
    icon: '🥈',
    minReferrals: 5,
    commission: 12,
    color: '#C0C0C0'
  },
  gold: {
    name: 'Золото',
    icon: '🥇',
    minReferrals: 15,
    commission: 15,
    color: '#FFD700'
  },
  platinum: {
    name: 'Платина',
    icon: '💎',
    minReferrals: 30,
    commission: 18,
    color: '#E5E4E2'
  },
  master: {
    name: 'Мастер',
    icon: '👑',
    minReferrals: 50,
    commission: 20,
    color: '#B9F2FF'
  }
} as const;

