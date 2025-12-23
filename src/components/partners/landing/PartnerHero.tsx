// components/partners/landing/PartnerHero.tsx

import React from 'react';

export const PartnerHero: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Надзаголовок */}
          <p className="text-blue-200 font-medium mb-3 text-sm md:text-base">
            Партнёрская программа Shopify Bridge
          </p>
          
          {/* H1 Заголовок - уменьшен */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            Зарабатывайте на рекомендациях
          </h1>
          
          {/* Подзаголовок - компактнее */}
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Получайте до 20% комиссии с каждого платежа клиента. Пассивный доход — навсегда.
          </p>
          
          {/* Ключевые цифры */}
          <div className="grid grid-cols-3 gap-3 md:gap-4 mb-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-5">
              <div className="text-xl md:text-2xl font-bold mb-1">до 20%</div>
              <div className="text-blue-200 text-xs md:text-sm">комиссия</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-5">
              <div className="text-xl md:text-2xl font-bold mb-1">Lifetime</div>
              <div className="text-blue-200 text-xs md:text-sm">привязка</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-5">
              <div className="text-xl md:text-2xl font-bold mb-1">∞</div>
              <div className="text-blue-200 text-xs md:text-sm">без лимитов</div>
            </div>
          </div>
          
          {/* CTA Кнопки */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a 
              href="/partners/register"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors min-w-[180px]"
            >
              Стать партнёром →
            </a>
            <a 
              href="/partners/login"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors min-w-[180px]"
            >
              Войти в кабинет
            </a>
          </div>
          
          {/* Под кнопками */}
          <p className="text-blue-200 mt-5 text-xs md:text-sm">
            Более 50 партнёров уже зарабатывают с нами
          </p>
        </div>
      </div>
    </section>
  );
};
