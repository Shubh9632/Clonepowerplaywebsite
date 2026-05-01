import React from 'react';

/*
 * Most Played Games — matches img5 original:
 *  - Bold white "Most Played Games" title
 *  - Clean game card images WITHOUT any text overlays
 *  - Local assets from /public/popular/
 */

const popularGames = [
  { src: '/popular/20230401487833.webp', name: 'EZUGI', provider: 'Ezugi', providerLogo: '/provider/ezugi.webp' },
  { src: '/popular/20210905133016.webp', name: 'EZUGI', provider: 'Ezugi', providerLogo: '/provider/ezugi.webp' },
  { src: '/popular/20210911414970.webp', name: 'EZUGI', provider: 'Ezugi', providerLogo: '/provider/ezugi.webp' },
  { src: '/popular/20240243236219.webp', name: 'EVOLUTION', provider: 'Evolution', providerLogo: '/provider/evolution.webp' },
  { src: '/popular/goas-andar-bahar.webp', name: 'ANDAR BAHAR', provider: 'Ezugi', providerLogo: '/provider/ezugi.webp' },
  { src: '/popular/SPB-aviator.webp', name: 'AVIATOR', provider: 'Spribe', providerLogo: '/provider/spribe.webp' },
  { src: '/popular/20210308369294.webp', name: 'SPEED ROULETTE', provider: 'Evolution', providerLogo: '/provider/evolution.webp' },
  { src: '/popular/20210541544675.webp', name: 'AUTOMATIC ROULETTE', provider: 'Ezugi', providerLogo: '/provider/ezugi.webp' },
  { src: '/popular/20210811288970.webp', name: 'LUCKY 7', provider: 'Ezugi', providerLogo: '/provider/ezugi.webp' },
  { src: '/popular/8816511.webp', name: 'MAC88', provider: 'Mac88', providerLogo: '' },
];

export function PopularGames() {
  return (
    <section style={{ width: '100%', marginTop: '10px' }}>

      {/* Title: bold white text matching img5 original */}
      <div style={{
        padding: '0 8px 6px 8px',
        fontFamily: "'Outfit', sans-serif",
        fontSize: '14px',
        fontWeight: 800,
        color: '#fff',
        letterSpacing: '0.01em',
      }}>
        Popular Games For You
      </div>

      {/* Scroll track — clean cards, NO text overlay */}
      <div style={{ width: '100%', overflowX: 'hidden' }}>
        <div style={{ overflowX: 'auto', scrollbarWidth: 'none', width: '100%' } as React.CSSProperties}>
          <div className="flex w-max" style={{ gap: '4px', padding: '0 4px' }}>
            {popularGames.map((game, index) => (
              <div
                key={index}
                className="relative block shrink-0 overflow-hidden"
                style={{
                  width: '90px',
                  height: '135px',
                  cursor: 'pointer',
                  borderRadius: '0',
                }}
              >
                {/* Raw Image: No text overlay as requested */}
                <img
                  loading="lazy"
                  src={game.src}
                  alt={game.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: '0' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
