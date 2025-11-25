'use client'

import { useState, useEffect, useCallback } from 'react'
import { Shield, Search, Plus, Trash2, Clock, AlertTriangle, CheckCircle, XCircle, Lock, Eye, EyeOff, Database, User, FileText, Timer, RefreshCw } from 'lucide-react'
import { supabase, SucKaydi } from '@/lib/supabase'

// Admin şifresi (gerçek uygulamada environment variable olmalı)
const ADMIN_PASSWORD = 'AsEnTJ_?WORLD_ESHOT1?STUDIO'

export default function GBTSistemi() {
  // State tanımlamaları
  const [kayitlar, setKayitlar] = useState<SucKaydi[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'sorgula' | 'ekle'>('sorgula')
  
  // Form state
  const [kullaniciAdi, setKullaniciAdi] = useState('')
  const [sebep, setSebep] = useState('')
  const [sure, setSure] = useState('')
  const [sureTipi, setSureTipi] = useState<'dakika' | 'saat'>('dakika')
  
  // Arama state
  const [aramaQuery, setAramaQuery] = useState('')
  
  // Cooldown state
  const [cooldown, setCooldown] = useState(0)
  const [cooldownActive, setCooldownActive] = useState(false)
  
  // Şifre modal state
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [selectedKayitId, setSelectedKayitId] = useState<string | null>(null)
  const [passwordAttempts, setPasswordAttempts] = useState(0)
  const [lockoutTime, setLockoutTime] = useState(0)
  const [passwordError, setPasswordError] = useState('')
  
  // Toast/Notification state
  const [notification, setNotification] = useState<{type: 'success' | 'error' | 'warning', message: string} | null>(null)
  
  // Sistem saati
  const [currentTime, setCurrentTime] = useState(new Date())

  // Saat güncelleme
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Cooldown timer
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCooldownActive(false)
    }
  }, [cooldown])

  // Lockout timer
  useEffect(() => {
    if (lockoutTime > 0) {
      const timer = setTimeout(() => setLockoutTime(lockoutTime - 1), 1000)
      return () => clearTimeout(timer)
    } else if (lockoutTime === 0 && passwordAttempts >= 3) {
      setPasswordAttempts(0)
    }
  }, [lockoutTime, passwordAttempts])

  // Notification auto-hide
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  // Kayıtları yükle
  const fetchKayitlar = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('suc_kayitlari')
        .select('*')
        .order('olusturma_tarihi', { ascending: false })
      
      if (error) throw error
      setKayitlar(data || [])
    } catch (error) {
      console.error('Kayıtlar yüklenirken hata:', error)
      // Demo veriler
      setKayitlar([
        {
          id: '1',
          kullanici_adi: 'TestKullanici1',
          sebep: 'Yasadışı Araç Kullanımı',
          sure: '30',
          sure_tipi: 'dakika',
          olusturma_tarihi: new Date().toISOString()
        },
        {
          id: '2',
          kullanici_adi: 'TestKullanici2',
          sebep: 'Kamu Malına Zarar',
          sure: '2',
          sure_tipi: 'saat',
          olusturma_tarihi: new Date(Date.now() - 3600000).toISOString()
        }
      ])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchKayitlar()
  }, [fetchKayitlar])

  // Yeni kayıt ekle
  const handleEkle = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (cooldownActive) {
      setNotification({ type: 'warning', message: `Lütfen ${cooldown} saniye bekleyin` })
      return
    }
    
    if (!kullaniciAdi.trim() || !sebep.trim() || !sure.trim()) {
      setNotification({ type: 'error', message: 'Tüm alanları doldurun' })
      return
    }

    try {
      const yeniKayit: Omit<SucKaydi, 'id'> = {
        kullanici_adi: kullaniciAdi.trim(),
        sebep: sebep.trim(),
        sure: sure.trim(),
        sure_tipi: sureTipi,
        olusturma_tarihi: new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('suc_kayitlari')
        .insert([yeniKayit])
        .select()
        .single()

      if (error) throw error

      setKayitlar(prev => [data, ...prev])
      setNotification({ type: 'success', message: 'Suç kaydı başarıyla oluşturuldu' })
      
      // Formu temizle
      setKullaniciAdi('')
      setSebep('')
      setSure('')
      
      // 10 saniye cooldown başlat
      setCooldown(10)
      setCooldownActive(true)
      
    } catch (error) {
      console.error('Kayıt eklenirken hata:', error)
      // Demo mod için local ekleme
      const demoKayit: SucKaydi = {
        id: Date.now().toString(),
        kullanici_adi: kullaniciAdi.trim(),
        sebep: sebep.trim(),
        sure: sure.trim(),
        sure_tipi: sureTipi,
        olusturma_tarihi: new Date().toISOString()
      }
      setKayitlar(prev => [demoKayit, ...prev])
      setNotification({ type: 'success', message: 'Suç kaydı oluşturuldu (Demo Mod)' })
      setKullaniciAdi('')
      setSebep('')
      setSure('')
      setCooldown(10)
      setCooldownActive(true)
    }
  }

  // Silme işlemi için şifre kontrolü
  const handleSilmeBaslat = (id: string) => {
    if (lockoutTime > 0) {
      setNotification({ type: 'error', message: `${lockoutTime} saniye beklemeniz gerekiyor` })
      return
    }
    setSelectedKayitId(id)
    setShowPasswordModal(true)
    setPassword('')
    setPasswordError('')
  }

  // Şifre doğrulama ve silme
  const handleSifreDogrula = async () => {
    if (lockoutTime > 0) {
      setPasswordError(`${lockoutTime} saniye beklemeniz gerekiyor`)
      return
    }

    if (password === ADMIN_PASSWORD) {
      // Şifre doğru - sil
      try {
        if (selectedKayitId) {
          const { error } = await supabase
            .from('suc_kayitlari')
            .delete()
            .eq('id', selectedKayitId)

          if (error) throw error
        }
        
        setKayitlar(prev => prev.filter(k => k.id !== selectedKayitId))
        setNotification({ type: 'success', message: 'Kayıt başarıyla silindi' })
        setShowPasswordModal(false)
        setPasswordAttempts(0)
        setPassword('')
        setSelectedKayitId(null)
        
      } catch (error) {
        console.error('Silme hatası:', error)
        // Demo mod için local silme
        setKayitlar(prev => prev.filter(k => k.id !== selectedKayitId))
        setNotification({ type: 'success', message: 'Kayıt silindi (Demo Mod)' })
        setShowPasswordModal(false)
        setPasswordAttempts(0)
        setPassword('')
        setSelectedKayitId(null)
      }
    } else {
      // Şifre yanlış
      const newAttempts = passwordAttempts + 1
      setPasswordAttempts(newAttempts)
      
      if (newAttempts >= 3) {
        setLockoutTime(60)
        setPasswordError('3 yanlış deneme! 1 dakika beklemeniz gerekiyor.')
        setShowPasswordModal(false)
        setPassword('')
        setNotification({ type: 'error', message: '3 yanlış şifre denemesi! 1 dakika kilitlendiniz.' })
      } else {
        setPasswordError(`Şifre yanlış! (${3 - newAttempts} deneme hakkı kaldı)`)
      }
    }
  }

  // Filtrelenmiş kayıtlar
  const filteredKayitlar = kayitlar.filter(kayit => 
    kayit.kullanici_adi.toLowerCase().includes(aramaQuery.toLowerCase()) ||
    kayit.sebep.toLowerCase().includes(aramaQuery.toLowerCase())
  )

  // Tarih formatlama
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen grid-overlay relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-egm-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-egm-accent/5 rounded-full blur-3xl"></div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 animate-slideUp`}>
          <div className={`flex items-center gap-3 px-5 py-4 rounded-lg border backdrop-blur-sm ${
            notification.type === 'success' 
              ? 'bg-green-900/80 border-green-500/50 text-green-100' 
              : notification.type === 'error'
              ? 'bg-red-900/80 border-red-500/50 text-red-100'
              : 'bg-yellow-900/80 border-yellow-500/50 text-yellow-100'
          }`}>
            {notification.type === 'success' && <CheckCircle className="w-5 h-5" />}
            {notification.type === 'error' && <XCircle className="w-5 h-5" />}
            {notification.type === 'warning' && <AlertTriangle className="w-5 h-5" />}
            <span className="font-mono text-sm">{notification.message}</span>
          </div>
        </div>
      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-4">
          <div className="bg-egm-dark border border-egm-blue/50 rounded-xl p-6 w-full max-w-md glow-blue animate-fadeIn">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-red-500/20 rounded-lg">
                <Lock className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="font-display text-lg text-white">Yetkilendirme Gerekli</h3>
                <p className="text-gray-400 text-sm font-mono">Silme işlemi için şifre girin</p>
              </div>
            </div>
            
            <div className="relative mb-4">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSifreDogrula()}
                placeholder="Admin Şifresi"
                className="w-full bg-egm-darker border border-egm-blue/30 rounded-lg px-4 py-3 pr-12 text-white font-mono placeholder:text-gray-500 input-egm focus:outline-none focus:border-egm-blue-light"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            
            {passwordError && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm font-mono flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  {passwordError}
                </p>
              </div>
            )}
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowPasswordModal(false)
                  setPassword('')
                  setPasswordError('')
                }}
                className="flex-1 px-4 py-3 bg-egm-blue/20 hover:bg-egm-blue/30 border border-egm-blue/30 rounded-lg text-gray-300 font-mono transition-all"
              >
                İptal
              </button>
              <button
                onClick={handleSifreDogrula}
                disabled={!password}
                className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg text-white font-mono transition-all btn-egm"
              >
                Onayla ve Sil
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cooldown Overlay */}
      {cooldownActive && (
        <div className="fixed bottom-4 left-4 z-40 animate-slideUp">
          <div className="bg-egm-dark/90 border border-egm-accent/50 rounded-lg px-5 py-3 backdrop-blur-sm glow-accent">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Timer className="w-5 h-5 text-egm-accent animate-pulse" />
              </div>
              <span className="font-mono text-egm-accent">
                Bekleme süresi: <span className="text-white font-bold">{cooldown}s</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Lockout Warning */}
      {lockoutTime > 0 && (
        <div className="fixed bottom-4 right-4 z-40 animate-slideUp">
          <div className="bg-red-900/90 border border-red-500/50 rounded-lg px-5 py-3 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-red-400 animate-pulse" />
              <span className="font-mono text-red-200">
                Kilitli: <span className="text-white font-bold">{lockoutTime}s</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="relative border-b border-egm-blue/30 bg-egm-dark/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Title */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-egm-blue-glow/30 rounded-full blur-xl"></div>
                <div className="relative p-3 bg-gradient-to-br from-egm-blue to-egm-blue-light rounded-xl border border-egm-blue-light/50 glow-blue">
                  <Shield className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="font-display text-xl md:text-2xl font-bold text-white tracking-wider">
                  GBT SİSTEMİ
                </h1>
                <p className="text-egm-accent text-xs md:text-sm font-mono tracking-widest">
                  GENEL BİLGİ TOPLAMA
                </p>
              </div>
            </div>

            {/* System Info */}
            <div className="hidden md:flex items-center gap-6">
              <div className="text-right">
                <p className="text-gray-400 text-xs font-mono">SİSTEM DURUMU</p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-green-400 text-sm font-mono">AKTİF</span>
                </div>
              </div>
              <div className="h-10 w-px bg-egm-blue/30"></div>
              <div className="text-right">
                <p className="text-gray-400 text-xs font-mono">TARİH / SAAT</p>
                <p className="text-white font-mono text-sm">
                  {currentTime.toLocaleString('tr-TR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 py-6 md:py-8 relative">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('sorgula')}
            className={`flex items-center gap-2 px-5 py-3 rounded-lg font-mono text-sm transition-all ${
              activeTab === 'sorgula'
                ? 'bg-egm-blue text-white glow-blue'
                : 'bg-egm-dark/50 text-gray-400 hover:bg-egm-blue/20 border border-egm-blue/20'
            }`}
          >
            <Search className="w-4 h-4" />
            Sorgula
          </button>
          <button
            onClick={() => setActiveTab('ekle')}
            className={`flex items-center gap-2 px-5 py-3 rounded-lg font-mono text-sm transition-all ${
              activeTab === 'ekle'
                ? 'bg-egm-blue text-white glow-blue'
                : 'bg-egm-dark/50 text-gray-400 hover:bg-egm-blue/20 border border-egm-blue/20'
            }`}
          >
            <Plus className="w-4 h-4" />
            Kayıt Ekle
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Panel - Form/Search */}
          <div className="lg:col-span-1">
            <div className="bg-egm-dark/80 backdrop-blur-sm border border-egm-blue/30 rounded-xl p-6 card-egm">
              {activeTab === 'sorgula' ? (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-egm-blue/20 rounded-lg">
                      <Search className="w-5 h-5 text-egm-accent" />
                    </div>
                    <h2 className="font-display text-lg text-white">Kayıt Sorgula</h2>
                  </div>
                  
                  <div className="relative">
                    <input
                      type="text"
                      value={aramaQuery}
                      onChange={(e) => setAramaQuery(e.target.value)}
                      placeholder="Kullanıcı adı veya sebep ara..."
                      className="w-full bg-egm-darker border border-egm-blue/30 rounded-lg pl-11 pr-4 py-3 text-white font-mono placeholder:text-gray-500 input-egm focus:outline-none focus:border-egm-blue-light"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  </div>
                  
                  <div className="mt-4 p-4 bg-egm-darker/50 rounded-lg border border-egm-blue/10">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400 font-mono">Toplam Kayıt</span>
                      <span className="text-egm-accent font-mono font-bold">{kayitlar.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-2">
                      <span className="text-gray-400 font-mono">Gösterilen</span>
                      <span className="text-white font-mono">{filteredKayitlar.length}</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-egm-blue/20 rounded-lg">
                      <Plus className="w-5 h-5 text-egm-accent" />
                    </div>
                    <h2 className="font-display text-lg text-white">Yeni Suç Kaydı</h2>
                  </div>
                  
                  <form onSubmit={handleEkle} className="space-y-4">
                    <div>
                      <label className="block text-gray-400 text-xs font-mono mb-2 uppercase tracking-wider">
                        <User className="w-3 h-3 inline mr-1" />
                        Kullanıcı Adı
                      </label>
                      <input
                        type="text"
                        value={kullaniciAdi}
                        onChange={(e) => setKullaniciAdi(e.target.value)}
                        placeholder="Kullanıcı adını girin"
                        className="w-full bg-egm-darker border border-egm-blue/30 rounded-lg px-4 py-3 text-white font-mono placeholder:text-gray-500 input-egm focus:outline-none focus:border-egm-blue-light"
                        disabled={cooldownActive}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-400 text-xs font-mono mb-2 uppercase tracking-wider">
                        <FileText className="w-3 h-3 inline mr-1" />
                        Suç Sebebi
                      </label>
                      <textarea
                        value={sebep}
                        onChange={(e) => setSebep(e.target.value)}
                        placeholder="Suç açıklaması"
                        rows={3}
                        className="w-full bg-egm-darker border border-egm-blue/30 rounded-lg px-4 py-3 text-white font-mono placeholder:text-gray-500 input-egm focus:outline-none focus:border-egm-blue-light resize-none"
                        disabled={cooldownActive}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-gray-400 text-xs font-mono mb-2 uppercase tracking-wider">
                          <Clock className="w-3 h-3 inline mr-1" />
                          Süre
                        </label>
                        <input
                          type="number"
                          value={sure}
                          onChange={(e) => setSure(e.target.value)}
                          placeholder="Süre"
                          min="1"
                          className="w-full bg-egm-darker border border-egm-blue/30 rounded-lg px-4 py-3 text-white font-mono placeholder:text-gray-500 input-egm focus:outline-none focus:border-egm-blue-light"
                          disabled={cooldownActive}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 text-xs font-mono mb-2 uppercase tracking-wider">
                          Birim
                        </label>
                        <select
                          value={sureTipi}
                          onChange={(e) => setSureTipi(e.target.value as 'dakika' | 'saat')}
                          className="w-full bg-egm-darker border border-egm-blue/30 rounded-lg px-4 py-3 text-white font-mono input-egm focus:outline-none focus:border-egm-blue-light cursor-pointer"
                          disabled={cooldownActive}
                        >
                          <option value="dakika">Dakika</option>
                          <option value="saat">Saat</option>
                        </select>
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={cooldownActive}
                      className={`w-full py-3 rounded-lg font-mono font-semibold transition-all btn-egm ${
                        cooldownActive
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-egm-blue to-egm-blue-light text-white hover:shadow-lg hover:shadow-egm-blue/30'
                      }`}
                    >
                      {cooldownActive ? (
                        <span className="flex items-center justify-center gap-2">
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          Bekleniyor ({cooldown}s)
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <Plus className="w-4 h-4" />
                          Kayıt Oluştur
                        </span>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

          {/* Right Panel - Records List */}
          <div className="lg:col-span-2">
            <div className="bg-egm-dark/80 backdrop-blur-sm border border-egm-blue/30 rounded-xl overflow-hidden">
              {/* Table Header */}
              <div className="p-4 border-b border-egm-blue/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-egm-accent" />
                  <h2 className="font-display text-lg text-white">Suç Kayıtları</h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-egm-accent rounded-full animate-pulse"></span>
                  <span className="text-xs font-mono text-gray-400">Canlı Veri</span>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                {loading ? (
                  <div className="p-12 text-center">
                    <RefreshCw className="w-8 h-8 text-egm-accent animate-spin mx-auto mb-4" />
                    <p className="text-gray-400 font-mono">Kayıtlar yükleniyor...</p>
                  </div>
                ) : filteredKayitlar.length === 0 ? (
                  <div className="p-12 text-center">
                    <Database className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 font-mono">
                      {aramaQuery ? 'Arama sonucu bulunamadı' : 'Henüz kayıt bulunmuyor'}
                    </p>
                  </div>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="bg-egm-darker/50">
                        <th className="text-left px-4 py-3 text-xs font-mono text-gray-400 uppercase tracking-wider">Kullanıcı</th>
                        <th className="text-left px-4 py-3 text-xs font-mono text-gray-400 uppercase tracking-wider">Sebep</th>
                        <th className="text-left px-4 py-3 text-xs font-mono text-gray-400 uppercase tracking-wider">Süre</th>
                        <th className="text-left px-4 py-3 text-xs font-mono text-gray-400 uppercase tracking-wider">Tarih</th>
                        <th className="text-center px-4 py-3 text-xs font-mono text-gray-400 uppercase tracking-wider">İşlem</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-egm-blue/10">
                      {filteredKayitlar.map((kayit, index) => (
                        <tr 
                          key={kayit.id} 
                          className="table-row-egm"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-egm-blue/20 rounded-lg flex items-center justify-center">
                                <User className="w-4 h-4 text-egm-accent" />
                              </div>
                              <span className="text-white font-mono font-medium">{kayit.kullanici_adi}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <span className="text-gray-300 font-mono text-sm">{kayit.sebep}</span>
                          </td>
                          <td className="px-4 py-4">
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-mono">
                              <Clock className="w-3 h-3" />
                              {kayit.sure} {kayit.sure_tipi}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <span className="text-gray-400 font-mono text-sm">{formatDate(kayit.olusturma_tarihi)}</span>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <button
                              onClick={() => handleSilmeBaslat(kayit.id)}
                              disabled={lockoutTime > 0}
                              className={`p-2 rounded-lg transition-all ${
                                lockoutTime > 0
                                  ? 'bg-gray-600/20 text-gray-500 cursor-not-allowed'
                                  : 'bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-300'
                              }`}
                              title={lockoutTime > 0 ? `${lockoutTime}s kilitli` : 'Kaydı Sil'}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-egm-blue/20 bg-egm-dark/50 backdrop-blur-sm mt-auto">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-500 text-xs font-mono">
              <Shield className="w-4 h-4" />
              <span>GBT Sorgulama Sistemi v1.0</span>
            </div>
            <div className="text-gray-500 text-xs font-mono">
              Asent Studios © {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
