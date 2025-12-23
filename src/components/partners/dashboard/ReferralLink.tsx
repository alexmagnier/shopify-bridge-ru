// components/partners/dashboard/ReferralLink.tsx

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CopyButton, Button } from '@/components/ui';

interface ReferralLinkProps {
  referralCode: string;
  referralLink: string;
}

export const ReferralLink: React.FC<ReferralLinkProps> = ({ referralCode, referralLink }) => {
  const handleShare = async () => {
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: 'Shopify Bridge — продажи по всему миру',
          text: 'Присоединяйтесь к Shopify Bridge и начните продавать за рубеж!',
          url: referralLink,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ваша реферальная ссылка</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Ссылка */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
          <code className="text-sm break-all text-gray-700 font-mono">
            {referralLink}
          </code>
        </div>
        
        {/* Кнопки */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <CopyButton 
            text={referralLink}
            variant="primary"
            className="flex-1"
          />
          {typeof navigator.share === 'function' && (
            <Button 
              onClick={handleShare}
              variant="outline"
              className="flex-1"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Поделиться
            </Button>
          )}
        </div>
        
        {/* Информация */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-medium">Ваш реферальный код:</span>
            <code className="bg-gray-100 px-2 py-1 rounded font-mono">{referralCode}</code>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
            <div className="flex items-start gap-2">
              <span className="text-blue-600 text-xl">🔒</span>
              <div className="text-sm text-blue-800">
                <strong>Клиенты закрепляются за вами НАВСЕГДА</strong> — никаких ограничений по времени. 
                Вы получаете комиссию с каждого их платежа!
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

