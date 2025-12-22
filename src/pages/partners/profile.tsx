// pages/partners/profile.tsx

import React, { useState } from 'react';
import { PartnerHeader } from '@/components/layout/PartnerHeader';
import { Card, CardHeader, CardTitle, CardContent, Input, Select, Checkbox, Button } from '@/components/ui';

const ProfilePage: React.FC = () => {
  const [personalData, setPersonalData] = useState({
    firstName: 'Иван',
    lastName: 'Петров',
    email: 'ivan@example.com',
    phone: '+7 999 123 45 67',
    telegram: '@ivanpetrov',
  });
  
  const [paymentData, setPaymentData] = useState({
    paymentMethod: 'usdt_trc20',
    wallet: 'TRx7abc123def456ghi789jkl0',
  });
  
  const [notifications, setNotifications] = useState({
    newReferral: true,
    referralRegistered: true,
    referralPaid: true,
    payoutProcessed: true,
    weeklyReport: true,
  });
  
  const handleSavePersonal = () => {
    // TODO: API call
    alert('Данные сохранены (TODO: подключить API)');
  };
  
  const handleSavePayment = () => {
    // TODO: API call
    alert('Реквизиты сохранены (TODO: подключить API)');
  };
  
  const handleSaveNotifications = () => {
    // TODO: API call
    alert('Настройки уведомлений сохранены (TODO: подключить API)');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <PartnerHeader partnerName={personalData.firstName} />
      
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
                />
                
                <div className="flex justify-end">
                  <Button onClick={handleSavePersonal}>
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
                    { value: 'usdt_trc20', label: 'USDT (TRC-20)' },
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
                  <Button onClick={handleSavePayment}>
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
                  <Button onClick={handleSaveNotifications}>
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
              <Button variant="outline">
                Изменить пароль
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

