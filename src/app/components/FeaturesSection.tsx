import React from 'react';

/*
 * "Play With Powerplay" FeaturesSection — matches img4 reference:
 *  - Section title: "Play With Powerplay" in small white text
 *  - 4 cards stacked vertically on mobile, each with:
 *    - Left: yellow (#CCFF00) title text
 *    - Right: icon image
 *    - Dark card background #212328 with slight border
 */

const features = [
  {
    image: '/super-withdrawal.png',
    fallback: 'https://powerplay.club/images/super-withdrawal.png?v=1.0',
    title: 'SUPER FAST\nWITHDRAWAL',
    alt: 'Super Fast Withdrawal',
    customStyle: { right: '-12px', top: '40%', width: '65px' }
  },
  {
    image: '/instant-deposit.png',
    fallback: 'https://powerplay.club/images/instant-deposit.png?v=1.0',
    title: 'INSTANT DEPOSIT',
    alt: 'Instant Deposit',
    customStyle: { right: '-8px', top: '42%', width: '70px' }
  },
  {
    image: '/registration.png',
    fallback: 'https://powerplay.club/images/registration.png?v=1.0',
    title: 'ONE CLICK\nREGISTRATION',
    alt: 'One Click Registration',
    customStyle: { right: '-10px', top: '45%', width: '65px' }
  },
  {
    image: '/trusted-platform.png',
    fallback: 'https://powerplay.club/images/trusted-platform.png?v=1.0',
    title: 'MOST TRUSTED\nPLATFORM',
    alt: 'Most Trusted Platform',
    customStyle: { right: '-15px', top: '48%', width: '65px' }
  },
];

function FeatureIcon({ src, fallback, alt }: { src: string; fallback: string; alt: string }) {
  const [err, setErr] = React.useState(false);
  return (
    <img
      src={err ? fallback : src}
      alt={alt}
      onError={() => setErr(true)}
      style={{ width: '64px', height: '64px', objectFit: 'contain', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))' }}
    />
  );
}

export function FeaturesSection() {
  return (
    <section style={{ width: '100%', marginTop: '0', background: '#0f0f1a' }}>

      {/* Section title */}
      <div style={{
        padding: '12px 12px 10px 12px',
        fontFamily: "'Outfit', sans-serif",
        fontSize: '16px',
        fontWeight: 800,
        color: '#fff',
        letterSpacing: '0.02em',
      }}>
        Play With Powerplay
      </div>

      {/* 4 cards stacked on mobile */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '0 6px',
        boxSizing: 'border-box',
      }}>
        {features.map((feature, index) => (
          <div
            key={index}
            className="feature-box"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              height: '60px',
              padding: '0',
              border: '1px solid #c4ff00',
              borderRadius: '15px',
              background: 'linear-gradient(135deg, #1a1e28 0%, #2b3038 45%, #1a1e28 46%, #12151d 100%)',
              marginBottom: '25px',
              position: 'relative',
              boxSizing: 'border-box',
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            {/* Left Content */}
            <div
              className="left-content"
              style={{
                flex: 1,
                paddingLeft: '16px',
                display: 'flex',
                alignItems: 'center',
                boxSizing: 'border-box',
              }}
            >
              <h2 style={{
                margin: 0,
                color: '#CCFF00',
                fontSize: '15px',
                fontWeight: 800,
                lineHeight: 1.2,
                textTransform: 'uppercase',
                whiteSpace: 'pre-line',
              }}>
                {feature.title}
              </h2>
            </div>

            {/* Right Content */}
            <div
              className="right-content"
              style={{
                position: 'relative',
                width: '125px',
                height: '70.8px',
                marginRight: '37.7px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxSizing: 'border-box',
              }}
            >
              <img
                src={feature.image}
                alt={feature.alt}
                onError={(e) => { e.currentTarget.src = feature.fallback; }}
                style={{ 
                  position: 'absolute',
                  height: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0px 4px 10px rgba(255,255,255,0.25))',
                  transform: 'translateY(-50%)',
                  ...feature.customStyle
                }}
                className="responsive-img"
              />
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}

