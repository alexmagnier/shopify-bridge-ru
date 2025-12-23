// components/ReferralTracker.tsx

import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

const REF_COOKIE_NAME = 'sb_ref';
const REF_STORAGE_KEY = 'sb_ref';
const REF_TIME_KEY = 'sb_ref_time';
const COOKIE_EXPIRY_DAYS = 3650; // 10 лет

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
 * Компонент для автоматического отслеживания реферальных переходов
 * Работает на ВСЕХ страницах и сохраняет ref при первом визите
 */
export function ReferralTracker() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    // Проверяем URL параметр ref
    const refFromUrl = searchParams.get('ref');
    
    if (refFromUrl) {
      console.log('[ReferralTracker] 🔍 Found ref in URL:', refFromUrl);
      saveRefCode(refFromUrl);
      return;
    }
    
    // Также проверяем window.location на случай если React Router не распарсил
    const urlParams = new URLSearchParams(window.location.search);
    const refFromWindow = urlParams.get('ref');
    
    if (refFromWindow) {
      console.log('[ReferralTracker] 🔍 Found ref in window.location:', refFromWindow);
      saveRefCode(refFromWindow);
      return;
    }
    
    // Проверяем hash (для ссылок типа /#ref=CODE)
    const hash = window.location.hash;
    if (hash.includes('ref=')) {
      const hashParams = new URLSearchParams(hash.replace('#', '?'));
      const refFromHash = hashParams.get('ref');
      if (refFromHash) {
        console.log('[ReferralTracker] 🔍 Found ref in hash:', refFromHash);
        saveRefCode(refFromHash);
        return;
      }
    }
    
    // Логируем текущий сохранённый код
    const savedRef = localStorage.getItem(REF_STORAGE_KEY);
    if (savedRef) {
      console.log('[ReferralTracker] 📦 Using saved ref code:', savedRef);
    }
  }, [location.pathname, location.search, searchParams]);
  
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
