// components/ReferralTracker.tsx

import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { saveReferralCode } from '@/utils/referralTracking';

/**
 * Компонент для автоматического отслеживания реферальных переходов
 * Добавляется в App.tsx для работы на всех страницах
 */
export function ReferralTracker() {
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    const refCode = searchParams.get('ref');
    if (refCode) {
      saveReferralCode(refCode);
      console.log('Referral code detected and saved:', refCode);
    }
  }, [searchParams]);
  
  return null; // Невидимый компонент
}

