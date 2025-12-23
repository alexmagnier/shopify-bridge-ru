// pages/admin/settings.tsx

import React, { useState, useEffect } from 'react';
import { AdminHeader } from '@/components/layout/AdminHeader';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardHeader, CardTitle, CardContent, Input, Button, Checkbox } from '@/components/ui';

interface CommissionSettings {
  standard: number;
  silver: number;
  gold: number;
  platinum: number;
  master: number;
  minPayoutAmount: number;
  lifetimeCommissions: boolean;
  clientBindingPermanent: boolean;
}

const AdminSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<CommissionSettings>({
    standard: 10,
    silver: 12,
    gold: 15,
    platinum: 18,
    master: 20,
    minPayoutAmount: 50,
    lifetimeCommissions: true,
    clientBindingPermanent: true,
  });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .eq('key', 'commission_settings')
        .single();

      if (!error && data) {
        setSettings(data.value as CommissionSettings);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('settings')
        .upsert({
          key: 'commission_settings',
          value: settings,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        alert('Ошибка при сохранении настроек');
        console.error(error);
        return;
      }

      alert('✅ Настройки сохранены!');
    } catch (error) {
      console.error('Error:', error);
      alert('Произошла ошибка');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <div className="container mx-auto px-4 py-8">
        {/* Заголовок */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Настройки программы
          </h1>
          <p className="text-gray-600">
            Управление комиссиями и правилами партнёрской программы
          </p>
        </div>

        <div className="max-w-4xl space-y-8">
          {/* Комиссии по уровням */}
          <Card>
            <CardHeader>
              <CardTitle>💰 Комиссии по уровням</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      🥉 Стандарт (0-4 клиента)
                    </label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={settings.standard}
                        onChange={(e) => setSettings({ ...settings, standard: parseInt(e.target.value) || 0 })}
                        min={0}
                        max={100}
                      />
                      <span className="text-gray-500">%</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      🥈 Серебро (5-14 клиентов)
                    </label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={settings.silver}
                        onChange={(e) => setSettings({ ...settings, silver: parseInt(e.target.value) || 0 })}
                        min={0}
                        max={100}
                      />
                      <span className="text-gray-500">%</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      🥇 Золото (15-29 клиентов)
                    </label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={settings.gold}
                        onChange={(e) => setSettings({ ...settings, gold: parseInt(e.target.value) || 0 })}
                        min={0}
                        max={100}
                      />
                      <span className="text-gray-500">%</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      💎 Платина (30-49 клиентов)
                    </label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={settings.platinum}
                        onChange={(e) => setSettings({ ...settings, platinum: parseInt(e.target.value) || 0 })}
                        min={0}
                        max={100}
                      />
                      <span className="text-gray-500">%</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      👑 Мастер (50+ клиентов)
                    </label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={settings.master}
                        onChange={(e) => setSettings({ ...settings, master: parseInt(e.target.value) || 0 })}
                        min={0}
                        max={100}
                      />
                      <span className="text-gray-500">%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Выплаты */}
          <Card>
            <CardHeader>
              <CardTitle>💸 Настройки выплат</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="max-w-xs">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Минимальная сумма выплаты
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">$</span>
                    <Input
                      type="number"
                      value={settings.minPayoutAmount}
                      onChange={(e) => setSettings({ ...settings, minPayoutAmount: parseInt(e.target.value) || 0 })}
                      min={0}
                    />
                    <span className="text-gray-500">USDT</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Модель комиссий */}
          <Card>
            <CardHeader>
              <CardTitle>⚙️ Модель комиссий</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <Checkbox
                    label="Lifetime комиссии (комиссия с КАЖДОГО платежа клиента)"
                    checked={settings.lifetimeCommissions}
                    onChange={(e) => setSettings({ ...settings, lifetimeCommissions: e.target.checked })}
                  />
                  <p className="text-sm text-green-700 mt-2 ml-6">
                    ⚠️ Рекомендуется оставить включённым — это наше конкурентное преимущество
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <Checkbox
                    label="Бессрочная привязка клиентов"
                    checked={settings.clientBindingPermanent}
                    onChange={(e) => setSettings({ ...settings, clientBindingPermanent: e.target.checked })}
                  />
                  <p className="text-sm text-blue-700 mt-2 ml-6">
                    ⚠️ Клиент закрепляется за партнёром навсегда (без срока действия cookie)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Информация */}
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="py-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div className="text-sm text-yellow-800">
                  <p className="font-semibold mb-1">Как работают уровни:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Уровень партнёра определяется количеством активных (оплативших) клиентов</li>
                    <li>При достижении порога партнёр автоматически повышается в уровне</li>
                    <li>Новая ставка комиссии применяется ко всем последующим платежам</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Кнопка сохранения */}
          <div className="flex justify-end">
            <Button onClick={saveSettings} loading={saving} size="lg">
              Сохранить настройки
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;

