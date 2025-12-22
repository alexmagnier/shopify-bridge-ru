// pages/partners/payouts.tsx

import React, { useState } from 'react';
import { PartnerHeader } from '@/components/layout/PartnerHeader';
import { PayoutBalance } from '@/components/partners/payouts/PayoutBalance';
import { PayoutHistory } from '@/components/partners/payouts/PayoutHistory';
import { PayoutRequestModal } from '@/components/partners/payouts/PayoutRequestModal';
import { Payout, PayoutRequest } from '@/types';

// TODO: Replace with real data from API
const MOCK_BALANCE = {
  availableBalance: 347.5,
  pendingBalance: 89.7,
  totalEarnings: 1247.8,
  totalPaidOut: 900.3,
};

const MOCK_PAYOUTS: Payout[] = [
  {
    id: '1',
    partnerId: '1',
    amount: 250,
    currency: 'USDT',
    status: 'completed',
    paymentMethod: 'usdt_trc20',
    paymentDetails: 'TRx7abc123def456ghi789jkl0',
    transactionId: '0x1234567890abcdef...',
    requestedAt: new Date('2025-01-15'),
    processedAt: new Date('2025-01-16'),
  },
  {
    id: '2',
    partnerId: '1',
    amount: 350.3,
    currency: 'USDT',
    status: 'completed',
    paymentMethod: 'usdt_trc20',
    paymentDetails: 'TRx7abc123def456ghi789jkl0',
    transactionId: '0xabcdef1234567890...',
    requestedAt: new Date('2025-01-08'),
    processedAt: new Date('2025-01-09'),
  },
  {
    id: '3',
    partnerId: '1',
    amount: 300,
    currency: 'USDT',
    status: 'completed',
    paymentMethod: 'usdt_trc20',
    paymentDetails: 'TRx7abc123def456ghi789jkl0',
    transactionId: '0x9876543210fedcba...',
    requestedAt: new Date('2025-01-01'),
    processedAt: new Date('2025-01-02'),
  },
];

const PayoutsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleRequestPayout = async (request: PayoutRequest) => {
    // TODO: Implement API call
    console.log('Payout request:', request);
    alert('Запрос на выплату отправлен! (TODO: подключить API)');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <PartnerHeader partnerName="Иван" />
      
      <div className="container mx-auto px-4 py-8">
        {/* Заголовок */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Выплаты
          </h1>
          <p className="text-gray-600">
            Управляйте своими выплатами и просматривайте историю
          </p>
        </div>
        
        {/* Контент: 2 колонки */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Левая колонка - баланс (1/3) */}
          <div className="lg:col-span-1">
            <PayoutBalance
              {...MOCK_BALANCE}
              onRequestPayout={() => setIsModalOpen(true)}
            />
          </div>
          
          {/* Правая колонка - история (2/3) */}
          <div className="lg:col-span-2">
            <PayoutHistory payouts={MOCK_PAYOUTS} />
          </div>
        </div>
      </div>
      
      {/* Модальное окно запроса выплаты */}
      <PayoutRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        availableBalance={MOCK_BALANCE.availableBalance}
        onSubmit={handleRequestPayout}
      />
    </div>
  );
};

export default PayoutsPage;

