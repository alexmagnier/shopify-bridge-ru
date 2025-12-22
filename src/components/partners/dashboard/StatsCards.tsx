// components/partners/dashboard/StatsCards.tsx

import React from 'react';
import { Card } from '@/components/ui';
import { formatUSD, formatNumber, formatChange, getTrendColor } from '@/utils/formatters';

interface StatsCardsProps {
  stats: {
    activeClients: number;
    activeClientsChange: number;
    quarterCommissions: number;
    quarterCommissionsChange: number;
    totalEarnings: number;
    nextQuarterProjected: number;
  };
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const cards = [
    {
      title: 'Активных клиентов',
      value: formatNumber(stats.activeClients),
      change: stats.activeClientsChange,
      icon: '👥',
      color: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Этот квартал',
      subtitle: 'комиссий',
      value: formatUSD(stats.quarterCommissions),
      change: stats.quarterCommissionsChange,
      icon: '💰',
      color: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      title: 'Всего заработано',
      value: formatUSD(stats.totalEarnings),
      icon: '💵',
      color: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
    },
    {
      title: 'Следующий квартал',
      subtitle: 'прогноз',
      value: `~${formatUSD(stats.nextQuarterProjected)}`,
      icon: '📈',
      color: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <Card key={index} padding="md" className={card.color}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-gray-600">
                  {card.title}
                </span>
              </div>
              {card.subtitle && (
                <div className="text-xs text-gray-500 mb-2">{card.subtitle}</div>
              )}
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {card.value}
              </div>
              {card.change !== undefined && (
                <div className={`text-sm font-medium ${getTrendColor(card.change)}`}>
                  {formatChange(card.change, false)}
                  {' vs прошлый период'}
                </div>
              )}
            </div>
            <div className={`text-3xl ${card.iconColor}`}>
              {card.icon}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

