-- GBT Sistemi - Supabase Veritabanı Şeması
-- Bu SQL'i Supabase SQL Editor'de çalıştır

-- Suç kayıtları tablosu
CREATE TABLE IF NOT EXISTS suc_kayitlari (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  kullanici_adi VARCHAR(100) NOT NULL,
  sebep TEXT NOT NULL,
  sure VARCHAR(20) NOT NULL,
  sure_tipi VARCHAR(10) NOT NULL CHECK (sure_tipi IN ('dakika', 'saat')),
  olusturma_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster searches
CREATE INDEX IF NOT EXISTS idx_kullanici_adi ON suc_kayitlari(kullanici_adi);
CREATE INDEX IF NOT EXISTS idx_olusturma_tarihi ON suc_kayitlari(olusturma_tarihi DESC);

-- Row Level Security (RLS) - Herkese okuma/yazma izni
ALTER TABLE suc_kayitlari ENABLE ROW LEVEL SECURITY;

-- Herkesin okuma yapabilmesi için policy
CREATE POLICY "Allow public read access" ON suc_kayitlari
  FOR SELECT USING (true);

-- Herkesin ekleme yapabilmesi için policy
CREATE POLICY "Allow public insert access" ON suc_kayitlari
  FOR INSERT WITH CHECK (true);

-- Herkesin silme yapabilmesi için policy (şifre kontrolü client-side)
CREATE POLICY "Allow public delete access" ON suc_kayitlari
  FOR DELETE USING (true);

-- Örnek veri (isteğe bağlı)
INSERT INTO suc_kayitlari (kullanici_adi, sebep, sure, sure_tipi)
VALUES 
  ('OrnekKullanici1', 'Trafik İhlali', '30', 'dakika'),
  ('OrnekKullanici2', 'Kamu Malına Zarar', '2', 'saat');
