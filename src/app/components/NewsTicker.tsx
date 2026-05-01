import React from 'react';

export function NewsTicker() {
  return (
    <div style={{
      background: '#111',
      display: 'flex',
      alignItems: 'center',
      height: '32px',
      padding: '0 12px',
      overflow: 'hidden',
      fontFamily: "'Outfit', sans-serif",
      fontSize: '12px',
      color: '#fff',
      gap: '8px',
      flexShrink: 0,
      borderBottom: '1px solid #1a1a1a',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap', fontWeight: 700 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff" stroke="none" style={{ flexShrink: 0 }}>
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
        <span style={{ color: '#fff' }}>News :</span>
      </div>
      <marquee scrollamount="3" style={{ flex: 1, whiteSpace: 'nowrap', color: '#ccc' }}>
        INDIAN PREMIER LEAGUE — HIGHEST SCORING OVER RUNS IN MATCH OF IPL — RESULT SETTLED — MUMBAI INDIANS VS SUNRISERS HYDERABAD — PSL 2026 PSL MATCH UPDATE
      </marquee>
    </div>
  );
}
