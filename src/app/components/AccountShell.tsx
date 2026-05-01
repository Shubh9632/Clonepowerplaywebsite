import { Header } from './Header';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';
import { MobileBottomNav } from './MobileBottomNav';
import { useState } from 'react';

/* ── Shared News ticker ── */
function NewsTicker() {
  return (
    <div style={{
      background: '#111', borderBottom: '1px solid #222',
      display: 'flex', alignItems: 'center', height: '28px',
      padding: '0 12px', overflow: 'hidden',
      fontFamily: "'Outfit', sans-serif", fontSize: '12px', color: '#ccc',
      gap: '8px', flexShrink: 0,
    }}>
      <span style={{ color: '#CCFF00', fontWeight: 700, whiteSpace: 'nowrap' }}>🔔 News :</span>
      <div style={{ overflow: 'hidden', flex: 1 }}>
        <span style={{ whiteSpace: 'nowrap' }}>
          INDIAN PREMIER LEAGUE — HIGHEST SCORING OVER RUNS IN MATCH OF IPL — RESULT SETTLED
        </span>
      </div>
    </div>
  );
}

/* ── Shared tab bar ── */
export type AccountTab = 'profile' | 'wallets' | 'withdraw' | 'account-statement' | 'open-bets' | 'transaction-history';

const TABS: { key: AccountTab; label: string; icon: string }[] = [
  { key: 'profile',              label: 'User Profile',        icon: '👤' },
  { key: 'wallets',              label: 'Wallets',             icon: '💰' },
  { key: 'withdraw',             label: 'Withdraw',            icon: '↗' },
  { key: 'account-statement',    label: 'Account Statement',   icon: '📄' },
  { key: 'open-bets',            label: 'Open Bets',           icon: '🔄' },
  { key: 'transaction-history',  label: 'Transaction History', icon: '📋' },
];

function TabBar({ active, onChange }: { active: AccountTab; onChange: (t: AccountTab) => void }) {
  return (
    <div className="hide-scrollbar" style={{ display: 'flex', gap: '10px', margin: '0', width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: '4px', borderRadius: '12px' }}>
      {TABS.map(tab => {
        const isActive = active === tab.key;
        return (
          <button key={tab.key} onClick={() => onChange(tab.key)} style={{
            flex: '0 0 auto', height: '52px', borderRadius: '12px', minWidth: '110px',
            border: '1px solid #bef103',
            background: isActive ? '#bef103' : 'transparent',
            color: isActive ? '#0d2857' : '#bef103',
            fontFamily: "'Outfit', sans-serif", fontSize: '11px', fontWeight: 900,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
            transition: 'all 0.2s', padding: '0 12px', textAlign: 'center', lineHeight: 1.1,
            textTransform: 'none', position: 'relative', overflow: 'visible'
          }}>
            {tab.key === 'withdraw' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>}
            {tab.key === 'account-statement' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>}
            {tab.key === 'open-bets' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>}
            {tab.key === 'transaction-history' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>}
            
            <span style={{ fontWeight: 900, whiteSpace: 'pre-line', maxWidth: '80px' }}>
              {tab.label === 'Transaction History' ? 'Transaction\nHistory' : tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ── Shared Detailed Footer ── */
function DetailedFooter() {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '18px', padding: '24px 0 40px', boxSizing: 'border-box' }}>
      <div style={{ background: '#1c1c1c', borderRadius: '20px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <img 
          src="/logo/logo.png" 
          onError={e => { (e.currentTarget as HTMLImageElement).src = 'https://powerplay.club/images/logo/logo.png?v=2.0'; }}
          alt="logo" 
          style={{ height: '36px', width: 'fit-content' }} 
        />
        <p style={{ color: '#ccc', fontSize: '13px', lineHeight: 1.6, margin: 0, textAlign: 'justify' }}>
          <strong>Powerplay</strong> is the best platform for live and uninterrupted online betting for sports, Live 24hr betting with a wide spectrum of sports such as Cricket, Soccer, Horse Racing, Kabaddi, <strong>Aviator Predictor</strong>, Hockey, Basketball, <strong>Andar Bahar Game</strong> and many more. Powerplay is a resourceful online betting provider with competitive odds on in - play and upcoming matches. Popular casino games like Blackjack, Po
        </p>
        <a href="javascript:void(0)" style={{ color: '#02418e', fontSize: '13px', fontWeight: 800, textDecoration: 'none', textTransform: 'uppercase' }}>READ MORE</a>
        
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <h4 style={{ color: '#02418e', fontSize: '17px', fontWeight: 900, margin: '0 0 10px' }}>100% Safe & Instant Payments</h4>
          <p style={{ color: '#777', fontSize: '12px', lineHeight: 1.5, margin: 0 }}>
            You can make payments and receive earnings instantly via your UPI ID - so you can be sure that your money is safe and secure. All UPI platforms are accepted.
          </p>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '4px' }}>
          <div style={{ background: '#2a2a2a', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '11px', fontWeight: 700, border: '1px solid #444' }}>18+</div>
          <div style={{ background: '#2a2a2a', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '11px', fontWeight: 700, border: '1px solid #444' }}>GT</div>
        </div>
      </div>



      <div style={{ textAlign: 'center', color: '#444', fontSize: '11px', fontWeight: 700 }}>
         Gambling can be addictive, please play responsibly
      </div>
    </div>
  );
}


/* ── Shared layout shell for account pages ── */
export function AccountShell({
  activeTab,
  onTabChange,
  onNavigate,
  children,
}: {
  activeTab: AccountTab;
  onTabChange: (t: AccountTab) => void;
  onNavigate: (page: string) => void;
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: '#111', fontFamily: "'Outfit', sans-serif", width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}>
      <Header onNavigate={onNavigate as any} />
      <NewsTicker />
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', minWidth: 0 }}>
        {/* Sidebar spacer */}
        <div className="hidden lg:block" style={{ width: '72px', minWidth: '72px', flexShrink: 0, position: 'relative' }}>
          <Sidebar isMobileOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </div>
        <div className="lg:hidden">
          <Sidebar isMobileOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </div>
        {/* Main content */}
        <main style={{ flex: 1, padding: '14px', minHeight: '100vh', minWidth: 0, maxWidth: '100%', overflowX: 'hidden', boxSizing: 'border-box' }}>
          <div style={{ border: '1px solid #CCFF00', borderRadius: '12px', padding: '12px', background: '#1a1a1a', minHeight: '300px' }}>
            <TabBar active={activeTab} onChange={onTabChange} />
            <div>
              {children}
            </div>
          </div>
          <DetailedFooter />
          <Footer />
        </main>
      </div>
      <MobileBottomNav onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
    </div>
  );
}
