// types/referral.ts

export interface Referral {
  id: string;
  partnerId: string;              // Кто привёл
  
  // Данные реферала
  name: string;
  email: string;
  phone?: string;
  
  // Воронка конверсии
  status: 'clicked' | 'registered' | 'contacted' | 'paid' | 'active' | 'churned';
  
  // Отслеживание
  clickedAt: Date;
  registeredAt?: Date;
  contactedAt?: Date;
  paidAt?: Date;                  // Дата первого платежа
  lastPaymentAt?: Date;           // Дата последнего платежа
  
  // Источник
  source: 'link' | 'promo_code' | 'manual';
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  
  // Финансы (LIFETIME)
  orderValue?: number;            // Сумма первого заказа
  commissionEarned: number;       // ОБЩАЯ сумма заработанных комиссий (с всех платежей)
  totalPayments: number;          // Количество платежей клиента
  lifetimeValue: number;          // Общая сумма всех платежей клиента (LTV)
  
  // Услуга
  planSelected?: 'testing' | 'starter' | 'growth' | 'business';
  
  // Привязка (БЕССРОЧНАЯ)
  lifetimeBinding: true;          // Клиент закреплён за партнёром навсегда
  
  // Примечания (для админа)
  notes?: string;
  
  // Мета
  createdAt: Date;
  updatedAt: Date;
}

export interface ReferralFilters {
  status?: Referral['status'];
  period?: 'week' | 'month' | 'quarter' | 'year' | 'all';
  search?: string;
}

export interface ReferralStats {
  // Воронка
  clicks: number;
  registered: number;
  contacted: number;
  paid: number;
  active: number;
  
  // Конверсии
  clickToRegister: number;
  registerToContact: number;
  contactToPaid: number;
  paidToActive: number;
  
  // Финансы
  totalCommissions: number;
  thisQuarterCommissions: number;
  allTimeEarnings: number;
}

export const REFERRAL_STATUS_CONFIG = {
  clicked: {
    label: 'Кликнул',
    icon: '👁',
    color: 'gray',
    description: 'Перешёл по ссылке, но не зарегистрировался'
  },
  registered: {
    label: 'Зарегистрировался',
    icon: '📝',
    color: 'blue',
    description: 'Заполнил форму заявки'
  },
  contacted: {
    label: 'На связи',
    icon: '📞',
    color: 'yellow',
    description: 'Менеджер связался с клиентом'
  },
  paid: {
    label: 'Оплатил',
    icon: '✅',
    color: 'green',
    description: 'Клиент оплатил услугу'
  },
  active: {
    label: 'Активный',
    icon: '🟢',
    color: 'green',
    description: 'Клиент активно пользуется сервисом'
  },
  churned: {
    label: 'Ушёл',
    icon: '🔴',
    color: 'red',
    description: 'Клиент отказался от услуг'
  }
} as const;

export interface CommissionRecord {
  id: string;
  partnerId: string;
  referralId: string;
  
  paymentId: string;              // ID платежа в платёжной системе
  paymentAmount: number;          // Сумма платежа клиента
  commissionAmount: number;       // Сумма комиссии партнёру
  commissionRate: number;         // Ставка комиссии на момент платежа
  
  paymentType: 'setup' | 'maintenance'; // запуск или обслуживание
  
  status: 'pending' | 'approved' | 'paid';
  
  createdAt: Date;
}

