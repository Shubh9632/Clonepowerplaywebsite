import React from 'react';

/* ─── DownloadSection ─────────────────────────────────────────────────────
 * Uses the official download-btn image from powerplay.club as the app icon.
 * Matches img5 reference from original website exactly.
 */

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill={filled ? '#FFD700' : '#444'}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

export function DownloadSection() {
  return (
    <section style={{ width: '100%', padding: '0 12px', marginBottom: '20px', boxSizing: 'border-box' }}>
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px',
          borderRadius: '8px',
          background: '#212328',
          border: '1px solid #333',
          boxSizing: 'border-box',
          fontFamily: "'Outfit', sans-serif",
        }}
      >
        {/* Left Content */}
        <div
          className="left-content"
          style={{
            flexShrink: 0,
            width: '90px',
            height: '90px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0b2b6c', // Blue background for the logo box
            borderRadius: '8px',
            border: '1px solid #CCFF00',
            overflow: 'hidden',
          }}
        >
          <img
            src="/download-btn.png"
            alt="Powerplay App"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://powerplay.club/images/download-btn.png?V=1.3'; }}
            style={{ width: '65px', height: '76px', objectFit: 'contain' }}
            className="responsive-img"
          />
        </div>

        {/* Right Info Column */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* App name */}
          <div style={{ color: '#3a69d6', fontSize: '15px', fontWeight: 800, lineHeight: 1.2 }}>
            Powerplay
          </div>

          {/* Subtitle */}
          <div style={{ color: '#fff', fontSize: '12px', fontWeight: 700, lineHeight: 1.2, marginTop: '2px' }}>
            live Streaming & match score
          </div>

          {/* Star rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span style={{ color: '#fff', fontSize: '12px', fontWeight: 800 }}>4.6/5</span>
            <span style={{ color: '#8a8a9a', fontSize: '10px' }}>(97 reviews)</span>
          </div>

          {/* Download button */}
          <button
            style={{
              marginTop: '10px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '0 12px',
              height: '30px',
              background: '#CCFF00',
              border: 'none',
              borderRadius: '4px',
              color: '#1f488f',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
              fontFamily: "'Outfit', sans-serif",
              maxWidth: '140px',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
            </svg>
            Download App
          </button>
        </div>
      </div>
    </section>
  );
}
