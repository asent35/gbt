-- ============================================
-- GBT Sistemi - Supabase Veritabanı Şeması
-- Bu SQL'i Supabase SQL Editor'de çalıştır
-- ============================================

-- Suç kayıtları ana tablosu
CREATE TABLE IF NOT EXISTS suc_kayitlari (
  -- Primary Key
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Form Alanları (Kullanıcı Girdisi)
  kullanici_adi VARCHAR(100) NOT NULL,
  sebep TEXT NOT NULL,
  sure VARCHAR(20) NOT NULL,
  sure_tipi VARCHAR(10) NOT NULL CHECK (sure_tipi IN ('dakika', 'saat')),

  -- Sistem Alanları (Otomatik)
  olusturma_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  guncelleme_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- İNDEKSLER (Hızlı Arama İçin)
-- ============================================

-- Kullanıcı adına göre arama
CREATE INDEX IF NOT EXISTS idx_kullanici_adi ON suc_kayitlari(kullanici_adi);

-- Tarihe göre sıralama (yeniden eskiye)
CREATE INDEX IF NOT EXISTS idx_olusturma_tarihi ON suc_kayitlari(olusturma_tarihi DESC);

-- Sebep içinde arama (Full-text search)
CREATE INDEX IF NOT EXISTS idx_sebep ON suc_kayitlari USING gin(to_tsvector('turkish', sebep));

-- ============================================
-- TRIGGER: Güncelleme tarihini otomatik ayarla
-- ============================================

CREATE OR REPLACE FUNCTION guncelleme_tarihi_trigger()
RETURNS TRIGGER AS $$
BEGIN
  NEW.guncelleme_tarihi = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_guncelleme_tarihi
  BEFORE UPDATE ON suc_kayitlari
  FOR EACH ROW
  EXECUTE FUNCTION guncelleme_tarihi_trigger();

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLİCİES
-- ============================================

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

-- Herkesin güncelleme yapabilmesi için policy
CREATE POLICY "Allow public update access" ON suc_kayitlari
  FOR UPDATE USING (true);

-- ============================================
-- ÖRNEK VERİLER (İsteğe Bağlı - Test İçin)
-- ============================================

INSERT INTO suc_kayitlari (kullanici_adi, sebep, sure, sure_tipi)
VALUES
  ('TestKullanici1', 'Trafik İhlali - Kırmızı Işık İhlali', '30', 'dakika'),
  ('TestKullanici2', 'Kamu Malına Zarar - Bina Duvarına Sprey Boya', '2', 'saat'),
  ('TestKullanici3', 'Yasadışı Araç Kullanımı - Ruhsatsız Silah Taşıma', '5', 'saat'),
  ('TestKullanici1', 'Hız Limiti Aşımı - 150 km/h', '45', 'dakika')
ON CONFLICT DO NOTHING;
