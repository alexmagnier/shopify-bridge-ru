// components/partners/referrals/ReferralFilters.tsx

import React from 'react';
import { Select, Input } from '@/components/ui';
import { ReferralFilters as FiltersType } from '@/types';

interface ReferralFiltersProps {
  filters: FiltersType;
  onFiltersChange: (filters: FiltersType) => void;
}

export const ReferralFilters: React.FC<ReferralFiltersProps> = ({ filters, onFiltersChange }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Статус */}
        <Select
          label="Статус"
          value={filters.status || ''}
          onChange={(e) => onFiltersChange({ ...filters, status: e.target.value as any || undefined })}
          options={[
            { value: '', label: 'Все статусы' },
            { value: 'clicked', label: 'Кликнул' },
            { value: 'registered', label: 'Зарегистрировался' },
            { value: 'contacted', label: 'На связи' },
            { value: 'paid', label: 'Оплатил' },
            { value: 'active', label: 'Активный' },
            { value: 'churned', label: 'Ушёл' },
          ]}
        />
        
        {/* Период */}
        <Select
          label="Период"
          value={filters.period || 'all'}
          onChange={(e) => onFiltersChange({ ...filters, period: e.target.value as any })}
          options={[
            { value: 'all', label: 'Всё время' },
            { value: 'week', label: 'Эта неделя' },
            { value: 'month', label: 'Этот месяц' },
            { value: 'quarter', label: 'Этот квартал' },
            { value: 'year', label: 'Этот год' },
          ]}
        />
        
        {/* Поиск */}
        <Input
          label="Поиск"
          placeholder="Имя или email..."
          value={filters.search || ''}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          }
        />
      </div>
    </div>
  );
};

