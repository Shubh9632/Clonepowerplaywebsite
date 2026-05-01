import React, { useState, useEffect } from 'react';
import { getUser } from '../utils/auth';

/*
 * TrendingGames / Recommend For You
 */

const loggedOutGames = [
  { src: '/popular/20210308369294.webp', name: 'SPEED ROULETTE', provider: 'Evolution', providerLogo: '/provider/evolution.webp' },
  { src: '/popular/20210337066561.webp', name: 'DRAGON TIGER', provider: 'Evolution', providerLogo: '/provider/evolution.webp' },
  { src: '/popular/20210541544675.webp', name: 'AUTOMATIC ROULETTE', provider: 'Ezugi', providerLogo: '/provider/ezugi.webp' },
  { src: '/popular/20210811288970.webp', name: 'LUCKY 7', provider: 'Ezugi', providerLogo: '/provider/ezugi.webp' },
  { src: '/popular/SPB-aviator.webp',   name: 'AVIATOR', provider: 'Spribe', providerLogo: '/provider/spribe.webp' },
  { src: '/popular/SPB-goal.webp',      name: 'GOAL', provider: 'Spribe', providerLogo: '/provider/spribe.webp' },
  { src: '/popular/SPB-mines.webp',                  name: 'MINES', provider: 'Spribe', providerLogo: '/provider/spribe.webp' },
  { src: '/popular/teen-patti-faceoff.webp',         name: 'TEEN PATTI FACEOFF', provider: 'Supernowa', providerLogo: '/provider/supernowa.webp' },
];

const loggedInGames = [
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

export function TrendingGames({ title = 'Trending Games' }: { title?: string }) {
  const [user, setUser] = useState<string | null>(() => getUser());

  useEffect(() => {
    const handler = () => setUser(getUser());
    window.addEventListener('auth-change', handler);
    return () => window.removeEventListener('auth-change', handler);
  }, []);

  const gamesToDisplay = user ? loggedInGames : loggedOutGames;

  return (
    <section style={{ width: '100%', marginTop: '6px', position: 'relative' }}>

      {/* Skewed Header Label: Matches img 3 */}
      <h2 style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 20,
        margin: 0,
        background: '#CCFF00',
        color: '#000',
        fontFamily: "'Outfit', sans-serif",
        fontSize: '11px',
        fontWeight: 800,
        padding: '2px 14px 2px 8px',
        boxSizing: 'border-box',
        clipPath: 'polygon(0 0, 100% 0, 88% 100%, 0% 100%)',
        textTransform: 'uppercase',
        pointerEvents: 'none',
      }}>
        {title}
      </h2>

      {/* Parent section: overflow-x: hidden to prevent page scroll */}
      <div style={{ width: '100%', overflowX: 'hidden' }}>
        {/* Track wrapper: overflow-x: auto for horizontal scrolling */}
        <div style={{ overflowX: 'auto', scrollbarWidth: 'none', width: '100%' } as React.CSSProperties}>
          {/* Inner track: Width adjusted to items */}
          <div 
            className="flex w-max" 
            style={{ padding: '0 4px', gap: '4px' }}
          >
            {gamesToDisplay.map((game, index) => (
              <div
                key={index}
                className="relative block shrink-0 overflow-hidden"
                style={{ width: '90px', height: '135px', borderRadius: '0' }}
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
