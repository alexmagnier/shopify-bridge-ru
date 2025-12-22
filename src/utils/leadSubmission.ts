// utils/leadSubmission.ts
// Утилита для отправки заявок с реферальным трекингом

const SUPABASE_FUNCTION_URL = 'https://oyjxzrvhvndbdoyshwfc.supabase.co/functions/v1/submit-lead';

/**
 * Получает реферальный код из cookie или localStorage
 */
export function getRefCode(): string | null {
  // Проверяем localStorage
  const storage = localStorage.getItem('sb_ref');
  if (storage) return storage;
  
  // Проверяем cookie
  const match = document.cookie.match(/sb_ref=([^;]+)/);
  return match ? match[1] : null;
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
    
    // Отправляем на Edge Function
    const response = await fetch(SUPABASE_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    return {
      success: true,
      message: result.message || 'Заявка успешно отправлена!',
    };
    
  } catch (error) {
    console.error('Error submitting lead:', error);
    
    return {
      success: false,
      message: 'Произошла ошибка при отправке заявки',
      error: error instanceof Error ? error.message : 'Unknown error',
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

