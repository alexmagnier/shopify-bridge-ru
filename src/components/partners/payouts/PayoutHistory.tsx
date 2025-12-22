// components/partners/payouts/PayoutHistory.tsx

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, Badge, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui';
import { Payout, PAYOUT_STATUS_CONFIG } from '@/types';
import { formatUSD, formatDate, truncateWallet } from '@/utils/formatters';

interface PayoutHistoryProps {
  payouts: Payout[];
}

export const PayoutHistory: React.FC<PayoutHistoryProps> = ({ payouts }) => {
  if (payouts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>История выплат</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📜</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Пока нет выплат
            </h3>
            <p className="text-gray-600">
              Запросите первую выплату, когда накопится минимум $50
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>История выплат</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Дата</TableHead>
              <TableHead>Сумма</TableHead>
              <TableHead>Метод</TableHead>
              <TableHead>Реквизиты</TableHead>
              <TableHead>Статус</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payouts.map((payout) => {
              const statusConfig = PAYOUT_STATUS_CONFIG[payout.status];
              
              return (
                <TableRow key={payout.id}>
                  {/* Дата */}
                  <TableCell>
                    <div className="text-sm text-gray-700">
                      {formatDate(payout.requestedAt)}
                    </div>
                  </TableCell>
                  
                  {/* Сумма */}
                  <TableCell>
                    <div className="font-semibold text-gray-900">
                      {formatUSD(payout.amount)}
                    </div>
                    <div className="text-xs text-gray-500">{payout.currency}</div>
                  </TableCell>
                  
                  {/* Метод */}
                  <TableCell>
                    <div className="text-sm text-gray-700">
                      {payout.paymentMethod === 'usdt_trc20' && 'USDT (TRC-20)'}
                      {payout.paymentMethod === 'usdt_erc20' && 'USDT (ERC-20)'}
                      {payout.paymentMethod === 'bank_card' && 'Банковская карта'}
                    </div>
                  </TableCell>
                  
                  {/* Реквизиты */}
                  <TableCell>
                    <div className="text-sm text-gray-600 font-mono">
                      {truncateWallet(payout.paymentDetails)}
                    </div>
                    {payout.transactionId && (
                      <div className="text-xs text-gray-400 mt-1">
                        TX: {truncateWallet(payout.transactionId, 8, 6)}
                      </div>
                    )}
                  </TableCell>
                  
                  {/* Статус */}
                  <TableCell>
                    <Badge
                      variant={
                        payout.status === 'completed' ? 'success' :
                        payout.status === 'processing' ? 'info' :
                        payout.status === 'failed' ? 'danger' :
                        payout.status === 'cancelled' ? 'gray' :
                        'warning'
                      }
                    >
                      <span className="mr-1">{statusConfig.icon}</span>
                      {statusConfig.label}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

