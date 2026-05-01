import React, { useState } from 'react';

/* ─── MobileBottomNav ─────────────────────────────────────────────────────
 * 6-item bottom nav matching img5 reference icons exactly:
 * Menu (3×3 dots grid), Sports (football), E-Sports (gamepad),
 * Live (broadcast signal), Slots (slot machine), Support (headset)
 */

/* ── Icon Components ── */

const MenuIcon = ({ active }: { active: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="1" y="1" width="7" height="7" rx="1.5" fill={active ? '#bef103' : '#fff'}/>
    <rect x="12" y="1" width="7" height="7" rx="1.5" fill={active ? '#bef103' : '#fff'}/>
    <rect x="1" y="12" width="7" height="7" rx="1.5" fill={active ? '#bef103' : '#fff'}/>
    <rect x="12" y="12" width="7" height="7" rx="1.5" fill={active ? '#bef103' : '#fff'}/>
  </svg>
);

const SportsIcon = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#bef103' : '#fff'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 10 H20 A1 1 0 0 1 21 11 V13 A1 1 0 0 1 20 14 H15.5 A6 6 0 1 1 14 10 Z" />
    <circle cx="10" cy="14" r="2" />
    <circle cx="6" cy="8" r="1.5" />
  </svg>
);

const ESportsIcon = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#bef103' : '#fff'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z" />
    <path d="M6 11.5h4M8 9.5v4" />
    {/* Crosses for buttons */}
    <path d="M15.5 9.5h1m-0.5 -0.5v1" />
    <path d="M17.5 11.5h1m-0.5 -0.5v1" />
    <path d="M15.5 13.5h1m-0.5 -0.5v1" />
    <path d="M13.5 11.5h1m-0.5 -0.5v1" />
  </svg>
);

const LiveIcon = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#bef103' : '#fff'} strokeWidth="1.5">
    <rect x="3" y="3" width="18" height="18" rx="3"/>
    <circle cx="8" cy="8" r="1.5" fill={active ? '#bef103' : '#fff'} />
    <circle cx="16" cy="8" r="1.5" fill={active ? '#bef103' : '#fff'} />
    <circle cx="8" cy="16" r="1.5" fill={active ? '#bef103' : '#fff'} />
    <circle cx="16" cy="16" r="1.5" fill={active ? '#bef103' : '#fff'} />
  </svg>
);

const SlotsIcon = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#bef103' : '#fff'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="6" width="13" height="14" rx="2" />
    <path d="M9 6V4c0-.5.5-1 1-1h3c.5 0 1 .5 1 1v2" />
    <rect x="7" y="9" width="2.5" height="5" rx="0.5" />
    <rect x="10.25" y="9" width="2.5" height="5" rx="0.5" />
    <rect x="13.5" y="9" width="2.5" height="5" rx="0.5" />
    <path d="M18 11h1v-3" />
    <circle cx="19" cy="7" r="1" />
    <line x1="10" y1="17" x2="13" y2="17" />
  </svg>
);

const SupportIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#bef103' : '#fff'} strokeWidth="1.5">
    {/* Lifebuoy ring */}
    <circle cx="12" cy="12" r="9"/>
    <circle cx="12" cy="12" r="4"/>
    {/* Rope segments */}
    <line x1="5.6" y1="5.6" x2="9.1" y2="9.1"/>
    <line x1="18.4" y1="5.6" x2="14.9" y2="9.1"/>
    <line x1="5.6" y1="18.4" x2="9.1" y2="14.9"/>
    <line x1="18.4" y1="18.4" x2="14.9" y2="14.9"/>
  </svg>
);

const navItems = [
  { id: 'menu',    label: 'Menu',     Icon: MenuIcon },
  { id: 'sports',  label: 'Sports',   Icon: SportsIcon },
  { id: 'esports', label: 'E-Sports', Icon: ESportsIcon },
  { id: 'live',    label: 'Live',     Icon: LiveIcon },
  { id: 'slots',   label: 'Slots',    Icon: SlotsIcon },
  { id: 'support', label: 'Support',  Icon: SupportIcon },
];

export function MobileBottomNav({ onMenuToggle }: { onMenuToggle: () => void }) {
  const [active, setActive] = useState('menu');

  return (
    <div
      className="fixed bottom-0 left-0 w-full z-50 lg:hidden"
      style={{
        background: '#111216',
        borderTop: '1px solid #222228',
        boxShadow: '0 -2px 12px rgba(0,0,0,0.6)',
      }}
    >
      <ul style={{
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'space-around',
        listStyle: 'none',
        margin: 0,
        padding: 0,
        height: '56px',
        width: '100%',
      }}>
        {navItems.map((item) => {
          const isActive = active === item.id;
          const { Icon } = item;
          return (
            <li key={item.id} style={{ flex: 1 }}>
              <button
                onClick={() => {
                  setActive(item.id);
                  if (item.id === 'menu') onMenuToggle();
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  gap: '3px',
                  padding: 0,
                }}
              >
                <Icon active={isActive} />
                <span style={{
                  fontSize: '9px',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#bef103' : '#fff',
                  fontFamily: "'Outfit', sans-serif",
                  letterSpacing: '0.01em',
                  lineHeight: 1,
                }}>
                  {item.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <div style={{ height: 'env(safe-area-inset-bottom)', background: '#111216' }} />
    </div>
  );
}
