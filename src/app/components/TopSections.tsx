import React from 'react';

/*
 * TopSections — wraps Deposit/Withdraw + Casino Categories in a single div
 *
 * Original inspector: div.top-sections 1441×326
 *   ├── div.top-title-details 1441×52     (deposit + withdraw strip)
 *   │     padding: 7px 7px 0px 0px
 *   │     Deposit button: 300×45, centered
 *   │     Withdraw button: 300×45, centered
 *   └── Casino categories slider: 1858×267
 *         each img: 180×267
 *
 * 52 + 267 + 7 (padding top) ≈ 326px total ✓
 */

const categories = [
  { src: '/lp-images/esport.webp',      alt: 'E-Sports' },
  { src: '/lp-images/jetx.webp',        alt: 'Jet X' },
  { src: '/lp-images/baloon.webp',      alt: 'Baloon' },
  { src: '/lp-images/hilo.webp',        alt: 'Hi Lo' },
  { src: '/lp-images/thimble.webp',     alt: 'Thimble' },
  { src: '/lp-images/andar-bahar.webp', alt: 'Andar Bahar' },
  { src: '/lp-images/cricket.webp',     alt: 'Cricket' },
  { src: '/lp-images/roullete.webp',    alt: 'Roulette' },
  { src: '/lp-images/teenpatti.webp',   alt: 'Teen Patti' },
  { src: '/lp-images/crazytime.webp',   alt: 'Crazy Time' },
];

export function TopSections() {
  return (
    /* div.top-sections: 1441×326 — contains deposit strip + category slider */
    <div
      className="top-sections"
      style={{
        width: '100%',
        /* height 326 comes naturally: 52 (deposit) + 267 (slider) + 7 (padding) */
      }}
    >

      {/* ── Deposit / Withdraw strip — hidden on mobile since App.tsx handles it now ── */}
      <div
        className="hidden lg:flex w-full h-[52px] pt-[7px] pr-[7px] box-border bg-[#1e1c3a] flex-row items-start justify-center gap-0"
      >
        {/* Deposit: 300×45, gradient */}
        <button style={{
          width: '300px',
          height: '45px',
          flexShrink: 0,
          border: 'none',
          cursor: 'pointer',
          padding: '0px 10px',
          boxSizing: 'border-box',
          background: '#ffd600',
          color: '#000',
          fontFamily: "'Outfit', sans-serif",
          fontSize: '13px',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          DEPOSIT
        </button>

        {/* Withdraw: 300×45, dark blue */}
        <button style={{
          width: '300px',
          height: '45px',
          flexShrink: 0,
          border: 'none',
          cursor: 'pointer',
          padding: '0px 10px',
          boxSizing: 'border-box',
          background: '#18498d',
          color: '#fff',
          fontFamily: "'Outfit', sans-serif",
          fontSize: '13px',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          WITHDRAW
        </button>
      </div>

      {/* ── Casino Categories slider (Refer track on mobile) ── */}
      <div style={{ width: '100%', overflowX: 'hidden' }}>
        <div style={{ overflowX: 'auto', scrollbarWidth: 'none', width: '100%' } as React.CSSProperties}>
          {/* Inner track: Width adjusted to items */}
          <div 
            className="flex w-max"
            style={{ padding: '0 4px', gap: '6px' }}
          >
            {categories.map((cat, index) => (
              <a
                key={index}
                href="javascript:void(0)"
                className="block shrink-0 no-underline cursor-pointer w-[90px] h-[135px] lg:w-[180px] lg:h-[267px]"
              >
                <img
                  loading="lazy"
                  src={cat.src}
                  alt={cat.alt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: '12px' }}
                />
              </a>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
