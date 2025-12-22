// components/partners/payouts/PayoutBalance.tsx

import React from 'react';
import { Card, Button } from '@/components/ui';
import { formatUSD } from '@/utils/formatters';
import { MIN_PAYOUT_AMOUNT } from '@/types';

interface PayoutBalanceProps {
  availableBalance: number;
  pendingBalance: number;
  totalEarnings: number;
  totalPaidOut: number;
  onRequestPayout: () => void;
}

export const PayoutBalance: React.FC<PayoutBalanceProps> = ({
  availableBalance,
  pendingBalance,
  totalEarnings,
  totalPaidOut,
  onRequestPayout,
}) => {
  const canRequestPayout = availableBalance >= MIN_PAYOUT_AMOUNT;
  
  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
      <div className="space-y-6">
        {/* Заголовок */}
        <div className="flex items-center gap-3">
          <span className="text-4xl">💰</span>
          <h2 className="text-2xl font-bold text-gray-900">Баланс</h2>
        </div>
        
        {/* Доступно к выводу */}
        <div>
          <div className="text-sm text-gray-600 mb-2">Доступно к выводу</div>
          <div className="text-4xl font-bold text-green-600 mb-1">
            {formatUSD(availableBalance)}
          </div>
          <div className="text-sm text-gray-600">
            Минимум для вывода: {formatUSD(MIN_PAYOUT_AMOUNT)}
          </div>
        </div>
        
        {/* Кнопка запроса выплаты */}
        <Button
          fullWidth
          size="lg"
          disabled={!canRequestPayout}
          onClick={onRequestPayout}
        >
          {canRequestPayout 
            ? 'Запросить выплату →' 
            : `Нужно ещё ${formatUSD(MIN_PAYOUT_AMOUNT - availableBalance)}`
          }
        </Button>
        
        {/* Дополнительная информация */}
        <div className="border-t border-green-200 pt-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Ожидает начисления:</span>
            <span className="font-semibold text-gray-900">{formatUSD(pendingBalance)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Всего заработано:</span>
            <span className="font-semibold text-gray-900">{formatUSD(totalEarnings)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Всего выплачено:</span>
            <span className="font-semibold text-gray-900">{formatUSD(totalPaidOut)}</span>
          </div>
        </div>
        
        {/* Информация о выплатах */}
        <div className="bg-white/50 rounded-lg p-3 text-xs text-gray-700">
          <strong>ℹ️ О выплатах:</strong>
          <ul className="mt-2 space-y-1 ml-4 list-disc">
            <li>Выплаты производятся по понедельникам</li>
            <li>Обработка занимает 1-2 рабочих дня</li>
            <li>Выплаты в USDT (TRC-20 или ERC-20)</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

