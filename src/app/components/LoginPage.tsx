import { useState } from 'react';
import { Header } from './Header';
import { login, FAKE_PASSWORD } from '../utils/auth';

/* ── Shared left panel used by both Login and Register ── */
function LeftPanel() {
  return (
    <div className="hidden lg:flex items-center justify-center p-[30px_20px] bg-[#0d0d0d] relative overflow-hidden shrink-0 w-[42%]">
      {/* Top-right dots */}
      <div style={{ position: 'absolute', top: '18px', right: '18px', display: 'grid', gridTemplateColumns: 'repeat(6, 10px)', gap: '5px', opacity: 0.5 }}>
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#CCFF00' }} />
        ))}
      </div>
      {/* Bottom-left dots */}
      <div style={{ position: 'absolute', bottom: '18px', left: '18px', display: 'grid', gridTemplateColumns: 'repeat(6, 10px)', gap: '5px', opacity: 0.5 }}>
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#CCFF00' }} />
        ))}
      </div>
      {/* Lime glow */}
      <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(204,255,0,0.14) 0%, transparent 70%)', pointerEvents: 'none' }} />
      {/* Phone mockup image — exact URL provided */}
      <img
        src="/login-mobile.png"
        alt="login"
        style={{
          width: '320px',
          height: '380px',
          objectFit: 'contain',
          position: 'relative',
          zIndex: 1,
          /* NO filter/blur */
        }}
        onError={(e) => {
          const img = e.currentTarget as HTMLImageElement;
          img.src = '/sidebar-icon/mobImg.png';
        }}
      />
    </div>
  );
}

/* ── Divider: OR circle ── */
function OrDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '4px 0' }}>
      <div style={{
        width: '32px', height: '32px',
        borderRadius: '50%',
        border: '1px solid #444',
        background: '#1a1a1a',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#888', fontSize: '10px', fontWeight: 800,
      }}>OR</div>
    </div>
  );
}

/* ══════════════════════════════════════
   LOGIN PAGE — img 5 & 1 parity
   ══════════════════════════════════════ */
export function LoginPage({
  onNavigateRegister,
  onNavigateHome,
}: {
  onNavigateRegister?: () => void;
  onNavigateHome?: () => void;
}) {
  const [activeTab, setActiveTab] = useState<'password' | 'otp'>('password');
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (asDemo = false) => {
    const user = asDemo ? 'demo_user' : username.trim();
    const pass = asDemo ? FAKE_PASSWORD : password;

    if (!user) {
      setError('Please enter a username.');
      return;
    }
    if (pass !== FAKE_PASSWORD) {
      setError('Invalid password');
      return;
    }

    setError('');
    login(user);
    (window as any).__pp_navigate?.('deposit');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000000', fontFamily: "'Outfit', sans-serif", display: 'flex', flexDirection: 'column' }}>
      <Header onNavigate={(page) => { if (page === 'home') onNavigateHome?.(); }} />

      <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        
        {/* Login Card — img 5 style */}
        <div style={{
          width: '100%', maxWidth: '420px',
          background: '#0d0d0d', border: '1.8px solid #bef103',
          borderRadius: '16px', padding: '18px', boxSizing: 'border-box',
          display: 'flex', flexDirection: 'column', gap: '16px'
        }}>
          
          {/* Tabs */}
          <div style={{ display: 'flex', background: '#1a1a1a', borderRadius: '10px', padding: '5px', border: '1px solid #333' }}>
            <button onClick={() => setActiveTab('password')} style={{
              flex: 1, height: '48px', border: 'none', borderRadius: '8px', cursor: 'pointer',
              background: activeTab === 'password' ? '#bef103' : 'transparent',
              color: activeTab === 'password' ? '#000' : '#888',
              fontFamily: "'Outfit', sans-serif", fontSize: '13px', fontWeight: 800,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.65 10C11.83 7.67 9.61 6 7 6a6 6 0 1 0 0 12c2.61 0 4.83-1.67 5.65-4h5.35l2 2 2-2-2-2-2 2-2-2-5.35 0zM7 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/></svg>
              BY PASSWORD
            </button>
            <button onClick={() => setActiveTab('otp')} style={{
              flex: 1, height: '48px', border: 'none', borderRadius: '8px', cursor: 'pointer',
              background: activeTab === 'otp' ? '#bef103' : 'transparent',
              color: activeTab === 'otp' ? '#000' : '#888',
              fontFamily: "'Outfit', sans-serif", fontSize: '13px', fontWeight: 800,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
              BY OTP
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ color: '#fff', fontSize: '13px', fontWeight: 700 }}>Username</label>
              <div style={{ background: '#000', border: '1px solid #333', borderRadius: '10px', height: '52px', display: 'flex', alignItems: 'center', padding: '0 16px' }}>
                <input type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontFamily: "'Outfit', sans-serif", fontSize: '14px' }} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ color: '#fff', fontSize: '13px', fontWeight: 700 }}>Password</label>
              <div style={{ background: '#000', border: '1px solid #333', borderRadius: '10px', height: '52px', display: 'flex', alignItems: 'center', padding: '0 16px', gap: '10px' }}>
                <input type={showPassword ? 'text' : 'password'} placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontFamily: "'Outfit', sans-serif", fontSize: '14px' }} />
                <button onClick={() => setShowPassword(!showPassword)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#666', display: 'flex' }}>
                   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" checked={keepSignedIn} onChange={() => setKeepSignedIn(!keepSignedIn)} style={{ width: '17px', height: '17px', accentColor: '#bef103' }} />
                <span style={{ color: '#888', fontSize: '12px', fontWeight: 800 }}>KEEP ME SIGNED IN</span>
              </label>
              <a href="javascript:void(0)" style={{ color: '#888', fontSize: '12px', fontWeight: 700, textDecoration: 'none' }}>Forgot Password</a>
            </div>

            <button onClick={() => handleLogin(false)} style={{ width: '100%', height: '54px', background: '#bef103', color: '#000', border: 'none', borderRadius: '10px', fontFamily: "'Outfit', sans-serif", fontSize: '16px', fontWeight: 800, cursor: 'pointer', marginTop: '4px' }}>
              Login
            </button>
            <button onClick={() => handleLogin(true)} style={{ width: '100%', height: '54px', background: '#333', color: '#fff', border: 'none', borderRadius: '10px', fontFamily: "'Outfit', sans-serif", fontSize: '16px', fontWeight: 800, cursor: 'pointer' }}>
              Login With Demo User
            </button>

            <div style={{ textAlign: 'center', marginTop: '2px' }}>
              <span style={{ color: '#fff', fontSize: '14px', fontWeight: 700 }}>Don't have an account? </span>
              <a href="javascript:void(0)" onClick={onNavigateRegister} style={{ color: '#bef103', fontSize: '14px', fontWeight: 800, textDecoration: 'none' }}>Register</a>
            </div>
          </div>
        </div>

        {/* Footer Info — img 1 style */}
        <div style={{ width: '100%', maxWidth: '420px', display: 'flex', flexDirection: 'column', gap: '18px', padding: '4px 0 40px' }}>
          
          <div style={{ background: '#1c1c1c', borderRadius: '20px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <img src="/logo/logo.png" alt="logo" style={{ height: '36px', width: 'fit-content' }} />
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
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
             <button style={{ height: '44px', padding: '0 24px', background: 'transparent', color: '#fff', border: '1.5px solid #333', borderRadius: '8px', fontSize: '13px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                DOWNLOAD APP
             </button>
          </div>

          <div style={{ textAlign: 'center', color: '#666', fontSize: '11px', fontWeight: 600 }}>
             Gambling can be addictive, please play responsibly
          </div>

        </div>

      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   REGISTER PAGE — matches Image 2
   ══════════════════════════════════════ */

export function RegisterPage({
  onNavigateLogin,
  onNavigateHome,
}: {
  onNavigateLogin?: () => void;
  onNavigateHome?: () => void;
}) {
  const [activeTab, setActiveTab] = useState<'password' | 'otp'>('password');
  const [showPassword, setShowPassword] = useState(false);
  const [regUsername, setRegUsername] = useState('');
  const [regMobile, setRegMobile] = useState('');
  const [regPassword, setRegPassword] = useState('');

  return (
    <div style={{ minHeight: '100vh', background: '#000000', fontFamily: "'Outfit', sans-serif" }}>
      <Header onNavigate={(page) => { if (page === 'home') onNavigateHome?.(); if (page === 'login') onNavigateLogin?.(); }} />

      <div className="flex items-start justify-center px-4 py-5 lg:px-[72px] lg:pt-[20px] lg:pb-[40px] min-h-[calc(100vh-71px)]">
        <div className="flex flex-col lg:flex-row w-full max-w-[1050px] bg-[#111111] rounded-xl border border-[#CCFF00] overflow-hidden min-h-[542px] mt-2 lg:mt-5">
          <LeftPanel />

          {/* Right: Register Form */}
          <div className="flex flex-col flex-1 p-5 lg:p-[40px_50px] justify-center gap-[14px] bg-[#111111]">

            {/* Tabs */}
            <div style={{ display: 'flex', borderRadius: '6px', overflow: 'hidden', border: '1px solid #CCFF00', marginBottom: '6px' }}>
              <button onClick={() => setActiveTab('password')} style={{
                flex: 1, height: '46px', border: 'none', cursor: 'pointer',
                background: activeTab === 'password' ? '#CCFF00' : '#1a1a1a',
                color: activeTab === 'password' ? '#000' : '#888',
                fontFamily: "'Outfit', sans-serif", fontSize: '13px', fontWeight: 700,
                letterSpacing: '0.06em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="7.5" cy="15.5" r="5.5"/><path d="M21 2l-9.6 9.6"/><path d="M15.5 7.5l3 3L22 7l-3-3"/>
                </svg>
                BY PASSWORD
              </button>
              <button onClick={() => setActiveTab('otp')} style={{
                flex: 1, height: '46px', border: 'none', borderLeft: '1px solid #CCFF00',
                cursor: 'pointer',
                background: activeTab === 'otp' ? '#CCFF00' : '#1a1a1a',
                color: activeTab === 'otp' ? '#000' : '#888',
                fontFamily: "'Outfit', sans-serif", fontSize: '13px', fontWeight: 700,
                letterSpacing: '0.06em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
                </svg>
                BY OTP
              </button>
            </div>

            {activeTab === 'password' ? (
              <>
                {/* Username */}
                <div style={{ background: '#0a0a0a', border: '1px solid #CCFF00', borderRadius: '6px', height: '50px', display: 'flex', alignItems: 'center', padding: '0 14px' }}>
                  <input type="text" placeholder="Enter your Username" value={regUsername} onChange={e => setRegUsername(e.target.value)} style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontFamily: "'Outfit', sans-serif", fontSize: '14px' }} />
                </div>

                {/* Mobile */}
                <div>
                  <label style={{ color: '#999', fontSize: '12px', fontWeight: 500, display: 'block', marginBottom: '4px' }}>Enter your Mobile Number</label>
                  <div style={{ background: '#0a0a0a', border: '1px solid #CCFF00', borderRadius: '6px', height: '50px', display: 'flex', alignItems: 'center', padding: '0 14px' }}>
                    <input type="tel" placeholder="Enter mobile number" value={regMobile} onChange={e => setRegMobile(e.target.value)} style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontFamily: "'Outfit', sans-serif", fontSize: '14px' }} />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label style={{ color: '#999', fontSize: '12px', fontWeight: 500, display: 'block', marginBottom: '4px' }}>Enter your Password</label>
                  <div style={{ background: '#0a0a0a', border: '1px solid #CCFF00', borderRadius: '6px', height: '50px', display: 'flex', alignItems: 'center', padding: '0 14px', gap: '8px' }}>
                    <input type={showPassword ? 'text' : 'password'} placeholder="Enter password" value={regPassword} onChange={e => setRegPassword(e.target.value)} style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontFamily: "'Outfit', sans-serif", fontSize: '14px' }} />
                    <button onClick={() => setShowPassword(!showPassword)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#888', display: 'flex' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {showPassword ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><line x1="1" y1="1" x2="23" y2="23"/></> : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>}
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Register button — blue */}
                <button style={{ width: '100%', height: '50px', background: '#02418e', color: '#fff', border: 'none', borderRadius: '6px', fontFamily: "'Outfit', sans-serif", fontSize: '16px', fontWeight: 700, cursor: 'pointer', transition: 'opacity 0.2s' }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.85'} onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}>
                  Register
                </button>

                {/* Login With Demo User — blue outline */}
                <button style={{ width: '100%', height: '50px', background: '#02418e', color: '#fff', border: 'none', borderRadius: '6px', fontFamily: "'Outfit', sans-serif", fontSize: '15px', fontWeight: 600, cursor: 'pointer', transition: 'opacity 0.2s' }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.85'} onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}>
                  Login With Demo User
                </button>
              </>
            ) : (
              /* OTP tab for Register */
              <>
                <div style={{ background: '#0a0a0a', border: '1px solid #CCFF00', borderRadius: '6px', height: '50px', display: 'flex', alignItems: 'center', padding: '0 14px' }}>
                  <input type="tel" placeholder="Enter mobile number" style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontFamily: "'Outfit', sans-serif", fontSize: '14px' }} />
                </div>
                <button style={{ width: '100%', height: '50px', background: '#02418e', color: '#fff', border: 'none', borderRadius: '6px', fontFamily: "'Outfit', sans-serif", fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}>
                  Send OTP
                </button>
              </>
            )}

            {/* Already have an account? Login */}
            <div style={{ textAlign: 'center', marginTop: '2px' }}>
              <span style={{ color: '#777', fontSize: '13px' }}>Already have an account? </span>
              <a href="javascript:void(0)" onClick={onNavigateLogin} style={{ color: '#CCFF00', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.textDecoration = 'underline'} onMouseLeave={e => (e.currentTarget as HTMLElement).style.textDecoration = 'none'}>Login</a>
            </div>

            <OrDivider />

          </div>
        </div>
      </div>
    </div>
  );
}
