// components/partners/payouts/PayoutRequestModal.tsx

import React, { useState } from 'react';
import { Modal, Input, Select, Button } from '@/components/ui';
import { PayoutRequest } from '@/types';
import { validatePayoutRequest } from '@/utils/validators';
import { formatUSD } from '@/utils/formatters';

interface PayoutRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableBalance: number;
  onSubmit: (request: PayoutRequest) => void;
  loading?: boolean;
}

export const PayoutRequestModal: React.FC<PayoutRequestModalProps> = ({
  isOpen,
  onClose,
  availableBalance,
  onSubmit,
  loading: externalLoading,
}) => {
  const [formData, setFormData] = useState<PayoutRequest>({
    amount: availableBalance,
    paymentMethod: 'usdt_trc20',
    paymentDetails: '',
    partnerNote: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [internalLoading, setInternalLoading] = useState(false);
  
  const loading = externalLoading || internalLoading;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validatePayoutRequest({
      ...formData,
      availableBalance,
    });
    
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }
    
    setInternalLoading(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Payout request error:', error);
    } finally {
      setInternalLoading(false);
    }
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Запрос на выплату" size="md">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Доступный баланс */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="text-sm text-gray-600 mb-1">Доступно к выводу</div>
          <div className="text-2xl font-bold text-green-600">
            {formatUSD(availableBalance)}
          </div>
        </div>
        
        {/* Сумма */}
        <Input
          label="Сумма вывода"
          type="number"
          name="amount"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
          error={errors.amount}
          helperText={`USDT (минимум $50)`}
          required
        />
        
        {/* Метод выплаты */}
        <Select
          label="Метод выплаты"
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as any })}
          options={[
            { value: 'usdt_trc20', label: 'USDT (TRC-20) — Рекомендуем' },
            { value: 'usdt_erc20', label: 'USDT (ERC-20)' },
            { value: 'bank_card', label: 'Банковская карта РФ' },
          ]}
          required
        />
        
        {/* Реквизиты */}
        <Input
          label={
            formData.paymentMethod === 'bank_card' 
              ? 'Номер карты' 
              : `Адрес кошелька (${formData.paymentMethod === 'usdt_trc20' ? 'TRC-20' : 'ERC-20'})`
          }
          name="paymentDetails"
          value={formData.paymentDetails}
          onChange={(e) => setFormData({ ...formData, paymentDetails: e.target.value })}
          error={errors.paymentDetails}
          placeholder={
            formData.paymentMethod === 'usdt_trc20' ? 'TRx7abc123...' :
            formData.paymentMethod === 'usdt_erc20' ? '0x...' :
            '1234 5678 9012 3456'
          }
          required
        />
        
        {/* Комментарий */}
        <Input
          label="Комментарий (опционально)"
          name="partnerNote"
          value={formData.partnerNote || ''}
          onChange={(e) => setFormData({ ...formData, partnerNote: e.target.value })}
          placeholder="Дополнительная информация..."
        />
        
        {/* Кнопки */}
        <div className="flex gap-3">
          <Button type="button" variant="ghost" onClick={onClose} className="flex-1">
            Отмена
          </Button>
          <Button type="submit" loading={loading} className="flex-1">
            Запросить выплату
          </Button>
        </div>
      </form>
    </Modal>
  );
};

