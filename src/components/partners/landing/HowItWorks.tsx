// components/partners/landing/HowItWorks.tsx

import React from 'react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: 1,
      icon: '📝',
      title: 'Зарегистрируйтесь',
      description: 'Заполните форму за 2 минуты. Получите персональную реферальную ссылку.',
    },
    {
      number: 2,
      icon: '📤',
      title: 'Рекомендуйте',
      description: 'Делитесь ссылкой с друзьями, коллегами, в соцсетях, чатах селлеров.',
    },
    {
      number: 3,
      icon: '💰',
      title: 'Зарабатывайте',
      description: 'Получайте комиссию с каждого клиента, который пришёл по вашей ссылке.',
    },
  ];
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Заголовок */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Три простых шага к заработку
          </h2>
          
          {/* Шаги */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="text-6xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
          
          {/* Визуальная схема */}
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">👤</span>
                </div>
                <h4 className="font-semibold mb-1">ВЫ</h4>
                <p className="text-sm text-gray-600">Делитесь ссылкой</p>
              </div>
              
              <div className="hidden md:block">
                <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              
              <div className="flex-1 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🎯</span>
                </div>
                <h4 className="font-semibold mb-1">КЛИЕНТ</h4>
                <p className="text-sm text-gray-600">Регистрируется и оплачивает</p>
              </div>
              
              <div className="hidden md:block">
                <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              
              <div className="flex-1 text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">💵</span>
                </div>
                <h4 className="font-semibold mb-1">ВЫПЛАТА</h4>
                <p className="text-sm text-gray-600">Комиссия вам</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

