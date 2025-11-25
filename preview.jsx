import { useState, useEffect } from 'react'

// Icons as simple SVG components
const Shield = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)

const Search = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
  </svg>
)

const Plus = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14M5 12h14"/>
  </svg>
)

const Trash2 = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
  </svg>
)

const Clock = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
  </svg>
)

const User = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
)

const Lock = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
  </svg>
)

const Database = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
  </svg>
)

const Timer = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/><path d="M12 6v6"/><path d="M16.24 7.76l-2.12 2.12"/>
  </svg>
)

const CheckCircle = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
  </svg>
)

const XCircle = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/>
  </svg>
)

const AlertTriangle = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m21.73 18-8-14a2 2 0 00-3.48 0l-8 14A2 2 0 004 21h16a2 2 0 001.73-3zM12 9v4M12 17h.01"/>
  </svg>
)

const Eye = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
)

const EyeOff = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
)

const FileText = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
  </svg>
)

const ADMIN_PASSWORD = 'AsEnTJ_?WORLD_ESHOT1?STUDIO'

export default function GBTSistemi() {
  const [kayitlar, setKayitlar] = useState([
    { id: '1', kullanici_adi: 'DarkNight_TR', sebep: 'Yasadışı Araç Kullanımı', sure: '30', sure_tipi: 'dakika', olusturma_tarihi: new Date().toISOString() },
    { id: '2', kullanici_adi: 'StormRider99', sebep: 'Kamu Malına Zarar', sure: '2', sure_tipi: 'saat', olusturma_tarihi: new Date(Date.now() - 3600000).toISOString() },
    { id: '3', kullanici_adi: 'ShadowHunter', sebep: 'Silah Kaçakçılığı', sure: '4', sure_tipi: 'saat', olusturma_tarihi: new Date(Date.now() - 7200000).toISOString() }
  ])
  const [activeTab, setActiveTab] = useState('sorgula')
  const [kullaniciAdi, setKullaniciAdi] = useState('')
  const [sebep, setSebep] = useState('')
  const [sure, setSure] = useState('')
  const [sureTipi, setSureTipi] = useState('dakika')
  const [aramaQuery, setAramaQuery] = useState('')
  const [cooldown, setCooldown] = useState(0)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [selectedKayitId, setSelectedKayitId] = useState(null)
  const [passwordAttempts, setPasswordAttempts] = useState(0)
  const [lockoutTime, setLockoutTime] = useState(0)
  const [passwordError, setPasswordError] = useState('')
  const [notification, setNotification] = useState(null)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [cooldown])

  useEffect(() => {
    if (lockoutTime > 0) {
      const timer = setTimeout(() => setLockoutTime(lockoutTime - 1), 1000)
      return () => clearTimeout(timer)
    } else if (lockoutTime === 0 && passwordAttempts >= 3) {
      setPasswordAttempts(0)
    }
  }, [lockoutTime, passwordAttempts])

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  const handleEkle = (e) => {
    e.preventDefault()
    if (cooldown > 0) {
      setNotification({ type: 'warning', message: `Lütfen ${cooldown} saniye bekleyin` })
      return
    }
    if (!kullaniciAdi.trim() || !sebep.trim() || !sure.trim()) {
      setNotification({ type: 'error', message: 'Tüm alanları doldurun' })
      return
    }
    const yeniKayit = {
      id: Date.now().toString(),
      kullanici_adi: kullaniciAdi.trim(),
      sebep: sebep.trim(),
      sure: sure.trim(),
      sure_tipi: sureTipi,
      olusturma_tarihi: new Date().toISOString()
    }
    setKayitlar(prev => [yeniKayit, ...prev])
    setNotification({ type: 'success', message: 'Suç kaydı başarıyla oluşturuldu' })
    setKullaniciAdi('')
    setSebep('')
    setSure('')
    setCooldown(10)
  }

  const handleSilmeBaslat = (id) => {
    if (lockoutTime > 0) {
      setNotification({ type: 'error', message: `${lockoutTime} saniye beklemeniz gerekiyor` })
      return
    }
    setSelectedKayitId(id)
    setShowPasswordModal(true)
    setPassword('')
    setPasswordError('')
  }

  const handleSifreDogrula = () => {
    if (lockoutTime > 0) {
      setPasswordError(`${lockoutTime} saniye beklemeniz gerekiyor`)
      return
    }
    if (password === ADMIN_PASSWORD) {
      setKayitlar(prev => prev.filter(k => k.id !== selectedKayitId))
      setNotification({ type: 'success', message: 'Kayıt başarıyla silindi' })
      setShowPasswordModal(false)
      setPasswordAttempts(0)
      setPassword('')
      setSelectedKayitId(null)
    } else {
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

  const filteredKayitlar = kayitlar.filter(kayit =>
    kayit.kullanici_adi.toLowerCase().includes(aramaQuery.toLowerCase()) ||
    kayit.sebep.toLowerCase().includes(aramaQuery.toLowerCase())
  )

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('tr-TR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #060810 0%, #0a0e14 50%, #0d1117 100%)',
      fontFamily: "'JetBrains Mono', monospace"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Orbitron:wght@400;500;600;700;800&display=swap');
        .font-display { font-family: 'Orbitron', sans-serif; }
        .glow-blue { box-shadow: 0 0 15px rgba(59, 130, 246, 0.4), 0 0 30px rgba(59, 130, 246, 0.2); }
        .glow-accent { box-shadow: 0 0 10px rgba(0, 180, 216, 0.3); }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes slideUp { 0% { transform: translateY(10px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
        .animate-pulse { animation: pulse 2s infinite; }
        .animate-slideUp { animation: slideUp 0.3s ease-out; }
        input:focus, select:focus, textarea:focus { outline: none; box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3), 0 0 20px rgba(59, 130, 246, 0.2); }
      `}</style>

      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 animate-slideUp">
          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px',
            borderRadius: '8px', backdropFilter: 'blur(8px)',
            background: notification.type === 'success' ? 'rgba(22, 101, 52, 0.8)' : notification.type === 'error' ? 'rgba(127, 29, 29, 0.8)' : 'rgba(113, 63, 18, 0.8)',
            border: `1px solid ${notification.type === 'success' ? 'rgba(34, 197, 94, 0.5)' : notification.type === 'error' ? 'rgba(239, 68, 68, 0.5)' : 'rgba(234, 179, 8, 0.5)'}`,
            color: notification.type === 'success' ? '#86efac' : notification.type === 'error' ? '#fca5a5' : '#fde047'
          }}>
            {notification.type === 'success' && <CheckCircle className="w-5 h-5" />}
            {notification.type === 'error' && <XCircle className="w-5 h-5" />}
            {notification.type === 'warning' && <AlertTriangle className="w-5 h-5" />}
            <span style={{ fontSize: '14px' }}>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 50,
          background: 'rgba(6, 8, 16, 0.9)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px'
        }}>
          <div style={{
            background: '#0a0e14', border: '1px solid rgba(30, 58, 95, 0.5)',
            borderRadius: '12px', padding: '24px', width: '100%', maxWidth: '400px'
          }} className="glow-blue animate-slideUp">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.2)', borderRadius: '8px' }}>
                <Lock className="w-6 h-6" style={{ color: '#f87171' }} />
              </div>
              <div>
                <h3 className="font-display" style={{ fontSize: '18px', color: 'white' }}>Yetkilendirme Gerekli</h3>
                <p style={{ color: '#9ca3af', fontSize: '14px' }}>Silme işlemi için şifre girin</p>
              </div>
            </div>
            <div style={{ position: 'relative', marginBottom: '16px' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSifreDogrula()}
                placeholder="Admin Şifresi"
                style={{
                  width: '100%', background: '#060810', border: '1px solid rgba(30, 58, 95, 0.3)',
                  borderRadius: '8px', padding: '12px 48px 12px 16px', color: 'white', fontSize: '14px'
                }}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af'
                }}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {passwordError && (
              <div style={{
                marginBottom: '16px', padding: '12px', background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px'
              }}>
                <p style={{ color: '#f87171', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertTriangle className="w-4 h-4" />{passwordError}
                </p>
              </div>
            )}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => { setShowPasswordModal(false); setPassword(''); setPasswordError(''); }}
                style={{
                  flex: 1, padding: '12px', background: 'rgba(30, 58, 95, 0.2)',
                  border: '1px solid rgba(30, 58, 95, 0.3)', borderRadius: '8px',
                  color: '#d1d5db', cursor: 'pointer', fontSize: '14px'
                }}
              >İptal</button>
              <button
                onClick={handleSifreDogrula}
                disabled={!password}
                style={{
                  flex: 1, padding: '12px', background: password ? '#dc2626' : '#4b5563',
                  border: 'none', borderRadius: '8px', color: 'white',
                  cursor: password ? 'pointer' : 'not-allowed', fontSize: '14px'
                }}
              >Onayla ve Sil</button>
            </div>
          </div>
        </div>
      )}

      {/* Cooldown */}
      {cooldown > 0 && (
        <div className="animate-slideUp" style={{ position: 'fixed', bottom: '16px', left: '16px', zIndex: 40 }}>
          <div className="glow-accent" style={{
            background: 'rgba(10, 14, 20, 0.9)', border: '1px solid rgba(0, 180, 216, 0.5)',
            borderRadius: '8px', padding: '12px 20px', backdropFilter: 'blur(8px)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Timer className="w-5 h-5 animate-pulse" style={{ color: '#00b4d8' }} />
              <span style={{ color: '#00b4d8', fontSize: '14px' }}>
                Bekleme: <span style={{ color: 'white', fontWeight: 'bold' }}>{cooldown}s</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Lockout */}
      {lockoutTime > 0 && (
        <div className="animate-slideUp" style={{ position: 'fixed', bottom: '16px', right: '16px', zIndex: 40 }}>
          <div style={{
            background: 'rgba(127, 29, 29, 0.9)', border: '1px solid rgba(239, 68, 68, 0.5)',
            borderRadius: '8px', padding: '12px 20px', backdropFilter: 'blur(8px)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Lock className="w-5 h-5 animate-pulse" style={{ color: '#f87171' }} />
              <span style={{ color: '#fecaca', fontSize: '14px' }}>
                Kilitli: <span style={{ color: 'white', fontWeight: 'bold' }}>{lockoutTime}s</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header style={{ borderBottom: '1px solid rgba(30, 58, 95, 0.3)', background: 'rgba(10, 14, 20, 0.8)', backdropFilter: 'blur(8px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(59, 130, 246, 0.3)', borderRadius: '16px', filter: 'blur(20px)' }}></div>
                <div className="glow-blue" style={{
                  position: 'relative', padding: '12px',
                  background: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)',
                  borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.5)'
                }}>
                  <Shield className="w-8 h-8" style={{ color: 'white' }} />
                </div>
              </div>
              <div>
                <h1 className="font-display" style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', letterSpacing: '2px' }}>
                  GBT SİSTEMİ
                </h1>
                <p style={{ color: '#00b4d8', fontSize: '12px', letterSpacing: '4px' }}>
                  GENEL BİLGİ TOPLAMA
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ textAlign: 'right' }}>
                <p style={{ color: '#9ca3af', fontSize: '10px', letterSpacing: '1px' }}>SİSTEM DURUMU</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="animate-pulse" style={{ width: '8px', height: '8px', background: '#22c55e', borderRadius: '50%' }}></span>
                  <span style={{ color: '#4ade80', fontSize: '14px' }}>AKTİF</span>
                </div>
              </div>
              <div style={{ height: '40px', width: '1px', background: 'rgba(30, 58, 95, 0.3)' }}></div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ color: '#9ca3af', fontSize: '10px', letterSpacing: '1px' }}>TARİH / SAAT</p>
                <p style={{ color: 'white', fontSize: '14px' }}>
                  {currentTime.toLocaleString('tr-TR', {
                    day: '2-digit', month: '2-digit', year: 'numeric',
                    hour: '2-digit', minute: '2-digit', second: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          <button
            onClick={() => setActiveTab('sorgula')}
            className={activeTab === 'sorgula' ? 'glow-blue' : ''}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px',
              borderRadius: '8px', fontSize: '14px', cursor: 'pointer',
              background: activeTab === 'sorgula' ? '#1e3a5f' : 'rgba(10, 14, 20, 0.5)',
              color: activeTab === 'sorgula' ? 'white' : '#9ca3af',
              border: activeTab === 'sorgula' ? 'none' : '1px solid rgba(30, 58, 95, 0.2)'
            }}
          >
            <Search className="w-4 h-4" />Sorgula
          </button>
          <button
            onClick={() => setActiveTab('ekle')}
            className={activeTab === 'ekle' ? 'glow-blue' : ''}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px',
              borderRadius: '8px', fontSize: '14px', cursor: 'pointer',
              background: activeTab === 'ekle' ? '#1e3a5f' : 'rgba(10, 14, 20, 0.5)',
              color: activeTab === 'ekle' ? 'white' : '#9ca3af',
              border: activeTab === 'ekle' ? 'none' : '1px solid rgba(30, 58, 95, 0.2)'
            }}
          >
            <Plus className="w-4 h-4" />Kayıt Ekle
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
          {/* Left Panel */}
          <div style={{
            background: 'rgba(10, 14, 20, 0.8)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(30, 58, 95, 0.3)', borderRadius: '12px', padding: '24px'
          }}>
            {activeTab === 'sorgula' ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <div style={{ padding: '8px', background: 'rgba(30, 58, 95, 0.2)', borderRadius: '8px' }}>
                    <Search className="w-5 h-5" style={{ color: '#00b4d8' }} />
                  </div>
                  <h2 className="font-display" style={{ fontSize: '18px', color: 'white' }}>Kayıt Sorgula</h2>
                </div>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={aramaQuery}
                    onChange={(e) => setAramaQuery(e.target.value)}
                    placeholder="Kullanıcı adı veya sebep ara..."
                    style={{
                      width: '100%', background: '#060810', border: '1px solid rgba(30, 58, 95, 0.3)',
                      borderRadius: '8px', padding: '12px 12px 12px 44px', color: 'white', fontSize: '14px'
                    }}
                  />
                  <Search className="w-4 h-4" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
                </div>
                <div style={{
                  marginTop: '16px', padding: '16px', background: 'rgba(6, 8, 16, 0.5)',
                  borderRadius: '8px', border: '1px solid rgba(30, 58, 95, 0.1)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: '#9ca3af' }}>Toplam Kayıt</span>
                    <span style={{ color: '#00b4d8', fontWeight: 'bold' }}>{kayitlar.length}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginTop: '8px' }}>
                    <span style={{ color: '#9ca3af' }}>Gösterilen</span>
                    <span style={{ color: 'white' }}>{filteredKayitlar.length}</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <div style={{ padding: '8px', background: 'rgba(30, 58, 95, 0.2)', borderRadius: '8px' }}>
                    <Plus className="w-5 h-5" style={{ color: '#00b4d8' }} />
                  </div>
                  <h2 className="font-display" style={{ fontSize: '18px', color: 'white' }}>Yeni Suç Kaydı</h2>
                </div>
                <form onSubmit={handleEkle}>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', color: '#9ca3af', fontSize: '11px', marginBottom: '8px', letterSpacing: '1px' }}>
                      <User className="w-3 h-3" style={{ display: 'inline', marginRight: '4px' }} />KULLANICI ADI
                    </label>
                    <input
                      type="text"
                      value={kullaniciAdi}
                      onChange={(e) => setKullaniciAdi(e.target.value)}
                      placeholder="Kullanıcı adını girin"
                      disabled={cooldown > 0}
                      style={{
                        width: '100%', background: '#060810', border: '1px solid rgba(30, 58, 95, 0.3)',
                        borderRadius: '8px', padding: '12px 16px', color: 'white', fontSize: '14px',
                        opacity: cooldown > 0 ? 0.5 : 1
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', color: '#9ca3af', fontSize: '11px', marginBottom: '8px', letterSpacing: '1px' }}>
                      <FileText className="w-3 h-3" style={{ display: 'inline', marginRight: '4px' }} />SUÇ SEBEBİ
                    </label>
                    <textarea
                      value={sebep}
                      onChange={(e) => setSebep(e.target.value)}
                      placeholder="Suç açıklaması"
                      rows={3}
                      disabled={cooldown > 0}
                      style={{
                        width: '100%', background: '#060810', border: '1px solid rgba(30, 58, 95, 0.3)',
                        borderRadius: '8px', padding: '12px 16px', color: 'white', fontSize: '14px',
                        resize: 'none', opacity: cooldown > 0 ? 0.5 : 1
                      }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', color: '#9ca3af', fontSize: '11px', marginBottom: '8px', letterSpacing: '1px' }}>
                        <Clock className="w-3 h-3" style={{ display: 'inline', marginRight: '4px' }} />SÜRE
                      </label>
                      <input
                        type="number"
                        value={sure}
                        onChange={(e) => setSure(e.target.value)}
                        placeholder="Süre"
                        min="1"
                        disabled={cooldown > 0}
                        style={{
                          width: '100%', background: '#060810', border: '1px solid rgba(30, 58, 95, 0.3)',
                          borderRadius: '8px', padding: '12px 16px', color: 'white', fontSize: '14px',
                          opacity: cooldown > 0 ? 0.5 : 1
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', color: '#9ca3af', fontSize: '11px', marginBottom: '8px', letterSpacing: '1px' }}>BİRİM</label>
                      <select
                        value={sureTipi}
                        onChange={(e) => setSureTipi(e.target.value)}
                        disabled={cooldown > 0}
                        style={{
                          width: '100%', background: '#060810', border: '1px solid rgba(30, 58, 95, 0.3)',
                          borderRadius: '8px', padding: '12px 16px', color: 'white', fontSize: '14px',
                          cursor: 'pointer', opacity: cooldown > 0 ? 0.5 : 1
                        }}
                      >
                        <option value="dakika">Dakika</option>
                        <option value="saat">Saat</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={cooldown > 0}
                    style={{
                      width: '100%', padding: '12px', borderRadius: '8px', border: 'none',
                      background: cooldown > 0 ? '#4b5563' : 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)',
                      color: 'white', fontSize: '14px', fontWeight: '600', cursor: cooldown > 0 ? 'not-allowed' : 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                    }}
                  >
                    {cooldown > 0 ? (
                      <><Timer className="w-4 h-4 animate-pulse" />Bekleniyor ({cooldown}s)</>
                    ) : (
                      <><Plus className="w-4 h-4" />Kayıt Oluştur</>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Right Panel - Table */}
          <div style={{
            background: 'rgba(10, 14, 20, 0.8)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(30, 58, 95, 0.3)', borderRadius: '12px', overflow: 'hidden'
          }}>
            <div style={{
              padding: '16px', borderBottom: '1px solid rgba(30, 58, 95, 0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Database className="w-5 h-5" style={{ color: '#00b4d8' }} />
                <h2 className="font-display" style={{ fontSize: '18px', color: 'white' }}>Suç Kayıtları</h2>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="animate-pulse" style={{ width: '8px', height: '8px', background: '#00b4d8', borderRadius: '50%' }}></span>
                <span style={{ fontSize: '12px', color: '#9ca3af' }}>Canlı Veri</span>
              </div>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'rgba(6, 8, 16, 0.5)' }}>
                    <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '11px', color: '#9ca3af', letterSpacing: '1px' }}>KULLANICI</th>
                    <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '11px', color: '#9ca3af', letterSpacing: '1px' }}>SEBEP</th>
                    <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '11px', color: '#9ca3af', letterSpacing: '1px' }}>SÜRE</th>
                    <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '11px', color: '#9ca3af', letterSpacing: '1px' }}>TARİH</th>
                    <th style={{ textAlign: 'center', padding: '12px 16px', fontSize: '11px', color: '#9ca3af', letterSpacing: '1px' }}>İŞLEM</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredKayitlar.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ padding: '48px', textAlign: 'center' }}>
                        <Database className="w-12 h-12" style={{ color: '#4b5563', margin: '0 auto 16px' }} />
                        <p style={{ color: '#9ca3af' }}>{aramaQuery ? 'Arama sonucu bulunamadı' : 'Henüz kayıt bulunmuyor'}</p>
                      </td>
                    </tr>
                  ) : (
                    filteredKayitlar.map((kayit) => (
                      <tr key={kayit.id} style={{ borderTop: '1px solid rgba(30, 58, 95, 0.1)' }}>
                        <td style={{ padding: '16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '32px', height: '32px', background: 'rgba(30, 58, 95, 0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <User className="w-4 h-4" style={{ color: '#00b4d8' }} />
                            </div>
                            <span style={{ color: 'white', fontWeight: '500' }}>{kayit.kullanici_adi}</span>
                          </div>
                        </td>
                        <td style={{ padding: '16px' }}>
                          <span style={{ color: '#d1d5db', fontSize: '14px' }}>{kayit.sebep}</span>
                        </td>
                        <td style={{ padding: '16px' }}>
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: '4px',
                            padding: '4px 12px', background: 'rgba(239, 68, 68, 0.2)',
                            color: '#f87171', borderRadius: '20px', fontSize: '14px'
                          }}>
                            <Clock className="w-3 h-3" />{kayit.sure} {kayit.sure_tipi}
                          </span>
                        </td>
                        <td style={{ padding: '16px' }}>
                          <span style={{ color: '#9ca3af', fontSize: '14px' }}>{formatDate(kayit.olusturma_tarihi)}</span>
                        </td>
                        <td style={{ padding: '16px', textAlign: 'center' }}>
                          <button
                            onClick={() => handleSilmeBaslat(kayit.id)}
                            disabled={lockoutTime > 0}
                            style={{
                              padding: '8px', borderRadius: '8px', border: 'none',
                              background: lockoutTime > 0 ? 'rgba(75, 85, 99, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                              color: lockoutTime > 0 ? '#6b7280' : '#f87171',
                              cursor: lockoutTime > 0 ? 'not-allowed' : 'pointer'
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(30, 58, 95, 0.2)',
        background: 'rgba(10, 14, 20, 0.5)', backdropFilter: 'blur(8px)', marginTop: 'auto'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280', fontSize: '12px' }}>
              <Shield className="w-4 h-4" />
              <span>GBT Sorgulama Sistemi v1.0</span>
            </div>
            <div style={{ color: '#6b7280', fontSize: '12px' }}>
              Asent Studios © {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
