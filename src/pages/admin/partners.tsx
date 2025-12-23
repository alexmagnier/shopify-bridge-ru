// pages/admin/partners.tsx

import React, { useState, useEffect } from 'react';
import { AdminHeader } from '@/components/layout/AdminHeader';
import { supabase } from '@/integrations/supabase/client';
import { Card, Button, Input, Select, Badge } from '@/components/ui';
import { formatUSD, formatNumber, formatDate } from '@/utils/formatters';

interface PartnerData {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  referral_code: string;
  status: string;
  tier: string;
  total_referrals: number;
  active_referrals: number;
  total_earnings: number;
  pending_balance: number;
  created_at: string;
}

const AdminPartnersPage: React.FC = () => {
  const [partners, setPartners] = useState<PartnerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tierFilter, setTierFilter] = useState('all');

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching partners:', error);
        return;
      }

      setPartners(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePartnerStatus = async (partnerId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('partners')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', partnerId);

      if (error) {
        alert('Ошибка при обновлении статуса');
        return;
      }

      fetchPartners();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updatePartnerTier = async (partnerId: string, newTier: string) => {
    try {
      const { error } = await supabase
        .from('partners')
        .update({ tier: newTier, updated_at: new Date().toISOString() })
        .eq('id', partnerId);

      if (error) {
        alert('Ошибка при обновлении уровня');
        return;
      }

      fetchPartners();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Фильтрация
  const filteredPartners = partners.filter(p => {
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    if (tierFilter !== 'all' && p.tier !== tierFilter) return false;
    if (search) {
      const searchLower = search.toLowerCase();
      const matchName = `${p.first_name} ${p.last_name}`.toLowerCase().includes(searchLower);
      const matchEmail = p.email.toLowerCase().includes(searchLower);
      const matchCode = p.referral_code.toLowerCase().includes(searchLower);
      if (!matchName && !matchEmail && !matchCode) return false;
    }
    return true;
  });

  const getTierBadge = (tier: string) => {
    const config: Record<string, { label: string; variant: 'default' | 'success' | 'warning' | 'error' }> = {
      master: { label: '👑 Мастер', variant: 'success' },
      platinum: { label: '💎 Платина', variant: 'success' },
      gold: { label: '🥇 Золото', variant: 'warning' },
      silver: { label: '🥈 Серебро', variant: 'default' },
      standard: { label: '🥉 Стандарт', variant: 'default' },
    };
    return config[tier] || config.standard;
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { label: string; variant: 'default' | 'success' | 'warning' | 'error' }> = {
      active: { label: '✅ Активен', variant: 'success' },
      pending: { label: '⏳ Ожидает', variant: 'warning' },
      suspended: { label: '⚠️ Приостановлен', variant: 'warning' },
      blocked: { label: '🚫 Заблокирован', variant: 'error' },
    };
    return config[status] || config.pending;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <div className="container mx-auto px-4 py-8">
        {/* Заголовок */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Партнёры
            </h1>
            <p className="text-gray-600">
              Всего партнёров: {partners.length}
            </p>
          </div>
        </div>
        
        {/* Фильтры */}
        <Card className="mb-6">
          <div className="p-4 flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Поиск по имени, email или коду..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="w-48">
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                options={[
                  { value: 'all', label: 'Все статусы' },
                  { value: 'active', label: '✅ Активные' },
                  { value: 'pending', label: '⏳ Ожидающие' },
                  { value: 'suspended', label: '⚠️ Приостановлены' },
                  { value: 'blocked', label: '🚫 Заблокированы' },
                ]}
              />
            </div>
            <div className="w-48">
              <Select
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value)}
                options={[
                  { value: 'all', label: 'Все уровни' },
                  { value: 'master', label: '👑 Мастер' },
                  { value: 'platinum', label: '💎 Платина' },
                  { value: 'gold', label: '🥇 Золото' },
                  { value: 'silver', label: '🥈 Серебро' },
                  { value: 'standard', label: '🥉 Стандарт' },
                ]}
              />
            </div>
          </div>
        </Card>
        
        {/* Таблица */}
        {loading ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-primary mx-auto" />
            <p className="mt-4 text-gray-600">Загрузка партнёров...</p>
          </div>
        ) : filteredPartners.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <p className="text-gray-600">Партнёры не найдены</p>
          </div>
        ) : (
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Партнёр</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Код</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Уровень</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Рефералы</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Заработок</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Статус</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Действия</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPartners.map((partner) => {
                    const tierBadge = getTierBadge(partner.tier);
                    const statusBadge = getStatusBadge(partner.status);
                    
                    return (
                      <tr key={partner.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <div>
                            <div className="font-medium text-gray-900">
                              {partner.first_name} {partner.last_name}
                            </div>
                            <div className="text-sm text-gray-500">{partner.email}</div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                            {partner.referral_code}
                          </code>
                        </td>
                        <td className="px-4 py-4">
                          <Badge variant={tierBadge.variant}>{tierBadge.label}</Badge>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-gray-900">{formatNumber(partner.total_referrals)}</div>
                          <div className="text-xs text-gray-500">
                            {partner.active_referrals} активных
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="font-medium text-green-600">
                            {formatUSD(partner.total_earnings)}
                          </div>
                          <div className="text-xs text-gray-500">
                            Баланс: {formatUSD(partner.pending_balance)}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            {partner.status === 'pending' && (
                              <Button 
                                size="sm" 
                                onClick={() => updatePartnerStatus(partner.id, 'active')}
                              >
                                Одобрить
                              </Button>
                            )}
                            {partner.status === 'active' && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => updatePartnerStatus(partner.id, 'suspended')}
                              >
                                Приостановить
                              </Button>
                            )}
                            {partner.status === 'suspended' && (
                              <Button 
                                size="sm"
                                onClick={() => updatePartnerStatus(partner.id, 'active')}
                              >
                                Активировать
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminPartnersPage;

