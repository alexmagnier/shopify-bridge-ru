// pages/partners/payouts.tsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { PartnerHeader } from '@/components/layout/PartnerHeader';
import { PayoutBalance } from '@/components/partners/payouts/PayoutBalance';
import { PayoutHistory } from '@/components/partners/payouts/PayoutHistory';
import { PayoutRequestModal } from '@/components/partners/payouts/PayoutRequestModal';
import { Payout, PayoutRequest } from '@/types';

const PayoutsPage: React.FC = () => {
  const { partner, isLoading: authLoading, refreshPartner } = useAuth();
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchPayouts = async () => {
      if (!partner) return;
      
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('payouts')
          .select('*')
          .eq('partner_id', partner.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching payouts:', error);
          return;
        }

        const formattedPayouts: Payout[] = (data || []).map((p: any) => ({
          id: p.id,
          partnerId: p.partner_id,
          amount: p.amount,
          currency: p.currency || 'USDT',
          status: p.status,
          paymentMethod: p.payment_method,
          paymentDetails: p.payment_details,
          transactionId: p.transaction_id,
          requestedAt: new Date(p.requested_at || p.created_at),
          processedAt: p.processed_at ? new Date(p.processed_at) : undefined,
          partnerNote: p.partner_note,
          adminNote: p.admin_note,
        }));

        setPayouts(formattedPayouts);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayouts();
  }, [partner]);

  const balance = {
    availableBalance: partner?.pending_balance || 0,
    pendingBalance: 0, // Можно вычислить из payouts со статусом 'pending'
    totalEarnings: partner?.total_earnings || 0,
    totalPaidOut: partner?.paid_out || 0,
  };
  
  const handleRequestPayout = async (request: PayoutRequest) => {
    if (!partner) return;
    
    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('payouts')
        .insert({
          partner_id: partner.id,
          amount: request.amount,
          currency: 'USDT',
          status: 'pending',
          payment_method: request.paymentMethod,
          payment_details: request.paymentDetails,
          partner_note: request.note,
          requested_at: new Date().toISOString(),
        });

      if (error) {
        console.error('Error creating payout request:', error);
        alert('Ошибка при создании запроса на выплату');
        return;
      }

      // Обновляем баланс партнёра
      await supabase
        .from('partners')
        .update({
          pending_balance: (partner.pending_balance || 0) - request.amount,
        })
        .eq('id', partner.id);

      alert('✅ Запрос на выплату успешно создан!');
      setIsModalOpen(false);
      
      // Обновляем данные
      refreshPartner();
      
      // Перезагружаем выплаты
      const { data: newPayouts } = await supabase
        .from('payouts')
        .select('*')
        .eq('partner_id', partner.id)
        .order('created_at', { ascending: false });
      
      if (newPayouts) {
        setPayouts(newPayouts.map((p: any) => ({
          id: p.id,
          partnerId: p.partner_id,
          amount: p.amount,
          currency: p.currency || 'USDT',
          status: p.status,
          paymentMethod: p.payment_method,
          paymentDetails: p.payment_details,
          transactionId: p.transaction_id,
          requestedAt: new Date(p.requested_at || p.created_at),
          processedAt: p.processed_at ? new Date(p.processed_at) : undefined,
        })));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Произошла ошибка');
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-primary" />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <PartnerHeader partnerName={partner?.first_name || 'Партнёр'} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Заголовок */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Выплаты
          </h1>
          <p className="text-gray-600">
            Управляйте своими выплатами и просматривайте историю
          </p>
        </div>
        
        {/* Контент: 2 колонки */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Левая колонка - баланс (1/3) */}
          <div className="lg:col-span-1">
            <PayoutBalance
              {...balance}
              onRequestPayout={() => setIsModalOpen(true)}
            />
          </div>
          
          {/* Правая колонка - история (2/3) */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="bg-white rounded-lg p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-primary mx-auto" />
                <p className="mt-4 text-gray-600">Загрузка истории выплат...</p>
              </div>
            ) : payouts.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center">
                <div className="text-6xl mb-4">💸</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Пока нет выплат
                </h3>
                <p className="text-gray-600">
                  Накопите минимум $50 на балансе, чтобы запросить первую выплату
                </p>
              </div>
            ) : (
              <PayoutHistory payouts={payouts} />
            )}
          </div>
        </div>
      </div>
      
      {/* Модальное окно запроса выплаты */}
      <PayoutRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        availableBalance={balance.availableBalance}
        onSubmit={handleRequestPayout}
        loading={submitting}
      />
    </div>
  );
};

export default PayoutsPage;
