import { useState, useRef, useEffect } from 'react';
import { getUser } from '../utils/auth';

const ICONS = {
  casino: '/sidebar-icon/sidebar-casino-icon.png',
  sports: '/sidebar-icon/sidebar-sports-icon.png',
  promotion: '/sidebar-icon/sidebar-gift-icon.png',
  refer: '/sidebar-icon/sidebar-refer-icon.png',
  affiliate: '/sidebar-icon/affiliate-new.png',
  vip: '/sidebar-icon/vip-new.png',
  blog: '/sidebar-icon/sidebar-blog-icon.png',
  oneclick: '/sidebar-icon/oneclick-new.png',
  appLeft: '/sidebar-icon/sidebar-mobAd-icon.png',
  appBanner: '/sidebar-icon/mobImg.png',
  whatsapp: '/whatsapp.png',
  callus: '/sidebar-callUs-icon.png',
};

function Seprator() {
  return (
    <li style={{ margin: '0', padding: '0', width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div style={{
        width: 'calc(100% - 24px)',
        height: '1px',
        background: 'linear-gradient(90deg,transparent,#333,transparent)',
        margin: '6px 0',
      }} />
    </li>
  );
}

type SidebarRowProps = {
  icon?: string;
  iconSVG?: React.ReactNode;
  label: string;
  isOpen: boolean;
  isActive?: boolean;
  isSearch?: boolean;
  rightContent?: React.ReactNode;
  hasDropdown?: boolean; 
  onClick?: () => void;
};

function SidebarRow({ icon, iconSVG, label, isOpen, isActive, isSearch, rightContent, hasDropdown, onClick }: SidebarRowProps) {
  return (
    <li style={{
      width: '100%',
      height: '52px',
      margin: '0px 0px 2px 0px',
      padding: '0 8px',
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <a
        href="javascript:void(0)"
        onClick={onClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          width: isOpen ? '180px' : '45px',
          height: '45px',
          background: isActive ? 'rgba(190, 241, 3, 0.15)' : '#292B30',
          borderRadius: '8px',
          border: '1px solid #bef103',
          borderLeft: '3px solid #bef103',
          textDecoration: 'none',
          boxSizing: 'border-box',
          overflow: 'hidden',
          transition: 'all 0.2s',
          color: '#fff',
          padding: '0 5px',
          cursor: 'pointer'
        }}
      >
        <div style={{
          width: '30px',
          height: '32px',
          marginTop: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          {icon ? (
            <img src={icon} alt={label} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          ) : (
            iconSVG
          )}
        </div>

        {(isOpen || window.innerWidth < 1024) && (
          <div style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '2px 5px',
          }}>
            <span style={{ 
              color: isActive ? '#bef103' : '#E5DBDB', 
              fontSize: '13px', 
              fontWeight: isActive ? 700 : 500, 
              whiteSpace: 'nowrap', 
              fontFamily: "'Outfit', sans-serif" 
            }}>
              {label}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {hasDropdown && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              )}
              {rightContent}
            </div>
          </div>
        )}
      </a>
    </li>
  );
}

// Special card for "Application" showing Banner when expanded
function AppBannerRow({ isOpen }: { isOpen: boolean }) {
  return (
    <li style={{
      width: '100%',
      height: '84px',
      margin: '4px 0',
      padding: '0 8px',
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <a
        style={{
          display: 'flex',
          alignItems: 'center',
          width: isOpen ? '180px' : '45px',
          height: '74px',
          background: '#292B30',
          borderRadius: '8px',
          border: '1px solid #bef103',
          borderLeft: '3px solid #bef103',
          textDecoration: 'none',
          boxSizing: 'border-box',
          overflow: 'hidden',
          padding: '0 8px'
        }}
      >
        {(isOpen || window.innerWidth < 1024) ? (
          <>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ color: '#E5DBDB', fontSize: '14px', fontWeight: 700, lineHeight: 1.2 }}>Application</div>
              <div style={{ color: '#ccc', fontSize: '10px', fontWeight: 500, lineHeight: 1.2, marginTop: '2px' }}>
                Unlock Fun with<br />Exclusive Features
              </div>
            </div>
            <div style={{ height: '100%', width: '56px', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
              <img src={ICONS.appBanner} style={{ width: '100%', height: '80%', objectFit: 'contain' }} alt="App" />
            </div>
          </>
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <img src={ICONS.appLeft} alt="App" style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
          </div>
        )}
      </a>
    </li>
  );
}

export function Sidebar({ isMobileOpen, onClose }: { isMobileOpen?: boolean; onClose?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [isOneClickActive, setIsOneClickActive] = useState(false);
  const [user, setUser] = useState<string | null>(() => getUser());
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handler = () => setUser(getUser());
    window.addEventListener('auth-change', handler);
    return () => window.removeEventListener('auth-change', handler);
  }, []);

  function handleMouseEnter() {
    if (window.innerWidth < 1024) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsOpen(true);
  }
  function handleMouseLeave() {
    if (window.innerWidth < 1024) return;
    timerRef.current = setTimeout(() => setIsOpen(false), 150);
  }

  // Effect to sync expanded state on mobile
  useEffect(() => {
    if (isMobileOpen) {
      setIsOpen(true);
    } else if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  }, [isMobileOpen]);

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            zIndex: 90,
          }}
          className="lg:hidden"
        />
      )}

      <aside
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'fixed',
          left: 0,
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          background: '#191919',
          width: isOpen ? '240px' : (isMobileOpen ? '240px' : '72px'),
          height: '100%',
          maxHeight: '100vh',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          fontFamily: "'Outfit', sans-serif",
          transform: (window.innerWidth < 1024 && !isMobileOpen) ? 'translateX(-100%)' : 'translateX(0)',
          top: 0,
          borderRight: '1px solid #333',
        }}
        className={`${isMobileOpen ? 'flex' : 'hidden lg:flex'}`}
      >
      <ul style={{
        listStyle: 'none',
        padding: '10px 0',
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        scrollbarWidth: 'none',
      }}>
        {/* Search */}
        <SidebarRow
          label="Search"
          isOpen={isOpen}
          isSearch={true}
          iconSVG={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          }
        />
        <Seprator />

        <SidebarRow label="Casino" icon={ICONS.casino} isOpen={isOpen} hasDropdown={true} />
        <SidebarRow label="Sports" icon={ICONS.sports} isOpen={isOpen} hasDropdown={true} />
        <Seprator />
        {user && <SidebarRow label="Powerplay VIP" icon={ICONS.vip} isOpen={isOpen} />}
        <SidebarRow label="Promotion" icon={ICONS.promotion} isOpen={isOpen} />
        <SidebarRow label="Refer and Earn" icon={ICONS.refer} isOpen={isOpen} />
        <SidebarRow label="Affiliate" icon={ICONS.affiliate} isOpen={isOpen} />
        <SidebarRow label="Blog" icon={ICONS.blog} isOpen={isOpen} />
        <Seprator />

        <AppBannerRow isOpen={isOpen} />
        <Seprator />

        <SidebarRow label="WhatsApp" icon={ICONS.whatsapp} isOpen={isOpen} />
        <SidebarRow label="Call Us" icon={ICONS.callus} isOpen={isOpen} />
        <Seprator />

        {/* Light */}
        <SidebarRow
          label="Light"
          isOpen={isOpen}
          isActive={isLightMode}
          onClick={() => setIsLightMode(!isLightMode)}
          iconSVG={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={isLightMode ? "#bef103" : "#E5DBDB"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          }
        />

        {/* One Click Bet */}
        <SidebarRow
          label="One Click Bet"
          isOpen={isOpen}
          isActive={isOneClickActive}
          onClick={() => setIsOneClickActive(!isOneClickActive)}
          icon={ICONS.oneclick}
        />
      </ul>
    </aside>
    </>
  );
}
