// components/partners/landing/JoinCTA.tsx

import React from 'react';

export const JoinCTA: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Заголовок */}
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Готовы начать зарабатывать?
          </h2>
          
          {/* Подзаголовок */}
          <p className="text-lg text-blue-100 mb-8">
            Регистрация занимает 2 минуты. Начните получать комиссии уже на этой неделе.
          </p>
          
          {/* CTA Кнопка */}
          <a 
            href="/partners/register"
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors min-w-[220px]"
          >
            Стать партнёром →
          </a>
          
          {/* Под кнопкой */}
          <p className="text-blue-200 mt-5 text-sm">
            Бесплатно • Без обязательств • Выплаты в USDT
          </p>
        </div>
      </div>
    </section>
  );
};
