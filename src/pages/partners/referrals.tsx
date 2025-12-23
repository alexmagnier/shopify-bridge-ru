// pages/partners/referrals.tsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { PartnerHeader } from '@/components/layout/PartnerHeader';
import { ReferralFilters } from '@/components/partners/referrals/ReferralFilters';
import { ReferralStats } from '@/components/partners/referrals/ReferralStats';
import { ReferralsList } from '@/components/partners/referrals/ReferralsList';
import { ReferralFilters as FiltersType, Referral } from '@/types';

const ReferralsPage: React.FC = () => {
  const { partner, isLoading: authLoading } = useAuth();
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FiltersType>({
    status: undefined,
    period: 'all',
    search: '',
  });
  
  useEffect(() => {
    const fetchReferrals = async () => {
      if (!partner) return;
      
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('referrals')
          .select('*')
          .eq('partner_id', partner.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching referrals:', error);
          return;
        }

        const formattedReferrals: Referral[] = (data || []).map((ref: any) => ({
          id: ref.id,
          partnerId: ref.partner_id,
          name: ref.name || 'Не указано',
          email: ref.email || undefined,
          phone: ref.phone || undefined,
          status: ref.status || 'registered',
          clickedAt: ref.clicked_at ? new Date(ref.clicked_at) : new Date(),
          registeredAt: ref.registered_at ? new Date(ref.registered_at) : new Date(),
          paidAt: ref.paid_at ? new Date(ref.paid_at) : undefined,
          lastPaymentAt: ref.last_payment_at ? new Date(ref.last_payment_at) : undefined,
          source: ref.source || 'link',
          commissionEarned: ref.commission_earned || 0,
          totalPayments: ref.total_payments || 0,
          lifetimeValue: ref.lifetime_value || 0,
          planSelected: ref.plan_selected,
          lifetimeBinding: Boolean(ref.lifetime_binding),
          createdAt: new Date(ref.created_at),
          updatedAt: new Date(ref.updated_at),
        }));

        setReferrals(formattedReferrals);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReferrals();
  }, [partner]);
  
  // Фильтрация рефералов
  const filteredReferrals = referrals.filter(ref => {
    // Фильтр по статусу
    if (filters.status && ref.status !== filters.status) return false;
    
    // Фильтр по поиску
    if (filters.search) {
      const search = filters.search.toLowerCase();
      const matchesName = ref.name.toLowerCase().includes(search);
      const matchesEmail = ref.email?.toLowerCase().includes(search);
      if (!matchesName && !matchesEmail) return false;
    }
    
    // Фильтр по периоду
    if (filters.period !== 'all') {
      const now = new Date();
      const refDate = ref.createdAt;
      
      if (filters.period === 'week') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        if (refDate < weekAgo) return false;
      } else if (filters.period === 'month') {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        if (refDate < monthAgo) return false;
      } else if (filters.period === 'quarter') {
        const quarterAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        if (refDate < quarterAgo) return false;
      }
    }
    
    return true;
  });
  
  // Вычисляем статистику
  const stats = {
    clicks: referrals.filter(r => r.status === 'clicked').length + referrals.length,
    registered: referrals.filter(r => ['registered', 'contacted', 'paid', 'active'].includes(r.status)).length,
    contacted: referrals.filter(r => ['contacted', 'paid', 'active'].includes(r.status)).length,
    paid: referrals.filter(r => ['paid', 'active'].includes(r.status)).length,
    active: referrals.filter(r => r.status === 'active').length,
    totalCommissions: referrals.reduce((sum, r) => sum + (r.commissionEarned || 0), 0),
    thisQuarterCommissions: partner?.pending_balance || 0,
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
            Мои рефералы
          </h1>
          <p className="text-gray-600">
            Все клиенты, которые пришли по вашей ссылке
          </p>
        </div>
        
        {/* Фильтры */}
        <div className="mb-6">
          <ReferralFilters filters={filters} onFiltersChange={setFilters} />
        </div>
        
        {/* Контент: 2 колонки */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Левая колонка - статистика (1/4) */}
          <div className="lg:col-span-1">
            <ReferralStats {...stats} />
          </div>
          
          {/* Правая колонка - таблица рефералов (3/4) */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="bg-white rounded-lg p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-primary mx-auto" />
                <p className="mt-4 text-gray-600">Загрузка рефералов...</p>
              </div>
            ) : filteredReferrals.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center">
                <div className="text-6xl mb-4">👥</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Пока нет рефералов
                </h3>
                <p className="text-gray-600">
                  Поделитесь своей реферальной ссылкой, чтобы привлечь первых клиентов
                </p>
              </div>
            ) : (
              <ReferralsList referrals={filteredReferrals} />
            )}
            
            {/* Информационный блок */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="text-blue-600 text-2xl">📌</span>
                <p className="text-sm text-blue-800">
                  <strong>Клиенты закреплены за вами НАВСЕГДА.</strong>
                  {' '}Вы получаете комиссию с каждого их платежа — 
                  и за запуск магазина, и за квартальное обслуживание!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralsPage;
