// pages/admin/index.tsx - Вход в админку

import React, { useState } from 'react';
import { Input, Button, Card } from '@/components/ui';

const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // TODO: Implement API call
      console.log('Admin login:', { email, password });
      alert('Авторизация админа пока не реализована (TODO: подключить API)');
      // После успешной авторизации: window.location.href = '/admin/dashboard';
    } catch (error) {
      console.error('Admin login error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Shopify Bridge
          </h1>
          <p className="text-gray-400">
            Админ-панель партнёрской программы
          </p>
        </div>
        
        {/* Форма */}
        <Card className="bg-gray-800 border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              required
            />
            
            <Input
              label="Пароль"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              required
            />
            
            <Button
              type="submit"
              fullWidth
              loading={loading}
              size="lg"
            >
              Войти →
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AdminLoginPage;

