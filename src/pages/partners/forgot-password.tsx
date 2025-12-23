// pages/partners/forgot-password.tsx

import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button, Card } from '@/components/ui';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/partners/reset-password`,
      });

      if (resetError) {
        setError('Ошибка при отправке письма. Проверьте email.');
        setLoading(false);
        return;
      }

      setSent(true);
    } catch (err) {
      console.error('Password reset error:', err);
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
          {sent ? (
            /* Успешно отправлено */
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✉️</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Проверьте почту
              </h1>
              <p className="text-gray-600 mb-6">
                Мы отправили ссылку для сброса пароля на <strong>{email}</strong>
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Не получили письмо? Проверьте папку «Спам» или попробуйте снова.
              </p>
              <div className="flex flex-col gap-3">
                <Button 
                  variant="outline" 
                  fullWidth
                  onClick={() => setSent(false)}
                >
                  Отправить снова
                </Button>
                <a 
                  href="/partners/login" 
                  className="text-blue-600 hover:underline text-sm"
                >
                  ← Вернуться к входу
                </a>
              </div>
            </div>
          ) : (
            /* Форма */
            <>
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Восстановление пароля
                </h1>
                <p className="text-gray-600">
                  Введите email, указанный при регистрации
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
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="partner@example.com"
                    required
                  />
                </div>

                <Button type="submit" fullWidth loading={loading} size="lg">
                  Отправить ссылку
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

export default ForgotPasswordPage;

