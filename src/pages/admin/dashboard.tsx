// pages/admin/dashboard.tsx

import React from 'react';
import { AdminHeader } from '@/components/layout/AdminHeader';
import { Card, Badge } from '@/components/ui';
import { formatUSD, formatNumber, formatPercent } from '@/utils/formatters';

// TODO: Replace with real data from API
const MOCK_STATS = {
  totalPartners: 127,
  activePartners: 89,
  newPartnersThisMonth: 12,
  pendingApprovalPartners: 3,
  totalReferrals: 847,
  convertedReferrals: 156,
  pendingReferrals: 94,
  conversionRate: 18.4,
  totalCommissionsPaid: 8450,
  pendingPayouts: 2847,
  pendingPayoutsCount: 5,
  revenueFromReferrals: 72300,
};

const AdminDashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Обзор партнёрской программы
          </h1>
          <p className="text-gray-600">
            Общая статистика и аналитика
          </p>
        </div>
        
        {/* Ключевые метрики */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card padding="md" className="bg-white">
            <div className="text-sm text-gray-600 mb-1">Партнёры</div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {formatNumber(MOCK_STATS.totalPartners)}
            </div>
            <div className="text-sm text-green-600">
              +{MOCK_STATS.newPartnersThisMonth} за месяц
            </div>
          </Card>
          
          <Card padding="md" className="bg-white">
            <div className="text-sm text-gray-600 mb-1">Рефералы</div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {formatNumber(MOCK_STATS.totalReferrals)}
            </div>
            <div className="text-sm text-gray-600">
              +{MOCK_STATS.pendingReferrals} за месяц
            </div>
          </Card>
          
          <Card padding="md" className="bg-white">
            <div className="text-sm text-gray-600 mb-1">Конверсия</div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {formatPercent(MOCK_STATS.conversionRate)}
            </div>
            <div className="text-sm text-gray-600">
              общая конверсия
            </div>
          </Card>
          
          <Card padding="md" className="bg-white">
            <div className="text-sm text-gray-600 mb-1">Выплаты</div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {formatUSD(MOCK_STATS.totalCommissionsPaid)}
            </div>
            <div className="text-sm text-yellow-600">
              +{MOCK_STATS.pendingPayoutsCount} ожидают
            </div>
          </Card>
          
          <Card padding="md" className="bg-white">
            <div className="text-sm text-gray-600 mb-1">Выручка</div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {formatUSD(MOCK_STATS.revenueFromReferrals)}
            </div>
            <div className="text-sm text-gray-600">
              от рефералов
            </div>
          </Card>
        </div>
        
        {/* Требуют внимания */}
        <Card className="mb-8">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              ⚠️ Требуют внимания
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <span className="text-gray-700">
                  {MOCK_STATS.pendingApprovalPartners} новых партнёра ожидают одобрения
                </span>
                <a href="/admin/partners" className="text-blue-600 hover:underline text-sm font-medium">
                  Просмотреть →
                </a>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <span className="text-gray-700">
                  {MOCK_STATS.pendingPayoutsCount} запросов на выплату требуют обработки
                </span>
                <a href="/admin/payouts" className="text-blue-600 hover:underline text-sm font-medium">
                  Обработать →
                </a>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Топ партнёры */}
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              🏆 Топ-5 партнёров
            </h2>
            <div className="space-y-4">
              {[
                { name: 'Иван П.', email: 'ivan@example.com', referrals: 47, earnings: 1847, tier: 'master' },
                { name: 'Мария К.', email: 'maria@example.com', referrals: 32, earnings: 1245, tier: 'platinum' },
                { name: 'Алексей С.', email: 'alexey@example.com', referrals: 28, earnings: 987, tier: 'gold' },
                { name: 'Елена В.', email: 'elena@example.com', referrals: 22, earnings: 823, tier: 'gold' },
                { name: 'Дмитрий М.', email: 'dmitry@example.com', referrals: 18, earnings: 654, tier: 'gold' },
              ].map((partner, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold text-gray-400">
                      #{index + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{partner.name}</div>
                      <div className="text-sm text-gray-500">{partner.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{partner.referrals}</div>
                      <div className="text-xs text-gray-500">рефералов</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{formatUSD(partner.earnings)}</div>
                      <div className="text-xs text-gray-500">заработано</div>
                    </div>
                    <Badge variant="success">
                      {partner.tier === 'master' ? '👑 Мастер' :
                       partner.tier === 'platinum' ? '💎 Платина' :
                       '🥇 Золото'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardPage;

