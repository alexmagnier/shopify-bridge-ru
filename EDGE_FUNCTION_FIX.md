# 🔧 КАК ОБНОВИТЬ EDGE FUNCTION В SUPABASE

Edge Function живет на серверах Supabase, поэтому нужно обновить её через Supabase Dashboard.

## 📝 ИНСТРУКЦИЯ:

### 1️⃣ Открой Supabase Dashboard

https://supabase.com/dashboard → твой проект → **Edge Functions** → `submit-lead`

### 2️⃣ Найди строки 113-126:

```typescript
// If no partner found, we still record the lead but without partner association
// This handles organic leads
if (!partnerId) {
  console.log('No partner associated, recording as organic lead');
  // For organic leads, we need a fallback - you might want to assign to a default partner
  // For now, we'll return an error since the system requires partner_id
  return new Response(
    JSON.stringify({ 
      success: false, 
      error: 'Invalid or missing referral code. Please use a valid referral link.' 
    }),
    { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}
```

### 3️⃣ ЗАМЕНИ НА:

```typescript
// Если нет партнера - создаем органический лид (для админа)
// Organic leads будут видны в админ панели
const finalPartnerId = partnerId || null; // null = органический лид

if (!partnerId) {
  console.log('No partner associated, recording as organic lead (will be visible to admin)');
}
```

### 4️⃣ Найди строку 132 (INSERT):

```typescript
.insert({
  partner_id: partnerId,
```

### 5️⃣ ЗАМЕНИ НА:

```typescript
.insert({
  partner_id: finalPartnerId, // Может быть null для органических лидов
```

### 6️⃣ Нажми **Deploy** в Supabase

---

## ⚠️ ВАЖНО:

После этих изменений:
- ✅ Форма будет работать **С реферальным кодом** (лид привязывается к партнеру)
- ✅ Форма будет работать **БЕЗ реферального кода** (органический лид для админа)
- ✅ Партнеры видят только своих рефералов
- ✅ Админ видит ВСЕ лиды (включая органические)

---

## 🚀 ИЛИ ВРЕМЕННОЕ РЕШЕНИЕ:

Пока можно просто **тестировать с реферальной ссылкой**:

1. Открой: http://localhost:5173/?ref=ИВАТЕС4003
2. Перейди на /contact
3. Заполни форму
4. Отправь

Реферальный код сохранится в cookie и форма заработает!

