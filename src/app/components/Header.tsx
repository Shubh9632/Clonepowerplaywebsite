import { useState, useEffect, useRef } from 'react';
import { Sun, MousePointer2 } from 'lucide-react';
import { getUser, logout, getWalletBalance } from '../utils/auth';
import { MobileBottomNav } from './MobileBottomNav';

// Navigation pill items — using local public assets where available
const navItems = [
  { label: 'Sports',       icon: '/sports.png' },
  { label: 'E-Sports',     icon: '/lp-images/esport.webp',    fallback: '🎮' },
  { label: 'Live',         icon: '/casino.png', fallback: '🔴' },
  { label: 'Slots',        icon: '/casino.png' },
  { label: 'Chicken Road', icon: '/chicken-road.png',          fallback: '🐔' },
];

const drawerMenuItems = [
  { icon: '/sidebar-icon/sidebar-casino-icon.png', label: 'Casino' },
  { icon: '/sidebar-icon/sidebar-sports-icon.png', label: 'Sports' },
];
const drawerMenuItems2 = [
  { icon: '/sidebar-icon/sidebar-gift-icon.png',  label: 'Promotion' },
  { icon: '/sidebar-icon/sidebar-refer-icon.png', label: 'Refer and Earn' },
  { icon: '/sidebar-icon/sidebar-affilate-icon.png', label: 'Affiliate' },
  { icon: '/sidebar-icon/sidebar-blog-icon.png',  label: 'Blog' },
];
const drawerSupportItems = [
  { icon: '/whatsapp.png',                    label: 'WhatsApp' },
  { icon: '/sidebar-callUs-icon.png',         label: 'Call Us' },
];

function Sep() {
  return <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '4px 12px' }} />;
}

function DrawerRow({ icon, label, active, onClick }: { icon: string; label: string; active?: boolean; onClick?: () => void }) {
  return (
    <a href="javascript:void(0)" onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: '14px',
      padding: '0 16px', height: '52px', flexShrink: 0,
      background: active ? '#CCFF00' : 'transparent',
      borderRadius: '10px', margin: '2px 8px',
      textDecoration: 'none', cursor: 'pointer', transition: 'background 0.15s',
    }}
      onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; }}
      onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
    >
      <img src={icon} alt={label} onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
        style={{ width: '28px', height: '28px', objectFit: 'contain', flexShrink: 0 }} />
      <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '15px', fontWeight: 400, color: active ? '#000' : '#fff', whiteSpace: 'nowrap' }}>{label}</span>
    </a>
  );
}

function NavIcon({ src, fallback, alt }: { src: string; fallback?: string; alt: string }) {
  const [err, setErr] = useState(false);
  if (err && fallback) return <span style={{ fontSize: '16px', lineHeight: 1 }}>{fallback}</span>;
  return <img src={src} alt={alt} onError={() => setErr(true)} style={{ width: '22px', height: '22px', objectFit: 'contain', display: 'block', flexShrink: 0 }} />;
}

type Page = 'home' | 'login' | 'register' | 'deposit' | 'account' | 'transaction-history' | 'account-statement' | 'open-bets';

export function Header({ onNavigate }: { onNavigate?: (page: Page) => void } = {}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(() => getUser());
  const [balance, setBalance] = useState(() => getWalletBalance());
  const [walletOpen, setWalletOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const walletRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h1 = () => setUser(getUser());
    const h2 = () => setBalance(getWalletBalance());
    window.addEventListener('auth-change', h1);
    window.addEventListener('wallet-change', h2);
    return () => {
      window.removeEventListener('auth-change', h1);
      window.removeEventListener('wallet-change', h2);
    };
  }, []);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (walletRef.current && !walletRef.current.contains(e.target as Node)) setWalletOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    onNavigate?.('home');
  };

  return (
    <>
      {/* ════ HEADER ════ */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: '#0d0d0d',
        width: '100%', fontFamily: "'Outfit', sans-serif",
        borderBottom: '1px solid #1a1a1a',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          width: '100%', height: '52px',
          padding: '0 12px',
          boxSizing: 'border-box',
        }}>

          {/* Logo — left aligned, no hamburger on mobile */}
          <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
            <a href="javascript:void(0)" onClick={() => onNavigate?.('home')} style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src="/logo/logo.png"
                alt="PowerPLAY"
                onError={e => { (e.currentTarget as HTMLImageElement).src = '/logo/logo.png'; }}
                style={{ height: '32px', objectFit: 'contain', display: 'block' }}
              />
            </a>
          </div>

          {/* Center nav pills — desktop only */}
          <nav className="hidden lg:flex" style={{ flex: 1, justifyContent: 'center' }}>
            <ul style={{ display: 'flex', alignItems: 'center', listStyle: 'none', margin: 0, padding: 0, gap: '4px' }}>
              {navItems.map((item, i) => (
                <li key={i}>
                  <a href="javascript:void(0)" style={{
                    display: 'flex', alignItems: 'center', gap: '5px',
                    height: '34px', padding: '0 10px',
                    background: '#262626',
                    border: '1px solid #CCFF00',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    color: '#fff',
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '12px', fontWeight: 400,
                    whiteSpace: 'nowrap', cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#333'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#262626'; }}
                  >
                    <NavIcon src={item.icon} fallback={item.fallback} alt={item.label} />
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {!user ? (
              <>
                {/* LOGIN — bright lime green, matches original */}
                <a href="javascript:void(0)" onClick={() => onNavigate?.('login')} style={{
                  height: '36px', padding: '0 18px',
                  background: '#c8ff00', color: '#000',
                  fontFamily: "'Outfit', sans-serif", fontSize: '13px', fontWeight: 800,
                  letterSpacing: '0.06em', textTransform: 'uppercase', borderRadius: '5px',
                  display: 'flex', alignItems: 'center', textDecoration: 'none', cursor: 'pointer',
                  boxShadow: '0 0 8px rgba(200,255,0,0.3)',
                }}>LOGIN</a>
                {/* REGISTER — solid blue matching original */}
                <a href="javascript:void(0)" onClick={() => onNavigate?.('register')} style={{
                  height: '36px', padding: '0 14px',
                  background: '#1565c0', color: '#fff',
                  border: 'none',
                  fontFamily: "'Outfit', sans-serif", fontSize: '13px', fontWeight: 800,
                  letterSpacing: '0.06em', textTransform: 'uppercase', borderRadius: '5px',
                  display: 'flex', alignItems: 'center', textDecoration: 'none', cursor: 'pointer',
                }}>REGISTER</a>
              </>
            ) : (
              <>
                {/* ── Wallet balance pill ── */}
                <div ref={walletRef} style={{ position: 'relative', flexShrink: 0 }}>
                  <button onClick={() => setWalletOpen(!walletOpen)} style={{
                    height: '28px', padding: '0 6px 0 8px', gap: '6px',
                    background: '#222', border: '1px solid #CCFF00', borderRadius: '4px',
                    cursor: 'pointer', display: 'flex', alignItems: 'center',
                    color: '#fff', fontFamily: "'Outfit', sans-serif", fontSize: '13px', fontWeight: 700,
                  }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                      <path d="M20 12v10H4V12"/><path d="M22 7H2v5h20V7z"/>
                      <path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
                      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
                    </svg>
                    {balance.toFixed(2)}
                    <div style={{ background: '#000', borderRadius: '50%', width: '14px', height: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#CCFF00" strokeWidth="3"><polyline points="6,9 12,15 18,9"/></svg>
                    </div>
                  </button>
                  {walletOpen && (
                    <div style={{ position: 'absolute', top: '34px', right: 0, background: '#222', border: '1px solid #CCFF00', borderRadius: '8px', padding: '12px 16px', minWidth: '160px', zIndex: 300 }}>
                      <div style={{ color: '#888', fontSize: '11px', marginBottom: '4px' }}>Main Balance</div>
                      <div style={{ color: '#CCFF00', fontSize: '18px', fontWeight: 700 }}>₹ {balance.toFixed(2)}</div>
                    </div>
                  )}
                </div>

                {/* ── Gift/Wallet Icon (Circle) ── */}
                <button onClick={() => onNavigate?.('deposit')} style={{ width: '28px', height: '28px', flexShrink: 0, border: '1px solid #CCFF00', borderRadius: '50%', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="#8bc34a" stroke="#CCFF00" strokeWidth="1.5">
                     <rect x="3" y="8" width="18" height="12" rx="2"/><path d="M12 8v12"/><path d="M19 8c-1.5-3-5-3-7 0-2-3-5.5-3-7 0"/>
                   </svg>
                </button>

                {/* ── Bell / notifications — yellow-green bg ── */}
                <button style={{ width: '28px', height: '28px', flexShrink: 0, border: 'none', borderRadius: '50%', background: '#CCFF00', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', cursor: 'pointer', position: 'relative' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="#000" stroke="none">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                  </svg>
                  <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '10px', height: '10px', background: '#00c853', borderRadius: '50%', border: '1px solid #222' }} />
                </button>

                {/* ── Avatar / Profile — yellow border ── */}
                <div ref={profileRef} style={{ position: 'relative', flexShrink: 0 }}>
                  <button onClick={() => setProfileOpen(!profileOpen)} style={{
                    width: '28px', height: '28px',
                    background: '#111', border: '1px solid #CCFF00', borderRadius: '50%',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#ccc" stroke="none" style={{ marginTop: '2px' }}>
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                  </button>
                  {profileOpen && (
                    <>
                    <div onClick={() => setProfileOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 90, background: 'rgba(0,0,0,0.7)' }} />
                    <div style={{
                      position: 'fixed', top: '70px', left: '10px', right: '10px', bottom: '10px', background: '#2c2d30', border: '1px solid #CCFF00', borderRadius: '8px',
                      zIndex: 100, display: 'flex', flexDirection: 'column',
                      fontFamily: "'Outfit', sans-serif", overflowY: 'auto',
                    }}>
                      {/* Header row */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                           <div style={{ width: '48px', height: '48px', background: '#222', borderRadius: '8px', border: '2px solid #111', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0, gap: '2px', overflow: 'hidden' }}>
                             <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff" stroke="none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                             <span style={{ color: '#fff', fontSize: '9px', fontWeight: 600 }}>users</span>
                           </div>
                           <div style={{ color: '#fff', fontSize: '15px', fontWeight: 800 }}>{user}</div>
                        </div>
                        <button onClick={() => setProfileOpen(false)} style={{ width: '28px', height: '28px', background: '#111', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', cursor: 'pointer' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </button>
                      </div>

                      <div style={{ padding: '0 14px 14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {/* DEPOSIT / WITHDRAW */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                          <button onClick={() => { setProfileOpen(false); onNavigate?.('deposit'); }} style={{ height: '36px', background: '#000', border: '1px solid #CCFF00', borderRadius: '6px', color: '#fff', fontWeight: 800, fontSize: '13px', cursor: 'pointer', letterSpacing: '0.04em' }}>DEPOSIT</button>
                          <button onClick={() => { setProfileOpen(false); onNavigate?.('account'); }} style={{ height: '36px', background: '#000', border: '1px solid #CCFF00', borderRadius: '6px', color: '#fff', fontWeight: 800, fontSize: '13px', cursor: 'pointer', letterSpacing: '0.04em' }}>WITHDRAW</button>
                        </div>

                        {/* Balances */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                          <div style={{ background: 'transparent', border: '1px solid #CCFF00', borderRadius: '6px', padding: '10px' }}>
                            <div style={{ color: '#888', fontSize: '10px', fontWeight: 600, marginBottom: '4px' }}>Available balance</div>
                            <div style={{ color: '#fff', fontSize: '16px', fontWeight: 800 }}>{balance.toFixed(2)}</div>
                          </div>
                          <div style={{ background: 'transparent', border: '1px solid #CCFF00', borderRadius: '6px', padding: '10px' }}>
                            <div style={{ color: '#888', fontSize: '10px', fontWeight: 600, marginBottom: '4px', textAlign: 'right' }}>withdrawal amount</div>
                            <div style={{ color: '#fff', fontSize: '16px', fontWeight: 800, textAlign: 'right' }}>0</div>
                          </div>
                        </div>

                        {/* VIP Level */}
                        <div style={{ background: 'transparent', border: '1px solid #CCFF00', borderRadius: '6px', padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ color: '#CCFF00', fontSize: '15px', fontWeight: 800 }}>My Vip Level</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ color: '#fff', fontSize: '14px', fontWeight: 700 }}>Beginer</span>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                               <img src="/sidebar-vip.png" alt="VIP" style={{ height: '18px' }} onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                               <span style={{ color: '#fff', fontSize: '10px', fontWeight: 600, marginTop: '2px' }}>vip</span>
                            </div>
                          </div>
                        </div>

                        {/* Menu items */}
                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '4px' }}>
                          {[
                            { label: 'User Profile', page: 'account', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
                            { label: 'Account Statement', page: 'account-statement', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/></svg> },
                            { label: 'Open Bets', page: 'open-bets', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg> },
                            { label: 'Wallets', page: 'account', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> },
                            { label: 'Transaction History', page: 'transaction-history', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
                            { label: 'Spin Wheel', page: 'account', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>, badge: '0' },
                          ].map(item => (
                            <button key={item.label}
                              onClick={() => { setProfileOpen(false); onNavigate?.(item.page as any); }}
                              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', background: 'none', border: 'none', color: '#fff', fontWeight: 700, fontSize: '13px', cursor: 'pointer', textAlign: 'left' }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                {item.icon}
                                <span>{item.label}</span>
                                {'badge' in item && <span style={{ background: '#444', color: '#fff', borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{(item as any).badge}</span>}
                              </div>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                            </button>
                          ))}
                        </div>

                        {/* LOGOUT */}
                        <button onClick={handleLogout} style={{ width: '100%', height: '46px', background: '#CCFF00', borderRadius: '6px', border: 'none', color: '#000', fontWeight: 800, fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', marginTop: '4px' }}>
                          LOGOUT <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                        </button>
                      </div>
                    </div>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Gold accent line removed per user request */}

      {/* Overlay */}
      {drawerOpen && (
        <div onClick={() => setDrawerOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 60, background: 'transparent' }} />
      )}

      {/* Drawer */}
      <div style={{
        position: 'fixed', left: 0, top: '86px', bottom: '60px',
        width: '240px', zIndex: 70, background: '#191919',
        transform: drawerOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
        display: 'flex', flexDirection: 'column',
        borderRight: '1px solid #222',
        fontFamily: "'Outfit', sans-serif",
      }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }} className="no-scrollbar">
          
          {/* Search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', height: '40px', padding: '0 12px', background: '#222', border: '1px solid #bef103', borderRadius: '6px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#bef103" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <span style={{ color: '#fff', fontSize: '13px', fontWeight: 500 }}>Search</span>
          </div>

          <div style={{ height: '1px', background: '#333', margin: '4px 0' }} />

          {/* Menus */}
          {[
            { icon: '/sidebar-icon/sidebar-casino-icon.png', label: 'Casino', chevron: true },
            { icon: '/sidebar-icon/sidebar-sports-icon.png', label: 'Sports', chevron: true },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '40px', padding: '0 12px', background: '#222', border: '1px solid #bef103', borderRadius: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src={item.icon} alt={item.label} style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                <span style={{ color: '#fff', fontSize: '13px', fontWeight: 500 }}>{item.label}</span>
              </div>
              {item.chevron && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>}
            </div>
          ))}

          <div style={{ height: '1px', background: '#333', margin: '4px 0' }} />

          {/* User Links */}
          {[
            { icon: '/sidebar-vip.png', label: 'Powerplay VIP' },
            { icon: '/sidebar-icon/sidebar-gift-icon.png', label: 'Promotion' },
            { icon: '/sidebar-icon/sidebar-refer-icon.png', label: 'Refer and Earn' },
            { icon: '/sidebar-icon/sidebar-affilate-icon.png', label: 'Affiliate' },
            { icon: '/sidebar-icon/sidebar-blog-icon.png', label: 'Blog' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', height: '40px', padding: '0 12px', background: '#222', border: '1px solid #bef103', borderRadius: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src={item.icon} alt={item.label} onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                <span style={{ color: '#fff', fontSize: '13px', fontWeight: 500 }}>{item.label}</span>
              </div>
            </div>
          ))}

          {/* App Banner */}
          <div style={{ display: 'flex', alignItems: 'center', height: '60px', background: '#222', border: '1px solid #bef103', borderRadius: '6px', overflow: 'hidden' }}>
            <div style={{ flex: 1, paddingLeft: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ color: '#fff', fontSize: '13px', fontWeight: 700, lineHeight: 1.2 }}>Application</div>
              <div style={{ color: '#bef103', fontSize: '10px', fontWeight: 500, lineHeight: 1.2, marginTop: '2px' }}>Unlock Fun with<br/>Exclusive Features</div>
            </div>
            <img src="/sidebar-icon/mobImg.png" alt="App" style={{ height: '100%', width: '50px', objectFit: 'contain' }} />
          </div>

          <div style={{ height: '1px', background: '#333', margin: '4px 0' }} />

          {/* Support */}
          {[
            { icon: '/whatsapp.png', label: 'WhatsApp' },
            { icon: '/sidebar-callUs-icon.png', label: 'Call Us' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', height: '40px', padding: '0 12px', background: '#222', border: '1px solid #bef103', borderRadius: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src={item.icon} alt={item.label} style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                <span style={{ color: '#fff', fontSize: '13px', fontWeight: 500 }}>{item.label}</span>
              </div>
            </div>
          ))}

          <div style={{ height: '1px', background: '#333', margin: '4px 0' }} />

          {/* Toggles */}
          {[
            { icon: <Sun size={18} color="#bef103" />, label: 'Light' },
            { icon: <MousePointer2 size={18} color="#bef103" />, label: 'One Click Bet' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '40px', padding: '0 12px', background: '#222', border: '1px solid #bef103', borderRadius: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {item.icon}
                <span style={{ color: '#fff', fontSize: '13px', fontWeight: 500 }}>{item.label}</span>
              </div>
              <div style={{ width: '30px', height: '16px', background: '#444', borderRadius: '8px', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '2px', top: '2px', width: '12px', height: '12px', background: '#aba8a8', borderRadius: '50%' }} />
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Mobile Bottom Nav rendered outside drawer */}
      <MobileBottomNav onMenuToggle={() => setDrawerOpen(true)} />

      <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
    </>
  );
}
