// components/partners/referrals/ReferralStats.tsx

import React from 'react';
import { Card } from '@/components/ui';
import { formatUSD, formatPercent } from '@/utils/formatters';

interface ReferralStatsProps {
  clicks: number;
  registered: number;
  contacted: number;
  paid: number;
  active: number;
  totalCommissions: number;
  thisQuarterCommissions: number;
}

export const ReferralStats: React.FC<ReferralStatsProps> = ({
  clicks,
  registered,
  contacted,
  paid,
  active,
  totalCommissions,
  thisQuarterCommissions,
}) => {
  const clickToRegister = clicks > 0 ? (registered / clicks) * 100 : 0;
  const registerToContact = registered > 0 ? (contacted / registered) * 100 : 0;
  const contactToPaid = contacted > 0 ? (paid / contacted) * 100 : 0;
  const paidToActive = paid > 0 ? (active / paid) * 100 : 0;
  
  return (
    <div className="space-y-6">
      {/* Воронка конверсии */}
      <Card padding="md">
        <h3 className="font-semibold text-gray-900 mb-4">Воронка конверсии</h3>
        <div className="space-y-3">
          {/* Клики */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span className="text-sm text-gray-700">Клики</span>
            </div>
            <span className="font-semibold text-gray-900">{clicks}</span>
          </div>
          <div className="ml-5 text-xs text-gray-500">
            ↓ {formatPercent(clickToRegister)} конверсия
          </div>
          
          {/* Регистрации */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm text-gray-700">Регистрации</span>
            </div>
            <span className="font-semibold text-gray-900">{registered}</span>
          </div>
          <div className="ml-5 text-xs text-gray-500">
            ↓ {formatPercent(registerToContact)} конверсия
          </div>
          
          {/* Контакт */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full" />
              <span className="text-sm text-gray-700">Контакт</span>
            </div>
            <span className="font-semibold text-gray-900">{contacted}</span>
          </div>
          <div className="ml-5 text-xs text-gray-500">
            ↓ {formatPercent(contactToPaid)} конверсия
          </div>
          
          {/* Оплата */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full" />
              <span className="text-sm text-gray-700">Оплатили</span>
            </div>
            <span className="font-semibold text-gray-900">{paid}</span>
          </div>
          <div className="ml-5 text-xs text-gray-500">
            ↓ {formatPercent(paidToActive)} конверсия
          </div>
          
          {/* Активные */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              <span className="text-sm text-gray-700">Активные</span>
            </div>
            <span className="font-semibold text-green-600">{active}</span>
          </div>
        </div>
      </Card>
      
      {/* Пассивный доход */}
      <Card padding="md" className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span>💰</span>
          Пассивный доход
        </h3>
        <div className="space-y-3">
          <div>
            <div className="text-sm text-gray-600 mb-1">Этот квартал</div>
            <div className="text-2xl font-bold text-green-600">
              {formatUSD(thisQuarterCommissions)}
            </div>
            <div className="text-xs text-gray-600 mt-1">
              от {active} активных клиентов
            </div>
          </div>
          <div className="border-t border-green-200 pt-3">
            <div className="text-sm text-gray-600 mb-1">Всего заработано</div>
            <div className="text-xl font-bold text-gray-900">
              {formatUSD(totalCommissions)}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

