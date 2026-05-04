import React, { useRef, useEffect } from 'react';

// Promotion images — local assets
const promotions = [
  {
    desktop: '/promotion/20240752308988.webp',
    mobile: '/promotion/20240752308988.webp',
    alt: 'Turn Your Sports Loses Into Wins! With 1% Weekly loss Bonus',
  },
  {
    desktop: '/promotion/20240750128094.webp',
    mobile: '/promotion/20240750128094.webp',
    alt: 'Upto 5% Real Money Cashback Bonus — Deposit More Win More',
  },
  {
    desktop: '/promotion/20240755507898.webp',
    mobile: '/promotion/20240755507898.webp',
    alt: 'Refer A Friend and Earn ₹500 — Play Together Win Better',
  },
  {
    desktop: '/promotion/20240758006316.webp',
    mobile: '/promotion/20240758006316.webp',
    alt: 'Turn Your Casino Loses Into Wins! With 1% Weekly loss Bonus',
  },
];

export function PromotionsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic
  useEffect(() => {
    const timer = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        // If reached the end, snap back to start
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll by one card width (334px + 10px gap)
          scrollRef.current.scrollBy({ left: 344, behavior: 'smooth' });
        }
      }
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    /*
     * Original inspector data:
     *   Title: 1431×37.6, margin: 0px 5px
     *   Swiper: 1426×208.51
     *   Each card: 349.25×201.09  (4 cards = 4 × 349.25 + 3 gaps ≈ 1426)
     */
    <section style={{ width: '100%', marginTop: '6px' }}>

      {/* FEATURED PROMOTIONS title — 1431×37.6, margin 0px 5px */}
      <div style={{
        width: '100%',
        margin: '0px 5px',
        boxSizing: 'border-box',
      }}>
        <span style={{
          display: 'block',
          fontFamily: "'Outfit', sans-serif",
          fontSize: '13px',
          fontWeight: 700,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: '#fff',
          lineHeight: '37.6px',       /* height = 37.6px */
          height: '37.6px',
          overflow: 'hidden',
        }}>
          FEATURED PROMOTIONS
        </span>
      </div>

      {/* Promotions scroll track: horizontal strip on mobile, grid on desktop */}
      <div 
        ref={scrollRef}
        className="flex lg:grid lg:grid-cols-4 overflow-x-auto lg:overflow-x-hidden lg:h-[208.51px]"
        style={{
          width: '100%',
          scrollbarWidth: 'none',
          padding: '0 8px',
          boxSizing: 'border-box',
          gap: '10px',
          height: 'auto',
        }}
      >
        {promotions.map((promo, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex items-center justify-center"
            style={{ width: 'calc(100vw - 32px)', flexShrink: 0 }}
          >
            <a
              href="javascript:void(0)"
              style={{
                display: 'block',
                width: '100%',
                overflow: 'hidden',
                borderRadius: '10px',
                cursor: 'pointer',
                lineHeight: 0,
                position: 'relative',
                background: 'transparent'
              }}
            >
              <picture style={{ display: 'block', width: '100%' }}>
                <source media="(max-width: 1023px)" srcSet={promo.mobile} />
                <source media="(min-width: 1024px)" srcSet={promo.desktop} />
                <img
                  loading="lazy"
                  src={promo.desktop}
                  alt={promo.alt}
                  style={{ 
                    width: '100%', 
                    height: 'auto',
                    aspectRatio: '320 / 185',
                    objectFit: 'cover', 
                    display: 'block',
                    borderRadius: '8px'
                  }}
                />
              </picture>
            </a>
          </div>
        ))}
      </div>

    </section>
  );
}
