// components/layout/AdminHeader.tsx

import React from 'react';
import { Button } from '@/components/ui';

export const AdminHeader: React.FC = () => {
  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/admin/dashboard" className="flex items-center gap-2">
            <div className="text-2xl font-bold">
              Shopify Bridge
            </div>
            <span className="text-sm text-gray-400">Admin</span>
          </a>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="/admin/dashboard" className="text-gray-300 hover:text-white transition-colors">
              Dashboard
            </a>
            <a href="/admin/partners" className="text-gray-300 hover:text-white transition-colors">
              Партнёры
            </a>
            <a href="/admin/referrals" className="text-gray-300 hover:text-white transition-colors">
              Рефералы
            </a>
            <a href="/admin/payouts" className="text-gray-300 hover:text-white transition-colors">
              Выплаты
            </a>
            <a href="/admin/settings" className="text-gray-300 hover:text-white transition-colors">
              Настройки
            </a>
          </nav>
          
          {/* User */}
          <Button variant="ghost" className="text-white hover:bg-gray-800">
            Выйти
          </Button>
        </div>
      </div>
    </header>
  );
};

