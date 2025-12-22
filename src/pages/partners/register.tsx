// pages/partners/register.tsx

import React, { useState } from 'react';
import { Input, Select, Button, Checkbox, Card } from '@/components/ui';
import { RegisterData } from '@/types';
import { validateRegisterForm } from '@/utils/validators';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<RegisterData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    telegram: '',
    password: '',
    confirmPassword: '',
    heardFrom: '',
    agreeToTerms: false,
    agreeToNotifications: true,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateRegisterForm(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }
    
    setLoading(true);
    try {
      // TODO: Implement API call
      console.log('Registration data:', formData);
      alert('Регистрация пока не реализована (TODO: подключить API)');
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Заголовок */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Присоединяйтесь к партнёрской программе
            </h1>
            <p className="text-gray-600">
              Заполните форму, чтобы начать зарабатывать
            </p>
          </div>
          
          {/* Форма */}
          <Card>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Имя и Фамилия */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Имя"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={errors.firstName}
                  required
                />
                <Input
                  label="Фамилия"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={errors.lastName}
                  required
                />
              </div>
              
              {/* Email */}
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
              />
              
              {/* Телефон */}
              <Input
                label="Телефон"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                helperText="Необязательно"
              />
              
              {/* Telegram */}
              <Input
                label="Telegram (для связи)"
                name="telegram"
                value={formData.telegram}
                onChange={handleChange}
                error={errors.telegram}
                placeholder="@username"
                required
              />
              
              {/* Пароли */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Пароль"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  helperText="Минимум 8 символов"
                  required
                />
                <Input
                  label="Подтвердите пароль"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                  required
                />
              </div>
              
              {/* Откуда узнали */}
              <Select
                label="Откуда вы узнали о нас?"
                name="heardFrom"
                value={formData.heardFrom}
                onChange={handleChange}
                options={[
                  { value: '', label: 'Выберите вариант' },
                  { value: 'chat', label: 'Чат селлеров' },
                  { value: 'friend', label: 'Друг рекомендовал' },
                  { value: 'blog', label: 'Блог/YouTube' },
                  { value: 'ad', label: 'Реклама' },
                  { value: 'other', label: 'Другое' },
                ]}
              />
              
              {/* Чекбоксы */}
              <div className="space-y-3">
                <Checkbox
                  label="Я согласен с правилами партнёрской программы"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  error={errors.agreeToTerms}
                  required
                />
                <Checkbox
                  label="Я согласен получать уведомления о новых рефералах"
                  name="agreeToNotifications"
                  checked={formData.agreeToNotifications}
                  onChange={handleChange}
                />
              </div>
              
              {/* Кнопка отправки */}
              <Button
                type="submit"
                fullWidth
                loading={loading}
                size="lg"
              >
                Зарегистрироваться →
              </Button>
              
              {/* Ссылка на вход */}
              <p className="text-center text-gray-600">
                Уже есть аккаунт?{' '}
                <a href="/partners/login" className="text-blue-600 hover:underline">
                  Войти
                </a>
              </p>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

