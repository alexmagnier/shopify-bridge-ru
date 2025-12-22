// components/partners/landing/JoinCTA.tsx

import React from 'react';
import { Button } from '@/components/ui';

export const JoinCTA: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Заголовок */}
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Готовы начать зарабатывать?
          </h2>
          
          {/* Подзаголовок */}
          <p className="text-xl text-blue-100 mb-8">
            Регистрация занимает 2 минуты.<br />
            Начните получать комиссии уже на этой неделе.
          </p>
          
          {/* CTA Кнопка */}
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100 min-w-[250px]"
            onClick={() => window.location.href = '/partners/register'}
          >
            Стать партнёром →
          </Button>
          
          {/* Под кнопкой */}
          <p className="text-blue-200 mt-6 text-sm">
            Бесплатно • Без обязательств • Выплаты в USDT
          </p>
        </div>
      </div>
    </section>
  );
};

