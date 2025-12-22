// components/partners/dashboard/TierProgress.tsx

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, Badge } from '@/components/ui';
import { TIER_CONFIG } from '@/types';

interface TierProgressProps {
  currentTier: keyof typeof TIER_CONFIG;
  activeReferrals: number;
}

export const TierProgress: React.FC<TierProgressProps> = ({ currentTier, activeReferrals }) => {
  const tiers = Object.entries(TIER_CONFIG);
  const currentIndex = tiers.findIndex(([key]) => key === currentTier);
  const nextTier = tiers[currentIndex + 1];
  
  const currentConfig = TIER_CONFIG[currentTier];
  const progress = nextTier 
    ? ((activeReferrals - currentConfig.minReferrals) / (nextTier[1].minReferrals - currentConfig.minReferrals)) * 100
    : 100;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ваш уровень</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Текущий уровень */}
          <div className="flex items-center gap-4">
            <div className="text-5xl">{currentConfig.icon}</div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-2xl font-bold">{currentConfig.name}</h3>
                <Badge variant="success" size="lg">
                  {currentConfig.commission}%
                </Badge>
              </div>
              <p className="text-gray-600">
                {activeReferrals} активных {activeReferrals === 1 ? 'клиент' : 'клиентов'}
              </p>
            </div>
          </div>
          
          {/* Прогресс до следующего уровня */}
          {nextTier && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  До {nextTier[1].name}:
                </span>
                <span className="text-sm font-semibold text-blue-600">
                  ещё {nextTier[1].minReferrals - activeReferrals} {nextTier[1].minReferrals - activeReferrals === 1 ? 'клиент' : 'клиентов'}
                </span>
              </div>
              
              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              
              <div className="mt-2 text-xs text-gray-600">
                Следующий уровень даст вам {nextTier[1].commission}% комиссии
              </div>
            </div>
          )}
          
          {/* Все уровни */}
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Все уровни:</h4>
            <div className="space-y-2">
              {tiers.map(([key, tier], index) => {
                const isCurrent = key === currentTier;
                const isPassed = index < currentIndex;
                
                return (
                  <div 
                    key={key}
                    className={`flex items-center justify-between p-2 rounded ${
                      isCurrent ? 'bg-blue-50 border border-blue-200' : 
                      isPassed ? 'bg-gray-50' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{tier.icon}</span>
                      <span className={`text-sm ${isCurrent ? 'font-semibold' : ''}`}>
                        {tier.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-600">
                        от {tier.minReferrals} клиентов
                      </span>
                      <Badge 
                        variant={isCurrent ? 'success' : 'gray'}
                        size="sm"
                      >
                        {tier.commission}%
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

