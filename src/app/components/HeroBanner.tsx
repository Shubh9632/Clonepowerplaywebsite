import { useState, useEffect, useRef } from 'react';
import { getUser } from '../utils/auth';

const loggedOutBanners = [
  {
    mobile: '/banner/Crypto.webp',
    desktop: '/banner/Crypto.webp',
    alt: 'Crypto',
  },
  {
    mobile: '/banner/PLAYWINBIG.webp',
    desktop: '/banner/PLAYWINBIG.webp',
    alt: 'Play Win Big',
  },
  {
    mobile: '/banner/WITHDRAW.webp',
    desktop: '/banner/WITHDRAW.webp',
    alt: 'Withdraw',
  },
];

const loggedInBanners = [
  {
    mobile: 'https://cdn.cloudd.site/373/banner/20250504351387.webp',
    desktop: 'https://cdn.cloudd.site/373/banner/20250504351387.webp',
    alt: 'Promo 1',
  },
  {
    mobile: 'https://cdn.cloudd.site/373/banner/20250743005822.webp',
    desktop: 'https://cdn.cloudd.site/373/banner/20250743005822.webp',
    alt: 'Promo 2',
  },
  {
    mobile: 'https://cdn.cloudd.site/373/banner/20250503014547.webp',
    desktop: 'https://cdn.cloudd.site/373/banner/20250503014547.webp',
    alt: 'Promo 3',
  },
];

export function HeroBanner() {
  const [user, setUser] = useState<string | null>(() => getUser());

  useEffect(() => {
    const handler = () => setUser(getUser());
    window.addEventListener('auth-change', handler);
    return () => window.removeEventListener('auth-change', handler);
  }, []);

  const banners = user ? loggedInBanners : loggedOutBanners;
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % banners.length);
    }, 5000);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [banners.length]);

  const goTo = (index: number) => { setCurrent(index); startTimer(); };

  return (
    <div style={{
      width: '100%',
      position: 'relative',
      overflow: 'hidden',
      padding: '0 8px',
      boxSizing: 'border-box',
      // Mobile: ~131px tall (3:1 ratio on 390px), Desktop: 477px
    }}>
      <style>{`
        .banner-height { height: 477px; }
        @media (max-width: 1023px) {
          /* Use aspect-ratio so banner scales with viewport width */
          .banner-height {
            height: auto;
            aspect-ratio: 421.6 / 131.6;
            width: 100%;
          }
        }
      `}</style>

      <div className="banner-height" style={{ width: '100%', overflow: 'hidden', borderRadius: '6px', border: '1px solid #CCFF00', boxSizing: 'border-box', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          transition: 'transform 0.5s ease-in-out',
          transform: `translateX(-${current * 100}%)`,
        }}>
          {banners.map((banner, index) => (
            <div key={index} style={{ flex: '0 0 100%', width: '100%', minWidth: '100%', height: '100%' }}>
              <a href="javascript:void(0)" style={{ display: 'block', width: '100%', height: '100%' }}>
                <picture style={{ display: 'block', width: '100%', height: '100%' }}>
                  <source media="(max-width: 767px)" srcSet={banner.mobile} />
                  <source media="(min-width: 768px)" srcSet={banner.desktop} />
                  <img
                    loading={index === 0 ? 'eager' : 'lazy'}
                    src={banner.desktop}
                    alt={banner.alt}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    onError={e => {
                      // Fallback to desktop if mobile fails
                      const img = e.currentTarget as HTMLImageElement;
                      if (img.src !== banner.desktop) img.src = banner.desktop;
                    }}
                  />
                </picture>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination dots */}
      <div style={{
        position: 'absolute', bottom: '8px', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', alignItems: 'center', gap: '8px', zIndex: 10,
      }}>
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            aria-label={`Slide ${index + 1}`}
            style={{
              width: current === index ? '20px' : '7px',
              height: '7px',
              borderRadius: '4px',
              background: current === index ? '#c9c9c9' : '#414141',
              border: 'none', cursor: 'pointer',
              transition: 'all 0.3s ease', padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
