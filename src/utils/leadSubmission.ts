// utils/leadSubmission.ts
// Утилита для отправки заявок с реферальным трекингом

const SUPABASE_FUNCTION_URL = 'https://oyjxzrvhvndbdoyshwfc.supabase.co/functions/v1/submit-lead';

const REF_STORAGE_KEY = 'sb_ref';
const REF_COOKIE_NAME = 'sb_ref';

/**
 * Получает реферальный код из localStorage или cookie
 * ВАЖНО: Проверяет ВСЕ возможные источники
 */
export function getRefCode(): string | null {
  // 1. Проверяем localStorage (основное хранилище)
  const localRef = localStorage.getItem(REF_STORAGE_KEY);
  if (localRef) {
    console.log('[getRefCode] Found in localStorage:', localRef);
    return localRef;
  }
  
  // 2. Проверяем cookie (резервное хранилище)
  const match = document.cookie.match(new RegExp(`${REF_COOKIE_NAME}=([^;]+)`));
  if (match) {
    console.log('[getRefCode] Found in cookie:', match[1]);
    // Сохраняем в localStorage для надёжности
    localStorage.setItem(REF_STORAGE_KEY, match[1]);
    return match[1];
  }
  
  // 3. Проверяем текущий URL (на случай если трекер не сработал)
  const urlParams = new URLSearchParams(window.location.search);
  const urlRef = urlParams.get('ref');
  if (urlRef) {
    console.log('[getRefCode] Found in current URL:', urlRef);
    // Сохраняем для будущего использования
    localStorage.setItem(REF_STORAGE_KEY, urlRef.toUpperCase());
    return urlRef.toUpperCase();
  }
  
  console.log('[getRefCode] No ref code found');
  return null;
}

/**
 * Интерфейс для данных лида
 */
export interface LeadFormData {
  name: string;
  contact: string;  // email или телефон
  product?: string;
  volume?: string;
  message?: string;
  messenger?: string; // telegram и т.д.
}

/**
 * Результат отправки формы
 */
export interface SubmitLeadResponse {
  success: boolean;
  message: string;
  error?: string;
}

/**
 * Отправляет заявку на Edge Function Supabase
 * Автоматически прикрепляет реферальный код если он есть
 */
export async function submitLead(formData: LeadFormData): Promise<SubmitLeadResponse> {
  try {
    // Получаем реферальный код
    const refCode = getRefCode();
    
    // Подготавливаем данные для отправки
    const payload = {
      name: formData.name,
      contact: formData.contact,
      messenger: formData.messenger || formData.contact,
      product: formData.product,
      volume: formData.volume,
      notes: formData.message,
      ref: refCode, // ← Реферальный код партнера
    };
    
    console.log('🚀 Отправка данных:', payload);
    console.log('📍 URL:', SUPABASE_FUNCTION_URL);
    
    // Отправляем на Edge Function
    const response = await fetch(SUPABASE_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    console.log('📥 Ответ сервера:', response.status, response.statusText);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Ошибка от сервера:', errorText);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    
    const result = await response.json();
    console.log('✅ Успешный ответ:', result);
    
    return {
      success: true,
      message: result.message || 'Заявка успешно отправлена!',
    };
    
  } catch (error) {
    console.error('❌ Error submitting lead:', error);
    
    // Детальная информация об ошибке
    const errorDetails = error instanceof Error 
      ? `${error.message} (${error.name})` 
      : JSON.stringify(error);
    
    return {
      success: false,
      message: `Ошибка: ${errorDetails}`,
      error: errorDetails,
    };
  }
}

/**
 * Хук React для отправки заявок
 */
export function useLeadSubmission() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  
  const submit = async (formData: LeadFormData): Promise<SubmitLeadResponse> => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const result = await submitLead(formData);
      
      if (!result.success) {
        setError(result.error || 'Unknown error');
      }
      
      return result;
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return {
    submit,
    isSubmitting,
    error,
  };
}

// Для обратной совместимости с React
import React from 'react';

