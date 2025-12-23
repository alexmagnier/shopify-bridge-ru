// pages/admin/referrals.tsx

import React, { useState, useEffect } from 'react';
import { AdminHeader } from '@/components/layout/AdminHeader';
import { supabase } from '@/integrations/supabase/client';
import { Card, Input, Select, Badge } from '@/components/ui';
import { formatUSD, formatDate } from '@/utils/formatters';

interface ReferralData {
  id: string;
  partner_id: string;
  name: string;
  email: string | null;
  phone: string | null;
  status: string;
  source: string;
  commission_earned: number;
  total_payments: number;
  lifetime_value: number;
  plan_selected: string | null;
  registered_at: string;
  created_at: string;
  partner?: {
    first_name: string;
    last_name: string;
    referral_code: string;
  };
}

const AdminReferralsPage: React.FC = () => {
  const [referrals, setReferrals] = useState<ReferralData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchReferrals();
  }, []);

  const fetchReferrals = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('referrals')
        .select(`
          *,
          partner:partners(first_name, last_name, referral_code)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching referrals:', error);
        return;
      }

      setReferrals(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateReferralStatus = async (referralId: string, newStatus: string) => {
    try {
      const updateData: any = { 
        status: newStatus, 
        updated_at: new Date().toISOString() 
      };
      
      if (newStatus === 'paid') {
        updateData.paid_at = new Date().toISOString();
      } else if (newStatus === 'active') {
        updateData.last_payment_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('referrals')
        .update(updateData)
        .eq('id', referralId);

      if (error) {
        alert('Ошибка при обновлении статуса');
        return;
      }

      fetchReferrals();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Фильтрация
  const filteredReferrals = referrals.filter(r => {
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    if (search) {
      const searchLower = search.toLowerCase();
      const matchName = r.name?.toLowerCase().includes(searchLower);
      const matchEmail = r.email?.toLowerCase().includes(searchLower);
      const matchPartner = r.partner 
        ? `${r.partner.first_name} ${r.partner.last_name}`.toLowerCase().includes(searchLower)
        : false;
      if (!matchName && !matchEmail && !matchPartner) return false;
    }
    return true;
  });

  const getStatusBadge = (status: string) => {
    const config: Record<string, { label: string; variant: 'default' | 'success' | 'warning' | 'error' }> = {
      clicked: { label: '👁 Кликнул', variant: 'default' },
      registered: { label: '📝 Зарегистрирован', variant: 'default' },
      contacted: { label: '📞 На связи', variant: 'warning' },
      paid: { label: '✅ Оплатил', variant: 'success' },
      active: { label: '🟢 Активный', variant: 'success' },
      churned: { label: '🔴 Ушёл', variant: 'error' },
    };
    return config[status] || config.registered;
  };

  const getSourceLabel = (source: string) => {
    const labels: Record<string, string> = {
      link: '🔗 Ссылка',
      promo_code: '🏷 Промокод',
      manual: '✍️ Вручную',
      organic: '🌱 Органика',
    };
    return labels[source] || source;
  };

  // Статистика
  const stats = {
    total: referrals.length,
    registered: referrals.filter(r => r.status === 'registered').length,
    paid: referrals.filter(r => ['paid', 'active'].includes(r.status)).length,
    organic: referrals.filter(r => r.source === 'organic').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <div className="container mx-auto px-4 py-8">
        {/* Заголовок */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Все рефералы
          </h1>
          <p className="text-gray-600">
            Управление всеми рефералами системы
          </p>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card padding="md">
            <div className="text-sm text-gray-600">Всего</div>
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          </Card>
          <Card padding="md">
            <div className="text-sm text-gray-600">Зарегистрировано</div>
            <div className="text-2xl font-bold text-blue-600">{stats.registered}</div>
          </Card>
          <Card padding="md">
            <div className="text-sm text-gray-600">Оплатили</div>
            <div className="text-2xl font-bold text-green-600">{stats.paid}</div>
          </Card>
          <Card padding="md">
            <div className="text-sm text-gray-600">Органика</div>
            <div className="text-2xl font-bold text-purple-600">{stats.organic}</div>
          </Card>
        </div>
        
        {/* Фильтры */}
        <Card className="mb-6">
          <div className="p-4 flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Поиск по имени, email или партнёру..."
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
                  { value: 'clicked', label: '👁 Кликнул' },
                  { value: 'registered', label: '📝 Зарегистрирован' },
                  { value: 'contacted', label: '📞 На связи' },
                  { value: 'paid', label: '✅ Оплатил' },
                  { value: 'active', label: '🟢 Активный' },
                  { value: 'churned', label: '🔴 Ушёл' },
                ]}
              />
            </div>
          </div>
        </Card>
        
        {/* Таблица */}
        {loading ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-primary mx-auto" />
            <p className="mt-4 text-gray-600">Загрузка рефералов...</p>
          </div>
        ) : filteredReferrals.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <p className="text-gray-600">Рефералы не найдены</p>
          </div>
        ) : (
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Клиент</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Партнёр</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Источник</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Статус</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Комиссия</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Дата</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Действия</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredReferrals.map((referral) => {
                    const statusBadge = getStatusBadge(referral.status);
                    
                    return (
                      <tr key={referral.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <div>
                            <div className="font-medium text-gray-900">{referral.name}</div>
                            <div className="text-sm text-gray-500">
                              {referral.email || referral.phone || 'Нет контакта'}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          {referral.partner ? (
                            <div>
                              <div className="text-gray-900">
                                {referral.partner.first_name} {referral.partner.last_name}
                              </div>
                              <code className="text-xs bg-gray-100 px-1 rounded">
                                {referral.partner.referral_code}
                              </code>
                            </div>
                          ) : (
                            <span className="text-gray-400">Органический лид</span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-sm">
                          {getSourceLabel(referral.source)}
                        </td>
                        <td className="px-4 py-4">
                          <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                        </td>
                        <td className="px-4 py-4">
                          {referral.commission_earned > 0 ? (
                            <span className="font-medium text-green-600">
                              {formatUSD(referral.commission_earned)}
                            </span>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500">
                          {formatDate(new Date(referral.created_at))}
                        </td>
                        <td className="px-4 py-4">
                          <Select
                            value={referral.status}
                            onChange={(e) => updateReferralStatus(referral.id, e.target.value)}
                            options={[
                              { value: 'clicked', label: 'Кликнул' },
                              { value: 'registered', label: 'Зарегистрирован' },
                              { value: 'contacted', label: 'На связи' },
                              { value: 'paid', label: 'Оплатил' },
                              { value: 'active', label: 'Активный' },
                              { value: 'churned', label: 'Ушёл' },
                            ]}
                          />
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

export default AdminReferralsPage;

