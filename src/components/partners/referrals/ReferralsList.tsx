// components/partners/referrals/ReferralsList.tsx

import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Badge } from '@/components/ui';
import { Referral, REFERRAL_STATUS_CONFIG } from '@/types';
import { formatUSD, formatRelativeTime, formatPlanName } from '@/utils/formatters';

interface ReferralsListProps {
  referrals: Referral[];
}

export const ReferralsList: React.FC<ReferralsListProps> = ({ referrals }) => {
  if (referrals.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <div className="text-6xl mb-4">👥</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Рефералов пока нет
        </h3>
        <p className="text-gray-600">
          Поделитесь своей реферальной ссылкой, чтобы начать зарабатывать
        </p>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Имя</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Тариф</TableHead>
            <TableHead className="text-right">Комиссий</TableHead>
            <TableHead className="text-right">Платежей</TableHead>
            <TableHead>Дата</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {referrals.map((referral) => {
            const statusConfig = REFERRAL_STATUS_CONFIG[referral.status];
            
            return (
              <TableRow key={referral.id}>
                {/* Имя */}
                <TableCell>
                  <div>
                    <div className="font-medium text-gray-900">{referral.name}</div>
                    <div className="text-sm text-gray-500">{referral.email}</div>
                  </div>
                </TableCell>
                
                {/* Статус */}
                <TableCell>
                  <Badge 
                    variant={
                      referral.status === 'active' ? 'success' :
                      referral.status === 'paid' ? 'success' :
                      referral.status === 'contacted' ? 'warning' :
                      referral.status === 'registered' ? 'info' :
                      referral.status === 'churned' ? 'danger' :
                      'gray'
                    }
                  >
                    <span className="mr-1">{statusConfig.icon}</span>
                    {statusConfig.label}
                  </Badge>
                </TableCell>
                
                {/* Тариф */}
                <TableCell>
                  {referral.planSelected ? (
                    <span className="text-sm text-gray-700">
                      {formatPlanName(referral.planSelected)}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-400">—</span>
                  )}
                </TableCell>
                
                {/* Комиссии */}
                <TableCell className="text-right">
                  {referral.commissionEarned > 0 ? (
                    <span className="font-semibold text-green-600">
                      {formatUSD(referral.commissionEarned)}
                    </span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </TableCell>
                
                {/* Платежи */}
                <TableCell className="text-right">
                  {referral.totalPayments > 0 ? (
                    <span className="text-gray-700">{referral.totalPayments}</span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </TableCell>
                
                {/* Дата */}
                <TableCell>
                  <span className="text-sm text-gray-600">
                    {formatRelativeTime(referral.lastPaymentAt || referral.registeredAt || referral.clickedAt)}
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

