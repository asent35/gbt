# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GBT (Genel Bilgi Toplama) Sorgulama Sistemi is a Next.js-based crime record management system with an EGM (Turkish Police) styled interface. The application allows adding, searching, and deleting crime records with security features like cooldowns and admin password protection.

**Tech Stack**: Next.js 14, React 18, TypeScript, Supabase (PostgreSQL), Tailwind CSS, Lucide React icons

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Run linter
npm run lint
```

## Environment Setup

1. Copy `.env.example` to `.env.local`
2. Add Supabase credentials from your Supabase dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Run the SQL schema in `supabase-schema.sql` in Supabase SQL Editor

## Architecture

### Single-Page Application Structure

This is a single-page application with all functionality in `src/app/page.tsx`. There are no separate components - everything is contained in one large client component (`'use client'`).

### State Management

All state is managed locally with React `useState` hooks:
- **Records state**: `kayitlar` - Array of crime records
- **Form state**: `kullaniciAdi`, `sebep`, `sure`, `sureTipi` - Add record form fields
- **Search state**: `aramaQuery` - Filter records by username or reason
- **Cooldown state**: `cooldown`, `cooldownActive` - 10-second cooldown after adding records
- **Password modal state**: Password protection for delete operations
- **Lockout state**: `passwordAttempts`, `lockoutTime` - 3 failed attempts = 60-second lockout
- **Notification state**: Toast notifications for user feedback

### Supabase Integration

**Client**: Initialized in `src/lib/supabase.ts` using environment variables

**Database Schema**:
- Table: `suc_kayitlari`
- Columns: `id` (UUID), `kullanici_adi`, `sebep`, `sure`, `sure_tipi` ('dakika' | 'saat'), `olusturma_tarihi`
- RLS enabled with public read/insert/delete policies
- Password validation happens client-side

**Operations**:
- Fetch all records on load (sorted by `olusturma_tarihi DESC`)
- Insert new records with cooldown enforcement
- Delete records after password validation
- Falls back to demo data if Supabase connection fails

### Security Features

**Admin Password**: Hardcoded as `AsEnTJ_?WORLD_ESHOT1?STUDIO` in `src/app/page.tsx:8`
- Used for delete operations only
- Client-side validation (not secure for production)
- Consider moving to environment variables

**Rate Limiting**:
- 10-second cooldown after adding records
- 3 password attempts before 60-second lockout
- Lockout timer persists across modal interactions

### Styling System

**Theme**: Custom EGM (police/government) themed design using Tailwind CSS

**Custom Colors** (defined in `tailwind.config.ts`):
- `egm-dark`: #0a0e14 (main background)
- `egm-darker`: #060810 (darker backgrounds)
- `egm-blue`: #1e3a5f (primary blue)
- `egm-blue-light`: #2563eb (light blue accents)
- `egm-accent`: #00b4d8 (cyan accent color)

**Custom Fonts**:
- Display: Orbitron (for headers)
- Mono: JetBrains Mono (for data/forms)

**Custom Animations**: `pulse-slow`, `scan`, `glow`, `fadeIn`, `slideUp`

### Key UI Features

- **Tab Navigation**: Toggle between "Sorgula" (search) and "Kayıt Ekle" (add record) views
- **Real-time Clock**: System time displayed in header (format: Turkish locale)
- **Live Search**: Filter records as you type
- **Modal Password Input**: Protected delete with show/hide password toggle
- **Toast Notifications**: Success/error/warning messages with auto-dismiss
- **Loading States**: Spinner during initial data fetch
- **Empty States**: Different messages for no records vs no search results

## Important Implementation Notes

### Adding Records Flow
1. User fills form (username, reason, duration + unit)
2. Click "Kayıt Oluştur" button
3. Validates all fields are filled
4. Inserts to Supabase (or demo mode if connection fails)
5. Clears form and starts 10-second cooldown
6. Shows success notification
7. Updates records list immediately

### Deleting Records Flow
1. User clicks trash icon on record row
2. Checks if user is locked out from failed attempts
3. Opens password modal
4. User enters password and clicks "Onayla ve Sil"
5. Validates password against hardcoded value
6. On success: deletes from Supabase and updates UI
7. On failure: increments attempt counter (3 attempts = 60s lockout)

### Search Implementation
Filter is applied client-side using `Array.filter()`:
```typescript
const filteredKayitlar = kayitlar.filter(kayit =>
  kayit.kullanici_adi.toLowerCase().includes(aramaQuery.toLowerCase()) ||
  kayit.sebep.toLowerCase().includes(aramaQuery.toLowerCase())
)
```

## Database Schema Reference

Run this SQL in Supabase SQL Editor (available in `supabase-schema.sql`):
- Creates `suc_kayitlari` table with UUID primary key
- Adds indexes on `kullanici_adi` and `olusturma_tarihi`
- Enables Row Level Security with public policies
- Includes sample data

## Deployment

**Recommended**: Vercel
1. Connect GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push
