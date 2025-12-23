// pages/admin/index.tsx - Вход в админку

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Input, Button, Card } from '@/components/ui';

const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Проверяем, авторизован ли уже админ
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // Проверяем, есть ли запись в таблице admins
        const { data: admin } = await supabase
          .from('admins')
          .select('id')
          .eq('email', session.user.email)
          .single();
        
        if (admin) {
          navigate('/admin/dashboard');
        }
      }
    };
    
    checkSession();
  }, [navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Сначала проверяем, существует ли админ в таблице admins
      const { data: admin, error: adminError } = await supabase
        .from('admins')
        .select('id, email')
        .eq('email', email.toLowerCase())
        .single();

      if (adminError || !admin) {
        setError('Доступ запрещён. Вы не являетесь администратором.');
        setLoading(false);
        return;
      }

      // Если админ существует, авторизуемся через Supabase Auth
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError('Неверный email или пароль');
        setLoading(false);
        return;
      }

      // Обновляем last_login_at
      await supabase
        .from('admins')
        .update({ last_login_at: new Date().toISOString() })
        .eq('id', admin.id);

      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Admin login error:', err);
      setError('Произошла ошибка при входе');
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
          <form onSubmit={handleSubmit} className="space-y-6 p-6">
            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Пароль
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            
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
        
        {/* Подсказка */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Доступ только для администраторов.
          <br />
          <a href="/partners/login" className="text-primary hover:underline">
            Войти как партнёр →
          </a>
        </p>
      </div>
    </div>
  );
};

export default AdminLoginPage;
