// components/partners/landing/FAQ.tsx

import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqs: FAQItem[] = [
    {
      question: 'Как начисляется комиссия?',
      answer: 'Комиссия начисляется с КАЖДОГО платежа приведённого вами клиента — и за запуск магазина, и за квартальное обслуживание. Это настоящий пассивный доход: клиент платит каждый квартал — вы получаете комиссию! Процент зависит от вашего уровня (от 10% до 20%).',
    },
    {
      question: 'Когда я получу выплату?',
      answer: 'Выплаты производятся еженедельно по понедельникам. Минимальная сумма для вывода — $50. Если баланс меньше — накапливается до следующей выплаты.',
    },
    {
      question: 'Как долго действует моя реферальная ссылка?',
      answer: 'НАВСЕГДА. Клиент закрепляется за вами бессрочно. Нет никаких ограничений по времени — если клиент перешёл по вашей ссылке и зарегистрировался, он ваш навсегда.',
    },
    {
      question: 'Получу ли я комиссию с повторных платежей клиента?',
      answer: 'ДА! Это главное преимущество нашей программы. Вы получаете комиссию с КАЖДОГО платежа клиента, пока он пользуется сервисом. Один клиент может приносить вам доход годами.',
    },
    {
      question: 'Могу ли я привлекать клиентов из любых стран?',
      answer: 'Да, программа работает для клиентов из любых стран. Основной фокус — русскоязычные селлеры, но ограничений нет.',
    },
    {
      question: 'Есть ли ограничения на количество рефералов?',
      answer: 'Нет. Вы можете привлекать неограниченное количество клиентов и зарабатывать без каких-либо лимитов.',
    },
    {
      question: 'Как я узнаю, что клиент оплатил?',
      answer: 'Вы получите уведомление в личном кабинете и на email. Статус реферала обновится на "Оплачено", и комиссия будет начислена на ваш баланс.',
    },
    {
      question: 'Могу ли я продвигать ссылку в рекламе?',
      answer: 'Да, но запрещено использовать бренд "Shopify Bridge" в контекстной рекламе (Google Ads, Яндекс.Директ). Таргетированная реклама в соцсетях — разрешена.',
    },
    {
      question: 'Что если клиент перешёл по моей ссылке, но зарегистрировался позже?',
      answer: 'Клиент всё равно будет закреплён за вами. Мы сохраняем привязку в cookie и localStorage без ограничений по времени. Даже если клиент вернётся через месяц — он ваш.',
    },
    {
      question: 'Сколько я могу заработать?',
      answer: 'Без ограничений! Пример: 10 клиентов на Growth Store при уровне "Золото" (15%): Запуск: 10 × $1,200 × 15% = $1,800. Обслуживание за год: 10 × $450 × 4 × 15% = $2,700. Итого за первый год: $4,500. Каждый следующий год: $2,700 пассивного дохода!',
    },
  ];
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Заголовок */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Частые вопросы о партнёрской программе
          </h2>
          
          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      openIndex === index ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4 text-gray-700">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

