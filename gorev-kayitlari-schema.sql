-- ============================================
-- GBT Sistemi - Görev Kayıtları Tablosu
-- Bu SQL'i Supabase SQL Editor'de çalıştır
-- ============================================

-- Görev kayıtları tablosu
CREATE TABLE IF NOT EXISTS gorev_kayitlari (
  -- Primary Key
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Form Alanları (Kullanıcı Girdisi)
  gorev_adi VARCHAR(200) NOT NULL,
  gorev_aciklama TEXT NOT NULL,
  oyuncular TEXT NOT NULL,
  birim VARCHAR(20) NOT NULL CHECK (birim IN ('Asayiş', 'Trafik', 'PÖH')),

  -- Sistem Alanları (Otomatik)
  olusturma_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  guncelleme_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- İNDEKSLER (Hızlı Arama İçin)
-- ============================================

-- Görev adına göre arama
CREATE INDEX IF NOT EXISTS idx_gorev_adi ON gorev_kayitlari(gorev_adi);

-- Birime göre filtreleme
CREATE INDEX IF NOT EXISTS idx_birim ON gorev_kayitlari(birim);

-- Tarihe göre sıralama (yeniden eskiye)
CREATE INDEX IF NOT EXISTS idx_gorev_olusturma_tarihi ON gorev_kayitlari(olusturma_tarihi DESC);

-- Görev açıklama içinde arama (Full-text search)
CREATE INDEX IF NOT EXISTS idx_gorev_aciklama ON gorev_kayitlari USING gin(to_tsvector('turkish', gorev_aciklama));

-- Oyuncular içinde arama
CREATE INDEX IF NOT EXISTS idx_oyuncular ON gorev_kayitlari USING gin(to_tsvector('turkish', oyuncular));

-- ============================================
-- TRIGGER: Güncelleme tarihini otomatik ayarla
-- ============================================

CREATE OR REPLACE FUNCTION gorev_guncelleme_tarihi_trigger()
RETURNS TRIGGER AS $$
BEGIN
  NEW.guncelleme_tarihi = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_gorev_guncelleme_tarihi
  BEFORE UPDATE ON gorev_kayitlari
  FOR EACH ROW
  EXECUTE FUNCTION gorev_guncelleme_tarihi_trigger();

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLİCİES
-- ============================================

ALTER TABLE gorev_kayitlari ENABLE ROW LEVEL SECURITY;

-- Herkesin okuma yapabilmesi için policy
CREATE POLICY "Allow public read access on gorev_kayitlari" ON gorev_kayitlari
  FOR SELECT USING (true);

-- Herkesin ekleme yapabilmesi için policy
CREATE POLICY "Allow public insert access on gorev_kayitlari" ON gorev_kayitlari
  FOR INSERT WITH CHECK (true);

-- Herkesin silme yapabilmesi için policy (şifre kontrolü client-side)
CREATE POLICY "Allow public delete access on gorev_kayitlari" ON gorev_kayitlari
  FOR DELETE USING (true);

-- Herkesin güncelleme yapabilmesi için policy
CREATE POLICY "Allow public update access on gorev_kayitlari" ON gorev_kayitlari
  FOR UPDATE USING (true);

-- ============================================
-- ÖRNEK VERİLER (İsteğe Bağlı - Test İçin)
-- ============================================

INSERT INTO gorev_kayitlari (gorev_adi, gorev_aciklama, oyuncular, birim)
VALUES
  ('Rutin Devriye', 'Şehir merkezi rutin güvenlik devriyesi', 'AsEnT, Player1, Player2', 'Asayiş'),
  ('Hız Kontrolü', 'D100 karayolu hız kontrolü ve trafik denetimi', 'Player3, Player4', 'Trafik'),
  ('Özel Operasyon', 'Yüksek riskli bölgede güvenlik operasyonu', 'AsEnT, PÖH1, PÖH2, PÖH3', 'PÖH'),
  ('Kaza İncelemesi', 'Kavşakta meydana gelen trafik kazası inceleme', 'Player5', 'Trafik')
ON CONFLICT DO NOTHING;
