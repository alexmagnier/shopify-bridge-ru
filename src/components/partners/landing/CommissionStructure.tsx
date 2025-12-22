// components/partners/landing/CommissionStructure.tsx

import React from 'react';
import { TIER_CONFIG } from '@/types';

export const CommissionStructure: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Заголовок */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Пассивный доход. Комиссия с КАЖДОГО платежа клиента — навсегда.
          </h2>
          
          {/* Главное преимущество */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-lg p-8 mb-12">
            <div className="flex items-start gap-4">
              <div className="text-4xl">💰</div>
              <div>
                <h3 className="text-2xl font-bold mb-3">LIFETIME КОМИССИИ</h3>
                <p className="text-lg text-gray-700 mb-3">
                  Вы получаете комиссию не только с первого платежа, 
                  а <strong>С КАЖДОГО ПЛАТЕЖА</strong> клиента, пока он пользуется сервисом.
                </p>
                <div className="space-y-2 text-gray-700">
                  <p>• Клиент платит за запуск → Вы получаете комиссию</p>
                  <p>• Клиент платит за обслуживание → Вы снова получаете!</p>
                  <p className="font-semibold">Это настоящий пассивный доход!</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Таблица уровней */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Уровень</th>
                    <th className="px-6 py-4 text-left font-semibold">Клиентов</th>
                    <th className="px-6 py-4 text-left font-semibold">Комиссия</th>
                    <th className="px-6 py-4 text-left font-semibold">Бонусы</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {Object.entries(TIER_CONFIG).map(([key, tier]) => (
                    <tr key={key} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{tier.icon}</span>
                          <span className="font-medium">{tier.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {tier.minReferrals === 0 ? '0-4' : 
                         tier.minReferrals === 5 ? '5-14' :
                         tier.minReferrals === 15 ? '15-29' :
                         tier.minReferrals === 30 ? '30-49' :
                         '50+'}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-lg font-bold text-blue-600">
                          {tier.commission}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {key === 'standard' && '—'}
                        {key === 'silver' && 'Промо-материалы'}
                        {key === 'gold' && 'Приоритетная поддержка'}
                        {key === 'platinum' && 'Персональный менеджер'}
                        {key === 'master' && 'Индивидуальные условия'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Актуальные тарифы */}
          <div className="bg-gray-50 rounded-lg p-8 mb-12">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Актуальные тарифы Shopify Bridge
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold">Тариф</th>
                    <th className="px-6 py-3 text-left font-semibold">Запуск</th>
                    <th className="px-6 py-3 text-left font-semibold">Обслуживание</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-white">
                    <td className="px-6 py-4">
                      <div className="font-medium">Testing Package</div>
                      <div className="text-sm text-gray-600">(до 2 SKU)</div>
                    </td>
                    <td className="px-6 py-4 font-semibold">$380</td>
                    <td className="px-6 py-4 text-gray-600">—</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-6 py-4">
                      <div className="font-medium">Starter Store</div>
                      <div className="text-sm text-gray-600">(до 10 SKU)</div>
                    </td>
                    <td className="px-6 py-4 font-semibold">$590</td>
                    <td className="px-6 py-4">
                      <div className="font-semibold">$300 / квартал</div>
                      <div className="text-sm text-gray-600">($100/мес)</div>
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-6 py-4">
                      <div className="font-medium">Growth Store</div>
                      <div className="text-sm text-gray-600">(до 25 SKU)</div>
                    </td>
                    <td className="px-6 py-4 font-semibold">$1,200</td>
                    <td className="px-6 py-4">
                      <div className="font-semibold">$450 / квартал</div>
                      <div className="text-sm text-gray-600">($150/мес)</div>
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-6 py-4">
                      <div className="font-medium">Business Store</div>
                      <div className="text-sm text-gray-600">(до 50 SKU)</div>
                    </td>
                    <td className="px-6 py-4 font-semibold">$2,200</td>
                    <td className="px-6 py-4">
                      <div className="font-semibold">$650 / квартал</div>
                      <div className="text-sm text-gray-600">(~$217/мес)</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Примечание */}
          <div className="text-center space-y-2 text-gray-700">
            <p className="flex items-center justify-center gap-2">
              <span className="text-green-600">✓</span>
              Комиссия начисляется с КАЖДОГО платежа клиента
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="text-green-600">✓</span>
              Клиент закрепляется за вами НАВСЕГДА
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="text-green-600">✓</span>
              Выплаты производятся еженедельно в USDT
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

