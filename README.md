# 🛡️ GBT Sorgulama Sistemi

> Oyun içi suç kaydı yönetim sistemi - EGM (Emniyet Genel Müdürlüğü) tarzı arayüz

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Supabase](https://img.shields.io/badge/Supabase-Database-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue)

## 📸 Özellikler

- ✅ **Suç Kaydı Ekleme** - Kullanıcı adı, sebep ve süre bilgisiyle kayıt oluşturma
- ✅ **Kayıt Sorgulama** - Anlık arama ile kayıtları filtreleme
- ✅ **Şifreli Silme** - Admin şifresiyle güvenli kayıt silme
- ✅ **10 Saniye Cooldown** - Her kayıt sonrası spam önleme
- ✅ **3 Deneme Limiti** - Yanlış şifrede 1 dakika kilitleme
- ✅ **Canlı Saat** - Sistem saati gösterimi
- ✅ **EGM Tarzı Arayüz** - Mavi-siyah profesyonel tasarım

## 🚀 Kurulum

### 1. Supabase Kurulumu

1. [supabase.com](https://supabase.com) adresine git ve yeni proje oluştur
2. SQL Editor'e git
3. `supabase-schema.sql` dosyasındaki SQL'i çalıştır
4. Settings > API bölümünden URL ve Anon Key'i al

### 2. Proje Kurulumu

```bash
# Bağımlılıkları yükle
npm install

# .env.local dosyası oluştur
cp .env.example .env.local

# .env.local dosyasını düzenle ve Supabase bilgilerini ekle
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key

# Geliştirme sunucusunu başlat
npm run dev
```

### 3. Vercel'e Deploy

1. [vercel.com](https://vercel.com) adresine git
2. GitHub repo'nu bağla
3. Environment Variables'a Supabase bilgilerini ekle
4. Deploy!




## 📁 Proje Yapısı

```
gbt-sistem/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Ana layout
│   │   ├── page.tsx        # Ana sayfa
│   │   └── globals.css     # Global stiller
│   ├── lib/
│   │   └── supabase.ts     # Supabase client
│   └── components/         # Bileşenler (genişletilebilir)
├── supabase-schema.sql     # Veritabanı şeması
├── .env.example            # Env değişkenleri örneği
└── README.md
```

## 🎮 Kullanım

1. **Kayıt Ekleme**: "Kayıt Ekle" sekmesine tıkla, formu doldur
2. **Sorgulama**: "Sorgula" sekmesinde arama yap
3. **Silme**: Kayıt satırındaki çöp kutusu ikonuna tıkla, şifreyi gir

## 🛠️ Teknolojiler

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel
- **Icons**: Lucide React

## 📝 Lisans

AsEnTJ Studios © 2024

---

Made with 💙 by AsEnTJ Studios
