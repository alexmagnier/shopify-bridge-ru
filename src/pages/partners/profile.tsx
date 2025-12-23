// pages/partners/profile.tsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { PartnerHeader } from '@/components/layout/PartnerHeader';
import { Card, CardHeader, CardTitle, CardContent, Input, Select, Checkbox, Button } from '@/components/ui';

const ProfilePage: React.FC = () => {
  const { partner, isLoading: authLoading, refreshPartner } = useAuth();
  const [saving, setSaving] = useState(false);
  
  const [personalData, setPersonalData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    telegram: '',
  });
  
  const [paymentData, setPaymentData] = useState({
    paymentMethod: 'usdt_trc20',
    wallet: '',
  });
  
  const [notifications, setNotifications] = useState({
    newReferral: true,
    referralRegistered: true,
    referralPaid: true,
    payoutProcessed: true,
    weeklyReport: true,
  });

  // Загружаем данные партнёра при монтировании
  useEffect(() => {
    if (partner) {
      setPersonalData({
        firstName: partner.first_name || '',
        lastName: partner.last_name || '',
        email: partner.email || '',
        phone: partner.phone || '',
        telegram: partner.telegram || '',
      });
      
      setPaymentData({
        paymentMethod: partner.payment_method || 'usdt_trc20',
        wallet: typeof partner.payment_details === 'string' ? partner.payment_details : '',
      });
      
      if (partner.notifications) {
        setNotifications({
          newReferral: partner.notifications.newReferral ?? true,
          referralRegistered: partner.notifications.referralPaid ?? true,
          referralPaid: partner.notifications.referralPaid ?? true,
          payoutProcessed: partner.notifications.payoutProcessed ?? true,
          weeklyReport: partner.notifications.weeklyReport ?? true,
        });
      }
    }
  }, [partner]);
  
  const handleSavePersonal = async () => {
    if (!partner) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from('partners')
        .update({
          first_name: personalData.firstName,
          last_name: personalData.lastName,
          phone: personalData.phone,
          telegram: personalData.telegram,
          updated_at: new Date().toISOString(),
        })
        .eq('id', partner.id);

      if (error) {
        console.error('Error updating profile:', error);
        alert('Ошибка при сохранении');
        return;
      }

      alert('✅ Данные успешно сохранены!');
      refreshPartner();
    } catch (error) {
      console.error('Error:', error);
      alert('Произошла ошибка');
    } finally {
      setSaving(false);
    }
  };
  
  const handleSavePayment = async () => {
    if (!partner) return;
    
    setSaving(true);
    try {
      const paymentDetails = paymentData.paymentMethod === 'bank_card'
        ? { cardNumber: paymentData.wallet }
        : { wallet: paymentData.wallet };

      const { error } = await supabase
        .from('partners')
        .update({
          payment_method: paymentData.paymentMethod,
          payment_details: paymentDetails,
          updated_at: new Date().toISOString(),
        })
        .eq('id', partner.id);

      if (error) {
        console.error('Error updating payment:', error);
        alert('Ошибка при сохранении реквизитов');
        return;
      }

      alert('✅ Реквизиты успешно сохранены!');
      refreshPartner();
    } catch (error) {
      console.error('Error:', error);
      alert('Произошла ошибка');
    } finally {
      setSaving(false);
    }
  };
  
  const handleSaveNotifications = async () => {
    if (!partner) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from('partners')
        .update({
          notifications: {
            newReferral: notifications.newReferral,
            referralPaid: notifications.referralPaid,
            payoutProcessed: notifications.payoutProcessed,
            weeklyReport: notifications.weeklyReport,
          },
          updated_at: new Date().toISOString(),
        })
        .eq('id', partner.id);

      if (error) {
        console.error('Error updating notifications:', error);
        alert('Ошибка при сохранении настроек');
        return;
      }

      alert('✅ Настройки уведомлений сохранены!');
      refreshPartner();
    } catch (error) {
      console.error('Error:', error);
      alert('Произошла ошибка');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(personalData.email, {
      redirectTo: `${window.location.origin}/partners/reset-password`,
    });
    
    if (error) {
      alert('Ошибка при отправке письма: ' + error.message);
    } else {
      alert('✅ Письмо для сброса пароля отправлено на ' + personalData.email);
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
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Заголовок */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Мой профиль
            </h1>
            <p className="text-gray-600">
              Управляйте своими данными и настройками
            </p>
          </div>

          {/* Информация о партнёре */}
          <Card className="bg-gradient-to-r from-primary to-blue-700 text-white">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm">Ваш реферальный код</p>
                  <p className="text-2xl font-bold">{partner?.referral_code}</p>
                </div>
                <div className="text-right">
                  <p className="text-blue-200 text-sm">Статус</p>
                  <p className="text-lg font-semibold capitalize">
                    {partner?.status === 'active' ? '✅ Активен' : 
                     partner?.status === 'pending' ? '⏳ На модерации' : 
                     partner?.status}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-blue-200 text-sm">Уровень</p>
                  <p className="text-lg font-semibold capitalize">
                    {partner?.tier === 'master' ? '👑 Мастер' :
                     partner?.tier === 'platinum' ? '💎 Платина' :
                     partner?.tier === 'gold' ? '🥇 Золото' :
                     partner?.tier === 'silver' ? '🥈 Серебро' :
                     '🥉 Стандарт'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Личные данные */}
          <Card>
            <CardHeader>
              <CardTitle>Личные данные</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Имя"
                    value={personalData.firstName}
                    onChange={(e) => setPersonalData({ ...personalData, firstName: e.target.value })}
                  />
                  <Input
                    label="Фамилия"
                    value={personalData.lastName}
                    onChange={(e) => setPersonalData({ ...personalData, lastName: e.target.value })}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Email"
                    type="email"
                    value={personalData.email}
                    onChange={(e) => setPersonalData({ ...personalData, email: e.target.value })}
                    disabled
                    helperText="Email нельзя изменить"
                  />
                  <Input
                    label="Телефон"
                    value={personalData.phone}
                    onChange={(e) => setPersonalData({ ...personalData, phone: e.target.value })}
                  />
                </div>
                
                <Input
                  label="Telegram"
                  value={personalData.telegram}
                  onChange={(e) => setPersonalData({ ...personalData, telegram: e.target.value })}
                  placeholder="@username"
                />
                
                <div className="flex justify-end">
                  <Button onClick={handleSavePersonal} loading={saving}>
                    Сохранить изменения
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Реквизиты для выплат */}
          <Card>
            <CardHeader>
              <CardTitle>Реквизиты для выплат</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Select
                  label="Основной метод"
                  value={paymentData.paymentMethod}
                  onChange={(e) => setPaymentData({ ...paymentData, paymentMethod: e.target.value })}
                  options={[
                    { value: 'usdt_trc20', label: 'USDT (TRC-20) — Рекомендуем' },
                    { value: 'usdt_erc20', label: 'USDT (ERC-20)' },
                    { value: 'bank_card', label: 'Банковская карта РФ' },
                  ]}
                />
                
                <Input
                  label={
                    paymentData.paymentMethod === 'bank_card' 
                      ? 'Номер карты' 
                      : 'Адрес кошелька'
                  }
                  value={paymentData.wallet}
                  onChange={(e) => setPaymentData({ ...paymentData, wallet: e.target.value })}
                  placeholder={
                    paymentData.paymentMethod === 'usdt_trc20' ? 'TRx7abc123...' :
                    paymentData.paymentMethod === 'usdt_erc20' ? '0x...' :
                    '1234 5678 9012 3456'
                  }
                />
                
                <div className="flex justify-end">
                  <Button onClick={handleSavePayment} loading={saving}>
                    Сохранить реквизиты
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Уведомления */}
          <Card>
            <CardHeader>
              <CardTitle>Уведомления</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Checkbox
                  label="Новый реферал перешёл по ссылке"
                  checked={notifications.newReferral}
                  onChange={(e) => setNotifications({ ...notifications, newReferral: e.target.checked })}
                />
                <Checkbox
                  label="Реферал зарегистрировался"
                  checked={notifications.referralRegistered}
                  onChange={(e) => setNotifications({ ...notifications, referralRegistered: e.target.checked })}
                />
                <Checkbox
                  label="Реферал оплатил (комиссия начислена)"
                  checked={notifications.referralPaid}
                  onChange={(e) => setNotifications({ ...notifications, referralPaid: e.target.checked })}
                />
                <Checkbox
                  label="Выплата обработана"
                  checked={notifications.payoutProcessed}
                  onChange={(e) => setNotifications({ ...notifications, payoutProcessed: e.target.checked })}
                />
                <Checkbox
                  label="Еженедельный отчёт"
                  checked={notifications.weeklyReport}
                  onChange={(e) => setNotifications({ ...notifications, weeklyReport: e.target.checked })}
                />
                
                <div className="flex justify-end pt-4">
                  <Button onClick={handleSaveNotifications} loading={saving}>
                    Сохранить настройки
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Безопасность */}
          <Card>
            <CardHeader>
              <CardTitle>Безопасность</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" onClick={handleChangePassword}>
                Изменить пароль
              </Button>
              <p className="text-sm text-gray-500 mt-2">
                На вашу почту будет отправлена ссылка для сброса пароля
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
