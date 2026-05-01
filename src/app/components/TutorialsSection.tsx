import React from 'react';

export function TutorialsSection() {
  return (
    <section style={{ width: '100%', maxWidth: '1441px', margin: '20px auto 0' }}>
      {/* Header "TUTORIALS": 430.3 x 44, color #FFFFFF, font 23px */}
      <div 
        className="mx-auto flex items-center justify-center lg:justify-start"
        style={{
          width: '100%',
          maxWidth: '430.3px',
          height: '44px',
          color: '#FFFFFF',
          fontFamily: "'Outfit', sans-serif",
          fontSize: '23px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          padding: '8px 16px',
          boxSizing: 'border-box'
        }}
      >
        TUTORIALS
      </div>

      {/* Buttons Block: 430.4 x 193, Signup/Login, Deposit, Withdrawal */}
      <div 
        className="w-full flex flex-col lg:flex-row items-center justify-center gap-[10px] lg:gap-2 px-3 lg:px-[22.5px]"
        style={{ 
          maxWidth: '430.4px', 
          height: 'auto', 
          minHeight: '193px',
          margin: '10px auto',
          padding: '5px',
          boxSizing: 'border-box'
        }}
      >
        {[
          { label: 'Signup / Login' },
          { label: 'Deposit' },
          { label: 'Withdrawal' }
        ].map((item, idx) => (
          <div 
            key={idx}
            className="w-full flex items-center justify-center"
            style={{ maxWidth: '402.59px' }}
          >
            <button style={{
              width: '100%',
              height: '40px',
              background: 'linear-gradient(180deg, #e0ff4f 0%, #CCFF00 50%, #b5e600 100%)',
              border: 'none',
              borderRadius: '20px',
              color: '#1a1a2e',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxSizing: 'border-box',
              boxShadow: '0 2px 8px rgba(204,255,0,0.15)',
            }}>
              {item.label}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
