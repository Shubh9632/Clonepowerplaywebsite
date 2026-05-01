import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { HeroBanner } from './components/HeroBanner';
import { SportsSection } from './components/SportsSection';
import { PromotionsSection } from './components/PromotionsSection';
import { TrendingGames } from './components/TrendingGames';
import { TopSections } from './components/TopSections';
import { FeaturesSection } from './components/FeaturesSection';
import { PopularGames } from './components/PopularGames';
import { ProvidersSection } from './components/ProvidersSection';
import { AccordionSections } from './components/AccordionSections';
import { TutorialsSection } from './components/TutorialsSection';
import { Footer } from './components/Footer';
import { LoginPage, RegisterPage } from './components/LoginPage';
import { DepositPage } from './components/DepositPage';
import { AccountPage } from './components/AccountPage';
import { seedDummyData } from './utils/auth';
import { NewsTicker } from './components/NewsTicker';
import { MobileBottomNav } from './components/MobileBottomNav';
import type { AccountTab } from './components/AccountShell';

// Seed on first load
seedDummyData();

type Page =
  | 'home' | 'login' | 'register'
  | 'deposit'
  | 'account' | 'account-statement' | 'transaction-history' | 'open-bets';

const ACCOUNT_TABS: Record<string, AccountTab> = {
  'account':              'profile',
  'account-statement':    'account-statement',
  'transaction-history':  'transaction-history',
  'open-bets':            'open-bets',
};

import { getUser } from './utils/auth';

import { DownloadSection } from './components/DownloadSection';

// --- LOGGED IN HOME ---
function LoggedInHome({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f1a' }}>
      <Header onNavigate={onNavigate} />
      <NewsTicker />
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', minWidth: 0, overflowX: 'hidden' }}>
        <div className="hidden lg:block" style={{ width: '72px', minWidth: '72px', height: '653.2px', flexShrink: 0, position: 'relative' }}>
          <Sidebar isMobileOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </div>
        <div className="lg:hidden">
          <Sidebar isMobileOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </div>
        <main className="app-home flex flex-col w-full min-h-screen overflow-x-hidden min-w-0" style={{ flex: 1 }}>
          <div style={{ marginTop: '8px' }}><HeroBanner /></div>
          <div><TrendingGames title="Recommend For You" /></div>
          
          <div
            className="flex flex-row items-center justify-center font-['Outfit'] px-2 box-border"
            style={{ width: '100%', height: '40px', margin: '14px 0', gap: '8px' }}
          >
            <button
              onClick={() => onNavigate('deposit')}
              style={{ flex: 1, height: '40px', background: 'linear-gradient(90deg, #1ac7d8 0%, #00d28b 100%)', color: '#fff', border: 'none', fontWeight: 700, fontSize: '14px', letterSpacing: '0.05em', cursor: 'pointer', borderRadius: '4px' }}
            >
              DEPOSIT
            </button>
            <button
              onClick={() => onNavigate('account')}
              style={{ flex: 1, height: '40px', background: 'linear-gradient(90deg, #004696 0%, #15325b 100%)', color: '#fff', border: 'none', fontWeight: 700, fontSize: '14px', letterSpacing: '0.05em', cursor: 'pointer', borderRadius: '4px' }}
            >
              WITHDRAW
            </button>
          </div>
          
          <div><TopSections /></div>
          <div><ProvidersSection /></div>
          <div><SportsSection /></div>
          <div><PopularGames /></div>
          <div><DownloadSection /></div>
          <div><FeaturesSection /></div>
          <div><AccordionSections /></div>
          <Footer />
        </main>
      </div>
      <MobileBottomNav onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
    </div>
  );
}

// --- LOGGED OUT HOME ---
function LoggedOutHome({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f1a' }}>
      <Header onNavigate={onNavigate} />
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', minWidth: 0, overflowX: 'hidden' }}>
        <div className="hidden lg:block" style={{ width: '72px', minWidth: '72px', height: '653.2px', flexShrink: 0, position: 'relative' }}>
          <Sidebar isMobileOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </div>
        <div className="lg:hidden">
          <Sidebar isMobileOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </div>
        <main className="app-home flex flex-col w-full min-h-screen overflow-x-hidden min-w-0" style={{ flex: 1 }}>
          <div style={{ marginTop: '8px' }} onClick={() => onNavigate('login')} style={{ cursor: 'pointer' }}><HeroBanner /></div>
          <div onClick={() => onNavigate('login')} style={{ cursor: 'pointer' }}><PromotionsSection /></div>
          <div onClick={() => onNavigate('login')} style={{ cursor: 'pointer' }}><TrendingGames /></div>
          
          <div
            className="flex flex-row items-center justify-center font-['Outfit'] px-2 box-border"
            style={{ width: '100%', height: '40px', margin: '14px 0', gap: '8px' }}
          >
            <button
              onClick={() => onNavigate('login')}
              style={{ flex: 1, height: '40px', background: 'linear-gradient(90deg, #1ac7d8 0%, #00d28b 100%)', color: '#fff', border: 'none', fontWeight: 700, fontSize: '14px', letterSpacing: '0.05em', cursor: 'pointer', borderRadius: '4px' }}
            >
              DEPOSIT
            </button>
            <button
              onClick={() => onNavigate('login')}
              style={{ flex: 1, height: '40px', background: 'linear-gradient(90deg, #004696 0%, #15325b 100%)', color: '#fff', border: 'none', fontWeight: 700, fontSize: '14px', letterSpacing: '0.05em', cursor: 'pointer', borderRadius: '4px' }}
            >
              WITHDRAW
            </button>
          </div>
          
          <div onClick={() => onNavigate('login')} style={{ cursor: 'pointer' }}><TopSections /></div>
          <div onClick={() => onNavigate('login')} style={{ cursor: 'pointer' }}><ProvidersSection /></div>
          <div onClick={() => onNavigate('login')} style={{ cursor: 'pointer' }}><PopularGames /></div>
          <div onClick={() => onNavigate('login')} style={{ cursor: 'pointer' }}><DownloadSection /></div>
          <div onClick={() => onNavigate('login')} style={{ cursor: 'pointer' }}><FeaturesSection /></div>
          <div onClick={() => onNavigate('login')} style={{ cursor: 'pointer' }}><AccordionSections /></div>
          <div onClick={() => onNavigate('login')} style={{ cursor: 'pointer' }}><TutorialsSection /></div>
          <Footer />
        </main>
      </div>
      <MobileBottomNav onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
    </div>
  );
}

function HomePage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [user, setUser] = useState<string | null>(() => getUser());
  
  useEffect(() => {
    const handler = () => setUser(getUser());
    window.addEventListener('auth-change', handler);
    return () => window.removeEventListener('auth-change', handler);
  }, []);

  if (user) {
    return <LoggedInHome onNavigate={onNavigate} />;
  }
  return <LoggedOutHome onNavigate={onNavigate} />;
}


export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [user, setUser] = useState<string | null>(() => getUser());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => { setIsLoading(false); }, 800);
    const handler = () => setUser(getUser());
    window.addEventListener('auth-change', handler);
    return () => window.removeEventListener('auth-change', handler);
  }, []);

  const navigate = (p: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setPage(p as Page);
      window.scrollTo(0, 0);
      setIsLoading(false);
    }, 600);
  };

  // Expose navigate globally so LoginPage can redirect to deposit after login()
  useEffect(() => {
    (window as any).__pp_navigate = navigate;
    return () => { delete (window as any).__pp_navigate; };
  }, []);

  // ── Auth guard: if navigating to protected pages while logged out → login ──

  const renderPage = () => {
    if (page === 'login') {
      return (
        <LoginPage
          onNavigateRegister={() => navigate('register')}
          onNavigateHome={() => navigate('home')}
        />
      );
    }

    if (page === 'register') {
      return (
        <RegisterPage
          onNavigateLogin={() => navigate('login')}
          onNavigateHome={() => navigate('home')}
        />
      );
    }

    if (page === 'deposit') {
      return <DepositPage onNavigate={navigate} />;
    }

    if (page in ACCOUNT_TABS) {
      return (
        <AccountPage
          key={page}
          initialTab={ACCOUNT_TABS[page]}
          onNavigate={navigate}
        />
      );
    }

    return <HomePage onNavigate={navigate} />;
  };

  return (
    <>
      {isLoading && (
        <div className="page-loader-overlay">
          <div className="page-loader-spinner">
            <div className="page-loader-dot dot-top" />
            <div className="page-loader-dot dot-bottom" />
            <div className="page-loader-dot dot-left" />
            <div className="page-loader-dot dot-right" />
          </div>
        </div>
      )}
      {renderPage()}
    </>
  );
}
