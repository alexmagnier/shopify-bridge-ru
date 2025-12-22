// utils/formatters.ts

// Форматирование суммы в USD
export function formatUSD(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

// Форматирование числа с разделителями
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('ru-RU').format(num);
}

// Форматирование процента
export function formatPercent(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

// Форматирование даты
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(d);
}

// Форматирование даты и времени
export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

// Относительное время ("2 часа назад")
export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  
  if (diffSec < 60) return 'только что';
  if (diffMin < 60) return `${diffMin} мин назад`;
  if (diffHour < 24) return `${diffHour} ч назад`;
  if (diffDay < 7) return `${diffDay} дн назад`;
  return formatDate(d);
}

// Сокращение кошелька (TRx7abc...jkl0)
export function truncateWallet(wallet: string, start: number = 6, end: number = 4): string {
  if (wallet.length <= start + end) return wallet;
  return `${wallet.slice(0, start)}...${wallet.slice(-end)}`;
}

// Инициалы из имени
export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

// Форматирование телефона
export function formatPhone(phone: string): string {
  // +7 999 123 45 67
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11 && cleaned.startsWith('7')) {
    return `+7 ${cleaned.slice(1, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7, 9)} ${cleaned.slice(9)}`;
  }
  return phone;
}

// Форматирование имени тарифа
export function formatPlanName(plan: string): string {
  const names: Record<string, string> = {
    testing: 'Testing Package',
    starter: 'Starter Store',
    growth: 'Growth Store',
    business: 'Business Store',
  };
  return names[plan] || plan;
}

// Получение цвета по изменению (для трендов)
export function getTrendColor(change: number): string {
  if (change > 0) return 'text-green-600';
  if (change < 0) return 'text-red-600';
  return 'text-gray-600';
}

// Форматирование изменения со знаком
export function formatChange(change: number, isPercent: boolean = false): string {
  const sign = change > 0 ? '+' : '';
  if (isPercent) {
    return `${sign}${change.toFixed(1)}%`;
  }
  return `${sign}${change}`;
}

