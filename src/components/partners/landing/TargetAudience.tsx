// components/partners/landing/TargetAudience.tsx

import React from 'react';

export const TargetAudience: React.FC = () => {
  const audiences = [
    {
      icon: '👥',
      title: 'Селлеры с комьюнити',
      description: 'У вас есть друзья-селлеры или вы состоите в чатах. Рекомендуйте Shopify Bridge тем, кто хочет выйти за рубеж.',
    },
    {
      icon: '📱',
      title: 'Блогеры и инфлюенсеры',
      description: 'Ведёте блог или канал про e-commerce. Делитесь полезными инструментами с аудиторией.',
    },
    {
      icon: '🎓',
      title: 'Эксперты и консультанты',
      description: 'Консультируете селлеров по бизнесу. Добавьте Shopify Bridge в свои рекомендации.',
    },
    {
      icon: '🏢',
      title: 'Агентства и сервисы',
      description: 'Работаете с селлерами по другим услугам. Предложите дополнительное решение для международных продаж.',
    },
  ];
  
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Заголовок */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Идеальные партнёры
          </h2>
          
          {/* Карточки */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {audiences.map((audience, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8 border border-blue-100">
                <div className="text-5xl mb-4">{audience.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{audience.title}</h3>
                <p className="text-gray-700">{audience.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

