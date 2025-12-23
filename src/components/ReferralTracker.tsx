// components/ReferralTracker.tsx

import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

const REF_COOKIE_NAME = 'sb_ref';
const REF_STORAGE_KEY = 'sb_ref';
const REF_TIME_KEY = 'sb_ref_time';
const REF_CLICK_TRACKED_KEY = 'sb_ref_click_tracked';
const COOKIE_EXPIRY_DAYS = 3650; // 10 лет
const TRACK_CLICK_URL = 'https://oyjxzrvhvndbdoyshwfc.supabase.co/functions/v1/track-click';

// DEBUG MODE - покажет индикатор на странице (включить для отладки)
const DEBUG_MODE = false;

/**
 * Сохраняет реферальный код в localStorage и cookie
 */
function saveRefCode(refCode: string): boolean {
  if (!refCode || refCode.length < 4 || refCode.length > 20) {
    console.warn('[ReferralTracker] ❌ Invalid ref code:', refCode);
    return false;
  }
  
  const code = refCode.toUpperCase();
  
  try {
    // Сохраняем в localStorage (основное хранилище)
    localStorage.setItem(REF_STORAGE_KEY, code);
    localStorage.setItem(REF_TIME_KEY, Date.now().toString());
    
    // Сохраняем в cookie (резервное хранилище)
    const expires = new Date();
    expires.setTime(expires.getTime() + COOKIE_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
    document.cookie = `${REF_COOKIE_NAME}=${code};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
    
    // Проверяем что сохранилось
    const saved = localStorage.getItem(REF_STORAGE_KEY);
    console.log('[ReferralTracker] ✅ Saved ref code:', code, '| Verified:', saved);
    
    return saved === code;
  } catch (error) {
    console.error('[ReferralTracker] ❌ Error saving:', error);
    return false;
  }
}

/**
 * Получает сохранённый реферальный код
 */
function getSavedRefCode(): string | null {
  try {
    // Сначала localStorage
    const localRef = localStorage.getItem(REF_STORAGE_KEY);
    if (localRef) return localRef;
    
    // Fallback на cookie
    const match = document.cookie.match(new RegExp(`${REF_COOKIE_NAME}=([^;]+)`));
    if (match) {
      localStorage.setItem(REF_STORAGE_KEY, match[1]);
      return match[1];
    }
    
    return null;
  } catch (error) {
    console.error('[ReferralTracker] Error reading:', error);
    return null;
  }
}

/**
 * Регистрирует клик по реферальной ссылке в Supabase
 */
async function trackClick(refCode: string): Promise<void> {
  const trackedCode = localStorage.getItem(REF_CLICK_TRACKED_KEY);
  if (trackedCode === refCode) {
    console.log('[ReferralTracker] Click already tracked for:', refCode);
    return;
  }
  
  try {
    console.log('[ReferralTracker] 📊 Tracking click for:', refCode);
    
    const response = await fetch(TRACK_CLICK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ref: refCode,
        page: window.location.pathname,
        referrer: document.referrer || null,
        userAgent: navigator.userAgent,
      }),
    });
    
    if (response.ok) {
      localStorage.setItem(REF_CLICK_TRACKED_KEY, refCode);
      console.log('[ReferralTracker] ✅ Click tracked successfully');
    } else {
      console.warn('[ReferralTracker] Failed to track click:', response.status);
    }
  } catch (error) {
    console.warn('[ReferralTracker] Error tracking click:', error);
  }
}

/**
 * Компонент для автоматического отслеживания реферальных переходов
 */
export function ReferralTracker() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [savedCode, setSavedCode] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>('');
  
  // Проверяем URL и сохраняем код при первом рендере и при изменении URL
  useEffect(() => {
    let refCode: string | null = null;
    let source = '';
    
    // 1. Проверяем URL параметр ref через React Router
    refCode = searchParams.get('ref');
    if (refCode) source = 'React Router searchParams';
    
    // 2. Fallback на window.location.search
    if (!refCode) {
      const urlParams = new URLSearchParams(window.location.search);
      refCode = urlParams.get('ref');
      if (refCode) source = 'window.location.search';
    }
    
    // 3. Проверяем hash
    if (!refCode && window.location.hash.includes('ref=')) {
      const hashParams = new URLSearchParams(window.location.hash.replace('#', '?'));
      refCode = hashParams.get('ref');
      if (refCode) source = 'hash';
    }
    
    if (refCode) {
      console.log(`[ReferralTracker] 🔍 Found ref in URL (${source}):`, refCode);
      const success = saveRefCode(refCode);
      if (success) {
        setSavedCode(refCode.toUpperCase());
        setDebugInfo(`Saved from ${source}`);
        trackClick(refCode.toUpperCase());
      }
    } else {
      // Проверяем сохранённый код
      const existing = getSavedRefCode();
      if (existing) {
        console.log('[ReferralTracker] 📦 Using saved ref code:', existing);
        setSavedCode(existing);
        setDebugInfo('From localStorage');
      } else {
        setDebugInfo('No ref code');
      }
    }
  }, [location.search, location.pathname, searchParams]);
  
  // Debug indicator (только в DEBUG_MODE)
  if (DEBUG_MODE && savedCode) {
    return (
      <div style={{
        position: 'fixed',
        bottom: '10px',
        left: '10px',
        background: 'rgba(0, 128, 0, 0.9)',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '8px',
        fontSize: '12px',
        fontFamily: 'monospace',
        zIndex: 99999,
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
      }}>
        🔗 REF: {savedCode}
        <br />
        <span style={{ opacity: 0.7, fontSize: '10px' }}>{debugInfo}</span>
      </div>
    );
  }
  
  return null;
}

/**
 * Экспорт для использования в других модулях
 */
export function getStoredRefCode(): string | null {
  return getSavedRefCode();
}
