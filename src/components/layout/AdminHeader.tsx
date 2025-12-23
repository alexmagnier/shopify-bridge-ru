// components/layout/AdminHeader.tsx

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui';

export const AdminHeader: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard' },
    { path: '/admin/partners', label: 'Партнёры' },
    { path: '/admin/referrals', label: 'Рефералы' },
    { path: '/admin/payouts', label: 'Выплаты' },
    { path: '/admin/settings', label: 'Настройки' },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/admin/dashboard" className="flex items-center gap-2">
            <div className="text-2xl font-bold">
              Shopify Bridge
            </div>
            <span className="text-sm text-gray-400 bg-gray-800 px-2 py-0.5 rounded">
              Admin
            </span>
          </a>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              
              return (
                <a 
                  key={item.path}
                  href={item.path} 
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-gray-700 text-white' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
          
          {/* User */}
          <Button 
            variant="ghost" 
            className="text-white hover:bg-gray-800"
            onClick={handleLogout}
          >
            Выйти
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <nav className="md:hidden border-t border-gray-800 overflow-x-auto">
        <div className="flex px-4 py-2 gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <a 
                key={item.path}
                href={item.path} 
                className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors ${
                  isActive 
                    ? 'bg-gray-700 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
