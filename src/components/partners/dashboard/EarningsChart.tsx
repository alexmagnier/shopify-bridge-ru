// components/partners/dashboard/EarningsChart.tsx

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { formatUSD } from '@/utils/formatters';

interface EarningsChartProps {
  data: { month: string; amount: number }[];
}

export const EarningsChart: React.FC<EarningsChartProps> = ({ data }) => {
  const maxAmount = Math.max(...data.map(d => d.amount));
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>График дохода по кварталам</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-3">📊</div>
            <p>Недостаточно данных для графика</p>
          </div>
        ) : (
          <div className="space-y-2">
            {/* Простой bar chart */}
            <div className="flex items-end justify-between h-48 gap-2">
              {data.map((item, index) => {
                const height = maxAmount > 0 ? (item.amount / maxAmount) * 100 : 0;
                
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex flex-col items-center">
                      <span className="text-xs font-semibold text-gray-700 mb-1">
                        {formatUSD(item.amount)}
                      </span>
                      <div 
                        className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t transition-all duration-300 hover:from-blue-700 hover:to-blue-500"
                        style={{ height: `${height}%`, minHeight: item.amount > 0 ? '20px' : '0' }}
                      />
                    </div>
                    <span className="text-xs text-gray-600 font-medium">{item.month}</span>
                  </div>
                );
              })}
            </div>
            
            {/* Сообщение о пассивном доходе */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 mt-4">
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-xl">📈</span>
                <p className="text-sm text-green-800">
                  <strong>Ваш доход растёт с каждым новым клиентом и каждым кварталом!</strong>
                  {' '}Клиенты продолжают платить за обслуживание, а вы получаете комиссию.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

