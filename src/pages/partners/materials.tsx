// pages/partners/materials.tsx

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { PartnerHeader } from '@/components/layout/PartnerHeader';
import { Card, CardHeader, CardTitle, CardContent, CopyButton, Button } from '@/components/ui';

const MaterialsPage: React.FC = () => {
  const { partner, isLoading } = useAuth();
  
  const referralLink = partner 
    ? `https://shopifymost.ru/?ref=${partner.referral_code}`
    : 'https://shopifymost.ru/?ref=YOUR_CODE';
  
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
    {
      title: 'Для email-рассылки',
      text: `Привет!

Хочу поделиться полезным сервисом для тех, кто хочет продавать за рубеж.

Shopify Bridge — это:
• Размещение товаров на складе в Дубае
• Приём платежей Visa/Mastercard без ограничений
• Доставка по всему миру
• Выплаты в USDT каждую неделю

Я сам пользуюсь и очень доволен. Если интересно — вот ссылка: ${referralLink}

Если будут вопросы — пиши, расскажу подробнее!`,
    },
  ];

  if (isLoading) {
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
              Промо-материалы
            </h1>
            <p className="text-gray-600">
              Используйте готовые материалы для продвижения. Ваша реферальная ссылка уже встроена.
            </p>
          </div>

          {/* Ваша ссылка */}
          <Card className="bg-gradient-to-r from-primary to-blue-700 text-white">
            <CardContent className="py-6">
              <p className="text-blue-200 text-sm mb-2">Ваша реферальная ссылка</p>
              <div className="flex items-center gap-4">
                <code className="flex-1 bg-white/20 rounded-lg px-4 py-3 text-lg font-mono">
                  {referralLink}
                </code>
                <CopyButton 
                  text={referralLink} 
                  className="bg-white text-primary hover:bg-blue-50"
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Баннеры */}
          <Card>
            <CardHeader>
              <CardTitle>🎨 Баннеры</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { size: '300x250', name: 'Средний квадрат' },
                  { size: '728x90', name: 'Лидерборд' },
                  { size: '160x600', name: 'Небоскрёб' },
                  { size: '1200x628', name: 'Facebook/VK' },
                ].map((banner) => (
                  <div key={banner.size} className="text-center">
                    <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg p-6 mb-3 flex items-center justify-center aspect-square border-2 border-dashed border-blue-300">
                      <div className="text-center">
                        <div className="text-3xl mb-2">🎨</div>
                        <div className="text-xs font-semibold text-gray-700">{banner.size}</div>
                        <div className="text-xs text-gray-500">{banner.name}</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" fullWidth disabled>
                      Скоро
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  💡 <strong>Баннеры в разработке.</strong> Скоро здесь появятся готовые баннеры 
                  с вашей реферальной ссылкой для размещения на сайтах и в соцсетях.
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Тексты для постов */}
          <Card>
            <CardHeader>
              <CardTitle>📝 Тексты для постов</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {textTemplates.map((template, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between bg-gray-50 px-4 py-3 border-b">
                    <h3 className="font-semibold text-gray-900">
                      {template.title}
                    </h3>
                    <CopyButton text={template.text} size="sm" variant="outline" />
                  </div>
                  <div className="p-4 bg-white">
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
                      {template.text}
                    </pre>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          
          {/* Советы по продвижению */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">💡 Советы по продвижению</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 text-xl">✓</span>
                  <span>Делитесь ссылкой в профильных чатах и комьюнити селлеров</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 text-xl">✓</span>
                  <span>Рассказывайте о личном опыте использования сервиса</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 text-xl">✓</span>
                  <span>Публикуйте кейсы и результаты в соцсетях</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 text-xl">✓</span>
                  <span>Используйте таргетированную рекламу в Instagram и VK</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 text-xl">✓</span>
                  <span>Помните: чем больше клиентов вы приведёте, тем выше ваш уровень и комиссия!</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Запрещено */}
          <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
            <CardHeader>
              <CardTitle className="text-red-800">⚠️ Запрещено</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-red-600 text-xl">✗</span>
                  <span>Контекстная реклама на бренд "Shopify Bridge" (Google Ads, Яндекс.Директ)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 text-xl">✗</span>
                  <span>Спам в личные сообщения и комментарии</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 text-xl">✗</span>
                  <span>Ложная информация о сервисе</span>
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
