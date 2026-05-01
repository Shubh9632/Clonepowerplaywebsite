import React, { useState, useEffect } from 'react';
import { AccountShell, AccountTab } from './AccountShell';
import { getUser, getTransactions, addTransaction, Transaction, getWalletBalance, setWalletBalance, settleBet } from '../utils/auth';


/* ═══════════════════════════════════════
   USER PROFILE TAB
   ═══════════════════════════════════════ */
function UserProfileTab() {
  const username = getUser() || 'guest';
  const Card = ({ children, style }: any) => (
    <div style={{ background: '#000', borderRadius: '12px', border: '1.5px solid #bef103', padding: '16px', ...style }}>{children}</div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#333', border: '1.5px solid #bef103', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="#888"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
        </div>
        <div style={{ color: '#bef103', fontSize: '18px', fontWeight: 800 }}>{username}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontSize: '14px', fontWeight: 700 }}>
            <span>📞</span> 910000000024 <span style={{ color: '#02418e' }}>✓</span>
          </div>
          <a href="javascript:void(0)" style={{ color: '#fff', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>🔒 Change Password</a>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontSize: '14px', fontWeight: 700 }}>
            ✉ {username}@gmail.com <span style={{ color: '#02418e' }}>✓</span>
          </div>
          <a href="javascript:void(0)" style={{ color: '#fff', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>🚀 Refer & Earn</a>
        </div>
      </Card>

      <Card>
        <div style={{ color: '#fff', fontSize: '14px', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#bef103" strokeWidth="2.5"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
          Statistics
        </div>
        <div style={{ display: 'flex', overflowX: 'auto', gap: '8px', paddingBottom: '4px' }}>
          {[
            { label: 'Today Profit', value: '0' },
            { label: 'Today profit in sport', value: '0' },
            { label: 'Today profit in casino', value: '0' },
          ].map(s => (
            <div key={s.label} style={{ flexShrink: 0, width: '110px', background: '#111', borderRadius: '10px', padding: '12px', textAlign: 'center', border: '1px solid #222' }}>
              <div style={{ color: '#888', fontSize: '10px', fontWeight: 700, marginBottom: '8px', whiteSpace: 'nowrap' }}>{s.label}</div>
              <div style={{ color: '#bef103', fontSize: '20px', fontWeight: 800 }}>{s.value}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '10px 14px', fontSize: '12px', fontWeight: 700, color: '#fff', borderBottom: '1px solid #222' }}>
          Bonus subscription
        </div>
        <div style={{ padding: '20px', textAlign: 'center', color: '#fff', fontSize: '13px', fontWeight: 800 }}>
          Bonus subscription not available.
        </div>
      </Card>

      <Card style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ position: 'relative', width: '40px', height: '40px' }}>
          <svg viewBox="0 0 40 40" fill="none" style={{ width: '100%', height: '100%' }}>
            <path d="M5 5h30v25l-15 -8l-15 8Z" fill="#1a4a8a" />
            <polygon points="20,10 23,16 29,17 24,22 25,28 20,25 15,28 16,22 11,17 17,16" fill="#bef103" />
          </svg>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center', gap: '6px' }}>
          <div style={{ color: '#fff', fontSize: '12px', fontWeight: 700 }}>Today total deposit</div>
          <div style={{ color: '#bef103', fontSize: '18px', fontWeight: 800 }}>₹ 0</div>
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════
   TRANSACTION HISTORY TAB  (img3 style)
   ═══════════════════════════════════════ */
function TransactionHistoryTab() {
  const [fromDate, setFromDate] = useState('24-04-2026');
  const [toDate, setToDate] = useState('01-05-2026');
  const [showResults, setShowResults] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>(() => getTransactions());
  const [entries, setEntries] = useState('10');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const h = () => setTransactions(getTransactions());
    window.addEventListener('transactions-change', h);
    return () => window.removeEventListener('transactions-change', h);
  }, []);

  const walletTxs = transactions.filter(t => t.type === 'deposit' || t.type === 'withdraw');

  const filteredTxs = walletTxs.filter(t => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const typeStr = t.type === 'deposit' ? 'deposit' : 'withdraw';
    const amountStr = String(t.amount);
    const dateStr = new Date(t.date).toLocaleDateString('en-GB') + ', ' + t.time;
    return typeStr.includes(q) || amountStr.includes(q) || dateStr.toLowerCase().includes(q);
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Search Form */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <div style={{ color: '#888', fontSize: '11px', fontWeight: 600, marginBottom: '6px' }}>From Date</div>
          <input 
            type="text" 
            value={fromDate}
            onChange={e => setFromDate(e.target.value)}
            style={{ width: '100%', height: '42px', background: 'transparent', border: 'none', borderBottom: '1px solid #333', borderRadius: '0', color: '#ccc', fontSize: '12px', padding: '0 12px', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <div style={{ color: '#888', fontSize: '11px', fontWeight: 600, marginBottom: '6px' }}>To Date</div>
          <input 
            type="text" 
            value={toDate}
            onChange={e => setToDate(e.target.value)}
            style={{ width: '100%', height: '42px', background: 'transparent', border: 'none', borderBottom: '1px solid #333', borderRadius: '0', color: '#ccc', fontSize: '12px', padding: '0 12px', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <button 
            onClick={() => setShowResults(true)}
            style={{ background: '#0d2857', color: '#CCFF00', border: '1px solid #1a428a', borderRadius: '6px', padding: '10px 24px', fontSize: '13px', fontWeight: 900, cursor: 'pointer', marginTop: '4px', display: 'inline-block' }}
          >
            SEARCH
          </button>
        </div>
      </div>

      {showResults && (
        <div style={{ marginTop: '16px', color: '#ccc', fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}>
              Show 
              <select value={entries} onChange={e => setEntries(e.target.value)} style={{ background: '#1a1a1a', border: '1px solid #333', color: '#fff', padding: '4px', borderRadius: '4px', outline: 'none' }}>
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select> 
              entries
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', alignSelf: 'flex-end', width: '60%' }}>
              <span style={{ color: '#888' }}>Search:</span>
              <div style={{ position: 'relative', flex: 1 }}>
                <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '6px', color: '#fff', padding: '4px 28px 4px 8px', width: '100%', boxSizing: 'border-box', outline: 'none' }} />
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>
          </div>

          <div style={{ borderBottom: '1px solid #333', paddingBottom: '12px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', tableLayout: 'fixed' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #333' }}>
                  <th style={{ padding: '12px 0px 12px 0px', fontWeight: 700, color: '#fff', cursor: 'pointer', width: '30%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                      Date 
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#CCFF00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                    </div>
                  </th>
                  <th style={{ padding: '12px 2px', fontWeight: 700, color: '#fff', cursor: 'pointer', width: '45%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2px', flexWrap: 'wrap' }}>
                      Deposit/Withdraw 
                      <svg width="10" height="14" viewBox="0 0 24 24" fill="none" stroke="#CCFF00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="7 15 12 20 17 15"/><polyline points="7 9 12 4 17 9"/></svg>
                    </div>
                  </th>
                  <th style={{ padding: '12px 0px 12px 0px', fontWeight: 700, color: '#fff', cursor: 'pointer', textAlign: 'right', width: '25%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '2px' }}>
                      Amount 
                      <svg width="10" height="14" viewBox="0 0 24 24" fill="none" stroke="#CCFF00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="7 15 12 20 17 15"/><polyline points="7 9 12 4 17 9"/></svg>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTxs.length > 0 ? filteredTxs.map((t, i) => {
                  const isDeposit = t.type === 'deposit';
                  const d = new Date(t.date);
                  const dateFmt = `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
                  return (
                    <tr key={i} style={{ borderBottom: '1px solid #222' }}>
                      <td style={{ padding: '12px 0px', color: '#888', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: '#00C853', marginTop: '2px' }}>
                          <div style={{ width: '5px', height: '1px', background: '#fff', borderRadius: '1px' }}></div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.3, fontSize: '11px', wordBreak: 'break-word' }}>
                          <span>{dateFmt},</span>
                          <span>{t.time}</span>
                        </div>
                      </td>
                      <td style={{ padding: '12px 2px', color: '#ccc', fontSize: '12px', wordBreak: 'break-word' }}>
                        {isDeposit ? 'Deposit' : 'Withdraw'}
                      </td>
                      <td style={{ padding: '12px 0px', textAlign: 'right', color: isDeposit ? '#00C853' : '#FF4444', fontSize: '12px', wordBreak: 'break-word' }}>
                        {t.amount}
                      </td>
                    </tr>
                  )
                }) : (
                  <tr>
                    <td colSpan={3} style={{ padding: '20px', textAlign: 'center', color: '#666' }}>No matching records found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#666', fontSize: '11px', marginTop: '12px', gap: '10px' }}>
            <div>Showing {filteredTxs.length > 0 ? 1 : 0} to {filteredTxs.length} of {filteredTxs.length} entries</div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer', padding: '4px 8px', fontSize: '11px' }}>Previous</button>
              {filteredTxs.length > 0 && <button style={{ background: '#fff', border: 'none', color: '#000', cursor: 'pointer', padding: '4px 10px', borderRadius: '2px', fontWeight: 'bold', fontSize: '12px' }}>1</button>}
              <button style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer', padding: '4px 8px', fontSize: '11px' }}>Next</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════
   WALLETS TAB
   ═══════════════════════════════════════ */
function WalletsTab() {
  const [balance, setBalance] = useState(() => getWalletBalance());
  useEffect(() => {
    const h = () => setBalance(getWalletBalance());
    window.addEventListener('wallet-change', h);
    return () => window.removeEventListener('wallet-change', h);
  }, []);

  const Card = ({ label, value, color = '#fff' }: any) => (
    <div style={{ background: '#000', borderRadius: '12px', border: '1.5px solid #bef103', padding: '16px', flex: 1, minWidth: '150px' }}>
      <div style={{ color: '#888', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>{label}</div>
      <div style={{ color: color, fontSize: '20px', fontWeight: 800 }}>{value}</div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        <Card label="Real Balance" value={`₹ ${balance.toFixed(2)}`} color="#bef103" />
        <Card label="Withdrawal Balance" value={`₹ ${balance.toFixed(2)}`} />
        <Card label="Current Exposure" value="₹ 0.00" color="#ef4444" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   WITHDRAW TAB  (img3 style — KYC/ID upload)
   ═══════════════════════════════════════ */
function WithdrawTab({ onAdd }: { onAdd: () => void }) {
  const [idType, setIdType] = useState('Aadhar');
  const [aadhar, setAadhar] = useState('');
  const [doc1Name, setDoc1Name] = useState('');
  const [doc2Name, setDoc2Name] = useState('');

  const handleSubmit = () => {
    if (!aadhar) { alert('Please enter your Aadhar number'); return; }
    alert('KYC submitted successfully! Verification pending.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>

      {/* KYC Status badge */}
      <div style={{ marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{ color: '#fff', fontSize: '15px', fontWeight: 900 }}>KYC Status :</span>
        <span style={{ background: '#eb4d4b', color: '#fff', borderRadius: '4px', padding: '4px 8px', fontSize: '11px', fontWeight: 800 }}>
          Pending
        </span>
      </div>

      {/* Identity Proof label + dropdown */}
      <div style={{ marginBottom: '16px', background: '#000', border: '1px solid #1a1a1a', borderRadius: '8px', padding: '10px 14px' }}>
        <div style={{ color: '#222', fontSize: '11px', fontWeight: 700, marginBottom: '6px' }}>
          Identity Proof <span style={{ color: '#e74c3c' }}>*</span>:
        </div>
        <div style={{ position: 'relative' }}>
          <select
            value={idType}
            onChange={e => setIdType(e.target.value)}
            style={{
              width: '100%', background: 'transparent', border: 'none',
              color: '#222', fontSize: '13px',
              fontWeight: 700, outline: 'none', appearance: 'none', cursor: 'pointer',
            }}
          >
            <option value="Aadhar" style={{ color: '#000' }}>Aadhar</option>
            <option value="PAN" style={{ color: '#000' }}>PAN Card</option>
            <option value="Passport" style={{ color: '#000' }}>Passport</option>
            <option value="DrivingLicense" style={{ color: '#000' }}>Driving License</option>
          </select>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.5" style={{ position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* Aadhar Number */}
      <div style={{ marginBottom: '16px', background: '#000', border: '1px solid #1a1a1a', borderRadius: '8px', padding: '10px 14px' }}>
        <div style={{ color: '#333', fontSize: '11px', fontWeight: 700, marginBottom: '6px' }}>
          Aadhar Number <span style={{ color: '#e74c3c' }}>*</span>:
        </div>
        <input
          type="text"
          className="aadhar-input-dark"
          placeholder="Enter Aadhar number"
          value={aadhar}
          onChange={e => setAadhar(e.target.value)}
          style={{
            width: '100%', background: 'transparent', border: 'none',
            color: '#333', fontSize: '14px',
            fontWeight: 800, outline: 'none', boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Upload Documents — 2 columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
        {[{ label: doc1Name || 'Click Here To\nUpload Your ID\nDocument', setter: setDoc1Name }, { label: doc2Name || 'Click Here To\nUpload Your ID\nDocument', setter: setDoc2Name }].map((doc, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: '#000', border: '1px solid #1a1a1a', borderRadius: '10px', padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ color: '#666', fontSize: '9px', fontWeight: 700 }}>Upload Your ID Document</span>
                <span style={{ color: '#fff', fontSize: '10px', fontWeight: 800, lineHeight: 1.2, whiteSpace: 'pre-wrap' }}>{doc.label}</span>
              </div>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <label style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
              <input type="file" style={{ display: 'none' }} onChange={e => { if (e.target.files?.[0]) doc.setter(e.target.files[0].name); }} />
              <div style={{ height: '36px', background: '#CCFF00', color: '#000', borderRadius: '4px', fontSize: '13px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '6px' }}>
                Upload
              </div>
            </label>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={handleSubmit}
          style={{
            width: '180px', height: '46px', background: '#CCFF00', border: 'none',
            borderRadius: '8px', color: '#000', fontSize: '14px', fontWeight: 900,
            cursor: 'pointer', letterSpacing: '0.04em'
          }}
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
}

//* ═══════════════════════════════════════ACCOUNT STATEMENT TAB (Replica Fix)═══════════════════════════════════════ *//
function AccountStatementTab() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => getTransactions());
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [avgOddsOn, setAvgOddsOn] = useState(false);

  useEffect(() => {
    const h = () => setTransactions(getTransactions());
    window.addEventListener('transactions-change', h);
    return () => window.removeEventListener('transactions-change', h);
  }, []);

  const data = Array.isArray(transactions) ? transactions : [];

  // Date Formatting Fixes
  function fmtDay(dateStr: string) {
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? '13' : String(d.getDate()).padStart(2, '0');
  }
  
  function fmtMonYear(dateStr: string) {
    const d = new Date(dateStr);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return isNaN(d.getTime()) ? "Apr '26" : `${months[d.getMonth()]} '${String(d.getFullYear()).slice(2)}`;
  }

  function fmtTime(timeStr?: string) {
    if (!timeStr) return '00:00 AM';
    const parts = timeStr.split(':');
    let hours = parseInt(parts[0]);
    const minutes = parts[1] || '00';
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  }

  function fmtDateFull(dateStr: string, timeStr?: string) {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '13-04-2026 00:00:00';
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy} ${timeStr || '00:00:00'}`;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0', fontFamily: 'Outfit, sans-serif' }}>

      {data.length > 0 ? data.map(t => {
        const isCredit = t.creditDebit === 'CREDIT' || t.type === 'deposit' || t.type === 'win';
        const isWalletAction = t.type === 'deposit' || t.type === 'withdraw';
        const titleText = (t.description || t.game || t.remark || 'Transaction detail').trim();
        
        return (
          <div key={t.id} style={{ 
            display: 'flex', 
            border: '1px solid #bef103', 
            borderRadius: '12px', 
            marginBottom: '12px', 
            alignItems: 'stretch', 
            background: '#1a1a1a', 
            overflow: 'hidden',
            padding: '0'
          }}>
            {/* Date pill — 70.4x107.75px, NO padding (original has no padding) */}
            <div style={{ width: '70px', minWidth: '70px', background: '#CCFF00', borderRadius: '12px', padding: '0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ color: '#000', fontSize: '32px', fontWeight: 900, lineHeight: 1 }}>{fmtDay(t.date)}</div>
              <div style={{ color: '#000', fontSize: '11px', fontWeight: 800, marginTop: '4px' }}>{fmtMonYear(t.date)}</div>
              <div style={{ color: '#000', fontSize: '10px', fontWeight: 700, marginTop: '2px' }}>{fmtTime(t.time)}</div>
            </div>
            
            {/* Content div — margin: 0 -10.5px matches original (352.44x109.35, padding 10px 10px 10px 12px, margin 0 -10.5px) */}
            <div style={{ flex: 1, minWidth: 0, padding: '10px 10px 10px 12px', margin: '0 -10.5px 0 0', display: 'flex', flexDirection: 'column', gap: '0' }}>
              
              {/* Title — full-width, BLACK bg, padding 8px */}
              <div
                onClick={() => setSelectedTx(t)}
                style={{
                  display: 'flex', gap: '8px', alignItems: 'center',
                  background: '#000000',
                  border: '1px solid #333333',
                  borderRadius: '30px', padding: '8px 12px',
                  width: '100%', cursor: 'pointer', boxSizing: 'border-box'
                }}
              >
                {/* PIL-brand orange icon */}
                <div style={{ width: '16px', height: '16px', borderRadius: '50%', flexShrink: 0, background: isWalletAction ? '#1565c0' : '#e65100', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="#fff">
                    {isWalletAction
                      ? <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      : <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                    }
                  </svg>
                </div>
                {/* span: 273.84x32px, #C3C3C3, 12px Outfit, 2-line clamp */}
                <span style={{ 
                  color: '#C3C3C3', fontSize: '12px', fontWeight: 500, 
                  fontFamily: 'Outfit, sans-serif', lineHeight: '1.35',
                  display: '-webkit-box', WebkitLineClamp: 2, 
                  WebkitBoxOrient: 'vertical', overflow: 'hidden'
                }}>
                  {titleText}
                </span>
              </div>
              
              {/* Balance row — padding 10px 10.5px 0px */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 10.5px 0px' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: '#fff', fontSize: '9px', fontWeight: 800 }}>{isCredit ? 'CREDIT' : 'DEBIT'}</span>
                  <span style={{ color: isCredit ? '#00C853' : '#FF4444', fontSize: '15px', fontWeight: 900 }}><span style={{ color: '#888' }}>₹</span> {t.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', background: '#2a2a2a', color: '#bef103', fontSize: '8px', fontWeight: 900, border: '1px solid #555' }}>
                  {isWalletAction ? 'D/W' : 'PIL'}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
                  <span style={{ color: '#fff', fontSize: '9px', fontWeight: 800 }}>BALANCE</span>
                  <span style={{ color: (t.balance ?? 0) < 0 ? '#c62828' : '#CCFF00', fontSize: '15px', fontWeight: 900 }}><span style={{ color: '#888' }}>₹</span> {(t.balance ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>
          </div>
        );
      }) : <div style={{ color: '#A39C9C', textAlign: 'center', padding: '60px', fontSize: '14px' }}>No records found</div>}

      {/* Client Bet History Modal — matches img2 */}
      {selectedTx && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#1e2026', width: '100%', maxWidth: '420px', borderRadius: '12px', overflow: 'hidden', color: '#fff', boxShadow: '0 12px 48px rgba(0,0,0,0.7)' }}>

            {/* Header */}
            <div style={{ padding: '14px 20px', textAlign: 'center', borderBottom: '1px solid #2d3038', position: 'relative', background: '#2c2e33' }}>
              <div style={{ fontSize: '15px', fontWeight: 700 }}>Client Bet History</div>
              <button onClick={() => setSelectedTx(null)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: '20px', lineHeight: 1, padding: '2px 6px' }}>✕</button>
            </div>

            {/* Body */}
            <div style={{ padding: '14px 16px', overflowY: 'auto', maxHeight: '75vh' }}>

              {/* Table header */}
              <div style={{ display: 'grid', gridTemplateColumns: '50px 1fr 34px 30px 40px 40px 54px', fontWeight: 800, color: '#ccc', fontSize: '10px', gap: '4px', borderBottom: '1px solid #3d3f45', paddingBottom: '8px', marginBottom: '8px' }}>
                <div>Ref.ID</div><div>Market/Round</div><div>Type</div><div>Odds</div><div>Stake</div><div>P|L</div><div>M.Date</div>
              </div>

              {/* Table row */}
              <div style={{ display: 'grid', gridTemplateColumns: '50px 1fr 34px 30px 40px 40px 54px', color: '#ccc', fontSize: '10px', gap: '4px', borderBottom: '1px solid #3d3f45', paddingBottom: '12px', marginBottom: '14px', alignItems: 'start' }}>
                <div>{selectedTx.id.slice(-6)}</div>
                <div style={{ lineHeight: 1.4 }}>{selectedTx.game || selectedTx.description || selectedTx.remark || 'Transaction'}</div>
                <div>Back</div>
                <div>{(selectedTx as any).odds || '2.58'}</div>
                <div>{selectedTx.amount.toFixed(2)}</div>
                <div style={{ color: selectedTx.creditDebit === 'CREDIT' ? '#00C853' : '#FF4444' }}>{selectedTx.creditDebit === 'CREDIT' ? '+' : '-'}{selectedTx.amount.toFixed(3)}</div>
                <div style={{ color: '#888', fontSize: '9px', lineHeight: 1.3 }}>{fmtDateFull(selectedTx.date, selectedTx.time)}</div>
              </div>

              {/* Average Odds toggle */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
                <span style={{ color: '#888', fontSize: '11px' }}>Average Odds :</span>
                <span style={{ color: avgOddsOn ? '#888' : '#fff', fontSize: '11px', cursor: 'pointer' }} onClick={() => setAvgOddsOn(false)}>on</span>
                <div onClick={() => setAvgOddsOn(v => !v)} style={{ width: '40px', height: '22px', borderRadius: '11px', background: avgOddsOn ? '#CCFF00' : '#555', position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}>
                  <div style={{ position: 'absolute', top: '4px', left: avgOddsOn ? '20px' : '4px', width: '14px', height: '14px', borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
                </div>
                <span style={{ color: avgOddsOn ? '#fff' : '#888', fontSize: '11px', cursor: 'pointer' }} onClick={() => setAvgOddsOn(true)}>off</span>
              </div>

              {/* Totals */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { l: 'Back Total', v: selectedTx.amount },
                  { l: 'Lay Total', v: 0 },
                  { l: 'Market Total', v: selectedTx.amount },
                  { l: 'Total', v: selectedTx.amount },
                ].map(row => (
                  <div key={row.l} style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px' }}>
                    <span style={{ color: '#888', fontSize: '11px' }}>{row.l}</span>
                    <span style={{ fontWeight: 700, fontSize: '11px', minWidth: '64px', textAlign: 'right' }}>{typeof row.v === 'number' ? row.v.toFixed(2) : row.v}</span>
                  </div>
                ))}
              </div>

              {/* Date footer */}
              <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid #3d3f45', color: '#888', fontSize: '10px', textAlign: 'center' }}>
                Date: {fmtDateFull(selectedTx.date, selectedTx.time)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
/* ═══════════════════════════════════════
   OPEN BETS TAB  (img2 style — filter dropdowns)
   ═══════════════════════════════════════ */
function OpenBetsTab() {
  const sel = (label: string, opts: string[]) => (
    <div style={{ flex: 1, minWidth: '45%' }}>
      <div style={{ color: '#ccc', fontSize: '11px', fontWeight: 600, marginBottom: '4px' }}>{label}</div>
      <div style={{ position: 'relative' }}>
        <select style={{ width: '100%', height: '38px', background: '#1a1a1a', border: '1px solid #333', borderRadius: '6px', color: '#888', fontSize: '12px', padding: '0 10px', appearance: 'none', outline: 'none' }}>
          {opts.map(o => <option key={o}>{o}</option>)}
        </select>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}><polyline points="6 9 12 15 18 9" /></svg>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', gap: '12px' }}>
        {sel('Sports', ['Select sport'])}
        {sel('Tournaments', ['Select tournament'])}
      </div>
      <div style={{ display: 'flex', gap: '12px' }}>
        {sel('Matches', ['Select match'])}
        {sel('Markets', ['Select market'])}
      </div>
      <div style={{ display: 'flex', gap: '12px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ color: '#ccc', fontSize: '11px', fontWeight: 600, marginBottom: '4px' }}>From Date</div>
          <input type="date" defaultValue="2026-04-21" style={{ width: '100%', height: '38px', background: '#1a1a1a', border: '1px solid #333', borderRadius: '6px', color: '#fff', fontSize: '12px', padding: '0 10px', outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ color: '#ccc', fontSize: '11px', fontWeight: 600, marginBottom: '4px' }}>To Date</div>
          <input type="date" defaultValue="2026-04-28" style={{ width: '100%', height: '38px', background: '#1a1a1a', border: '1px solid #333', borderRadius: '6px', color: '#fff', fontSize: '12px', padding: '0 10px', outline: 'none', boxSizing: 'border-box' }} />
        </div>
      </div>
      {sel('Bets Type', ['Select bet type'])}
      <div style={{ color: '#888', textAlign: 'center', padding: '30px 0', fontSize: '13px' }}>No open bets found</div>
    </div>
  );
}

export function AccountPage({ initialTab = 'profile', onNavigate }: { initialTab?: AccountTab; onNavigate: (page: string) => void; }) {
  const [tab, setTab] = useState<AccountTab>(initialTab);
  const [, forceUpdate] = useState(0);

  const renderTab = () => {
    switch (tab) {
      case 'profile': return <UserProfileTab />;
      case 'wallets': return <WalletsTab />;
      case 'withdraw': return <WithdrawTab onAdd={() => forceUpdate(n => n + 1)} />;
      case 'account-statement': return <AccountStatementTab />;
      case 'open-bets': return <OpenBetsTab />;
      case 'transaction-history': return <TransactionHistoryTab />;
      default: return <UserProfileTab />;
    }
  };

  return (
    <AccountShell activeTab={tab} onTabChange={setTab} onNavigate={onNavigate}>
      {renderTab()}
    </AccountShell>
  );
}
