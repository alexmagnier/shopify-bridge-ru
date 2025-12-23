// components/partners/dashboard/RecentReferrals.tsx

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from '@/components/ui';
import { Referral, REFERRAL_STATUS_CONFIG } from '@/types';
import { formatUSD, formatRelativeTime, formatPlanName } from '@/utils/formatters';

interface RecentReferralsProps {
  referrals: Referral[];
  loading?: boolean;
}

export const RecentReferrals: React.FC<RecentReferralsProps> = ({ referrals }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Последние начисления комиссий</CardTitle>
          <a href="/partners/referrals">
            <Button variant="ghost" size="sm">
              Все рефералы →
            </Button>
          </a>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {referrals.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-3">👥</div>
              <p>Пока нет рефералов</p>
              <p className="text-sm mt-1">Поделитесь своей ссылкой, чтобы начать зарабатывать</p>
            </div>
          ) : (
            referrals.map((referral) => {
              const statusConfig = REFERRAL_STATUS_CONFIG[referral.status];
              const isActive = referral.status === 'active' || referral.status === 'paid';
              
              return (
                <div key={referral.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl">{statusConfig.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{referral.name}</h4>
                      <Badge 
                        variant={
                          referral.status === 'active' ? 'success' :
                          referral.status === 'paid' ? 'success' :
                          referral.status === 'registered' ? 'info' :
                          'gray'
                        }
                        size="sm"
                      >
                        {statusConfig.label}
                      </Badge>
                    </div>
                    
                    {isActive && (
                      <div className="text-sm text-gray-600 mb-1">
                        {referral.planSelected && formatPlanName(referral.planSelected)}
                        {referral.totalPayments > 0 && (
                          <span className="ml-2">
                            • {referral.totalPayments} {referral.totalPayments === 1 ? 'платёж' : 'платежей'}
                          </span>
                        )}
                      </div>
                    )}
                    
                    <div className="flex items-center gap-3 text-sm">
                      {referral.commissionEarned > 0 && (
                        <span className="font-semibold text-green-600">
                          {formatUSD(referral.commissionEarned)} заработано
                        </span>
                      )}
                      <span className="text-gray-500">
                        {formatRelativeTime(referral.lastPaymentAt || referral.registeredAt || referral.clickedAt)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};

