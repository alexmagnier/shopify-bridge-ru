// pages/partners/referrals.tsx

import React, { useState } from 'react';
import { PartnerHeader } from '@/components/layout/PartnerHeader';
import { ReferralFilters } from '@/components/partners/referrals/ReferralFilters';
import { ReferralStats } from '@/components/partners/referrals/ReferralStats';
import { ReferralsList } from '@/components/partners/referrals/ReferralsList';
import { ReferralFilters as FiltersType, Referral } from '@/types';

// TODO: Replace with real data from API
const MOCK_REFERRALS: Referral[] = [
  {
    id: '1',
    partnerId: '1',
    name: 'Алексей К.',
    email: 'alexey@example.com',
    status: 'active',
    clickedAt: new Date('2024-01-15'),
    registeredAt: new Date('2024-01-16'),
    paidAt: new Date('2024-01-20'),
    lastPaymentAt: new Date('2024-12-15'),
    source: 'link',
    commissionEarned: 517.5,
    totalPayments: 5,
    lifetimeValue: 3450,
    planSelected: 'growth',
    lifetimeBinding: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-12-15'),
  },
  {
    id: '2',
    partnerId: '1',
    name: 'Мария С.',
    email: 'maria@example.com',
    status: 'registered',
    clickedAt: new Date('2024-12-10'),
    registeredAt: new Date('2024-12-11'),
    source: 'link',
    commissionEarned: 0,
    totalPayments: 0,
    lifetimeValue: 0,
    lifetimeBinding: true,
    createdAt: new Date('2024-12-10'),
    updatedAt: new Date('2024-12-11'),
  },
  {
    id: '3',
    partnerId: '1',
    name: 'Дмитрий П.',
    email: 'dmitry@example.com',
    status: 'clicked',
    clickedAt: new Date('2024-12-20'),
    source: 'link',
    commissionEarned: 0,
    totalPayments: 0,
    lifetimeValue: 0,
    lifetimeBinding: true,
    createdAt: new Date('2024-12-20'),
    updatedAt: new Date('2024-12-20'),
  },
  {
    id: '4',
    partnerId: '1',
    name: 'Елена В.',
    email: 'elena@example.com',
    status: 'active',
    clickedAt: new Date('2024-02-10'),
    registeredAt: new Date('2024-02-11'),
    paidAt: new Date('2024-02-15'),
    lastPaymentAt: new Date('2024-12-10'),
    source: 'link',
    commissionEarned: 622.5,
    totalPayments: 3,
    lifetimeValue: 4150,
    planSelected: 'business',
    lifetimeBinding: true,
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-12-10'),
  },
  {
    id: '5',
    partnerId: '1',
    name: 'Сергей М.',
    email: 'sergey@example.com',
    status: 'active',
    clickedAt: new Date('2024-03-05'),
    registeredAt: new Date('2024-03-06'),
    paidAt: new Date('2024-03-10'),
    lastPaymentAt: new Date('2024-12-05'),
    source: 'link',
    commissionEarned: 133.5,
    totalPayments: 2,
    lifetimeValue: 890,
    planSelected: 'starter',
    lifetimeBinding: true,
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-12-05'),
  },
];

const ReferralsPage: React.FC = () => {
  const [filters, setFilters] = useState<FiltersType>({
    status: undefined,
    period: 'all',
    search: '',
  });
  
  // TODO: Filter referrals based on filters
  const filteredReferrals = MOCK_REFERRALS;
  
  // Calculate stats
  const stats = {
    clicks: 247,
    registered: 32,
    contacted: 28,
    paid: 22,
    active: 20,
    totalCommissions: 4285,
    thisQuarterCommissions: 1125,
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <PartnerHeader partnerName="Иван" />
      
      <div className="container mx-auto px-4 py-8">
        {/* Заголовок */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Мои рефералы
          </h1>
          <p className="text-gray-600">
            Все клиенты, которые пришли по вашей ссылке
          </p>
        </div>
        
        {/* Фильтры */}
        <div className="mb-6">
          <ReferralFilters filters={filters} onFiltersChange={setFilters} />
        </div>
        
        {/* Контент: 2 колонки */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Левая колонка - статистика (1/4) */}
          <div className="lg:col-span-1">
            <ReferralStats {...stats} />
          </div>
          
          {/* Правая колонка - таблица рефералов (3/4) */}
          <div className="lg:col-span-3">
            <ReferralsList referrals={filteredReferrals} />
            
            {/* Информационный блок */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="text-blue-600 text-2xl">📌</span>
                <p className="text-sm text-blue-800">
                  <strong>Клиенты закреплены за вами НАВСЕГДА.</strong>
                  {' '}Вы получаете комиссию с каждого их платежа — 
                  и за запуск магазина, и за квартальное обслуживание!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralsPage;

