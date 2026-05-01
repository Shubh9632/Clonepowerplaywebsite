// ─── Shared auth utilities ────────────────────────────────────────────────────
export const FAKE_PASSWORD = 'Swagat@fake';

export function getUser(): string | null {
  return localStorage.getItem('user');
}

export function login(username: string): void {
  localStorage.setItem('user', username);
  window.dispatchEvent(new Event('auth-change'));
}

export function logout(): void {
  localStorage.removeItem('user');
  window.dispatchEvent(new Event('auth-change'));
}

// ─── Shared wallet utilities ─────────────────────────────────────────────
export function getWalletBalance(): number {
  return Number(localStorage.getItem('wallet_balance') || 0);
}

export function setWalletBalance(amount: number): void {
  localStorage.setItem('wallet_balance', amount.toString());
  window.dispatchEvent(new Event('wallet-change'));
}

// ─── Shared transaction utilities ─────────────────────────────────────────────
export type TxType = 'deposit' | 'withdrawal' | 'bet' | 'win';
export type TxStatus = 'open' | 'won' | 'lost' | 'success';

export interface Transaction {
  id: string;
  type: TxType;
  amount: number;
  date: string;   // YYYY-MM-DD
  time: string;   // HH:MM:SS
  game?: string;
  odds?: number;
  status: TxStatus;
  remark?: string;
  balance?: number;   // running balance after tx
  creditDebit?: 'CREDIT' | 'DEBIT';
}

function pad(n: number) { return String(n).padStart(2, '0'); }

function nowDateStr() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
function nowTimeStr() {
  const d = new Date();
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}
function genId() {
  return 'TXN' + Date.now() + Math.floor(Math.random() * 1000);
}

export function getTransactions(): Transaction[] {
  try {
    const raw = localStorage.getItem('transactions');
    const parsed = JSON.parse(raw || '[]');
    if (!Array.isArray(parsed)) return [];
    
    // Sanitizer to prevent runtime crashes
    return parsed.map(t => ({
      ...t,
      id: String(t.id || ''),
      type: String(t.type || 'unknown') as TxType,
      amount: Number(t.amount || 0),
      status: String(t.status || 'success') as TxStatus,
      date: String(t.date || ''),
      time: String(t.time || ''),
    }));
  } catch { 
    return []; 
  }
}

export function addTransaction(type: TxType, amount: number, status: TxStatus = 'success', game?: string, odds?: number): Transaction {
  const txns = getTransactions();
  const bal = getWalletBalance();
  const t: Transaction = {
    id: genId(),
    type,
    amount,
    date: nowDateStr(),
    time: nowTimeStr(),
    game,
    odds,
    status,
    remark: type === 'deposit' ? 'imps deposit' : type === 'withdrawal' ? 'Bank Transfer' : game || 'Game Bet',
    balance: bal,
    creditDebit: (type === 'deposit' || type === 'win') ? 'CREDIT' : 'DEBIT',
  };
  txns.unshift(t);
  localStorage.setItem('transactions', JSON.stringify(txns));
  window.dispatchEvent(new Event('transactions-change'));
  return t;
}

// ─── Betting Logic ─────────────────────────────────────────────────────────────
export function placeBet(game: string, amount: number, odds: number): boolean {
  const balance = getWalletBalance();
  if (balance < amount) {
    alert("Insufficient balance");
    return false;
  }
  setWalletBalance(balance - amount);
  addTransaction('bet', amount, 'open', game, odds);
  return true;
}

export function settleBet(id: string, won: boolean): void {
  const txns = getTransactions();
  const index = txns.findIndex(t => t.id === id);
  if (index === -1) return;

  const bet = txns[index];
  if (bet.status !== 'open') return;

  if (won && bet.odds) {
    const winAmount = bet.amount * bet.odds;
    const balance = getWalletBalance();
    setWalletBalance(balance + winAmount);
    addTransaction('win', winAmount, 'success', bet.game);
    bet.status = 'won';
  } else {
    bet.status = 'lost';
  }

  localStorage.setItem('transactions', JSON.stringify(txns));
  window.dispatchEvent(new Event('transactions-change'));
}

// Seed dummy data — always re-seeds with fresh cricket data
export function seedDummyData() {
  localStorage.removeItem('transactions');

  const seed: Transaction[] = [
    { id: 'TXN001006', type: 'bet',     amount: 287.26, date: '2026-04-16', time: '23:07:00', status: 'lost',    game: 'Cricket-Indian Premier League-Mumbai Indians v Punjab Kings-Match Odds',                        balance: 0,      creditDebit: 'DEBIT'  },
    { id: 'TXN001005', type: 'win',     amount: 89.26,  date: '2026-04-14', time: '11:36:00', status: 'success', game: 'Cricket-Indian Premier League-Chennai Super Kings v Kolkata Knight Riders-Match Odds',          balance: 287.26, creditDebit: 'CREDIT' },
    { id: 'TXN001004', type: 'bet',     amount: 100,    date: '2026-04-13', time: '21:12:00', status: 'lost',    game: 'Cricket-Pakistan Super League-Peshawar Zalmi v Multan Sultans-19 OVER RUN PZ',                   balance: 198,    creditDebit: 'DEBIT'  },
    { id: 'TXN001003', type: 'win',     amount: 98,     date: '2026-04-13', time: '21:05:00', status: 'success', game: 'VIKINGPLAY - 130426',                                                                          balance: 298,    creditDebit: 'CREDIT' },
    { id: 'TXN001002', type: 'bet',     amount: 100,    date: '2026-04-13', time: '21:05:00', status: 'lost',    game: 'Cricket-Indian Premier League-Sunrisers Hyderabad v Rajasthan Royals-17.3 OVER RUN SRH',        balance: 200,    creditDebit: 'DEBIT'  },
    { id: 'TXN001001', type: 'deposit', amount: 300,    date: '2026-04-13', time: '08:57:00', status: 'success', remark: 'imps deposit : transactionid :: TRA12563952583654346670211 :: [Requested Date: 13-04-2026 20:56:04]', balance: 300, creditDebit: 'CREDIT' },
    { id: 'TXN001007', type: 'win',     amount: 150,    date: '2026-04-17', time: '14:20:00', status: 'success', game: 'Cricket-Indian Premier League-Royal Challengers Bangalore v Delhi Capitals-Match Odds',          balance: 150,    creditDebit: 'CREDIT' },
    { id: 'TXN001008', type: 'bet',     amount: 200,    date: '2026-04-18', time: '19:45:00', status: 'lost',    game: 'Cricket-Indian Premier League-Kolkata Knight Riders v Sunrisers Hyderabad-INNINGS RUNS KKR',     balance: 0,      creditDebit: 'DEBIT'  },
    { id: 'TXN001009', type: 'win',     amount: 175,    date: '2026-04-19', time: '16:10:00', status: 'success', game: 'Cricket-Indian Premier League-Rajasthan Royals v Punjab Kings-Match Odds',                       balance: 175,    creditDebit: 'CREDIT' },
    { id: 'TXN001010', type: 'bet',     amount: 120,    date: '2026-04-20', time: '20:00:00', status: 'lost',    game: 'Cricket-Indian Premier League-Gujarat Titans v Lucknow Super Giants-OVER/UNDER 7.5 GT',          balance: 55,     creditDebit: 'DEBIT'  },
  ];
  localStorage.setItem('transactions', JSON.stringify(seed));
  if (getWalletBalance() === 0) setWalletBalance(1200);
}
