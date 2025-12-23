// components/ReferralTracker.tsx

import { useEffect, useRef } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

const REF_COOKIE_NAME = 'sb_ref';
const REF_STORAGE_KEY = 'sb_ref';
const REF_TIME_KEY = 'sb_ref_time';
const REF_CLICK_TRACKED_KEY = 'sb_ref_click_tracked';
const COOKIE_EXPIRY_DAYS = 3650; // 10 лет
const TRACK_CLICK_URL = 'https://oyjxzrvhvndbdoyshwfc.supabase.co/functions/v1/track-click';

/**
 * Сохраняет реферальный код в localStorage и cookie
 */
function saveRefCode(refCode: string): void {
  if (!refCode || refCode.length < 4 || refCode.length > 20) {
    console.warn('[ReferralTracker] Invalid ref code:', refCode);
    return;
  }
  
  const code = refCode.toUpperCase();
  
  // Сохраняем в localStorage (основное хранилище)
  localStorage.setItem(REF_STORAGE_KEY, code);
  localStorage.setItem(REF_TIME_KEY, Date.now().toString());
  
  // Сохраняем в cookie (резервное хранилище)
  const expires = new Date();
  expires.setTime(expires.getTime() + COOKIE_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
  document.cookie = `${REF_COOKIE_NAME}=${code};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  
  console.log('[ReferralTracker] ✅ Saved ref code:', code);
}

/**
 * Регистрирует клик по реферальной ссылке в Supabase
 */
async function trackClick(refCode: string): Promise<void> {
  // Проверяем, был ли уже зарегистрирован клик для этого кода
  const trackedCode = localStorage.getItem(REF_CLICK_TRACKED_KEY);
  if (trackedCode === refCode) {
    console.log('[ReferralTracker] Click already tracked for:', refCode);
    return;
  }
  
  try {
    console.log('[ReferralTracker] 📊 Tracking click for:', refCode);
    
    const response = await fetch(TRACK_CLICK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ref: refCode,
        page: window.location.pathname,
        referrer: document.referrer || null,
        userAgent: navigator.userAgent,
      }),
    });
    
    if (response.ok) {
      // Помечаем что клик зарегистрирован
      localStorage.setItem(REF_CLICK_TRACKED_KEY, refCode);
      console.log('[ReferralTracker] ✅ Click tracked successfully');
    } else {
      console.warn('[ReferralTracker] Failed to track click:', response.status);
    }
  } catch (error) {
    console.warn('[ReferralTracker] Error tracking click:', error);
    // Не блокируем работу сайта если трекинг не сработал
  }
}

/**
 * Компонент для автоматического отслеживания реферальных переходов
 * Работает на ВСЕХ страницах и сохраняет ref при первом визите
 */
export function ReferralTracker() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const hasTracked = useRef(false);
  
  useEffect(() => {
    // Предотвращаем двойной вызов в StrictMode
    if (hasTracked.current) return;
    
    let refCode: string | null = null;
    
    // 1. Проверяем URL параметр ref через React Router
    refCode = searchParams.get('ref');
    
    // 2. Fallback на window.location
    if (!refCode) {
      const urlParams = new URLSearchParams(window.location.search);
      refCode = urlParams.get('ref');
    }
    
    // 3. Проверяем hash (для ссылок типа /#ref=CODE)
    if (!refCode && window.location.hash.includes('ref=')) {
      const hashParams = new URLSearchParams(window.location.hash.replace('#', '?'));
      refCode = hashParams.get('ref');
    }
    
    if (refCode) {
      console.log('[ReferralTracker] 🔍 Found ref in URL:', refCode);
      hasTracked.current = true;
      
      // Сохраняем код
      saveRefCode(refCode);
      
      // Регистрируем клик в Supabase (асинхронно, не блокируя UI)
      trackClick(refCode.toUpperCase());
    }
  }, [location.search, searchParams]);
  
  // Логируем текущий сохранённый код при каждом изменении маршрута
  useEffect(() => {
    const savedRef = localStorage.getItem(REF_STORAGE_KEY);
    if (savedRef) {
      console.log('[ReferralTracker] 📦 Current saved ref code:', savedRef);
    }
  }, [location.pathname]);
  
  return null; // Невидимый компонент
}

/**
 * Получает сохранённый реферальный код
 */
export function getStoredRefCode(): string | null {
  // Сначала localStorage
  const localRef = localStorage.getItem(REF_STORAGE_KEY);
  if (localRef) return localRef;
  
  // Fallback на cookie
  const match = document.cookie.match(new RegExp(`${REF_COOKIE_NAME}=([^;]+)`));
  if (match) {
    // Сохраняем в localStorage для надёжности
    localStorage.setItem(REF_STORAGE_KEY, match[1]);
    return match[1];
  }
  
  return null;
}
