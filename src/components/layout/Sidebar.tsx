// components/layout/Sidebar.tsx

import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { formatUSD } from '@/utils/formatters';

interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const location = useLocation();
  const { partner, signOut } = useAuth();

  const menuItems = [
    { path: '/partners/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/partners/referrals', icon: '👥', label: 'Мои рефералы' },
    { path: '/partners/payouts', icon: '💸', label: 'Выплаты' },
    { path: '/partners/materials', icon: '📦', label: 'Промо-материалы' },
    { path: '/partners/profile', icon: '⚙️', label: 'Профиль' },
  ];

  const getTierInfo = (tier: string) => {
    const tiers: Record<string, { icon: string; name: string; commission: number }> = {
      master: { icon: '👑', name: 'Мастер', commission: 20 },
      platinum: { icon: '💎', name: 'Платина', commission: 18 },
      gold: { icon: '🥇', name: 'Золото', commission: 15 },
      silver: { icon: '🥈', name: 'Серебро', commission: 12 },
      standard: { icon: '🥉', name: 'Стандарт', commission: 10 },
    };
    return tiers[tier] || tiers.standard;
  };

  const tierInfo = getTierInfo(partner?.tier || 'standard');

  return (
    <aside className={`w-64 bg-white border-r border-gray-200 min-h-screen ${className}`}>
      <div className="p-4 space-y-6">
        {/* Уровень партнёра */}
        <div className="bg-gradient-to-br from-primary to-blue-700 rounded-lg p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{tierInfo.icon}</span>
            <div>
              <div className="text-sm opacity-80">Ваш уровень</div>
              <div className="font-bold">{tierInfo.name}</div>
            </div>
          </div>
          <div className="text-sm opacity-80">
            Комиссия: <span className="font-bold">{tierInfo.commission}%</span>
          </div>
        </div>

        {/* Баланс */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="text-sm text-green-700 mb-1">💰 Баланс</div>
          <div className="text-2xl font-bold text-green-700">
            {formatUSD(partner?.pending_balance || 0)}
          </div>
          <a 
            href="/partners/payouts" 
            className="text-sm text-green-600 hover:underline"
          >
            Запросить выплату →
          </a>
        </div>

        {/* Меню */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <a
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Разделитель */}
        <div className="border-t border-gray-200 pt-4">
          <button
            onClick={() => signOut()}
            className="flex items-center gap-3 px-3 py-2 w-full text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <span className="text-lg">🚪</span>
            <span className="font-medium">Выйти</span>
          </button>
        </div>

        {/* Статистика */}
        <div className="border-t border-gray-200 pt-4">
          <div className="text-sm text-gray-500 space-y-2">
            <div className="flex justify-between">
              <span>Рефералов:</span>
              <span className="font-medium text-gray-900">
                {partner?.total_referrals || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Активных:</span>
              <span className="font-medium text-gray-900">
                {partner?.active_referrals || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Всего заработано:</span>
              <span className="font-medium text-green-600">
                {formatUSD(partner?.total_earnings || 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

