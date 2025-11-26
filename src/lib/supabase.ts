import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// TypeScript types for our database
export interface SucKaydi {
  id: string
  kullanici_adi: string
  sebep: string
  sure: string
  sure_tipi: 'dakika' | 'saat'
  olusturma_tarihi: string
}

export interface GorevKaydi {
  id: string
  gorev_adi: string
  gorev_aciklama: string
  oyuncular: string
  birim: 'Asayiş' | 'Trafik' | 'PÖH'
  olusturma_tarihi: string
}
