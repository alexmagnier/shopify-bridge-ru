// utils/validators.ts

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Пароль должен содержать минимум 8 символов');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Пароль должен содержать хотя бы одну заглавную букву');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Пароль должен содержать хотя бы одну строчную букву');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Пароль должен содержать хотя бы одну цифру');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validatePhone(phone: string): boolean {
  // Допускаем российские и международные номера
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 15;
}

export function validateTelegram(telegram: string): boolean {
  // @username или username
  return /^@?[a-zA-Z0-9_]{5,32}$/.test(telegram);
}

export function validateUSDTWallet(wallet: string, network: 'trc20' | 'erc20'): boolean {
  if (network === 'trc20') {
    // TRC-20 адрес начинается с T и содержит 34 символа
    return /^T[A-Za-z0-9]{33}$/.test(wallet);
  } else {
    // ERC-20 адрес начинается с 0x и содержит 40 hex символов
    return /^0x[a-fA-F0-9]{40}$/.test(wallet);
  }
}

export function validateAmount(amount: number, min: number, max?: number): {
  valid: boolean;
  error?: string;
} {
  if (amount < min) {
    return {
      valid: false,
      error: `Минимальная сумма: $${min}`,
    };
  }
  
  if (max && amount > max) {
    return {
      valid: false,
      error: `Максимальная сумма: $${max}`,
    };
  }
  
  return { valid: true };
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export function validateRegisterForm(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  telegram: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}): ValidationResult {
  const errors: Record<string, string> = {};
  
  if (!data.firstName.trim()) {
    errors.firstName = 'Введите имя';
  }
  
  if (!data.lastName.trim()) {
    errors.lastName = 'Введите фамилию';
  }
  
  if (!validateEmail(data.email)) {
    errors.email = 'Введите корректный email';
  }
  
  if (data.phone && !validatePhone(data.phone)) {
    errors.phone = 'Введите корректный телефон';
  }
  
  if (!validateTelegram(data.telegram)) {
    errors.telegram = 'Введите корректный Telegram (например, @username)';
  }
  
  const passwordValidation = validatePassword(data.password);
  if (!passwordValidation.valid) {
    errors.password = passwordValidation.errors[0];
  }
  
  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Пароли не совпадают';
  }
  
  if (!data.agreeToTerms) {
    errors.agreeToTerms = 'Необходимо согласиться с правилами';
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validatePayoutRequest(data: {
  amount: number;
  paymentMethod: string;
  paymentDetails: string;
  availableBalance: number;
}): ValidationResult {
  const errors: Record<string, string> = {};
  
  const amountValidation = validateAmount(data.amount, 50, data.availableBalance);
  if (!amountValidation.valid) {
    errors.amount = amountValidation.error || 'Некорректная сумма';
  }
  
  if (data.paymentMethod === 'usdt_trc20') {
    if (!validateUSDTWallet(data.paymentDetails, 'trc20')) {
      errors.paymentDetails = 'Введите корректный TRC-20 адрес';
    }
  } else if (data.paymentMethod === 'usdt_erc20') {
    if (!validateUSDTWallet(data.paymentDetails, 'erc20')) {
      errors.paymentDetails = 'Введите корректный ERC-20 адрес';
    }
  } else if (data.paymentMethod === 'bank_card') {
    // Базовая валидация карты
    const cleaned = data.paymentDetails.replace(/\s/g, '');
    if (!/^\d{16}$/.test(cleaned)) {
      errors.paymentDetails = 'Введите корректный номер карты (16 цифр)';
    }
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

