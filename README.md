# Shopify Bridge - Partner Program

Full-featured partner cabinet with lifetime commissions for Shopify Bridge RU.

## Features

- 🎯 **Lifetime Commissions** - Partners earn from EVERY client payment forever
- 📊 **5 Partner Tiers** - From 10% to 20% commission (Standard → Master)
- 🔒 **Permanent Client Binding** - Clients are bound to partners forever
- 💰 **USDT Payouts** - Weekly payouts in cryptocurrency
- 📈 **Real-time Analytics** - Dashboard with earnings charts and referral tracking
- 🎨 **Promo Materials** - Ready-to-use banners and text templates

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI**: Custom components with TailwindCSS
- **Routing**: React Router v6
- **Backend**: Supabase (PostgreSQL + Auth)
- **Payments**: USDT (TRC-20/ERC-20)

## Pages

### Partner Portal
- `/partners` - Landing page
- `/partners/register` - Registration
- `/partners/login` - Login
- `/partners/dashboard` - Partner dashboard
- `/partners/referrals` - Referrals list with funnel
- `/partners/payouts` - Payouts history and requests
- `/partners/profile` - Profile settings
- `/partners/materials` - Marketing materials

### Admin Panel
- `/admin` - Admin login
- `/admin/dashboard` - Admin dashboard
- `/admin/partners` - Manage partners (TODO)
- `/admin/payouts` - Process payouts (TODO)
- `/admin/settings` - Program settings (TODO)

## Database Schema

### Tables needed:
- `partners` - Partner accounts with tiers and balances
- `referrals` - Client referrals with lifetime tracking
- `payouts` - Payout requests and history
- `commission_records` - Commission records for each client payment
- `referral_clicks` - Click tracking for analytics
- `admins` - Admin accounts

See `PARTNERS_README.md` for detailed schema.

## Key Business Logic

### Lifetime Commissions
Partners receive commission from:
1. **Initial setup payment** (one-time)
2. **Every quarterly maintenance payment** (recurring forever!)

Example: Client on Growth Store ($1,200 + $450/quarter)
- Year 1: $180 (setup) + $270 (4x $67.50) = $450
- Year 2: $270 (maintenance only)
- **Total over 2 years: $720** from ONE client!

### Partner Tiers
- 🥉 Standard (0-4 clients) - 10%
- 🥈 Silver (5-14 clients) - 12%
- 🥇 Gold (15-29 clients) - 15%
- 💎 Platinum (30-49 clients) - 18%
- 👑 Master (50+ clients) - 20%

## Setup

```bash
npm install
npm run dev
```

## Environment Variables

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## TODO for Production

- [ ] Connect Supabase backend
- [ ] Implement authentication with JWT
- [ ] Setup email notifications (Resend/SendGrid)
- [ ] Create admin panel CRUD operations
- [ ] Add payment processing integration
- [ ] Setup analytics and tracking

## License

Private - Shopify Bridge RU

