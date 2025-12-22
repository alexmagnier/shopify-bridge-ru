// utils/referralTracking.ts

/**
 * ЛОГИКА ОТСЛЕЖИВАНИЯ РЕФЕРАЛОВ
 * 
 * КЛЮЧЕВЫЕ ПРИНЦИПЫ:
 * 1. Клиент закрепляется за партнёром НАВСЕГДА (бессрочная привязка)
 * 2. Партнёр получает комиссию с КАЖДОГО платежа клиента (lifetime комиссии)
 * 3. Cookie и localStorage сохраняются без ограничения по времени
 */

const REF_COOKIE_NAME = 'sb_ref';
const REF_STORAGE_KEY = 'sb_ref';
const REF_TIME_KEY = 'sb_ref_time';
const COOKIE_EXPIRY_DAYS = 3650; // 10 лет = практически навсегда

// Сохранение реферального кода при переходе по ссылке
export function saveReferralCode(refCode: string): void {
  if (!isValidReferralCode(refCode)) {
    console.warn('Invalid referral code:', refCode);
    return;
  }
  
  // Сохраняем в cookie БЕЗ ОГРАНИЧЕНИЯ ПО ВРЕМЕНИ (10 лет)
  setCookie(REF_COOKIE_NAME, refCode, COOKIE_EXPIRY_DAYS);
  
  // Сохраняем в localStorage как основное хранилище (не имеет срока действия)
  localStorage.setItem(REF_STORAGE_KEY, refCode);
  localStorage.setItem(REF_TIME_KEY, Date.now().toString());
  
  console.log('Referral code saved:', refCode);
}

// Получение реферального кода
// ВАЖНО: Нет проверки на истечение срока — привязка бессрочная
export function getReferralCode(): string | null {
  // Сначала проверяем localStorage (более надёжно)
  const localRef = localStorage.getItem(REF_STORAGE_KEY);
  if (localRef) return localRef;
  
  // Fallback на cookie
  const cookieRef = getCookie(REF_COOKIE_NAME);
  if (cookieRef) {
    // Дублируем в localStorage для надёжности
    localStorage.setItem(REF_STORAGE_KEY, cookieRef);
    return cookieRef;
  }
  
  return null;
}

// Очистка реферального кода (используется редко, только для тестирования)
export function clearReferralCode(): void {
  localStorage.removeItem(REF_STORAGE_KEY);
  localStorage.removeItem(REF_TIME_KEY);
  deleteCookie(REF_COOKIE_NAME);
}

// Валидация реферального кода
export function isValidReferralCode(code: string): boolean {
  // Формат: IVAN2024 или PETROV123 (6-20 символов, буквы и цифры)
  return /^[A-Z0-9]{6,20}$/i.test(code);
}

// Генерация реферального кода
export function generateReferralCode(firstName: string, lastName: string): string {
  const prefix = (firstName.slice(0, 3) + lastName.slice(0, 3))
    .toUpperCase()
    .replace(/[^A-Z]/g, '');
  const suffix = Math.floor(Math.random() * 9999)
    .toString()
    .padStart(4, '0');
  return `${prefix}${suffix}`;
}

// Утилиты для работы с cookies
function setCookie(name: string, value: string, days: number): void {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

function getCookie(name: string): string | null {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function deleteCookie(name: string): void {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

// Получение UTM параметров
export function getUtmParams(): {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
} {
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get('utm_source') || undefined,
    utmMedium: params.get('utm_medium') || undefined,
    utmCampaign: params.get('utm_campaign') || undefined,
  };
}

// Получение времени первого клика
export function getReferralClickTime(): Date | null {
  const timeStr = localStorage.getItem(REF_TIME_KEY);
  return timeStr ? new Date(parseInt(timeStr)) : null;
}

