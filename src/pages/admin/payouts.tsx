// pages/admin/payouts.tsx

import React, { useState, useEffect } from 'react';
import { AdminHeader } from '@/components/layout/AdminHeader';
import { supabase } from '@/integrations/supabase/client';
import { Card, Button, Input, Select, Badge, Tabs } from '@/components/ui';
import { formatUSD, formatDate } from '@/utils/formatters';

interface PayoutData {
  id: string;
  partner_id: string;
  amount: number;
  currency: string;
  status: string;
  payment_method: string;
  payment_details: string;
  transaction_id: string | null;
  partner_note: string | null;
  admin_note: string | null;
  requested_at: string;
  processed_at: string | null;
  created_at: string;
  partner?: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

const AdminPayoutsPage: React.FC = () => {
  const [payouts, setPayouts] = useState<PayoutData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [transactionId, setTransactionId] = useState('');

  useEffect(() => {
    fetchPayouts();
  }, []);

  const fetchPayouts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('payouts')
        .select(`
          *,
          partner:partners(first_name, last_name, email)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching payouts:', error);
        return;
      }

      setPayouts(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const approvePayout = async (payoutId: string) => {
    if (!transactionId.trim()) {
      alert('Введите Transaction ID');
      return;
    }

    try {
      const payout = payouts.find(p => p.id === payoutId);
      if (!payout) return;

      // Обновляем статус выплаты
      const { error: payoutError } = await supabase
        .from('payouts')
        .update({ 
          status: 'completed',
          transaction_id: transactionId,
          processed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', payoutId);

      if (payoutError) {
        alert('Ошибка при обновлении выплаты');
        return;
      }

      // Обновляем paid_out партнёра
      const { data: partnerData } = await supabase
        .from('partners')
        .select('paid_out')
        .eq('id', payout.partner_id)
        .single();

      if (partnerData) {
        await supabase
          .from('partners')
          .update({
            paid_out: (partnerData.paid_out || 0) + payout.amount,
            updated_at: new Date().toISOString(),
          })
          .eq('id', payout.partner_id);
      }

      alert('✅ Выплата подтверждена!');
      setProcessingId(null);
      setTransactionId('');
      fetchPayouts();
    } catch (error) {
      console.error('Error:', error);
      alert('Произошла ошибка');
    }
  };

  const rejectPayout = async (payoutId: string) => {
    const payout = payouts.find(p => p.id === payoutId);
    if (!payout) return;

    if (!confirm('Отклонить выплату? Средства будут возвращены на баланс партнёра.')) {
      return;
    }

    try {
      // Обновляем статус выплаты
      const { error: payoutError } = await supabase
        .from('payouts')
        .update({ 
          status: 'cancelled',
          processed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', payoutId);

      if (payoutError) {
        alert('Ошибка при обновлении выплаты');
        return;
      }

      // Возвращаем средства на баланс партнёра
      const { data: partnerData } = await supabase
        .from('partners')
        .select('pending_balance')
        .eq('id', payout.partner_id)
        .single();

      if (partnerData) {
        await supabase
          .from('partners')
          .update({
            pending_balance: (partnerData.pending_balance || 0) + payout.amount,
            updated_at: new Date().toISOString(),
          })
          .eq('id', payout.partner_id);
      }

      alert('Выплата отклонена, средства возвращены партнёру');
      fetchPayouts();
    } catch (error) {
      console.error('Error:', error);
      alert('Произошла ошибка');
    }
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { label: string; variant: 'default' | 'success' | 'warning' | 'error' }> = {
      pending: { label: '⏳ Ожидает', variant: 'warning' },
      processing: { label: '🔄 Обработка', variant: 'warning' },
      completed: { label: '✅ Выплачено', variant: 'success' },
      failed: { label: '❌ Ошибка', variant: 'error' },
      cancelled: { label: '🚫 Отклонено', variant: 'error' },
    };
    return config[status] || config.pending;
  };

  const getPaymentMethodLabel = (method: string) => {
    const labels: Record<string, string> = {
      usdt_trc20: 'USDT (TRC-20)',
      usdt_erc20: 'USDT (ERC-20)',
      bank_card: 'Банковская карта',
    };
    return labels[method] || method;
  };

  // Фильтрация по табам
  const filteredPayouts = payouts.filter(p => {
    if (activeTab === 'pending') return p.status === 'pending';
    if (activeTab === 'completed') return p.status === 'completed';
    if (activeTab === 'cancelled') return ['cancelled', 'failed'].includes(p.status);
    return true;
  });

  // Статистика
  const stats = {
    pending: payouts.filter(p => p.status === 'pending').length,
    pendingAmount: payouts.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0),
    completed: payouts.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <div className="container mx-auto px-4 py-8">
        {/* Заголовок */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Выплаты
          </h1>
          <p className="text-gray-600">
            Обработка и история выплат партнёрам
          </p>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card padding="md" className="bg-yellow-50 border-yellow-200">
            <div className="text-sm text-yellow-700">Ожидают обработки</div>
            <div className="text-2xl font-bold text-yellow-700">
              {stats.pending} ({formatUSD(stats.pendingAmount)})
            </div>
          </Card>
          <Card padding="md" className="bg-green-50 border-green-200">
            <div className="text-sm text-green-700">Всего выплачено</div>
            <div className="text-2xl font-bold text-green-700">{formatUSD(stats.completed)}</div>
          </Card>
          <Card padding="md">
            <div className="text-sm text-gray-600">Всего запросов</div>
            <div className="text-2xl font-bold text-gray-900">{payouts.length}</div>
          </Card>
        </div>
        
        {/* Табы */}
        <div className="mb-6">
          <Tabs
            tabs={[
              { id: 'pending', label: `⏳ Ожидающие (${stats.pending})` },
              { id: 'completed', label: '✅ Выплачено' },
              { id: 'cancelled', label: '🚫 Отклонённые' },
              { id: 'all', label: 'Все' },
            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
        
        {/* Таблица */}
        {loading ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-primary mx-auto" />
            <p className="mt-4 text-gray-600">Загрузка выплат...</p>
          </div>
        ) : filteredPayouts.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <p className="text-gray-600">Выплаты не найдены</p>
          </div>
        ) : (
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Партнёр</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Сумма</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Метод</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Реквизиты</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Статус</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Дата</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Действия</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPayouts.map((payout) => {
                    const statusBadge = getStatusBadge(payout.status);
                    
                    return (
                      <tr key={payout.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          {payout.partner ? (
                            <div>
                              <div className="font-medium text-gray-900">
                                {payout.partner.first_name} {payout.partner.last_name}
                              </div>
                              <div className="text-sm text-gray-500">{payout.partner.email}</div>
                            </div>
                          ) : (
                            <span className="text-gray-400">Неизвестный</span>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-lg font-bold text-gray-900">
                            {formatUSD(payout.amount)}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm">
                          {getPaymentMethodLabel(payout.payment_method)}
                        </td>
                        <td className="px-4 py-4">
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded block max-w-[200px] truncate">
                            {payout.payment_details}
                          </code>
                        </td>
                        <td className="px-4 py-4">
                          <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                          {payout.transaction_id && (
                            <div className="text-xs text-gray-500 mt-1">
                              TX: {payout.transaction_id.slice(0, 20)}...
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500">
                          {formatDate(new Date(payout.requested_at || payout.created_at))}
                        </td>
                        <td className="px-4 py-4">
                          {payout.status === 'pending' && (
                            <>
                              {processingId === payout.id ? (
                                <div className="space-y-2">
                                  <Input
                                    placeholder="Transaction ID"
                                    value={transactionId}
                                    onChange={(e) => setTransactionId(e.target.value)}
                                  />
                                  <div className="flex gap-2">
                                    <Button size="sm" onClick={() => approvePayout(payout.id)}>
                                      ✓
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="ghost"
                                      onClick={() => setProcessingId(null)}
                                    >
                                      ✗
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex gap-2">
                                  <Button 
                                    size="sm"
                                    onClick={() => setProcessingId(payout.id)}
                                  >
                                    Выплатить
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="ghost"
                                    onClick={() => rejectPayout(payout.id)}
                                  >
                                    Отклонить
                                  </Button>
                                </div>
                              )}
                            </>
                          )}
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

export default AdminPayoutsPage;

