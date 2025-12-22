// pages/partners/materials.tsx

import React from 'react';
import { PartnerHeader } from '@/components/layout/PartnerHeader';
import { Card, CardHeader, CardTitle, CardContent, CopyButton, Button } from '@/components/ui';

const MaterialsPage: React.FC = () => {
  const referralLink = 'https://shopifybridge.ru/?ref=IVAIVA2847';
  
  const textTemplates = [
    {
      title: 'Для Telegram-чатов',
      text: `🚀 Хотите продавать на международном рынке?

Shopify Bridge помогает российским селлерам выйти на мировой рынок без проблем с таможней.

→ Фулфилмент в Дубае
→ Приём карт Visa/Mastercard
→ Выплаты в USDT

Узнать больше: ${referralLink}`,
    },
    {
      title: 'Для Instagram / VK',
      text: `💰 Как я начал продавать за рубеж без таможни

Открыл для себя Shopify Bridge — сервис, который помогает российским селлерам выйти на международный рынок.

✓ Фулфилмент в Дубае
✓ Нет проблем с таможней РФ
✓ Выплаты в USDT каждую неделю

Подробности здесь: ${referralLink}`,
    },
    {
      title: 'Короткое сообщение',
      text: `Привет! Нашёл крутой сервис для продаж за рубеж — Shopify Bridge. Они размещают товар в Дубае и делают весь фулфилмент. Никакой российской таможни. Посмотри: ${referralLink}`,
    },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <PartnerHeader partnerName="Иван" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Заголовок */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Промо-материалы
            </h1>
            <p className="text-gray-600">
              Используйте готовые материалы для продвижения. Ваша реферальная ссылка уже встроена.
            </p>
          </div>
          
          {/* Баннеры */}
          <Card>
            <CardHeader>
              <CardTitle>Баннеры</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { size: '300x250', name: 'Средний квадрат' },
                  { size: '728x90', name: 'Лидерборд' },
                  { size: '160x600', name: 'Небоскрёб' },
                  { size: '1200x628', name: 'Facebook' },
                ].map((banner) => (
                  <div key={banner.size} className="text-center">
                    <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg p-6 mb-3 flex items-center justify-center aspect-square">
                      <div className="text-center">
                        <div className="text-3xl mb-2">🎨</div>
                        <div className="text-xs font-semibold text-gray-700">{banner.size}</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" fullWidth>
                      Скачать
                    </Button>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-4">
                💡 Баннеры будут доступны после одобрения партнёрского аккаунта
              </p>
            </CardContent>
          </Card>
          
          {/* Тексты для постов */}
          <Card>
            <CardHeader>
              <CardTitle>Тексты для постов</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {textTemplates.map((template, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">
                      📝 {template.title}
                    </h3>
                    <CopyButton text={template.text} size="sm" variant="outline" />
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
                      {template.text}
                    </pre>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          
          {/* Советы по продвижению */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle>💡 Советы по продвижению</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Делитесь ссылкой в профильных чатах и комьюнити селлеров</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Рассказывайте о личном опыте использования сервиса</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Публикуйте кейсы и результаты в соцсетях</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Используйте таргетированную рекламу (контекстная реклама на бренд запрещена)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Помните: чем больше клиентов вы приведёте, тем выше ваш уровень и процент комиссии!</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MaterialsPage;

