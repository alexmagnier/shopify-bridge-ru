// pages/partners/dashboard.tsx

import React from 'react';
import { PartnerHeader } from '@/components/layout/PartnerHeader';
import { StatsCards } from '@/components/partners/dashboard/StatsCards';
import { ReferralLink } from '@/components/partners/dashboard/ReferralLink';
import { RecentReferrals } from '@/components/partners/dashboard/RecentReferrals';
import { EarningsChart } from '@/components/partners/dashboard/EarningsChart';
import { TierProgress } from '@/components/partners/dashboard/TierProgress';

// TODO: Replace with real data from API
const MOCK_PARTNER = {
  firstName: 'Иван',
  referralCode: 'IVAIVA2847',
  referralLink: 'https://shopifybridge.ru/?ref=IVAIVA2847',
  tier: 'gold' as const,
  activeReferrals: 22,
};

const MOCK_STATS = {
  activeClients: 10,
  activeClientsChange: 2,
  quarterCommissions: 1125,
  quarterCommissionsChange: 18,
  totalEarnings: 4495,
  nextQuarterProjected: 675,
};

const MOCK_REFERRALS = [
  {
    id: '1',
    partnerId: '1',
    name: 'Алексей К.',
    email: 'alexey@example.com',
    status: 'active' as const,
    clickedAt: new Date('2024-01-15'),
    registeredAt: new Date('2024-01-16'),
    paidAt: new Date('2024-01-20'),
    lastPaymentAt: new Date('2024-12-15'),
    source: 'link' as const,
    commissionEarned: 517.5,
    totalPayments: 5,
    lifetimeValue: 3450,
    planSelected: 'growth' as const,
    lifetimeBinding: true as const,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-12-15'),
  },
  {
    id: '2',
    partnerId: '1',
    name: 'Елена В.',
    email: 'elena@example.com',
    status: 'active' as const,
    clickedAt: new Date('2024-02-10'),
    registeredAt: new Date('2024-02-11'),
    paidAt: new Date('2024-02-15'),
    lastPaymentAt: new Date('2024-12-10'),
    source: 'link' as const,
    commissionEarned: 622.5,
    totalPayments: 3,
    lifetimeValue: 4150,
    planSelected: 'business' as const,
    lifetimeBinding: true as const,
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-12-10'),
  },
  {
    id: '3',
    partnerId: '1',
    name: 'Пётр М.',
    email: 'petr@example.com',
    status: 'paid' as const,
    clickedAt: new Date('2024-12-18'),
    registeredAt: new Date('2024-12-19'),
    paidAt: new Date('2024-12-20'),
    source: 'link' as const,
    commissionEarned: 180,
    totalPayments: 1,
    lifetimeValue: 1200,
    planSelected: 'growth' as const,
    lifetimeBinding: true as const,
    createdAt: new Date('2024-12-18'),
    updatedAt: new Date('2024-12-20'),
  },
];

const MOCK_EARNINGS_DATA = [
  { month: 'Q1', amount: 450 },
  { month: 'Q2', amount: 890 },
  { month: 'Q3', amount: 1230 },
  { month: 'Q4', amount: 1125 },
];

const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <PartnerHeader partnerName={MOCK_PARTNER.firstName} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Приветствие */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            👋 Добро пожаловать, {MOCK_PARTNER.firstName}!
          </h1>
          <p className="text-gray-600">
            Вот обзор вашей партнёрской активности
          </p>
        </div>
        
        {/* Статистика */}
        <div className="mb-8">
          <StatsCards stats={MOCK_STATS} />
        </div>
        
        {/* Основной контент: 2 колонки */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Левая колонка (2/3) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Реферальная ссылка */}
            <ReferralLink 
              referralCode={MOCK_PARTNER.referralCode}
              referralLink={MOCK_PARTNER.referralLink}
            />
            
            {/* Последние рефералы */}
            <RecentReferrals referrals={MOCK_REFERRALS} />
            
            {/* График дохода */}
            <EarningsChart data={MOCK_EARNINGS_DATA} />
          </div>
          
          {/* Правая колонка (1/3) */}
          <div className="space-y-8">
            {/* Прогресс уровня */}
            <TierProgress 
              currentTier={MOCK_PARTNER.tier}
              activeReferrals={MOCK_PARTNER.activeReferrals}
            />
          </div>
        </div>
        
        {/* Информационный блок */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="text-4xl">💡</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Как увеличить доход?
              </h3>
              <ul className="space-y-1 text-gray-700 text-sm">
                <li>• Делитесь ссылкой в чатах селлеров и соцсетях</li>
                <li>• Используйте промо-материалы из раздела "Материалы"</li>
                <li>• Приведите больше клиентов для повышения уровня и % комиссии</li>
                <li>• Помните: каждый клиент приносит доход годами!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

