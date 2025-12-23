// components/layout/PartnerHeader.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui';

interface PartnerHeaderProps {
  partnerName?: string;
}

export const PartnerHeader: React.FC<PartnerHeaderProps> = ({ partnerName }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/partners/login');
  };
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/partners/dashboard" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-blue-600">
              Shopify Bridge
            </div>
            <span className="text-sm text-gray-500">Partners</span>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="/partners/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">
              Dashboard
            </a>
            <a href="/partners/referrals" className="text-gray-700 hover:text-blue-600 transition-colors">
              Рефералы
            </a>
            <a href="/partners/payouts" className="text-gray-700 hover:text-blue-600 transition-colors">
              Выплаты
            </a>
            <a href="/partners/materials" className="text-gray-700 hover:text-blue-600 transition-colors">
              Материалы
            </a>
          </nav>
          
          {/* User Menu */}
          <div className="flex items-center gap-4">
            {partnerName ? (
              <div className="relative">
                <button 
                  className="flex items-center gap-2 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600">
                      {partnerName.charAt(0)}
                    </span>
                  </div>
                  <span className="hidden md:block font-medium text-gray-700">
                    {partnerName}
                  </span>
                  <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <a href="/partners/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Профиль
                    </a>
                    <a href="/partners/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Настройки
                    </a>
                    <hr className="my-2" />
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                    >
                      Выйти
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={() => window.location.href = '/partners/login'}>
                  Войти
                </Button>
                <Button onClick={() => window.location.href = '/partners/register'}>
                  Регистрация
                </Button>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col gap-2">
              <a href="/partners/dashboard" className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded">
                Dashboard
              </a>
              <a href="/partners/referrals" className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded">
                Рефералы
              </a>
              <a href="/partners/payouts" className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded">
                Выплаты
              </a>
              <a href="/partners/materials" className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded">
                Материалы
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

