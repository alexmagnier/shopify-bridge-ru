// pages/partners/reset-password.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button, Card } from '@/components/ui';

const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Проверяем, есть ли сессия восстановления
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // Если нет сессии, возможно это первый визит после клика по ссылке
        // Supabase обработает токен автоматически
      }
    };
    checkSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    setLoading(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password
      });

      if (updateError) {
        setError('Ошибка при обновлении пароля. Попробуйте снова.');
        setLoading(false);
        return;
      }

      setSuccess(true);
      
      // Через 3 секунды перенаправляем на логин
      setTimeout(() => {
        navigate('/partners/login');
      }, 3000);
    } catch (err) {
      console.error('Password update error:', err);
      setError('Произошла ошибка. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Логотип */}
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              SB
            </div>
            <span className="text-xl font-bold text-gray-900">Shopify Bridge</span>
          </a>
        </div>

        <Card className="p-6">
          {success ? (
            /* Успешно */
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✅</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Пароль обновлён!
              </h1>
              <p className="text-gray-600 mb-4">
                Сейчас вы будете перенаправлены на страницу входа...
              </p>
              <a 
                href="/partners/login" 
                className="text-blue-600 hover:underline"
              >
                Войти сейчас →
              </a>
            </div>
          ) : (
            /* Форма */
            <>
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Новый пароль
                </h1>
                <p className="text-gray-600">
                  Придумайте новый пароль для вашего аккаунта
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Новый пароль
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Минимум 6 символов"
                    required
                    minLength={6}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Подтвердите пароль
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Повторите пароль"
                    required
                  />
                </div>

                <Button type="submit" fullWidth loading={loading} size="lg">
                  Сохранить пароль
                </Button>

                <div className="text-center">
                  <a 
                    href="/partners/login" 
                    className="text-blue-600 hover:underline text-sm"
                  >
                    ← Вернуться к входу
                  </a>
                </div>
              </form>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ResetPasswordPage;

