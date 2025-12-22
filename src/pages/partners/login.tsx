// pages/partners/login.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Checkbox, Card } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { error: signInError } = await signIn(email, password);
      
      if (signInError) {
        if (signInError.message.includes('Invalid login credentials')) {
          setError('Неверный email или пароль');
        } else if (signInError.message.includes('Email not confirmed')) {
          setError('Пожалуйста, подтвердите email перед входом');
        } else {
          setError(signInError.message);
        }
        return;
      }
      
      // Успешный вход - перенаправляем в кабинет
      navigate('/partners/dashboard');
      
    } catch (error) {
      console.error('Login error:', error);
      setError('Произошла ошибка. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {/* Заголовок */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Вход в партнёрский кабинет
            </h1>
            <p className="text-gray-600">
              Войдите, чтобы увидеть статистику и рефералов
            </p>
          </div>
          
          {/* Форма */}
          <Card>
            {/* Ошибка */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800">{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              
              <Input
                label="Пароль"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              
              <Checkbox
                label="Запомнить меня"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              
              <Button
                type="submit"
                fullWidth
                loading={loading}
                size="lg"
              >
                Войти →
              </Button>
              
              <div className="text-center">
                <a href="/partners/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Забыли пароль?
                </a>
              </div>
              
              <p className="text-center text-gray-600 pt-4 border-t">
                Нет аккаунта?{' '}
                <a href="/partners/register" className="text-blue-600 hover:underline">
                  Зарегистрироваться
                </a>
              </p>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

