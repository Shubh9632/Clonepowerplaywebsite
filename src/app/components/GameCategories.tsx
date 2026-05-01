import React from 'react';

/*
 * Casino category games strip (lp-images)
 * Inspector: slider total 1858×267, each img 180×267
 * (1858 ÷ 180 ≈ 10.3 cards visible → scrollable)
 */
const categories = [
  { src: '/lp-images/esport.webp',      alt: 'E-Sports' },
  { src: '/lp-images/jetx.webp',        alt: 'Jet X' },
  { src: '/lp-images/baloon.webp',      alt: 'Baloon' },
  { src: '/lp-images/hilo.webp',        alt: 'Hi Lo' },
  { src: '/lp-images/thimble.webp',     alt: 'Thimble' },
  { src: '/lp-images/andar-bahar.webp', alt: 'Andar Bahar' },
  { src: '/lp-images/cricket.webp',     alt: 'Cricket' },
  { src: '/lp-images/roullete.webp',    alt: 'Lightning Roulette' },
  { src: '/lp-images/teenpatti.webp',   alt: 'Teen Patti' },
  { src: '/lp-images/crazytime.webp',   alt: 'Crazy Time' },
];

export function GameCategories() {
  return (
    <section style={{ width: '100%', marginTop: '3px' }}>
      {/* Scrollable strip: total = 10 × 180 = 1800px content; viewport 1858px label */}
      <div style={{ overflowX: 'auto', scrollbarWidth: 'none', width: '100%' } as React.CSSProperties}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          width: 'max-content',
        }}>
          {categories.map((cat, index) => (
            <div key={index} style={{ padding: '0 4px' }}>
              <a
                href="javascript:void(0)"
                style={{
                  display: 'block',
                  flexShrink: 0,
                  width: '180px',
                  height: '267px',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  lineHeight: 0,
                  borderRadius: '6px',
                  overflow: 'hidden',
                }}
              >
              <img
                loading="lazy"
                src={cat.src}
                alt={cat.alt}
                style={{
                  width: '180px',
                  height: '267px',
                  display: 'block',
                  objectFit: 'cover',
                  borderRadius: '6px',
                  border: '1px solid #CCFF00',
                  boxSizing: 'border-box',
                }}
              />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
