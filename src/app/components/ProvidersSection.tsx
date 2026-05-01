import React from 'react';

/*
 * ProvidersSection — uses LOCAL /public/provider/ assets (no 403 blocking)
 * Mobile: horizontal scroll strip with styled provider cards
 * Each card: 160×95px on mobile with fallback background colors per brand
 */

const providers = [
  { 
    src: '/provider/supernowa.webp',
    alt: 'Supernowa',
    bg: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
    name: 'SUPERNOWA',
  },
  { 
    src: '/provider/powergames.webp',
    alt: 'Power Games',
    bg: 'linear-gradient(135deg, #880e4f 0%, #ad1457 100%)',
    name: 'POWER GAMES',
  },
  { 
    src: '/provider/ezugi.webp',
    alt: 'Ezugi',
    bg: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)',
    name: 'EZUGI',
  },
  { 
    src: '/provider/betgames.webp',
    alt: 'Bet Games',
    bg: 'linear-gradient(135deg, #37474f 0%, #546e7a 100%)',
    name: 'BETGAMES',
  },
  { 
    src: '/provider/qtech.webp',
    alt: 'Q Tech',
    bg: 'linear-gradient(135deg, #4a148c 0%, #6a1b9a 100%)',
    name: 'QTECH',
  },
  { 
    src: '/provider/evolution.webp',
    alt: 'Evolution',
    bg: 'linear-gradient(135deg, #bf360c 0%, #d84315 100%)',
    name: 'EVOLUTION',
  },
  { 
    src: '/provider/evoplay.webp',
    alt: 'Evoplay',
    bg: 'linear-gradient(135deg, #006064 0%, #00838f 100%)',
    name: 'EVOPLAY',
  },
  { 
    src: '/provider/spribe.webp',
    alt: 'Spribe',
    bg: 'linear-gradient(135deg, #e65100 0%, #f57c00 100%)',
    name: 'SPRIBE',
  },
  { 
    src: '/provider/smartsoft.webp',
    alt: 'SmartSoft',
    bg: 'linear-gradient(135deg, #0d47a1 0%, #1565c0 100%)',
    name: 'SMARTSOFT',
  },
];

function ProviderCard({ provider }: { provider: typeof providers[0] }) {
  const [imgErr, setImgErr] = React.useState(false);

  return (
    <a
      href="javascript:void(0)"
      style={{
        display: 'flex',
        flexShrink: 0,
        width: '170px',
        height: '108px',
        borderRadius: '12px',
        border: '1px solid #bef103',
        overflow: 'hidden',
        position: 'relative',
        textDecoration: 'none',
        background: provider.bg,
        cursor: 'pointer',
      }}
    >
      {!imgErr ? (
        <img
          src={provider.src}
          alt={provider.alt}
          onError={() => setImgErr(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: '12px' }}
        />
      ) : (
        /* Fallback styled card when image fails */
        <div style={{
          width: '100%', height: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', gap: '6px',
          background: provider.bg,
        }}>
          <span style={{
            color: '#fff',
            fontSize: '11px',
            fontWeight: 800,
            fontFamily: "'Outfit', sans-serif",
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            textAlign: 'center',
            padding: '0 8px',
          }}>{provider.name}</span>
        </div>
      )}
    </a>
  );
}

export function ProvidersSection() {
  return (
    <section style={{
      width: '100%',
      margin: '10px 0px 3px 0px',
      padding: '6px 0px 3px 0px',
      boxSizing: 'border-box',
      overflowX: 'hidden',
    }}>
      {/* Section title removed as requested */}

      {/* Horizontal scroll strip */}
      <div style={{ overflowX: 'auto', scrollbarWidth: 'none', width: '100%' } as React.CSSProperties}>
        <div style={{ display: 'flex', gap: '8px', padding: '0 8px', width: 'max-content' }}>
          {providers.map((provider, index) => (
            <ProviderCard key={index} provider={provider} />
          ))}
        </div>
      </div>
    </section>
  );
}
