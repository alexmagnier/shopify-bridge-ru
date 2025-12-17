import { useState, useEffect, createContext, useContext, ReactNode, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

// ============================================
// SHOPIFY BRIDGE RU - ПОЛНЫЙ САЙТ
// Новая цветовая схема: Изумруд + Медь
// ============================================

// ============================================
// LANGUAGE CONTEXT & TRANSLATIONS
// ============================================
type Language = 'ru' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};

const translations: Record<Language, Record<string, string>> = {
  ru: {
    // Header
    'nav.home': 'Главная',
    'nav.howItWorks': 'Как это работает',
    'nav.fulfillment': 'Фулфилмент',
    'nav.pricing': 'Тарифы',
    'nav.faq': 'FAQ',
    'nav.contact': 'Обсудить запуск',
    
    // Hero Section
    'hero.badge': '🌍 Для российских предпринимателей',
    'hero.title1': 'Ваш товар в Дубае —',
    'hero.title2': 'продажи по всему миру',
    'hero.subtitle': 'Размещаем вашу продукцию в фулфилмент-центре ОАЭ. Создаём Shopify-магазин. Принимаем Visa/Mastercard. Выплачиваем в USDT еженедельно.',
    'hero.benefit1': '✓ Никакой статформы — товар уходит ДО продаж',
    'hero.benefit2': '✓ Начните с 10-50 единиц — тест без риска',
    'hero.benefit3': '✓ Российская таможня больше не ваша проблема',
    'hero.cta': 'Обсудить запуск',
    'hero.note': 'Бесплатная консультация • Ответим за 24 часа',
    'hero.stat1.value': '2-3',
    'hero.stat1.label': 'недели до старта',
    'hero.stat2.value': '6%',
    'hero.stat2.label': 'минимальная комиссия',
    'hero.stat3.value': '180+',
    'hero.stat3.label': 'стран доставки',
    'hero.stat4.value': 'USDT',
    'hero.stat4.label': 'еженедельные выплаты',
    
    // Problem Section
    'problem.label': 'Проблема',
    'problem.title1': 'Почему российские селлеры',
    'problem.title2': 'не могут продавать за рубеж',
    'problem.1.title': 'Статформа на каждую единицу',
    'problem.1.desc': 'ФТС требует декларацию на КАЖДЫЙ товар при экспорте. Штраф до 50 000₽ за единицу без правильного оформления.',
    'problem.2.title': 'Нет документов происхождения',
    'problem.2.desc': '99% товаров в России — серый импорт. Нет ТН ВЭД кодов, нет записей о ввозе. Легальный экспорт невозможен.',
    'problem.3.title': 'Непосильные расходы',
    'problem.3.desc': 'Бухгалтер на статформы, таможенный брокер, валютный контроль. Для мелких селлеров это нереально.',
    'problem.warning': 'Даже крупные селлеры на Ozon и Wildberries закрывают продажи в СНГ',
    'problem.warningText': ' — не потому что не хотят эту выручку, а потому что не могут справиться с таможенной документацией.',
    
    // Solution Section
    'solution.label': 'Решение',
    'solution.title1': 'Мы не экспортируем из России.',
    'solution.title2': 'Мы перемещаем товар в Дубай ДО продаж.',
    'solution.subtitle': 'Как только ваш товар в Дубае — российские экспортные правила больше не применяются. Вы продаёте из международного хаба, а не из России. Это легально.',
    'solution.old.title': '❌ Классический экспорт из РФ',
    'solution.old.1': 'Статформа на каждую единицу товара',
    'solution.old.2': 'Штраф до 50 000₽ за каждую ошибку',
    'solution.old.3': 'Нужны документы происхождения',
    'solution.old.4': 'Нужен бухгалтер + таможенный брокер',
    'solution.old.5': 'Только для крупных с белым импортом',
    'solution.new.title': '✅ Наша модель',
    'solution.new.1': 'Товар перемещается ДО продаж — статформа не нужна',
    'solution.new.2': 'Нулевой риск штрафов',
    'solution.new.3': 'Работаем с любым товаром',
    'solution.new.4': 'Мы берём всю логистику на себя',
    'solution.new.5': 'Начните с 10-50 единиц — проверьте спрос',
    
    // How It Works Section
    'howItWorks.label': 'Процесс',
    'howItWorks.title1': 'От товара до первой продажи —',
    'howItWorks.title2': '5 простых шагов',
    'howItWorks.step1.title': 'Пилотная партия',
    'howItWorks.step1.desc': 'Вы готовите небольшую партию товара (10-100 единиц). Идеально для теста спроса без больших рисков.',
    'howItWorks.step1.highlight': 'Низкий риск входа',
    'howItWorks.step2.title': 'Релокация в Дубай',
    'howItWorks.step2.desc': 'Мы перемещаем товар в фулфилмент-центр в ОАЭ. Никакой статформы, никаких экспортных деклараций.',
    'howItWorks.step2.highlight': 'Обходим таможню РФ',
    'howItWorks.step3.title': 'Shopify-магазин',
    'howItWorks.step3.desc': 'Создаём полноценный интернет-магазин на вашем домене. Приём карт Visa, Mastercard, Apple Pay, Google Pay.',
    'howItWorks.step3.highlight': 'Международные платежи',
    'howItWorks.step4.title': 'Продажи по миру',
    'howItWorks.step4.desc': 'Заказы отправляются напрямую из Дубая покупателям в США, Европу, Азию — куда угодно.',
    'howItWorks.step4.highlight': '180+ стран',
    'howItWorks.step5.title': 'USDT-выплаты',
    'howItWorks.step5.desc': 'Еженедельные выплаты в USDT на ваш кошелёк. Прозрачный отчёт по каждой транзакции.',
    'howItWorks.step5.highlight': 'Каждую неделю',
    'howItWorks.timeline': '⏱ Срок запуска:',
    'howItWorks.timelineValue': '2-3 недели',
    'howItWorks.timelineText': 'до первых продаж',
    
    // Target Audience Section
    'audience.label': 'Для кого',
    'audience.title': 'Идеально подходит для:',
    'audience.1.title': 'Производители и хендмейд',
    'audience.1.desc': 'Свой товар, свои документы, полный контроль. Ювелирка, одежда, косметика, аксессуары.',
    'audience.2.title': 'Тестирование рынка',
    'audience.2.desc': 'Начните с малой партии, проверьте спрос, масштабируйтесь когда докажете продажи.',
    'audience.3.title': 'Бренды с производством',
    'audience.3.desc': 'Контролируемое производство в России или СНГ. Готовы к международной экспансии.',
    'audience.4.title': 'Закупка из Китая',
    'audience.4.desc': 'Отправляйте товар напрямую в Дубай, минуя Россию полностью.',
    'audience.disclaimer.title': 'Честно говорим: наш сервис не подходит для:',
    'audience.disclaimer.1': 'Крупных перепродавцов серого товара без документов',
    'audience.disclaimer.2': 'Тех, кто хочет отправлять каждый заказ из России',
    'audience.disclaimer.3': 'Тех, кто не готов начать с пилотной партии',
    
    // Transparency Section
    'transparency.label': 'Прозрачность',
    'transparency.title1': 'Вы видите всё.',
    'transparency.title2': 'В реальном времени.',
    'transparency.subtitle': 'Это ВАШ магазин на Shopify. Вы имеете полный доступ к админ-панели, видите каждый заказ, каждую транзакцию, каждую выплату.',
    'transparency.1.title': 'Заказы',
    'transparency.1.desc': 'Кто купил, что, когда, статус доставки',
    'transparency.2.title': 'Аналитика',
    'transparency.2.desc': 'Выручка, конверсия, топ товаров',
    'transparency.3.title': 'Финансы',
    'transparency.3.desc': 'Доходы, возвраты, комиссии, выплаты',
    'transparency.4.title': 'Товары',
    'transparency.4.desc': 'Каталог, цены, остатки на складе',
    'transparency.flow.title': 'Схема движения средств',
    'transparency.flow.buyer': 'Покупатель',
    'transparency.flow.buyerSub': 'Visa/MC',
    'transparency.flow.company': 'Shopify Bridge',
    'transparency.flow.companySub': 'UK Ltd',
    'transparency.flow.you': 'Вы',
    'transparency.flow.youSub': 'USDT',
    'transparency.flow.note': 'Это модель',
    'transparency.flow.morNote': 'Merchant of Record (MoR)',
    'transparency.flow.text': ' — стандартная практика в международной e-commerce. Так работают Shopify Payments, Stripe, Amazon и сотни других платформ.',
    
    // Why Us Section
    'whyUs.label': 'Гарантии',
    'whyUs.title1': '6 причин, почему',
    'whyUs.title2': 'нам можно доверять',
    'whyUs.1.title': 'Официальная компания',
    'whyUs.1.desc': 'Shopify Bridge (UK) Ltd зарегистрирована в Великобритании. Проверяйте сами: companieshouse.gov.uk',
    'whyUs.2.title': 'Международный контракт',
    'whyUs.2.desc': 'Заключаем официальный договор с обязательствами по выплатам, срокам и условиям.',
    'whyUs.3.title': 'Полный доступ к Shopify',
    'whyUs.3.desc': 'Это ВАШ магазин. Вы видите каждый заказ, каждую транзакцию. Сверяйте данные — всё прозрачно.',
    'whyUs.4.title': 'Еженедельные выплаты',
    'whyUs.4.desc': 'Деньги не зависают месяцами. Максимум "в пути" — 7 дней выручки. Полный отчёт с каждой выплатой.',
    'whyUs.5.title': 'Прозрачная отчётность',
    'whyUs.5.desc': 'Все продажи, возвраты, комиссии — видны в реальном времени. Никаких скрытых списаний.',
    'whyUs.6.title': 'Логика бизнес-модели',
    'whyUs.6.desc': 'Мы зарабатываем 6-12% с ваших продаж. Чем больше вы продаёте — тем больше мы зарабатываем. Нам выгоден ваш успех.',
    
    // Pricing Section
    'pricing.label': 'Тарифы',
    'pricing.title1': 'Прозрачные тарифы',
    'pricing.title2': 'без скрытых платежей',
    'pricing.starter.name': 'Starter',
    'pricing.starter.subtitle': 'Для тестирования рынка',
    'pricing.starter.commission': '+12% с продаж',
    'pricing.starter.limit': 'до $3,000/мес',
    'pricing.starter.f1': 'Шаблонный дизайн магазина',
    'pricing.starter.f2': 'Поддержка в групповом чате',
    'pricing.starter.f3': 'Еженедельные выплаты USDT',
    'pricing.starter.f4': 'Отчётность по продажам',
    'pricing.growth.name': 'Growth',
    'pricing.growth.subtitle': 'Для растущего бизнеса',
    'pricing.growth.commission': '+8% с продаж',
    'pricing.growth.limit': 'до $15,000/мес',
    'pricing.growth.f1': 'Индивидуальный дизайн магазина',
    'pricing.growth.f2': 'Персональный менеджер',
    'pricing.growth.f3': 'Приоритетная поддержка',
    'pricing.growth.f4': 'Детальная аналитика',
    'pricing.growth.f5': 'Еженедельные выплаты USDT',
    'pricing.scale.name': 'Scale',
    'pricing.scale.subtitle': 'Для серьёзных объёмов',
    'pricing.scale.commission': '+6% с продаж',
    'pricing.scale.limit': 'до $50,000/мес',
    'pricing.scale.f1': 'Премиум дизайн и кастомизация',
    'pricing.scale.f2': 'Выделенный менеджер',
    'pricing.scale.f3': 'Помощь с контентом',
    'pricing.scale.f4': 'Расширенная аналитика',
    'pricing.scale.f5': 'Консультации по маркетингу',
    'pricing.scale.f6': 'Еженедельные выплаты USDT',
    'pricing.popular': '⭐ Популярный',
    'pricing.month': '/мес',
    'pricing.commissionText': 'с продаж',
    'pricing.choose': 'Выбрать',
    'pricing.fulfillment.note': 'Фулфилмент оплачивается отдельно:',
    'pricing.fulfillment.text': 'Подключение к складу $399 (разово) • Хранение $299/мес • Обработка заказов $3/заказ',
    
    // FAQ Section
    'faq.label': 'FAQ',
    'faq.title': 'Частые вопросы',
    'faq.q1': 'А как же статформа и таможенные декларации?',
    'faq.a1': 'Мы не экспортируем товар из России традиционным способом. Товар перемещается в Дубай ДО начала продаж, поэтому статформа на каждую единицу не требуется. Как только товар в ОАЭ — российские экспортные правила больше не применяются.',
    'faq.q2': 'У меня товар ввезён в Россию "серым" путём. Это проблема?',
    'faq.a2': 'Для небольших пилотных партий — нет. Мы работаем с товаром, который вы готовы переместить в Дубай. Документы происхождения на каждую единицу не требуются.',
    'faq.q3': 'Почему деньги поступают на вашу компанию, а не на мою?',
    'faq.a3': 'Потому что для приёма международных платежей нужна компания за рубежом, банковский счёт и платёжный процессинг. Это $10,000-25,000 и 3-6 месяцев на оформление. Мы предоставляем готовую инфраструктуру за комиссию.',
    'faq.q4': 'Как я могу быть уверен, что вы выплатите деньги?',
    'faq.a4': 'У вас есть юридически обязывающий договор с UK-компанией. В случае нарушения вы можете обратиться в суд Великобритании. Кроме того, мы работаем с еженедельными выплатами — максимальный риск ограничен выручкой за 7 дней.',
    'faq.q5': 'Почему выплаты в USDT, а не на банковский счёт?',
    'faq.a5': 'Из-за санкций банковские переводы в Россию затруднены или невозможны. USDT — стейблкоин, привязанный к доллару 1:1, позволяет получать деньги быстро и без рисков заморозки.',
    'faq.q6': 'Какой минимальный объём товара для старта?',
    'faq.a6': 'Рекомендуем начинать с 10-100 единиц. Это позволяет протестировать спрос без больших вложений. Если товар продаётся — увеличиваете объёмы, если нет — минимизируете потери.',
    'faq.q7': 'Как быстро можно запуститься?',
    'faq.a7': 'От момента отправки товара до первых продаж — 2-3 недели. Это включает логистику в Дубай, настройку склада и создание Shopify-магазина.',
    'faq.q8': 'Почему именно Дубай?',
    'faq.a8': 'ОАЭ не под санкциями, отличная логистика в США/Европу/Азию, налоговые льготы в свободных зонах. Дубай — один из крупнейших логистических хабов мира с развитой инфраструктурой.',
    
    // CTA Section
    'cta.title1': 'Готовы выйти на',
    'cta.title2': 'международный рынок?',
    'cta.subtitle': 'Оставьте заявку — обсудим ваш товар и рассчитаем экономику запуска. Консультация бесплатная.',
    'cta.button': 'Получить консультацию',
    'cta.note1': '🔒 Ваши данные защищены',
    'cta.note2': '⏱ Ответим за 24 часа',
    'cta.note3': '💬 Без навязчивых звонков',
    
    // Contact Page
    'contact.label': 'Контакты',
    'contact.title1': 'Готовы начать?',
    'contact.title2': 'Обсудим ваш проект',
    'contact.subtitle': 'Заполните форму или напишите нам напрямую. Мы ответим в течение 24 часов.',
    'contact.email': 'Email',
    'contact.telegram': 'Telegram',
    'contact.company': 'Компания',
    'contact.formTitle': 'Заявка на консультацию',
    'contact.name': 'Ваше имя',
    'contact.namePh': 'Александр',
    'contact.contactField': 'Telegram или WhatsApp',
    'contact.contactPh': '@username или +7...',
    'contact.product': 'Что продаёте?',
    'contact.productPh': 'Ювелирные украшения, одежда...',
    'contact.volume': 'Примерный объём',
    'contact.volumePh': 'Выберите объём',
    'contact.volume1': '10-50 единиц (тест)',
    'contact.volume2': '50-200 единиц',
    'contact.volume3': '200-500 единиц',
    'contact.volume4': '500+ единиц',
    'contact.message': 'Дополнительная информация',
    'contact.messagePh': 'Расскажите подробнее о вашем проекте...',
    'contact.submit': 'Отправить заявку',
    'contact.privacy': '🔒 Ваши данные защищены и не передаются третьим лицам',
    
    // Footer
    'footer.description': 'Инфраструктура для международных продаж российских предпринимателей.',
    'footer.navigation': 'Навигация',
    'footer.contacts': 'Контакты',
    'footer.company': 'Компания',
    'footer.companyName': 'Shopify Bridge (UK) Ltd',
    'footer.companyReg': 'Registered in England & Wales',
    'footer.copyright': '© 2025 Shopify Bridge RU. Все права защищены.',
    'footer.privacy': 'Политика конфиденциальности',
    'footer.terms': 'Условия использования',
    
    // Pages Headers
    'page.howItWorks.title1': 'Как работает',
    'page.howItWorks.title2': 'Shopify Bridge',
    'page.howItWorks.subtitle': 'Полная инфраструктура для продажи ваших товаров международным покупателям',
    'page.fulfillment.title1': 'Профессиональный фулфилмент',
    'page.fulfillment.title2': 'из Дубая',
    'page.fulfillment.subtitle': 'Ваш товар хранится на складе в ОАЭ и отправляется напрямую покупателям по всему миру.',
    'page.pricing.title1': 'Тарифы и',
    'page.pricing.title2': 'цены',
    'page.pricing.subtitle': 'Прозрачное ценообразование. Никаких скрытых платежей и неожиданных комиссий.',
    'page.faq.title1': 'Частые',
    'page.faq.title2': 'вопросы',
    'page.faq.subtitle': 'Ответы на самые популярные вопросы о работе с Shopify Bridge',
    
    // Fulfillment Page
    'fulfillment.stats.1': 'доставка в США/EU',
    'fulfillment.stats.2': 'за заказ',
    'fulfillment.stats.3': 'стран доставки',
    'fulfillment.stats.4': 'учёт остатков',
    'fulfillment.cycle.title': 'Полный цикл обработки',
    'fulfillment.step1.title': 'Приёмка товара',
    'fulfillment.step1.desc': 'Приёмка и сверка с накладной, проверка целостности, фотофиксация (по запросу), присвоение SKU, размещение на стеллажах.',
    'fulfillment.step1.time': '1-2 рабочих дня',
    'fulfillment.step2.title': 'Хранение и учёт',
    'fulfillment.step2.desc': 'Климат-контроль, система WMS, реальтайм учёт остатков, интеграция с Shopify, ежемесячная инвентаризация.',
    'fulfillment.step2.time': 'Постоянно',
    'fulfillment.step3.title': 'Обработка заказа',
    'fulfillment.step3.desc': 'Автоматическое получение заказа, комплектация, проверка качества, упаковка, печать этикеток.',
    'fulfillment.step3.time': 'В тот же день (до 14:00 UTC)',
    'fulfillment.step4.title': 'Отправка',
    'fulfillment.step4.desc': 'Передача в DHL/FedEx/Aramex, генерация трек-номера, автоматическое уведомление покупателя.',
    'fulfillment.step4.time': '3-7 дней доставка',
    'fulfillment.step5.title': 'Возвраты',
    'fulfillment.step5.desc': 'Приёмка возврата, проверка состояния, возврат на полку или списание, отчёт о причине.',
    'fulfillment.step5.time': '48 часов обработка',
    'fulfillment.whyDubai.title1': 'Почему именно',
    'fulfillment.whyDubai.title2': 'Дубай',
    'fulfillment.dubai.1.title': 'Географическое положение',
    'fulfillment.dubai.1.desc': '4 часа до Европы, 8 часов до США, 3-4 часа до Азии. Доставка в большинство стран за 3-7 дней.',
    'fulfillment.dubai.2.title': 'Отсутствие санкций',
    'fulfillment.dubai.2.desc': 'ОАЭ не под западными санкциями. Нет ограничений на платежи и доставку. Стабильная банковская система.',
    'fulfillment.dubai.3.title': 'Развитая инфраструктура',
    'fulfillment.dubai.3.desc': 'Порт Джебель-Али — 9-й в мире. Аэропорт DXB — крупнейший по международному трафику. Все крупные перевозчики.',
    'fulfillment.dubai.4.title': 'Налоговые преимущества',
    'fulfillment.dubai.4.desc': '0% корпоративный налог в свободных зонах. 0% НДС на экспорт. Репатриация прибыли без ограничений.',
    'fulfillment.dubai.5.title': 'Скорость и надёжность',
    'fulfillment.dubai.5.desc': 'Таможенное оформление за часы. Круглосуточная работа портов. Высокие стандарты сервиса.',
    'fulfillment.pricing.title': 'Стоимость фулфилмента',
    'fulfillment.pricing.setup': 'Подключение к складу',
    'fulfillment.pricing.setupNote': 'разово',
    'fulfillment.pricing.storage': 'Хранение',
    'fulfillment.pricing.storageNote': '/месяц',
    'fulfillment.pricing.processing': 'Обработка заказа',
    'fulfillment.pricing.processingNote': '/заказ',
    'fulfillment.pricing.returns': 'Обработка возврата',
    'fulfillment.pricing.returnsNote': '/возврат',
    'fulfillment.pricing.example': 'Пример расчёта: 50 заказов/мес, США',
    'fulfillment.pricing.exStorage': 'Хранение:',
    'fulfillment.pricing.exProcessing': 'Обработка (50 × $3):',
    'fulfillment.pricing.exShipping': 'Доставка (50 × $15):',
    'fulfillment.pricing.exTotal': 'Итого:',
  },
  en: {
    // Header
    'nav.home': 'Home',
    'nav.howItWorks': 'How It Works',
    'nav.fulfillment': 'Fulfillment',
    'nav.pricing': 'Pricing',
    'nav.faq': 'FAQ',
    'nav.contact': 'Get Started',
    
    // Hero Section
    'hero.badge': '🌍 For Russian Entrepreneurs',
    'hero.title1': 'Your Products in Dubai —',
    'hero.title2': 'Sales Worldwide',
    'hero.subtitle': 'We place your products in a UAE fulfillment center. Create a Shopify store. Accept Visa/Mastercard. Pay out in USDT weekly.',
    'hero.benefit1': '✓ No customs declaration — goods ship BEFORE sales',
    'hero.benefit2': '✓ Start with 10-50 units — test without risk',
    'hero.benefit3': '✓ Russian customs is no longer your problem',
    'hero.cta': 'Get Started',
    'hero.note': 'Free consultation • Response within 24 hours',
    'hero.stat1.value': '2-3',
    'hero.stat1.label': 'weeks to launch',
    'hero.stat2.value': '6%',
    'hero.stat2.label': 'minimum commission',
    'hero.stat3.value': '180+',
    'hero.stat3.label': 'countries delivery',
    'hero.stat4.value': 'USDT',
    'hero.stat4.label': 'weekly payouts',
    
    // Problem Section
    'problem.label': 'Problem',
    'problem.title1': 'Why Russian Sellers',
    'problem.title2': 'Can\'t Sell Internationally',
    'problem.1.title': 'Declaration for Every Unit',
    'problem.1.desc': 'Russian customs requires a declaration for EVERY item on export. Fines up to $500 per unit without proper documentation.',
    'problem.2.title': 'No Origin Documents',
    'problem.2.desc': '99% of goods in Russia are gray imports. No HS codes, no import records. Legal export is impossible.',
    'problem.3.title': 'Unaffordable Costs',
    'problem.3.desc': 'Accountant for declarations, customs broker, currency control. For small sellers, this is unrealistic.',
    'problem.warning': 'Even major sellers on Ozon and Wildberries close CIS sales',
    'problem.warningText': ' — not because they don\'t want the revenue, but because they can\'t handle customs documentation.',
    
    // Solution Section
    'solution.label': 'Solution',
    'solution.title1': 'We don\'t export from Russia.',
    'solution.title2': 'We relocate goods to Dubai BEFORE sales.',
    'solution.subtitle': 'Once your goods are in Dubai — Russian export rules no longer apply. You\'re selling from an international hub, not from Russia. This is legal.',
    'solution.old.title': '❌ Traditional Russian Export',
    'solution.old.1': 'Declaration for every unit',
    'solution.old.2': 'Fines up to $500 for each error',
    'solution.old.3': 'Origin documents required',
    'solution.old.4': 'Need accountant + customs broker',
    'solution.old.5': 'Only for large businesses with white imports',
    'solution.new.title': '✅ Our Model',
    'solution.new.1': 'Goods relocated BEFORE sales — no declarations',
    'solution.new.2': 'Zero risk of fines',
    'solution.new.3': 'We work with any products',
    'solution.new.4': 'We handle all logistics',
    'solution.new.5': 'Start with 10-50 units — test demand',
    
    // How It Works Section
    'howItWorks.label': 'Process',
    'howItWorks.title1': 'From product to first sale —',
    'howItWorks.title2': '5 simple steps',
    'howItWorks.step1.title': 'Pilot Batch',
    'howItWorks.step1.desc': 'You prepare a small batch of goods (10-100 units). Perfect for testing demand without major risks.',
    'howItWorks.step1.highlight': 'Low entry risk',
    'howItWorks.step2.title': 'Relocation to Dubai',
    'howItWorks.step2.desc': 'We move your goods to a fulfillment center in the UAE. No customs declarations, no export paperwork.',
    'howItWorks.step2.highlight': 'Bypass Russian customs',
    'howItWorks.step3.title': 'Shopify Store',
    'howItWorks.step3.desc': 'We create a full-featured online store on your domain. Accept Visa, Mastercard, Apple Pay, Google Pay.',
    'howItWorks.step3.highlight': 'International payments',
    'howItWorks.step4.title': 'Worldwide Sales',
    'howItWorks.step4.desc': 'Orders ship directly from Dubai to customers in USA, Europe, Asia — anywhere.',
    'howItWorks.step4.highlight': '180+ countries',
    'howItWorks.step5.title': 'USDT Payouts',
    'howItWorks.step5.desc': 'Weekly payouts in USDT to your wallet. Transparent report for every transaction.',
    'howItWorks.step5.highlight': 'Every week',
    'howItWorks.timeline': '⏱ Launch time:',
    'howItWorks.timelineValue': '2-3 weeks',
    'howItWorks.timelineText': 'to first sales',
    
    // Target Audience Section
    'audience.label': 'Who It\'s For',
    'audience.title': 'Perfect for:',
    'audience.1.title': 'Manufacturers & Handmade',
    'audience.1.desc': 'Your own products, your documents, full control. Jewelry, clothing, cosmetics, accessories.',
    'audience.2.title': 'Market Testing',
    'audience.2.desc': 'Start with a small batch, test demand, scale up once you prove sales.',
    'audience.3.title': 'Brands with Production',
    'audience.3.desc': 'Controlled manufacturing in Russia or CIS. Ready for international expansion.',
    'audience.4.title': 'Sourcing from China',
    'audience.4.desc': 'Ship goods directly to Dubai, bypassing Russia completely.',
    'audience.disclaimer.title': 'Honestly: our service is NOT for:',
    'audience.disclaimer.1': 'Large resellers of gray goods without documents',
    'audience.disclaimer.2': 'Those who want to ship every order from Russia',
    'audience.disclaimer.3': 'Those not ready to start with a pilot batch',
    
    // Transparency Section
    'transparency.label': 'Transparency',
    'transparency.title1': 'You see everything.',
    'transparency.title2': 'In real-time.',
    'transparency.subtitle': 'This is YOUR Shopify store. You have full access to the admin panel, see every order, every transaction, every payout.',
    'transparency.1.title': 'Orders',
    'transparency.1.desc': 'Who bought, what, when, delivery status',
    'transparency.2.title': 'Analytics',
    'transparency.2.desc': 'Revenue, conversion, top products',
    'transparency.3.title': 'Finances',
    'transparency.3.desc': 'Income, returns, commissions, payouts',
    'transparency.4.title': 'Products',
    'transparency.4.desc': 'Catalog, prices, warehouse stock',
    'transparency.flow.title': 'Payment Flow',
    'transparency.flow.buyer': 'Customer',
    'transparency.flow.buyerSub': 'Visa/MC',
    'transparency.flow.company': 'Shopify Bridge',
    'transparency.flow.companySub': 'UK Ltd',
    'transparency.flow.you': 'You',
    'transparency.flow.youSub': 'USDT',
    'transparency.flow.note': 'This is a',
    'transparency.flow.morNote': 'Merchant of Record (MoR)',
    'transparency.flow.text': ' model — standard practice in international e-commerce. This is how Shopify Payments, Stripe, Amazon and hundreds of other platforms work.',
    
    // Why Us Section
    'whyUs.label': 'Guarantees',
    'whyUs.title1': '6 reasons why',
    'whyUs.title2': 'you can trust us',
    'whyUs.1.title': 'Official Company',
    'whyUs.1.desc': 'Shopify Bridge (UK) Ltd is registered in the United Kingdom. Check yourself: companieshouse.gov.uk',
    'whyUs.2.title': 'International Contract',
    'whyUs.2.desc': 'We sign an official agreement with obligations for payouts, terms and conditions.',
    'whyUs.3.title': 'Full Shopify Access',
    'whyUs.3.desc': 'This is YOUR store. You see every order, every transaction. Verify the data — everything is transparent.',
    'whyUs.4.title': 'Weekly Payouts',
    'whyUs.4.desc': 'Money doesn\'t sit for months. Maximum "in transit" — 7 days of revenue. Full report with each payout.',
    'whyUs.5.title': 'Transparent Reporting',
    'whyUs.5.desc': 'All sales, returns, commissions — visible in real-time. No hidden charges.',
    'whyUs.6.title': 'Business Model Logic',
    'whyUs.6.desc': 'We earn 6-12% of your sales. The more you sell — the more we earn. Your success is our success.',
    
    // Pricing Section
    'pricing.label': 'Pricing',
    'pricing.title1': 'Transparent Pricing',
    'pricing.title2': 'No Hidden Fees',
    'pricing.starter.name': 'Starter',
    'pricing.starter.subtitle': 'For market testing',
    'pricing.starter.commission': '+12% of sales',
    'pricing.starter.limit': 'up to $3,000/mo',
    'pricing.starter.f1': 'Template store design',
    'pricing.starter.f2': 'Group chat support',
    'pricing.starter.f3': 'Weekly USDT payouts',
    'pricing.starter.f4': 'Sales reports',
    'pricing.growth.name': 'Growth',
    'pricing.growth.subtitle': 'For growing business',
    'pricing.growth.commission': '+8% of sales',
    'pricing.growth.limit': 'up to $15,000/mo',
    'pricing.growth.f1': 'Custom store design',
    'pricing.growth.f2': 'Personal manager',
    'pricing.growth.f3': 'Priority support',
    'pricing.growth.f4': 'Detailed analytics',
    'pricing.growth.f5': 'Weekly USDT payouts',
    'pricing.scale.name': 'Scale',
    'pricing.scale.subtitle': 'For serious volumes',
    'pricing.scale.commission': '+6% of sales',
    'pricing.scale.limit': 'up to $50,000/mo',
    'pricing.scale.f1': 'Premium design & customization',
    'pricing.scale.f2': 'Dedicated manager',
    'pricing.scale.f3': 'Content assistance',
    'pricing.scale.f4': 'Advanced analytics',
    'pricing.scale.f5': 'Marketing consultations',
    'pricing.scale.f6': 'Weekly USDT payouts',
    'pricing.popular': '⭐ Popular',
    'pricing.month': '/mo',
    'pricing.commissionText': 'of sales',
    'pricing.choose': 'Choose',
    'pricing.fulfillment.note': 'Fulfillment is billed separately:',
    'pricing.fulfillment.text': 'Warehouse setup $399 (one-time) • Storage $299/mo • Order processing $3/order',
    
    // FAQ Section
    'faq.label': 'FAQ',
    'faq.title': 'Frequently Asked Questions',
    'faq.q1': 'What about customs declarations and export paperwork?',
    'faq.a1': 'We don\'t export goods from Russia traditionally. Goods are relocated to Dubai BEFORE sales begin, so per-unit declarations aren\'t required. Once goods are in UAE — Russian export rules no longer apply.',
    'faq.q2': 'My goods were imported to Russia via "gray" channels. Is this a problem?',
    'faq.a2': 'For small pilot batches — no. We work with goods you\'re ready to relocate to Dubai. Origin documents for each unit are not required.',
    'faq.q3': 'Why does money go to your company and not mine?',
    'faq.a3': 'Because accepting international payments requires an offshore company, bank account, and payment processing. That\'s $10,000-25,000 and 3-6 months to set up. We provide ready infrastructure for a commission.',
    'faq.q4': 'How can I be sure you\'ll pay out my money?',
    'faq.a4': 'You have a legally binding contract with a UK company. In case of violation, you can sue in UK courts. Plus, we work with weekly payouts — maximum risk is limited to 7 days of revenue.',
    'faq.q5': 'Why payouts in USDT instead of bank transfer?',
    'faq.a5': 'Due to sanctions, bank transfers to Russia are difficult or impossible. USDT is a stablecoin pegged 1:1 to the dollar, allowing fast payments without freeze risks.',
    'faq.q6': 'What\'s the minimum order quantity to start?',
    'faq.a6': 'We recommend starting with 10-100 units. This lets you test demand without major investment. If it sells — scale up; if not — minimize losses.',
    'faq.q7': 'How quickly can we launch?',
    'faq.a7': 'From shipping goods to first sales — 2-3 weeks. This includes logistics to Dubai, warehouse setup, and Shopify store creation.',
    'faq.q8': 'Why Dubai specifically?',
    'faq.a8': 'UAE isn\'t sanctioned, excellent logistics to USA/Europe/Asia, tax benefits in free zones. Dubai is one of the world\'s largest logistics hubs with developed infrastructure.',
    
    // CTA Section
    'cta.title1': 'Ready to go',
    'cta.title2': 'international?',
    'cta.subtitle': 'Submit a request — we\'ll discuss your products and calculate launch economics. Consultation is free.',
    'cta.button': 'Get Consultation',
    'cta.note1': '🔒 Your data is protected',
    'cta.note2': '⏱ Response within 24 hours',
    'cta.note3': '💬 No pushy calls',
    
    // Contact Page
    'contact.label': 'Contact',
    'contact.title1': 'Ready to start?',
    'contact.title2': 'Let\'s discuss your project',
    'contact.subtitle': 'Fill out the form or write us directly. We\'ll respond within 24 hours.',
    'contact.email': 'Email',
    'contact.telegram': 'Telegram',
    'contact.company': 'Company',
    'contact.formTitle': 'Consultation Request',
    'contact.name': 'Your Name',
    'contact.namePh': 'Alexander',
    'contact.contactField': 'Telegram or WhatsApp',
    'contact.contactPh': '@username or +1...',
    'contact.product': 'What are you selling?',
    'contact.productPh': 'Jewelry, clothing...',
    'contact.volume': 'Approximate Volume',
    'contact.volumePh': 'Select volume',
    'contact.volume1': '10-50 units (test)',
    'contact.volume2': '50-200 units',
    'contact.volume3': '200-500 units',
    'contact.volume4': '500+ units',
    'contact.message': 'Additional Information',
    'contact.messagePh': 'Tell us more about your project...',
    'contact.submit': 'Submit Request',
    'contact.privacy': '🔒 Your data is protected and not shared with third parties',
    
    // Footer
    'footer.description': 'Infrastructure for international sales of Russian entrepreneurs.',
    'footer.navigation': 'Navigation',
    'footer.contacts': 'Contacts',
    'footer.company': 'Company',
    'footer.companyName': 'Shopify Bridge (UK) Ltd',
    'footer.companyReg': 'Registered in England & Wales',
    'footer.copyright': '© 2025 Shopify Bridge RU. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Use',
    
    // Pages Headers
    'page.howItWorks.title1': 'How',
    'page.howItWorks.title2': 'Shopify Bridge Works',
    'page.howItWorks.subtitle': 'Complete infrastructure for selling your products to international buyers',
    'page.fulfillment.title1': 'Professional Fulfillment',
    'page.fulfillment.title2': 'from Dubai',
    'page.fulfillment.subtitle': 'Your goods are stored in a UAE warehouse and shipped directly to customers worldwide.',
    'page.pricing.title1': 'Pricing and',
    'page.pricing.title2': 'Rates',
    'page.pricing.subtitle': 'Transparent pricing. No hidden fees or unexpected charges.',
    'page.faq.title1': 'Frequently Asked',
    'page.faq.title2': 'Questions',
    'page.faq.subtitle': 'Answers to the most common questions about working with Shopify Bridge',
    
    // Fulfillment Page
    'fulfillment.stats.1': 'delivery to USA/EU',
    'fulfillment.stats.2': 'per order',
    'fulfillment.stats.3': 'countries delivery',
    'fulfillment.stats.4': 'inventory tracking',
    'fulfillment.cycle.title': 'Full Processing Cycle',
    'fulfillment.step1.title': 'Goods Reception',
    'fulfillment.step1.desc': 'Reception and verification with invoice, integrity check, photo documentation (on request), SKU assignment, shelf placement.',
    'fulfillment.step1.time': '1-2 business days',
    'fulfillment.step2.title': 'Storage & Tracking',
    'fulfillment.step2.desc': 'Climate control, WMS system, real-time inventory tracking, Shopify integration, monthly inventory audits.',
    'fulfillment.step2.time': 'Ongoing',
    'fulfillment.step3.title': 'Order Processing',
    'fulfillment.step3.desc': 'Automatic order receipt, picking, quality check, packing, label printing.',
    'fulfillment.step3.time': 'Same day (before 2PM UTC)',
    'fulfillment.step4.title': 'Shipping',
    'fulfillment.step4.desc': 'Handover to DHL/FedEx/Aramex, tracking number generation, automatic customer notification.',
    'fulfillment.step4.time': '3-7 days delivery',
    'fulfillment.step5.title': 'Returns',
    'fulfillment.step5.desc': 'Return reception, condition check, return to shelf or write-off, reason report.',
    'fulfillment.step5.time': '48 hours processing',
    'fulfillment.whyDubai.title1': 'Why',
    'fulfillment.whyDubai.title2': 'Dubai',
    'fulfillment.dubai.1.title': 'Geographic Location',
    'fulfillment.dubai.1.desc': '4 hours to Europe, 8 hours to USA, 3-4 hours to Asia. Delivery to most countries in 3-7 days.',
    'fulfillment.dubai.2.title': 'No Sanctions',
    'fulfillment.dubai.2.desc': 'UAE not under Western sanctions. No restrictions on payments and delivery. Stable banking system.',
    'fulfillment.dubai.3.title': 'Developed Infrastructure',
    'fulfillment.dubai.3.desc': 'Jebel Ali Port — 9th in the world. DXB Airport — largest by international traffic. All major carriers.',
    'fulfillment.dubai.4.title': 'Tax Benefits',
    'fulfillment.dubai.4.desc': '0% corporate tax in free zones. 0% VAT on exports. Profit repatriation without restrictions.',
    'fulfillment.dubai.5.title': 'Speed & Reliability',
    'fulfillment.dubai.5.desc': 'Customs clearance in hours. 24/7 port operations. High service standards.',
    'fulfillment.pricing.title': 'Fulfillment Costs',
    'fulfillment.pricing.setup': 'Warehouse Setup',
    'fulfillment.pricing.setupNote': 'one-time',
    'fulfillment.pricing.storage': 'Storage',
    'fulfillment.pricing.storageNote': '/month',
    'fulfillment.pricing.processing': 'Order Processing',
    'fulfillment.pricing.processingNote': '/order',
    'fulfillment.pricing.returns': 'Return Processing',
    'fulfillment.pricing.returnsNote': '/return',
    'fulfillment.pricing.example': 'Example calculation: 50 orders/mo, USA',
    'fulfillment.pricing.exStorage': 'Storage:',
    'fulfillment.pricing.exProcessing': 'Processing (50 × $3):',
    'fulfillment.pricing.exShipping': 'Shipping (50 × $15):',
    'fulfillment.pricing.exTotal': 'Total:',
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('ru');
  
  const t = (key: string): string => {
    return translations[language][key] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// ============================================
// INTERSECTION OBSERVER HOOK FOR ANIMATIONS
// ============================================
const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Можно отключить наблюдение после первого появления
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      }
    }, {
      threshold: 0.1,
      ...options
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isVisible };
};

// CSS Variables and Global Styles
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700&display=swap');
    
    :root {
      --primary: #0A6B5C;
      --primary-dark: #085548;
      --primary-light: #0E8A77;
      --accent: #E07A5F;
      --accent-dark: #C96A52;
      --accent-light: #F09B85;
      --bg-cream: #FAF7F2;
      --bg-dark: #1C1C28;
      --bg-dark-lighter: #252535;
      --text-dark: #1C1C28;
      --text-light: #FAFAFA;
      --text-muted: #6B7280;
      --border: #E5E1D8;
      --success: #10B981;
      --warning: #F59E0B;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    html {
      scroll-behavior: smooth;
    }
    
    body {
      font-family: 'Manrope', sans-serif;
      background: var(--bg-cream);
      color: var(--text-dark);
      line-height: 1.6;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-40px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(40px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
    
    @keyframes shimmer {
      0% { background-position: -1000px 0; }
      100% { background-position: 1000px 0; }
    }
    
    .animate-fade-in {
      animation: fadeIn 0.8s ease-out forwards;
      opacity: 0;
    }
    
    .animate-slide-up {
      animation: fadeInUp 0.8s ease-out forwards;
      opacity: 0;
    }
    
    .animate-slide-left {
      animation: slideInLeft 0.8s ease-out forwards;
      opacity: 0;
    }
    
    .animate-slide-right {
      animation: slideInRight 0.8s ease-out forwards;
      opacity: 0;
    }
    
    .animate-scale {
      animation: scaleIn 0.6s ease-out forwards;
      opacity: 0;
    }
    
    .delay-100 { animation-delay: 0.1s; }
    .delay-200 { animation-delay: 0.2s; }
    .delay-300 { animation-delay: 0.3s; }
    .delay-400 { animation-delay: 0.4s; }
    .delay-500 { animation-delay: 0.5s; }
    .delay-600 { animation-delay: 0.6s; }
    .delay-700 { animation-delay: 0.7s; }
    .delay-800 { animation-delay: 0.8s; }
    
    /* Mobile responsiveness */
    @media (max-width: 768px) {
      .container {
        padding: 0 16px;
      }
      
      body {
        font-size: 14px;
      }
      
      h1 {
        font-size: 32px !important;
      }
      
      h2 {
        font-size: 28px !important;
      }
      
      h3 {
        font-size: 20px !important;
      }
    }
    
    @media (max-width: 480px) {
      .container {
        padding: 0 12px;
      }
      
      h1 {
        font-size: 28px !important;
      }
      
      h2 {
        font-size: 24px !important;
      }
    }
  `}</style>
);

// ============================================
// HEADER COMPONENT
// ============================================
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/how-it-works', label: t('nav.howItWorks') },
    { path: '/fulfillment', label: t('nav.fulfillment') },
    { path: '/pricing', label: t('nav.pricing') },
    { path: '/faq', label: t('nav.faq') },
  ];

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: isScrolled ? 'rgba(28, 28, 40, 0.98)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(20px)' : 'none',
      transition: 'all 0.3s ease',
      borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.1)' : 'none',
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 24px',
      }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, var(--primary), var(--primary-light))',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: '800',
            fontSize: '18px',
          }}>SB</div>
          <span style={{
            color: 'var(--text-light)',
            fontWeight: '700',
            fontSize: '20px',
          }}>Shopify Bridge <span style={{ color: 'var(--accent)' }}>RU</span></span>
        </Link>

        {/* Desktop Navigation */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
        }} className="desktop-nav">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                color: location.pathname === link.path ? 'var(--accent)' : 'var(--text-light)',
                textDecoration: 'none',
                fontSize: '15px',
                fontWeight: '500',
                transition: 'color 0.2s ease',
                opacity: location.pathname === link.path ? 1 : 0.8,
              }}
            >{link.label}</Link>
          ))}
          
          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              padding: '8px 16px',
              color: 'var(--text-light)',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
            }}
          >
            <span style={{ fontSize: '16px' }}>🌐</span>
            {language === 'ru' ? 'EN' : 'RU'}
          </button>
          
          <Link to="/contact" style={{
            background: 'var(--accent)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '14px',
            transition: 'all 0.2s ease',
          }}>{t('nav.contact')}</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'var(--text-light)',
            cursor: 'pointer',
            padding: '8px',
          }}
          className="mobile-menu-btn"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {isMobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="animate-slide-up"
          style={{
            background: 'var(--bg-dark)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          }}
        >
          {navLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`animate-slide-left delay-${index * 100}`}
              style={{
                color: 'var(--text-light)',
                textDecoration: 'none',
                fontSize: '16px',
                padding: '12px 0',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--accent)';
                e.currentTarget.style.paddingLeft = '8px';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-light)';
                e.currentTarget.style.paddingLeft = '0';
              }}
            >{link.label}</Link>
          ))}
          
          {/* Mobile Language Switcher */}
          <button
            onClick={() => {
              setLanguage(language === 'ru' ? 'en' : 'ru');
              setIsMobileMenuOpen(false);
            }}
            className="animate-scale delay-500"
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              padding: '12px 24px',
              color: 'var(--text-light)',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            }}
          >
            <span style={{ fontSize: '18px' }}>🌐</span>
            {language === 'ru' ? 'Switch to English' : 'Переключить на Русский'}
          </button>
          
          <Link
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="animate-scale delay-600"
            style={{
              background: 'var(--accent)',
              color: 'white',
              padding: '16px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              textAlign: 'center',
              marginTop: '8px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(224, 122, 95, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >{t('nav.contact')} →</Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
};

// ============================================
// HERO SECTION
// ============================================
const HeroSection = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useIntersectionObserver();
  
  return (
  <section ref={ref} style={{
    background: 'linear-gradient(135deg, var(--bg-dark) 0%, #0D2B26 50%, var(--bg-dark) 100%)',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    paddingTop: '80px',
  }}>
    {/* Animated Background Elements */}
    <div style={{
      position: 'absolute',
      top: '20%',
      right: '10%',
      width: '400px',
      height: '400px',
      background: 'radial-gradient(circle, rgba(10, 107, 92, 0.3) 0%, transparent 70%)',
      borderRadius: '50%',
      filter: 'blur(60px)',
      animation: 'float 6s ease-in-out infinite',
    }} />
    <div style={{
      position: 'absolute',
      bottom: '20%',
      left: '5%',
      width: '300px',
      height: '300px',
      background: 'radial-gradient(circle, rgba(224, 122, 95, 0.2) 0%, transparent 70%)',
      borderRadius: '50%',
      filter: 'blur(50px)',
      animation: 'float 8s ease-in-out infinite reverse',
    }} />

    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center',
      }}>
        <div className={isVisible ? 'animate-fade-in' : ''} style={{
          display: 'inline-block',
          background: 'rgba(10, 107, 92, 0.2)',
          border: '1px solid rgba(10, 107, 92, 0.4)',
          borderRadius: '100px',
          padding: '8px 20px',
          marginBottom: '24px',
        }}>
          <span style={{ color: 'var(--primary-light)', fontSize: '14px', fontWeight: '600' }}>
            {t('hero.badge')}
          </span>
        </div>

        <h1 className={isVisible ? 'animate-slide-up delay-100' : ''} style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(32px, 6vw, 64px)',
          fontWeight: '700',
          color: 'var(--text-light)',
          lineHeight: '1.1',
          marginBottom: '24px',
        }}>
          {t('hero.title1')}<br/>
          <span style={{ color: 'var(--accent)' }}>{t('hero.title2')}</span>
        </h1>

        <p className={isVisible ? 'animate-slide-up delay-200' : ''} style={{
          fontSize: 'clamp(16px, 2vw, 18px)',
          color: 'rgba(255,255,255,0.8)',
          maxWidth: '600px',
          margin: '0 auto 20px',
          lineHeight: '1.7',
          padding: '0 16px',
        }}>
          {t('hero.subtitle')}
        </p>

        <div className={isVisible ? 'animate-slide-up delay-300' : ''} style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '40px',
          padding: '0 16px',
        }}>
          {[
            t('hero.benefit1'),
            t('hero.benefit2'),
            t('hero.benefit3'),
          ].map((item, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(255,255,255,0.05)',
                padding: '10px 16px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.borderColor = 'rgba(10, 107, 92, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              }}
            >
              <span style={{ color: 'var(--text-light)', fontSize: 'clamp(12px, 2vw, 14px)' }}>{item}</span>
            </div>
          ))}
        </div>

        <div className={isVisible ? 'animate-slide-up delay-400' : ''} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}>
          <Link
            to="/contact"
            style={{
              background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))',
              color: 'white',
              padding: '18px 48px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '16px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 24px rgba(224, 122, 95, 0.4)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(224, 122, 95, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 24px rgba(224, 122, 95, 0.4)';
            }}
          >
            {t('hero.cta')}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
            {t('hero.note')}
          </span>
        </div>
      </div>

      {/* Stats Row */}
      <div className={isVisible ? 'animate-slide-up delay-500' : ''} style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
        gap: '16px',
        marginTop: '60px',
        maxWidth: '700px',
        margin: '60px auto 0',
        padding: '0 16px',
      }}>
        {[
          { value: t('hero.stat1.value'), label: t('hero.stat1.label') },
          { value: t('hero.stat2.value'), label: t('hero.stat2.label') },
          { value: t('hero.stat3.value'), label: t('hero.stat3.label') },
          { value: t('hero.stat4.value'), label: t('hero.stat4.label') },
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              textAlign: 'center',
              padding: '20px 12px',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.08)',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(224, 122, 95, 0.2)';
              e.currentTarget.style.borderColor = 'rgba(224, 122, 95, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
            }}
          >
            <div style={{
              fontSize: 'clamp(24px, 4vw, 28px)',
              fontWeight: '800',
              color: 'var(--accent)',
              marginBottom: '4px',
            }}>{stat.value}</div>
            <div style={{
              fontSize: 'clamp(11px, 2vw, 13px)',
              color: 'rgba(255,255,255,0.6)',
            }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

// ============================================
// PROBLEM SECTION
// ============================================
const ProblemSection = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useIntersectionObserver();
  
  return (
  <section ref={ref} style={{
    background: 'var(--bg-cream)',
    padding: 'clamp(60px, 10vw, 100px) 0',
  }}>
    <div className="container">
      <div className={isVisible ? 'animate-slide-up' : ''} style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span style={{
          color: 'var(--accent)',
          fontWeight: '600',
          fontSize: '14px',
          textTransform: 'uppercase',
          letterSpacing: '2px',
        }}>{t('problem.label')}</span>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(28px, 4vw, 42px)',
          fontWeight: '700',
          color: 'var(--text-dark)',
          marginTop: '12px',
        }}>
          {t('problem.title1')}<br/>
          <span style={{ color: 'var(--primary)' }}>{t('problem.title2')}</span>
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
      }}>
        {[
          {
            icon: '📋',
            title: t('problem.1.title'),
            desc: t('problem.1.desc'),
            color: '#DC2626',
          },
          {
            icon: '📦',
            title: t('problem.2.title'),
            desc: t('problem.2.desc'),
            color: '#DC2626',
          },
          {
            icon: '💰',
            title: t('problem.3.title'),
            desc: t('problem.3.desc'),
            color: '#DC2626',
          },
        ].map((item, i) => (
          <div
            key={i}
            className={isVisible ? `animate-slide-up delay-${(i + 1) * 100}` : ''}
            style={{
              background: 'white',
              borderRadius: '16px',
              padding: '32px',
              border: '1px solid var(--border)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'default',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 20px 48px rgba(0,0,0,0.12)';
              e.currentTarget.style.borderColor = `${item.color}40`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
              e.currentTarget.style.borderColor = 'var(--border)';
            }}
          >
            <div style={{
              width: '56px',
              height: '56px',
              background: `${item.color}15`,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              marginBottom: '20px',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(-5deg) scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(0) scale(1)'}
            >{item.icon}</div>
            <h3 style={{
              fontSize: 'clamp(16px, 2.5vw, 18px)',
              fontWeight: '700',
              color: 'var(--text-dark)',
              marginBottom: '12px',
            }}>{item.title}</h3>
            <p style={{
              fontSize: 'clamp(14px, 2vw, 15px)',
              color: 'var(--text-muted)',
              lineHeight: '1.6',
            }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <div
        className={isVisible ? 'animate-slide-up delay-400' : ''}
        style={{
          background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
          borderRadius: '16px',
          padding: 'clamp(20px, 3vw, 24px) clamp(24px, 4vw, 32px)',
          marginTop: '40px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          border: '1px solid #F59E0B',
          boxShadow: '0 4px 16px rgba(245, 158, 11, 0.15)',
        }}
      >
        <span style={{ fontSize: 'clamp(24px, 3vw, 28px)', flexShrink: 0 }}>⚠️</span>
        <p style={{
          fontSize: 'clamp(14px, 2vw, 15px)',
          color: '#92400E',
          lineHeight: '1.6',
        }}>
          <strong>{t('problem.warning')}</strong>{t('problem.warningText')}
        </p>
      </div>
    </div>
  </section>
  );
};

// ============================================
// SOLUTION SECTION
// ============================================
const SolutionSection = () => {
  const { t } = useLanguage();
  return (
  <section style={{
    background: 'var(--bg-dark)',
    padding: '100px 0',
    position: 'relative',
    overflow: 'hidden',
  }}>
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '600px',
      height: '600px',
      background: 'radial-gradient(circle, rgba(10, 107, 92, 0.15) 0%, transparent 60%)',
      borderRadius: '50%',
    }} />

    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span style={{
          color: 'var(--accent)',
          fontWeight: '600',
          fontSize: '14px',
          textTransform: 'uppercase',
          letterSpacing: '2px',
        }}>{t('solution.label')}</span>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(28px, 4vw, 42px)',
          fontWeight: '700',
          color: 'var(--text-light)',
          marginTop: '12px',
        }}>
          {t('solution.title1')}<br/>
          <span style={{ color: 'var(--primary-light)' }}>{t('solution.title2')}</span>
        </h2>
        <p style={{
          fontSize: '18px',
          color: 'rgba(255,255,255,0.7)',
          maxWidth: '600px',
          margin: '20px auto 0',
        }}>
          {t('solution.subtitle')}
        </p>
      </div>

      {/* Comparison Table */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        <div style={{
          background: 'rgba(220, 38, 38, 0.1)',
          borderRadius: '16px',
          padding: '32px',
          border: '1px solid rgba(220, 38, 38, 0.3)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '24px',
          }}>
            <span style={{ fontSize: '24px' }}>❌</span>
            <h3 style={{ color: '#FCA5A5', fontSize: '18px', fontWeight: '700' }}>
              {t('solution.old.title')}
            </h3>
          </div>
          {[
            t('solution.old.1'),
            t('solution.old.2'),
            t('solution.old.3'),
            t('solution.old.4'),
            t('solution.old.5'),
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              padding: '12px 0',
              borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.1)' : 'none',
            }}>
              <span style={{ color: '#FCA5A5' }}>✗</span>
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>{item}</span>
            </div>
          ))}
        </div>

        <div style={{
          background: 'rgba(10, 107, 92, 0.15)',
          borderRadius: '16px',
          padding: '32px',
          border: '1px solid rgba(10, 107, 92, 0.4)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '24px',
          }}>
            <span style={{ fontSize: '24px' }}>✅</span>
            <h3 style={{ color: 'var(--primary-light)', fontSize: '18px', fontWeight: '700' }}>
              {t('solution.new.title')}
            </h3>
          </div>
          {[
            t('solution.new.1'),
            t('solution.new.2'),
            t('solution.new.3'),
            t('solution.new.4'),
            t('solution.new.5'),
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              padding: '12px 0',
              borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.1)' : 'none',
            }}>
              <span style={{ color: 'var(--primary-light)' }}>✓</span>
              <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
  );
};

// ============================================
// HOW IT WORKS SECTION
// ============================================
const HowItWorksSection = () => {
  const { t } = useLanguage();
  return (
  <section style={{
    background: 'var(--bg-cream)',
    padding: '100px 0',
  }}>
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span style={{
          color: 'var(--accent)',
          fontWeight: '600',
          fontSize: '14px',
          textTransform: 'uppercase',
          letterSpacing: '2px',
        }}>{t('howItWorks.label')}</span>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(28px, 4vw, 42px)',
          fontWeight: '700',
          color: 'var(--text-dark)',
          marginTop: '12px',
        }}>
          {t('howItWorks.title1')}<br/>
          <span style={{ color: 'var(--primary)' }}>{t('howItWorks.title2')}</span>
        </h2>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
        position: 'relative',
      }}>
        {/* Vertical Line */}
        <div style={{
          position: 'absolute',
          left: '40px',
          top: '40px',
          bottom: '40px',
          width: '2px',
          background: 'linear-gradient(to bottom, var(--primary), var(--accent))',
          display: 'none',
        }} className="timeline-line" />

        {[
          {
            step: 1,
            icon: '📦',
            title: t('howItWorks.step1.title'),
            desc: t('howItWorks.step1.desc'),
            highlight: t('howItWorks.step1.highlight'),
          },
          {
            step: 2,
            icon: '✈️',
            title: t('howItWorks.step2.title'),
            desc: t('howItWorks.step2.desc'),
            highlight: t('howItWorks.step2.highlight'),
          },
          {
            step: 3,
            icon: '🏪',
            title: t('howItWorks.step3.title'),
            desc: t('howItWorks.step3.desc'),
            highlight: t('howItWorks.step3.highlight'),
          },
          {
            step: 4,
            icon: '🌍',
            title: t('howItWorks.step4.title'),
            desc: t('howItWorks.step4.desc'),
            highlight: t('howItWorks.step4.highlight'),
          },
          {
            step: 5,
            icon: '💰',
            title: t('howItWorks.step5.title'),
            desc: t('howItWorks.step5.desc'),
            highlight: t('howItWorks.step5.highlight'),
          },
        ].map((item, i) => (
          <div key={i} style={{
            display: 'grid',
            gridTemplateColumns: '80px 1fr',
            gap: '24px',
            alignItems: 'start',
            padding: '24px 0',
            borderBottom: i < 4 ? '1px solid var(--border)' : 'none',
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, var(--primary), var(--primary-light))',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              position: 'relative',
              boxShadow: '0 8px 24px rgba(10, 107, 92, 0.3)',
            }}>
              {item.icon}
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                width: '28px',
                height: '28px',
                background: 'var(--accent)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px',
                fontWeight: '700',
              }}>{item.step}</span>
            </div>
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '8px',
                flexWrap: 'wrap',
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: 'var(--text-dark)',
                }}>{item.title}</h3>
                <span style={{
                  background: 'rgba(10, 107, 92, 0.1)',
                  color: 'var(--primary)',
                  padding: '4px 12px',
                  borderRadius: '100px',
                  fontSize: '12px',
                  fontWeight: '600',
                }}>{item.highlight}</span>
              </div>
              <p style={{
                fontSize: '15px',
                color: 'var(--text-muted)',
                lineHeight: '1.6',
              }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        textAlign: 'center',
        marginTop: '48px',
        padding: '24px',
        background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
        borderRadius: '16px',
      }}>
        <span style={{ color: 'white', fontSize: '18px', fontWeight: '600' }}>
          {t('howItWorks.timeline')} <span style={{ color: 'var(--accent-light)' }}>{t('howItWorks.timelineValue')}</span> {t('howItWorks.timelineText')}
        </span>
      </div>
    </div>
  </section>
  );
};

// ============================================
// TARGET AUDIENCE SECTION
// ============================================
const TargetAudienceSection = () => {
  const { t } = useLanguage();
  return (
  <section style={{
    background: 'white',
    padding: '100px 0',
  }}>
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span style={{
          color: 'var(--accent)',
          fontWeight: '600',
          fontSize: '14px',
          textTransform: 'uppercase',
          letterSpacing: '2px',
        }}>{t('audience.label')}</span>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(28px, 4vw, 42px)',
          fontWeight: '700',
          color: 'var(--text-dark)',
          marginTop: '12px',
        }}>
          {t('audience.title')}
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '20px',
        marginBottom: '48px',
      }}>
        {[
          {
            icon: '🎨',
            title: t('audience.1.title'),
            desc: t('audience.1.desc'),
          },
          {
            icon: '🧪',
            title: t('audience.2.title'),
            desc: t('audience.2.desc'),
          },
          {
            icon: '🏭',
            title: t('audience.3.title'),
            desc: t('audience.3.desc'),
          },
          {
            icon: '🇨🇳',
            title: t('audience.4.title'),
            desc: t('audience.4.desc'),
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--bg-cream)',
            borderRadius: '16px',
            padding: '28px',
            border: '1px solid var(--border)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--primary)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            <span style={{ fontSize: '40px', display: 'block', marginBottom: '16px' }}>{item.icon}</span>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '700',
              color: 'var(--text-dark)',
              marginBottom: '8px',
            }}>{item.title}</h3>
            <p style={{
              fontSize: '14px',
              color: 'var(--text-muted)',
              lineHeight: '1.6',
            }}>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div style={{
        background: 'rgba(220, 38, 38, 0.05)',
        borderRadius: '16px',
        padding: '24px 32px',
        border: '1px solid rgba(220, 38, 38, 0.2)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '16px',
        }}>
          <span style={{ fontSize: '24px' }}>⚠️</span>
          <div>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '700',
              color: 'var(--text-dark)',
              marginBottom: '8px',
            }}>{t('audience.disclaimer.title')}</h4>
            <ul style={{
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}>
              {[
                t('audience.disclaimer.1'),
                t('audience.disclaimer.2'),
                t('audience.disclaimer.3'),
              ].map((item, i) => (
                <li key={i} style={{
                  fontSize: '14px',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <span style={{ color: '#DC2626' }}>✗</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

// ============================================
// TRANSPARENCY SECTION (NEW - Key differentiator)
// ============================================
const TransparencySection = () => {
  const { t } = useLanguage();
  return (
  <section style={{
    background: 'linear-gradient(135deg, var(--bg-dark) 0%, #0D2B26 100%)',
    padding: '100px 0',
    position: 'relative',
  }}>
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span style={{
          color: 'var(--accent)',
          fontWeight: '600',
          fontSize: '14px',
          textTransform: 'uppercase',
          letterSpacing: '2px',
        }}>{t('transparency.label')}</span>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(28px, 4vw, 42px)',
          fontWeight: '700',
          color: 'var(--text-light)',
          marginTop: '12px',
        }}>
          {t('transparency.title1')}<br/>
          <span style={{ color: 'var(--primary-light)' }}>{t('transparency.title2')}</span>
        </h2>
        <p style={{
          fontSize: '18px',
          color: 'rgba(255,255,255,0.7)',
          maxWidth: '600px',
          margin: '20px auto 0',
        }}>
          {t('transparency.subtitle')}
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '48px',
      }}>
        {[
          { icon: '📦', title: t('transparency.1.title'), desc: t('transparency.1.desc') },
          { icon: '📊', title: t('transparency.2.title'), desc: t('transparency.2.desc') },
          { icon: '💰', title: t('transparency.3.title'), desc: t('transparency.3.desc') },
          { icon: '🏷', title: t('transparency.4.title'), desc: t('transparency.4.desc') },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid rgba(255,255,255,0.1)',
            textAlign: 'center',
          }}>
            <span style={{ fontSize: '36px', display: 'block', marginBottom: '12px' }}>{item.icon}</span>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '700',
              color: 'var(--text-light)',
              marginBottom: '4px',
            }}>{item.title}</h3>
            <p style={{
              fontSize: '13px',
              color: 'rgba(255,255,255,0.6)',
            }}>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Payment Flow */}
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '20px',
        padding: '40px',
        border: '1px solid rgba(255,255,255,0.1)',
      }}>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          color: 'var(--text-light)',
          marginBottom: '32px',
          textAlign: 'center',
        }}>{t('transparency.flow.title')}</h3>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          {[
            { label: t('transparency.flow.buyer'), sublabel: 'Visa/MC', icon: '👤' },
            { label: '', icon: '→' },
            { label: 'Shopify Bridge', sublabel: 'UK Ltd', icon: '🏛' },
            { label: '', icon: '→' },
            { label: t('transparency.flow.you'), sublabel: 'USDT', icon: '💰' },
          ].map((item, i) => (
            item.icon === '→' ? (
              <span key={i} style={{ color: 'var(--accent)', fontSize: '24px', fontWeight: '700' }}>→</span>
            ) : (
              <div key={i} style={{
                background: 'rgba(10, 107, 92, 0.2)',
                borderRadius: '12px',
                padding: '20px 24px',
                textAlign: 'center',
                minWidth: '140px',
              }}>
                <span style={{ fontSize: '32px', display: 'block', marginBottom: '8px' }}>{item.icon}</span>
                <div style={{ color: 'var(--text-light)', fontWeight: '600', fontSize: '14px' }}>{item.label}</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>{item.sublabel}</div>
              </div>
            )
          ))}
        </div>

        <div style={{
          marginTop: '32px',
          padding: '20px',
          background: 'rgba(10, 107, 92, 0.1)',
          borderRadius: '12px',
          textAlign: 'center',
        }}>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', lineHeight: '1.6' }}>
            {t('transparency.flow.note')} <strong style={{ color: 'var(--primary-light)' }}>{t('transparency.flow.morNote')}</strong>{t('transparency.flow.text')}
          </p>
        </div>
      </div>
    </div>
  </section>
  );
};

// ============================================
// WHY US SECTION
// ============================================
const WhyUsSection = () => {
  const { t } = useLanguage();
  return (
  <section style={{
    background: 'var(--bg-cream)',
    padding: '100px 0',
  }}>
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span style={{
          color: 'var(--accent)',
          fontWeight: '600',
          fontSize: '14px',
          textTransform: 'uppercase',
          letterSpacing: '2px',
        }}>{t('whyUs.label')}</span>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(28px, 4vw, 42px)',
          fontWeight: '700',
          color: 'var(--text-dark)',
          marginTop: '12px',
        }}>
          {t('whyUs.title1')}<br/>
          <span style={{ color: 'var(--primary)' }}>{t('whyUs.title2')}</span>
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '20px',
      }}>
        {[
          {
            icon: '🏛',
            title: t('whyUs.1.title'),
            desc: t('whyUs.1.desc'),
          },
          {
            icon: '📄',
            title: t('whyUs.2.title'),
            desc: t('whyUs.2.desc'),
          },
          {
            icon: '🖥',
            title: t('whyUs.3.title'),
            desc: t('whyUs.3.desc'),
          },
          {
            icon: '💰',
            title: t('whyUs.4.title'),
            desc: t('whyUs.4.desc'),
          },
          {
            icon: '📊',
            title: t('whyUs.5.title'),
            desc: t('whyUs.5.desc'),
          },
          {
            icon: '🧠',
            title: t('whyUs.6.title'),
            desc: t('whyUs.6.desc'),
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'white',
            borderRadius: '16px',
            padding: '28px',
            border: '1px solid var(--border)',
            display: 'flex',
            gap: '16px',
            alignItems: 'flex-start',
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, var(--primary), var(--primary-light))',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              flexShrink: 0,
            }}>{item.icon}</div>
            <div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: 'var(--text-dark)',
                marginBottom: '4px',
              }}>{item.title}</h3>
              <p style={{
                fontSize: '14px',
                color: 'var(--text-muted)',
                lineHeight: '1.5',
              }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

// ============================================
// PRICING SECTION
// ============================================
const PricingSection = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useIntersectionObserver();
  
  return (
  <section ref={ref} style={{
    background: 'white',
    padding: 'clamp(60px, 10vw, 100px) 0',
  }}>
    <div className="container">
      <div className={isVisible ? 'animate-slide-up' : ''} style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span style={{
          color: 'var(--accent)',
          fontWeight: '600',
          fontSize: '14px',
          textTransform: 'uppercase',
          letterSpacing: '2px',
        }}>{t('pricing.label')}</span>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(28px, 4vw, 42px)',
          fontWeight: '700',
          color: 'var(--text-dark)',
          marginTop: '12px',
        }}>
          {t('pricing.title1')}<br/>
          <span style={{ color: 'var(--primary)' }}>{t('pricing.title2')}</span>
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        maxWidth: '1000px',
        margin: '0 auto',
      }}>
        {[
          {
            name: 'Starter',
            subtitle: t('pricing.starter.subtitle'),
            price: '$99',
            commission: '12%',
            limit: t('pricing.starter.limit'),
            features: [
              t('pricing.starter.f1'),
              t('pricing.starter.f2'),
              t('pricing.starter.f3'),
              t('pricing.starter.f4'),
            ],
            popular: false,
          },
          {
            name: 'Growth',
            subtitle: t('pricing.growth.subtitle'),
            price: '$199',
            commission: '8%',
            limit: t('pricing.growth.limit'),
            features: [
              t('pricing.growth.f1'),
              t('pricing.growth.f2'),
              t('pricing.growth.f3'),
              t('pricing.growth.f4'),
              t('pricing.growth.f5'),
            ],
            popular: true,
          },
          {
            name: 'Scale',
            subtitle: t('pricing.scale.subtitle'),
            price: '$399',
            commission: '6%',
            limit: t('pricing.scale.limit'),
            features: [
              t('pricing.scale.f1'),
              t('pricing.scale.f2'),
              t('pricing.scale.f3'),
              t('pricing.scale.f4'),
              t('pricing.scale.f5'),
              t('pricing.scale.f6'),
            ],
            popular: false,
          },
        ].map((plan, i) => (
          <div key={i} style={{
            background: plan.popular ? 'linear-gradient(135deg, var(--primary), var(--primary-dark))' : 'var(--bg-cream)',
            borderRadius: '20px',
            padding: '32px',
            border: plan.popular ? 'none' : '1px solid var(--border)',
            position: 'relative',
            transform: plan.popular ? 'scale(1.05)' : 'none',
          }}>
            {plan.popular && (
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'var(--accent)',
                color: 'white',
                padding: '6px 16px',
                borderRadius: '100px',
                fontSize: '12px',
                fontWeight: '700',
              }}>{t('pricing.popular')}</div>
            )}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: '22px',
                fontWeight: '700',
                color: plan.popular ? 'white' : 'var(--text-dark)',
                marginBottom: '4px',
              }}>{plan.name}</h3>
              <p style={{
                fontSize: '14px',
                color: plan.popular ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)',
              }}>{plan.subtitle}</p>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <span style={{
                fontSize: '42px',
                fontWeight: '800',
                color: plan.popular ? 'white' : 'var(--text-dark)',
              }}>{plan.price}</span>
              <span style={{
                fontSize: '16px',
                color: plan.popular ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)',
              }}>{t('pricing.month')}</span>
            </div>
            <div style={{
              display: 'flex',
              gap: '12px',
              marginBottom: '24px',
            }}>
              <span style={{
                background: plan.popular ? 'rgba(255,255,255,0.2)' : 'rgba(10, 107, 92, 0.1)',
                color: plan.popular ? 'white' : 'var(--primary)',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '600',
              }}>+{plan.commission} {t('pricing.commissionText')}</span>
              <span style={{
                background: plan.popular ? 'rgba(255,255,255,0.2)' : 'rgba(224, 122, 95, 0.1)',
                color: plan.popular ? 'white' : 'var(--accent)',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '600',
              }}>{plan.limit}</span>
            </div>
            <ul style={{
              listStyle: 'none',
              marginBottom: '24px',
            }}>
              {plan.features.map((feature, j) => (
                <li key={j} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 0',
                  fontSize: '14px',
                  color: plan.popular ? 'rgba(255,255,255,0.9)' : 'var(--text-dark)',
                }}>
                  <span style={{ color: plan.popular ? 'var(--accent-light)' : 'var(--primary)' }}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <Link to="/contact" style={{
              display: 'block',
              background: plan.popular ? 'white' : 'var(--primary)',
              color: plan.popular ? 'var(--primary)' : 'white',
              padding: '14px',
              borderRadius: '10px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '15px',
              textAlign: 'center',
              transition: 'all 0.2s ease',
            }}>{t('pricing.choose')}</Link>
          </div>
        ))}
      </div>

      {/* Fulfillment Note */}
      <div style={{
        marginTop: '48px',
        padding: '24px 32px',
        background: 'var(--bg-cream)',
        borderRadius: '16px',
        border: '1px solid var(--border)',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
          <strong style={{ color: 'var(--text-dark)' }}>{t('pricing.fulfillment.note')}</strong> {t('pricing.fulfillment.text')}
        </p>
      </div>
    </div>
  </section>
  );
};

// ============================================
// FAQ SECTION
// ============================================
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useLanguage();

  const faqs = [
    {
      q: t('faq.q1'),
      a: t('faq.a1'),
    },
    {
      q: t('faq.q2'),
      a: t('faq.a2'),
    },
    {
      q: t('faq.q3'),
      a: t('faq.a3'),
    },
    {
      q: t('faq.q4'),
      a: t('faq.a4'),
    },
    {
      q: t('faq.q5'),
      a: t('faq.a5'),
    },
    {
      q: t('faq.q6'),
      a: t('faq.a6'),
    },
    {
      q: t('faq.q7'),
      a: t('faq.a7'),
    },
    {
      q: t('faq.q8'),
      a: t('faq.a8'),
    },
  ];

  return (
    <section style={{
      background: 'var(--bg-cream)',
      padding: '100px 0',
    }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{
            color: 'var(--accent)',
            fontWeight: '600',
            fontSize: '14px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
          }}>{t('faq.label')}</span>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: '700',
            color: 'var(--text-dark)',
            marginTop: '12px',
          }}>
            {t('faq.title')}
          </h2>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{
              background: 'white',
              borderRadius: '12px',
              marginBottom: '12px',
              border: '1px solid var(--border)',
              overflow: 'hidden',
            }}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  width: '100%',
                  padding: '20px 24px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textAlign: 'left',
                }}
              >
                <span style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: 'var(--text-dark)',
                }}>{faq.q}</span>
                <span style={{
                  color: 'var(--primary)',
                  fontSize: '24px',
                  transform: openIndex === i ? 'rotate(45deg)' : 'none',
                  transition: 'transform 0.2s ease',
                }}>+</span>
              </button>
              {openIndex === i && (
                <div style={{
                  padding: '0 24px 20px',
                }}>
                  <p style={{
                    fontSize: '15px',
                    color: 'var(--text-muted)',
                    lineHeight: '1.7',
                  }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// CTA SECTION
// ============================================
const CTASection = () => {
  const { t } = useLanguage();
  return (
  <section style={{
    background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--bg-dark) 100%)',
    padding: '100px 0',
    position: 'relative',
    overflow: 'hidden',
  }}>
    <div style={{
      position: 'absolute',
      top: '0',
      right: '0',
      width: '500px',
      height: '500px',
      background: 'radial-gradient(circle, rgba(224, 122, 95, 0.15) 0%, transparent 60%)',
      borderRadius: '50%',
    }} />
    
    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
      <div style={{
        maxWidth: '700px',
        margin: '0 auto',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(28px, 4vw, 42px)',
          fontWeight: '700',
          color: 'var(--text-light)',
          marginBottom: '20px',
        }}>
          {t('cta.title1')}<br/>
          <span style={{ color: 'var(--accent)' }}>{t('cta.title2')}</span>
        </h2>
        <p style={{
          fontSize: '18px',
          color: 'rgba(255,255,255,0.7)',
          marginBottom: '40px',
        }}>
          {t('cta.subtitle')}
        </p>

        <Link to="/contact" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'var(--accent)',
          color: 'white',
          padding: '18px 48px',
          borderRadius: '12px',
          textDecoration: 'none',
          fontWeight: '700',
          fontSize: '16px',
          boxShadow: '0 4px 24px rgba(224, 122, 95, 0.4)',
        }}>
          {t('cta.button')}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '24px',
          marginTop: '24px',
          flexWrap: 'wrap',
        }}>
          {[
            t('cta.note1'),
            t('cta.note2'),
            t('cta.note3'),
          ].map((item, i) => (
            <span key={i} style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '13px',
            }}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  </section>
  );
};

// ============================================
// FOOTER
// ============================================
const Footer = () => {
  const { t } = useLanguage();
  return (
  <footer style={{
    background: 'var(--bg-dark)',
    padding: '60px 0 30px',
    borderTop: '1px solid rgba(255,255,255,0.1)',
  }}>
    <div className="container">
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '40px',
        marginBottom: '40px',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              background: 'linear-gradient(135deg, var(--primary), var(--primary-light))',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '800',
              fontSize: '14px',
            }}>SB</div>
            <span style={{ color: 'var(--text-light)', fontWeight: '700', fontSize: '18px' }}>
              Shopify Bridge <span style={{ color: 'var(--accent)' }}>RU</span>
            </span>
          </div>
          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '14px',
            lineHeight: '1.6',
          }}>
            {t('footer.description')}
          </p>
        </div>

        <div>
          <h4 style={{ color: 'var(--text-light)', fontSize: '14px', fontWeight: '700', marginBottom: '16px' }}>
            {t('footer.navigation')}
          </h4>
          {[
            { path: '/', label: t('nav.home') },
            { path: '/how-it-works', label: t('nav.howItWorks') },
            { path: '/fulfillment', label: t('nav.fulfillment') },
            { path: '/pricing', label: t('nav.pricing') },
            { path: '/faq', label: t('nav.faq') },
          ].map(link => (
            <Link key={link.path} to={link.path} style={{
              display: 'block',
              color: 'rgba(255,255,255,0.6)',
              textDecoration: 'none',
              fontSize: '14px',
              padding: '6px 0',
            }}>{link.label}</Link>
          ))}
        </div>

        <div>
          <h4 style={{ color: 'var(--text-light)', fontSize: '14px', fontWeight: '700', marginBottom: '16px' }}>
            {t('footer.contacts')}
          </h4>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginBottom: '8px' }}>
            📧 hello@shopifybridge.ru
          </p>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginBottom: '8px' }}>
            💬 Telegram: @shopifybridge
          </p>
        </div>

        <div>
          <h4 style={{ color: 'var(--text-light)', fontSize: '14px', fontWeight: '700', marginBottom: '16px' }}>
            {t('footer.company')}
          </h4>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', lineHeight: '1.6' }}>
            {t('footer.companyName')}<br/>
            {t('footer.companyReg')}<br/>
            <span style={{ color: 'var(--primary-light)' }}>companieshouse.gov.uk</span>
          </p>
        </div>
      </div>

      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.1)',
        paddingTop: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>
          {t('footer.copyright')}
        </p>
        <div style={{ display: 'flex', gap: '24px' }}>
          <a href="#" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', textDecoration: 'none' }}>
            {t('footer.privacy')}
          </a>
          <a href="#" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', textDecoration: 'none' }}>
            {t('footer.terms')}
          </a>
        </div>
      </div>
    </div>
  </footer>
  );
};

// ============================================
// PAGES
// ============================================

// Home Page
const HomePage = () => (
  <>
    <HeroSection />
    <ProblemSection />
    <SolutionSection />
    <HowItWorksSection />
    <TargetAudienceSection />
    <TransparencySection />
    <WhyUsSection />
    <PricingSection />
    <FAQSection />
    <CTASection />
  </>
);

// How It Works Page
const HowItWorksPage = () => {
  const { t } = useLanguage();
  return (
  <div style={{ paddingTop: '100px' }}>
    <section style={{ background: 'var(--bg-cream)', padding: '60px 0' }}>
      <div className="container">
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(32px, 5vw, 48px)',
          fontWeight: '700',
          color: 'var(--text-dark)',
          marginBottom: '20px',
        }}>
          {t('page.howItWorks.title1')} <span style={{ color: 'var(--primary)' }}>{t('page.howItWorks.title2')}</span>
        </h1>
        <p style={{ fontSize: '18px', color: 'var(--text-muted)', maxWidth: '600px' }}>
          {t('page.howItWorks.subtitle')}
        </p>
      </div>
    </section>
    <HowItWorksSection />
    <TransparencySection />
    <CTASection />
  </div>
  );
};

// Fulfillment Page
const FulfillmentPage = () => {
  const { t } = useLanguage();
  return (
  <div style={{ paddingTop: '100px' }}>
    <section style={{
      background: 'linear-gradient(135deg, var(--bg-dark) 0%, #0D2B26 100%)',
      padding: '80px 0',
    }}>
      <div className="container">
        <span style={{
          color: 'var(--accent)',
          fontWeight: '600',
          fontSize: '14px',
          textTransform: 'uppercase',
          letterSpacing: '2px',
        }}>{t('nav.fulfillment')}</span>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(32px, 5vw, 48px)',
          fontWeight: '700',
          color: 'var(--text-light)',
          marginTop: '12px',
          marginBottom: '20px',
        }}>
          {t('page.fulfillment.title1')}<br/>
          <span style={{ color: 'var(--primary-light)' }}>{t('page.fulfillment.title2')}</span>
        </h1>
        <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', maxWidth: '600px' }}>
          {t('page.fulfillment.subtitle')}
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '20px',
          marginTop: '40px',
          maxWidth: '600px',
        }}>
          {[
            { value: '3-7', label: t('fulfillment.stats.1') },
            { value: '$3', label: t('fulfillment.stats.2') },
            { value: '180+', label: t('fulfillment.stats.3') },
            { value: '24/7', label: t('fulfillment.stats.4') },
          ].map((stat, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--accent)' }}>{stat.value}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* How Warehouse Works */}
    <section style={{ background: 'var(--bg-cream)', padding: '80px 0' }}>
      <div className="container">
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '32px',
          fontWeight: '700',
          color: 'var(--text-dark)',
          marginBottom: '40px',
        }}>
          {t('fulfillment.cycle.title')}
        </h2>

        <div style={{
          display: 'grid',
          gap: '24px',
        }}>
          {[
            {
              step: 1,
              icon: '📦',
              title: t('fulfillment.step1.title'),
              desc: t('fulfillment.step1.desc'),
              time: t('fulfillment.step1.time'),
            },
            {
              step: 2,
              icon: '🏭',
              title: t('fulfillment.step2.title'),
              desc: t('fulfillment.step2.desc'),
              time: t('fulfillment.step2.time'),
            },
            {
              step: 3,
              icon: '⚡',
              title: t('fulfillment.step3.title'),
              desc: t('fulfillment.step3.desc'),
              time: t('fulfillment.step3.time'),
            },
            {
              step: 4,
              icon: '✈️',
              title: t('fulfillment.step4.title'),
              desc: t('fulfillment.step4.desc'),
              time: t('fulfillment.step4.time'),
            },
            {
              step: 5,
              icon: '↩️',
              title: t('fulfillment.step5.title'),
              desc: t('fulfillment.step5.desc'),
              time: t('fulfillment.step5.time'),
            },
          ].map((item, i) => (
            <div key={i} style={{
              background: 'white',
              borderRadius: '16px',
              padding: '28px',
              border: '1px solid var(--border)',
              display: 'grid',
              gridTemplateColumns: '80px 1fr auto',
              gap: '24px',
              alignItems: 'start',
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, var(--primary), var(--primary-light))',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                position: 'relative',
              }}>
                {item.icon}
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  width: '24px',
                  height: '24px',
                  background: 'var(--accent)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '11px',
                  fontWeight: '700',
                }}>{item.step}</span>
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '8px' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  {item.desc}
                </p>
              </div>
              <span style={{
                background: 'rgba(10, 107, 92, 0.1)',
                color: 'var(--primary)',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600',
                whiteSpace: 'nowrap',
              }}>{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Why Dubai */}
    <section style={{ background: 'white', padding: '80px 0' }}>
      <div className="container">
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '32px',
          fontWeight: '700',
          color: 'var(--text-dark)',
          marginBottom: '40px',
        }}>
          {t('fulfillment.whyDubai.title1')} <span style={{ color: 'var(--primary)' }}>{t('fulfillment.whyDubai.title2')}</span>
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
        }}>
          {[
            {
              icon: '🌐',
              title: t('fulfillment.dubai.1.title'),
              desc: t('fulfillment.dubai.1.desc'),
            },
            {
              icon: '🚫',
              title: t('fulfillment.dubai.2.title'),
              desc: t('fulfillment.dubai.2.desc'),
            },
            {
              icon: '📦',
              title: t('fulfillment.dubai.3.title'),
              desc: t('fulfillment.dubai.3.desc'),
            },
            {
              icon: '💰',
              title: t('fulfillment.dubai.4.title'),
              desc: t('fulfillment.dubai.4.desc'),
            },
            {
              icon: '⚡',
              title: t('fulfillment.dubai.5.title'),
              desc: t('fulfillment.dubai.5.desc'),
            },
          ].map((item, i) => (
            <div key={i} style={{
              background: 'var(--bg-cream)',
              borderRadius: '16px',
              padding: '28px',
              border: '1px solid var(--border)',
            }}>
              <span style={{ fontSize: '36px', display: 'block', marginBottom: '16px' }}>{item.icon}</span>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '8px' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Pricing */}
    <section style={{ background: 'var(--bg-cream)', padding: '80px 0' }}>
      <div className="container">
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '32px',
          fontWeight: '700',
          color: 'var(--text-dark)',
          marginBottom: '40px',
        }}>
          {t('fulfillment.pricing.title')}
        </h2>

        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          border: '1px solid var(--border)',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
            marginBottom: '32px',
          }}>
            {[
              { label: t('fulfillment.pricing.setup'), value: '$399', note: t('fulfillment.pricing.setupNote') },
              { label: t('fulfillment.pricing.storage'), value: '$299', note: t('fulfillment.pricing.storageNote') },
              { label: t('fulfillment.pricing.processing'), value: '$3', note: t('fulfillment.pricing.processingNote') },
              { label: t('fulfillment.pricing.returns'), value: '$2', note: t('fulfillment.pricing.returnsNote') },
            ].map((item, i) => (
              <div key={i} style={{
                background: 'var(--bg-cream)',
                borderRadius: '12px',
                padding: '24px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px' }}>{item.label}</div>
                <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--primary)' }}>{item.value}</div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{item.note}</div>
              </div>
            ))}
          </div>

          <div style={{
            padding: '24px',
            background: 'rgba(10, 107, 92, 0.05)',
            borderRadius: '12px',
          }}>
            <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '16px' }}>
              {t('fulfillment.pricing.example')}
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '14px' }}>
              <span style={{ color: 'var(--text-muted)' }}>{t('fulfillment.pricing.exStorage')}</span>
              <span style={{ color: 'var(--text-dark)', fontWeight: '600' }}>$299</span>
              <span style={{ color: 'var(--text-muted)' }}>{t('fulfillment.pricing.exProcessing')}</span>
              <span style={{ color: 'var(--text-dark)', fontWeight: '600' }}>$150</span>
              <span style={{ color: 'var(--text-muted)' }}>{t('fulfillment.pricing.exShipping')}</span>
              <span style={{ color: 'var(--text-dark)', fontWeight: '600' }}>$750</span>
              <span style={{ color: 'var(--text-dark)', fontWeight: '700', paddingTop: '8px', borderTop: '1px solid var(--border)' }}>{t('fulfillment.pricing.exTotal')}</span>
              <span style={{ color: 'var(--primary)', fontWeight: '800', paddingTop: '8px', borderTop: '1px solid var(--border)' }}>$1,199/mo</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <CTASection />
  </div>
  );
};

// Pricing Page
const PricingPage = () => {
  const { t } = useLanguage();
  return (
  <div style={{ paddingTop: '100px' }}>
    <section style={{ background: 'var(--bg-cream)', padding: '60px 0' }}>
      <div className="container">
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(32px, 5vw, 48px)',
          fontWeight: '700',
          color: 'var(--text-dark)',
          marginBottom: '20px',
        }}>
          {t('page.pricing.title1')} <span style={{ color: 'var(--primary)' }}>{t('page.pricing.title2')}</span>
        </h1>
        <p style={{ fontSize: '18px', color: 'var(--text-muted)', maxWidth: '600px' }}>
          {t('page.pricing.subtitle')}
        </p>
      </div>
    </section>
    <PricingSection />
    <CTASection />
  </div>
  );
};

// FAQ Page
const FAQPage = () => {
  const { t } = useLanguage();
  return (
  <div style={{ paddingTop: '100px' }}>
    <section style={{ background: 'var(--bg-cream)', padding: '60px 0' }}>
      <div className="container">
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(32px, 5vw, 48px)',
          fontWeight: '700',
          color: 'var(--text-dark)',
          marginBottom: '20px',
        }}>
          {t('page.faq.title1')} <span style={{ color: 'var(--primary)' }}>{t('page.faq.title2')}</span>
        </h1>
        <p style={{ fontSize: '18px', color: 'var(--text-muted)', maxWidth: '600px' }}>
          {t('page.faq.subtitle')}
        </p>
      </div>
    </section>
    <FAQSection />
    <CTASection />
  </div>
  );
};

// Contact Page
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    product: '',
    volume: '',
    message: '',
  });
  const { t, language } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = language === 'ru' 
      ? 'Заявка отправлена! Мы свяжемся с вами в течение 24 часов.'
      : 'Request submitted! We will contact you within 24 hours.';
    alert(msg);
  };

  return (
    <div style={{ paddingTop: '100px' }}>
      <section style={{
        background: 'linear-gradient(135deg, var(--bg-dark) 0%, #0D2B26 100%)',
        padding: '80px 0',
        minHeight: '100vh',
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '60px',
            alignItems: 'start',
          }}>
            <div>
              <span style={{
                color: 'var(--accent)',
                fontWeight: '600',
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
              }}>{t('contact.label')}</span>
              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(32px, 5vw, 48px)',
                fontWeight: '700',
                color: 'var(--text-light)',
                marginTop: '12px',
                marginBottom: '20px',
              }}>
                {t('contact.title1')}<br/>
                <span style={{ color: 'var(--primary-light)' }}>{t('contact.title2')}</span>
              </h1>
              <p style={{
                fontSize: '18px',
                color: 'rgba(255,255,255,0.7)',
                marginBottom: '40px',
              }}>
                {t('contact.subtitle')}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  { icon: '📧', label: t('contact.email'), value: 'hello@shopifybridge.ru' },
                  { icon: '💬', label: t('contact.telegram'), value: '@shopifybridge' },
                  { icon: '📍', label: t('contact.company'), value: 'Shopify Bridge (UK) Ltd' },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px 20px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}>
                    <span style={{ fontSize: '24px' }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{item.label}</div>
                      <div style={{ fontSize: '16px', color: 'var(--text-light)', fontWeight: '600' }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{
              background: 'white',
              borderRadius: '20px',
              padding: '40px',
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: 'var(--text-dark)',
                marginBottom: '24px',
              }}>{t('contact.formTitle')}</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: 'var(--text-dark)', marginBottom: '8px' }}>
                    {t('contact.name')}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: '10px',
                      border: '1px solid var(--border)',
                      fontSize: '15px',
                      outline: 'none',
                    }}
                    placeholder={t('contact.namePh')}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: 'var(--text-dark)', marginBottom: '8px' }}>
                    {t('contact.contactField')}
                  </label>
                  <input
                    type="text"
                    value={formData.contact}
                    onChange={e => setFormData({ ...formData, contact: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: '10px',
                      border: '1px solid var(--border)',
                      fontSize: '15px',
                      outline: 'none',
                    }}
                    placeholder={t('contact.contactPh')}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: 'var(--text-dark)', marginBottom: '8px' }}>
                    {t('contact.product')}
                  </label>
                  <input
                    type="text"
                    value={formData.product}
                    onChange={e => setFormData({ ...formData, product: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: '10px',
                      border: '1px solid var(--border)',
                      fontSize: '15px',
                      outline: 'none',
                    }}
                    placeholder={t('contact.productPh')}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: 'var(--text-dark)', marginBottom: '8px' }}>
                    {t('contact.volume')}
                  </label>
                  <select
                    value={formData.volume}
                    onChange={e => setFormData({ ...formData, volume: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: '10px',
                      border: '1px solid var(--border)',
                      fontSize: '15px',
                      outline: 'none',
                      background: 'white',
                    }}
                  >
                    <option value="">{t('contact.volumePh')}</option>
                    <option value="10-50">{t('contact.volume1')}</option>
                    <option value="50-200">{t('contact.volume2')}</option>
                    <option value="200-500">{t('contact.volume3')}</option>
                    <option value="500+">{t('contact.volume4')}</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: 'var(--text-dark)', marginBottom: '8px' }}>
                    {t('contact.message')}
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: '10px',
                      border: '1px solid var(--border)',
                      fontSize: '15px',
                      outline: 'none',
                      resize: 'vertical',
                    }}
                    placeholder={t('contact.messagePh')}
                  />
                </div>

                <button type="submit" style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))',
                  color: 'white',
                  padding: '16px',
                  borderRadius: '10px',
                  border: 'none',
                  fontWeight: '700',
                  fontSize: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}>
                  {t('contact.submit')}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>

                <p style={{
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  textAlign: 'center',
                }}>
                  {t('contact.privacy')}
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================
// MAIN APP
// ============================================
const App = () => {
  return (
    <LanguageProvider>
      <Router>
        <GlobalStyles />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/fulfillment" element={<FulfillmentPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </LanguageProvider>
  );
};

export default App;
