// components/partners/landing/PartnerHero.tsx

import React from 'react';
import { Button } from '@/components/ui';

export const PartnerHero: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Надзаголовок */}
          <p className="text-blue-200 font-medium mb-4">
            Партнёрская программа Shopify Bridge
          </p>
          
          {/* H1 Заголовок */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Зарабатывайте на рекомендациях<br />
            Shopify Bridge
          </h1>
          
          {/* Подзаголовок */}
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Рекомендуйте нас друзьям и коллегам-селлерам.<br />
            Получайте до 20% комиссии с КАЖДОГО платежа клиента.<br />
            Пассивный доход — навсегда.
          </p>
          
          {/* Ключевые цифры */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">до 20%</div>
              <div className="text-blue-200">комиссия с продаж</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">Lifetime</div>
              <div className="text-blue-200">привязка клиентов</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">Без лимитов</div>
              <div className="text-blue-200">на доход</div>
            </div>
          </div>
          
          {/* CTA Кнопки */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              variant="primary"
              className="bg-white text-blue-600 hover:bg-gray-100 min-w-[200px]"
              onClick={() => window.location.href = '/partners/register'}
            >
              Стать партнёром →
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white/10 min-w-[200px]"
              onClick={() => window.location.href = '/partners/login'}
            >
              Войти в кабинет
            </Button>
          </div>
          
          {/* Под кнопками */}
          <p className="text-blue-200 mt-6 text-sm">
            Более 50 партнёров уже зарабатывают с нами
          </p>
        </div>
      </div>
    </section>
  );
};

