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

This is a **monolithic single-page application** with all functionality in `src/app/page.tsx`. There are no separate components - everything is contained in one large client component (`'use client'`). The entire UI, state management, and business logic exists in this single 500+ line file.

**Important**: When making changes, you must work within this single file. Do not attempt to extract components or refactor into separate files unless explicitly requested.

### State Management

All state is managed locally with React `useState` hooks in `src/app/page.tsx`:
- `kayitlar` - Array of crime records fetched from Supabase
- `kullaniciAdi`, `sebep`, `sure`, `sureTipi` - Form inputs for adding records
- `aramaQuery` - Search/filter query string
- `cooldown`, `cooldownActive` - 10-second cooldown timer after adding records
- `showPasswordModal`, `password`, `selectedKayitId` - Password modal state for deletions
- `passwordAttempts`, `lockoutTime` - Failed password tracking (3 fails = 60s lockout)
- `notification` - Toast notification state (auto-dismisses after 4 seconds)
- `currentTime` - Real-time clock display updated every second

### Supabase Integration

**Client**: Initialized in `src/lib/supabase.ts` using environment variables from `.env.local`

**Database Schema** (`supabase-schema.sql`):
- Table: `suc_kayitlari`
- Columns: `id` (UUID primary key), `kullanici_adi` (VARCHAR 100), `sebep` (TEXT), `sure` (VARCHAR 20), `sure_tipi` (VARCHAR 10 - 'dakika' or 'saat'), `olusturma_tarihi` (TIMESTAMP), `guncelleme_tarihi` (TIMESTAMP)
- Indexes: `kullanici_adi`, `olusturma_tarihi DESC`, full-text search on `sebep` using Turkish language
- Trigger: Auto-updates `guncelleme_tarihi` on UPDATE
- RLS policies: Public read/insert/delete/update (password validation is client-side only)

**Operations**:
- `fetchKayitlar()`: SELECT all records ordered by `olusturma_tarihi DESC`
- Insert: Direct insert into `suc_kayitlari` after form validation and cooldown check
- Delete: Requires password validation before removing record by ID
- Fallback: If Supabase connection fails, falls back to hardcoded demo data in `src/app/page.tsx:91-112`

### Security Features

**Admin Password**: Hardcoded in `src/app/page.tsx:8` as `AsEnTJ_?WORLD_ESHOT1?STUDIO`
- Only used for delete operations
- Validated client-side (NOT secure for production use)
- If moving to production, migrate to environment variable and implement server-side validation

**Rate Limiting**:
- 10-second cooldown after adding records (prevents spam)
- Password attempts tracked: 3 failed attempts triggers 60-second lockout
- Lockout persists even if password modal is closed and reopened

### Styling System

**Tailwind Configuration** (`tailwind.config.ts`):

**Custom Colors**:
- `egm-dark`: #0a0e14 (main background)
- `egm-darker`: #060810 (body background)
- `egm-blue`: #1e3a5f (primary headers)
- `egm-blue-light`: #2563eb (buttons)
- `egm-accent`: #00b4d8 (cyan accents)
- `egm-gold`: #fbbf24, `egm-red`: #ef4444, `egm-green`: #22c55e

**Custom Fonts** (loaded in `src/app/layout.tsx`):
- `font-display`: Orbitron (headers, logo text)
- `font-mono`: JetBrains Mono (data tables, form inputs)

**Custom Animations**: `pulse-slow`, `scan`, `glow`, `fadeIn`, `slideUp`

**Grid Background**: Custom background pattern using `bg-grid-pattern` utility

### Key Workflows

**Adding Records**:
1. User fills form in "Kayıt Ekle" tab: username, reason, duration (number + dakika/saat)
2. Validates all fields filled (shows warning notification if not)
3. Checks cooldown not active (shows remaining seconds if active)
4. Inserts record to Supabase `suc_kayitlari` table
5. Clears form, starts 10-second cooldown timer
6. Shows success notification
7. Re-fetches records to update list immediately

**Deleting Records**:
1. User clicks trash icon on a record row
2. System checks if locked out from failed password attempts
3. Opens password modal, stores record ID in `selectedKayitId`
4. User enters password and submits
5. Validates against `ADMIN_PASSWORD` constant
6. Success: Deletes from Supabase, closes modal, resets attempts, shows success notification
7. Failure: Increments `passwordAttempts`, shows error message
8. After 3 failures: Sets 60-second `lockoutTime`, blocks all delete attempts until expired

**Search/Filter**:
- Client-side filtering using `Array.filter()` on `kayitlar` array
- Matches against both `kullanici_adi` and `sebep` fields (case-insensitive)
- Filters applied in real-time as user types in search input

## Deployment

**Vercel** (recommended):
1. Connect GitHub repository
2. Add environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Auto-deploys on push to main branch
