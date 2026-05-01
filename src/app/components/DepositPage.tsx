import { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';
import { addTransaction, getWalletBalance, setWalletBalance } from '../utils/auth';

type DepositTab = 'automatic' | 'gpay' | 'bank';

const PRESET_AMOUNTS = [300, 400, 500, 1000, 2000, 3000, 10000, 15000, 20000];

function NewsTicker() {
  return (
    <div style={{
      background: '#111', borderBottom: '1px solid #222',
      display: 'flex', alignItems: 'center', height: '32px',
      padding: '0 12px', overflow: 'hidden',
      fontFamily: "'Outfit', sans-serif", fontSize: '12px', color: '#ccc',
      gap: '8px', flexShrink: 0,
    }}>
      <span style={{ color: '#fff', fontWeight: 700, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '4px' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        News :
      </span>
      <div style={{ overflow: 'hidden', flex: 1 }}>
        <span style={{ whiteSpace: 'nowrap', color: '#fff' }}>
          ● INDIAN PREMIER LEAGUE-(TOURNAMENT) — HIGHEST SCORING OVER RUNS IN MATCH OF IPL — RESULT SETTLED
        </span>
      </div>
    </div>
  );
}

function DetailedFooter() {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', padding: '0 0 40px', boxSizing: 'border-box' }}>
      <div style={{ background: '#1a1a1a', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <img src="/logo/logo.png" alt="logo" style={{ height: '34px', width: 'fit-content' }} />
        <p style={{ color: '#bbb', fontSize: '13px', lineHeight: 1.6, margin: 0, textAlign: 'justify' }}>
          <strong>Powerplay</strong> is the best platform for live and uninterrupted online betting for sports, Live 24hr betting with a wide spectrum of sports such as Cricket, Soccer, Horse Racing, Kabaddi, <strong>Aviator Predictor</strong>, Hockey, Basketball, <strong>Andar Bahar Game</strong> and many more. Powerplay is a resourceful online betting provider with competitive odds on in - play and upcoming matches. Popular casino games like Blackjack, Po
        </p>
        <a href="javascript:void(0)" style={{ color: '#1565c0', fontSize: '13px', fontWeight: 800, textDecoration: 'none', textTransform: 'uppercase' }}>READ MORE</a>
        <div style={{ marginTop: '8px', textAlign: 'center' }}>
          <h4 style={{ color: '#1565c0', fontSize: '16px', fontWeight: 900, margin: '0 0 8px' }}>100% Safe &amp; Instant Payments</h4>
          <p style={{ color: '#888', fontSize: '12px', lineHeight: 1.5, margin: 0 }}>
            You can make payments and receive earnings instantly via your UPI ID - so you can be sure that your money is safe and secure. All UPI platforms are accepted.
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '8px' }}>
          <div style={{ background: '#2a2a2a', borderRadius: '6px', padding: '6px 10px', fontSize: '11px', color: '#fff', fontWeight: 700 }}>18+</div>
          <div style={{ background: '#2a2a2a', borderRadius: '6px', padding: '6px 10px', fontSize: '11px', color: '#fff', fontWeight: 700 }}>GT</div>
        </div>
      </div>
    </div>
  );
}

export function DepositPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [activeTab, setActiveTab] = useState<DepositTab>('automatic');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [offerOpen, setOfferOpen] = useState(false);

  const handleDeposit = () => {
    const amt = Number(amount);
    if (!amt || amt < 300) { setMessage('Min Deposit: ₹300'); return; }
    const currentBalance = getWalletBalance();
    setWalletBalance(currentBalance + amt);
    addTransaction('deposit', amt, 'success');
    setMessage(`✅ Deposit of ₹${amt} successful!`);
    setAmount('');
    setTimeout(() => setMessage(''), 3000);
  };

  const tabs: { key: DepositTab; label: string }[] = [
    { key: 'automatic', label: 'AUTOMATIC' },
    { key: 'gpay', label: 'GPAY' },
    { key: 'bank', label: 'BANK TRANSFER' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#111', fontFamily: "'Outfit', sans-serif", width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}>
      <Header onNavigate={onNavigate as any} />
      <NewsTicker />

      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', minWidth: 0 }}>
        <div className="hidden lg:block" style={{ width: '72px', minWidth: '72px', flexShrink: 0, position: 'relative' }}>
          <Sidebar />
        </div>

        <main style={{ flex: 1, padding: '0', minHeight: '100vh', minWidth: 0, maxWidth: '100%', overflowX: 'hidden', boxSizing: 'border-box' }}>

          {/* Deposit Container with Yellow Border */}
          <div style={{ margin: '14px', border: '1px solid #CCFF00', borderRadius: '12px', padding: '10px 14px', background: '#1a1a1a' }}>
            
            {/* Tab bar — AUTOMATIC / GPAY / BANK TRANSFER */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', gap: '8px' }}>
              {tabs.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    flex: 1, height: '36px', border: 'none', borderRadius: '8px',
                    background: activeTab === tab.key ? '#CCFF00' : 'transparent',
                    color: activeTab === tab.key ? '#000' : '#aaa',
                    fontFamily: "'Outfit', sans-serif", fontSize: '12px', fontWeight: 800,
                    cursor: 'pointer', letterSpacing: '0.04em', transition: 'all 0.2s',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* WhatsApp Help Banner */}
            <div style={{
              background: '#4169e1', borderRadius: '12px', padding: '0 12px',
              border: '1px solid #CCFF00',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px',
              maxWidth: '400px', width: '100%', height: '63.45px', margin: '0 auto 14px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '38px', height: '38px', background: '#fff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg viewBox="0 0 24 24" width="26" height="26" fill="#25d366">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.024.504 3.93 1.38 5.61L0 24l6.545-1.346A11.957 11.957 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.028-1.38l-.36-.215-3.726.767.793-3.641-.236-.374A9.818 9.818 0 1 1 12 21.818z"/>
                  </svg>
                </div>
                <div style={{ color: '#fff', fontSize: '11px', fontWeight: 700 }}>
                  For Deposit related Help, Click here
                </div>
              </div>
              <div style={{ width: '32px', height: '32px', background: '#CCFF00', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4169e1" strokeWidth="2.5">
                  <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                </svg>
              </div>
            </div>

            {/* How it works */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                <rect x="5" y="2" width="14" height="20" rx="7"/><path d="M12 2v6"/>
              </svg>
              <button style={{ background: 'none', border: 'none', color: '#fff', fontSize: '10px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', padding: 0 }}>
                How It's Works ?
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#CCFF00" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </button>
            </div>

            {/* Choose Amount label */}
            <div style={{ color: '#fff', fontSize: '15px', fontWeight: 900, marginBottom: '10px' }}>
              Choose Amount Or Enter Manually
            </div>

            {/* Preset Grid — 4 columns */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '16px' }}>
              {PRESET_AMOUNTS.map(p => (
                <button
                  key={p}
                  onClick={() => setAmount(String(p))}
                  style={{
                    flex: 1, height: '36px', background: 'transparent',
                    color: amount === String(p) ? '#CCFF00' : '#fff',
                    border: amount === String(p) ? '1px solid #CCFF00' : '1px solid #fff',
                    borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                >
                  ₹ {p}
                </button>
              ))}
            </div>

            {/* OR Divider */}
            <div style={{ position: 'relative', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <div style={{ position: 'absolute', width: '100%', height: '1px', background: '#333' }}></div>
              <div style={{ position: 'relative', background: '#333', color: '#aaa', fontSize: '9px', fontWeight: 700, padding: '4px 6px', borderRadius: '50%', zIndex: 2 }}>
                OR
              </div>
            </div>

            {/* Amount input */}
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #fff', borderRadius: '12px', padding: '8px 12px', marginBottom: '16px' }}>
              <span style={{ color: '#fff', fontSize: '15px', fontWeight: 900, marginRight: '8px' }}>₹</span>
              <input
                type="number"
                placeholder="Enter Amount"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                style={{
                  flex: 1, background: 'transparent', border: 'none', color: '#fff', fontSize: '15px', fontWeight: 900, outline: 'none'
                }}
              />
            </div>

            {/* Choose Your Offers */}
            <div style={{ color: '#fff', fontSize: '15px', fontWeight: 900, marginBottom: '8px' }}>Choose Your Offers</div>
            <div
              onClick={() => setOfferOpen(!offerOpen)}
              style={{
                background: 'transparent', border: '1px solid #CCFF00', borderRadius: '8px',
                height: '42px', padding: '0 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                cursor: 'pointer', marginBottom: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '22px', height: '22px', background: '#556B2F', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(45deg)' }}>
                  <span style={{ color: '#CCFF00', fontSize: '12px', fontWeight: 900, transform: 'rotate(-45deg)' }}>%</span>
                </div>
                <span style={{ color: '#fff', fontSize: '12px', fontWeight: 700 }}>Bonus Everytime</span>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff" stroke="none">
                <polygon points="6,9 18,9 12,15"/>
              </svg>
            </div>

            {message && <div style={{ color: '#CCFF00', fontSize: '13px', textAlign: 'center', fontWeight: 700, marginBottom: '10px' }}>{message}</div>}

            {/* DEPOSIT Button */}
            <button
              onClick={handleDeposit}
              style={{
                width: '100%', height: '46px', background: '#CCFF00', color: '#000', border: 'none',
                borderRadius: '8px', fontSize: '14px', fontWeight: 900, cursor: 'pointer', marginBottom: '14px',
              }}
            >
              DEPOSIT
            </button>

            {/* Min/Max info */}
            <div style={{ fontSize: '10px', color: '#fff', textAlign: 'center', marginBottom: '16px', fontWeight: 600 }}>
              Min. Deposit: ₹300 &nbsp;|&nbsp; Max. Deposit: ₹100000 &nbsp;|&nbsp; Process: <span style={{color:'#e53935'}}>Instant</span><br />
              <div style={{ marginTop: '4px' }}>Fee: 0.00%</div>
            </div>

            {/* Secure Payment badge */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="#4caf50" stroke="none">
                  <path d="M12 2L3 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-9-4z"/>
                  <path d="M10 16l-4-4 1.41-1.41L10 13.17l6.59-6.59L18 8l-8 8z" fill="#fff"/>
                </svg>
                <div style={{ lineHeight: 1.1 }}>
                  <div style={{ color: '#fff', fontSize: '11px', fontWeight: 900 }}>SECURE</div>
                  <div style={{ color: '#4caf50', fontSize: '10px', fontWeight: 900 }}>PAYMENT</div>
                </div>
              </div>
            </div>

          </div>

          <DetailedFooter />
          <Footer />
        </main>
      </div>
    </div>
  );
}
