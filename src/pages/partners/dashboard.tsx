// pages/partners/dashboard.tsx

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { PartnerHeader } from '@/components/layout/PartnerHeader';
import { StatsCards } from '@/components/partners/dashboard/StatsCards';
import { ReferralLink } from '@/components/partners/dashboard/ReferralLink';
import { RecentReferrals } from '@/components/partners/dashboard/RecentReferrals';
import { EarningsChart } from '@/components/partners/dashboard/EarningsChart';
import { TierProgress } from '@/components/partners/dashboard/TierProgress';
import { Referral } from '@/types';

const DashboardPage: React.FC = () => {
  const { partner, isLoading } = useAuth();
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loadingReferrals, setLoadingReferrals] = useState(true);

  useEffect(() => {
    const fetchReferrals = async () => {
      if (!partner) return;
      
      setLoadingReferrals(true);
      try {
        const { data, error } = await supabase
          .from('referrals')
          .select('*')
          .eq('partner_id', partner.id)
          .order('created_at', { ascending: false })
          .limit(10);

        if (error) {
          console.error('Error fetching referrals:', error);
          return;
        }

        // Преобразуем данные из Supabase в формат нашего типа Referral
        const formattedReferrals: Referral[] = (data || []).map((ref: any) => ({
          id: ref.id,
          partnerId: ref.partner_id,
          name: ref.name || 'Не указано',
          email: ref.email || undefined,
          phone: ref.phone || undefined,
          status: ref.status || 'registered',
          clickedAt: ref.clicked_at ? new Date(ref.clicked_at) : new Date(),
          registeredAt: ref.registered_at ? new Date(ref.registered_at) : new Date(),
          paidAt: ref.paid_at ? new Date(ref.paid_at) : new Date(),
          lastPaymentAt: ref.last_payment_at ? new Date(ref.last_payment_at) : new Date(),
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
        setLoadingReferrals(false);
      }
    };

    fetchReferrals();
  }, [partner]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!partner) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Партнер не найден</p>
      </div>
    );
  }

  // Вычисляем статистику из реальных данных
  const stats = {
    activeClients: referrals.filter(r => r.status === 'active').length,
    activeClientsChange: 0, // TODO: вычислить изменение за период
    quarterCommissions: partner.pending_balance || 0,
    quarterCommissionsChange: 0, // TODO: вычислить изменение
    totalEarnings: partner.total_earnings || 0,
    nextQuarterProjected: 0, // TODO: прогноз
  };

  // Данные для графика (пока пустые, потом добавим)
  const earningsData = [
    { month: 'Q1', amount: 0 },
    { month: 'Q2', amount: 0 },
    { month: 'Q3', amount: 0 },
    { month: 'Q4', amount: partner.pending_balance || 0 },
  ];

  const referralLink = `https://shopifybridge.ru/?ref=${partner.referral_code}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <PartnerHeader partnerName={partner.first_name} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Приветствие */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            👋 Добро пожаловать, {partner.first_name}!
          </h1>
          <p className="text-gray-600">
            Вот обзор вашей партнёрской активности
          </p>
        </div>
        
        {/* Статистика */}
        <div className="mb-8">
          <StatsCards stats={stats} />
        </div>
        
        {/* Основной контент: 2 колонки */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Левая колонка (2/3) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Реферальная ссылка */}
            <ReferralLink 
              referralCode={partner.referral_code}
              referralLink={referralLink}
            />
            
            {/* Последние рефералы */}
            <RecentReferrals 
              referrals={referrals}
              loading={loadingReferrals}
            />
            
            {/* График дохода */}
            <EarningsChart data={earningsData} />
          </div>
          
          {/* Правая колонка (1/3) */}
          <div className="space-y-8">
            {/* Прогресс уровня */}
            <TierProgress 
              currentTier={(partner.tier as 'standard' | 'silver' | 'gold' | 'platinum' | 'master') || 'standard'}
              activeReferrals={partner.active_referrals || 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
