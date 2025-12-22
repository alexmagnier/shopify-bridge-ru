// types/admin.ts

export interface Admin {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'super_admin';
  lastLoginAt?: Date;
  createdAt: Date;
}

export interface AdminStats {
  // Партнёры
  totalPartners: number;
  activePartners: number;
  newPartnersThisMonth: number;
  pendingApprovalPartners: number;
  
  // Рефералы
  totalReferrals: number;
  convertedReferrals: number;
  pendingReferrals: number;
  conversionRate: number;
  
  // Финансы
  totalCommissionsPaid: number;
  pendingPayouts: number;
  pendingPayoutsCount: number;
  revenueFromReferrals: number;
  
  // Графики
  referralsByMonth: { month: string; count: number }[];
  earningsByMonth: { month: string; amount: number }[];
  topPartners: TopPartner[];
}

export interface TopPartner {
  id: string;
  name: string;
  email: string;
  referrals: number;
  activeReferrals: number;
  earnings: number;
  tier: string;
}

export interface CommissionSettings {
  // Базовая комиссия (применяется ко ВСЕМ платежам клиента)
  baseCommission: number;         // % от каждого платежа клиента
  
  // Уровни партнёров
  tiers: {
    standard: { minReferrals: number; commission: number };
    silver: { minReferrals: number; commission: number };
    gold: { minReferrals: number; commission: number };
    platinum: { minReferrals: number; commission: number };
    master: { minReferrals: number; commission: number };
  };
  
  // Lifetime комиссии (ВСЕГДА ВКЛЮЧЕНЫ)
  lifetimeCommissions: true;      // Комиссия со всех платежей, не только первого
  
  // Минимальная выплата
  minPayoutAmount: number;
  
  // Привязка клиента (БЕССРОЧНАЯ)
  clientBindingPermanent: true;   // Клиент закрепляется за партнёром навсегда
}

export interface ProgramSettings extends CommissionSettings {
  // Email шаблоны
  emailTemplates: {
    welcome: string;
    newReferral: string;
    commissionEarned: string;
    payoutProcessed: string;
    weeklyReport: string;
  };
  
  // Другие настройки
  autoApprovePartners: boolean;
  requireTelegramForPartners: boolean;
}

export interface RecentActivity {
  id: string;
  type: 'partner_registered' | 'referral_paid' | 'payout_requested' | 'new_referral';
  message: string;
  timestamp: Date;
  partnerId?: string;
  referralId?: string;
  payoutId?: string;
}

