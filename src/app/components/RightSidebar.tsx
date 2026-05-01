export function RightSidebar() {
  const games = [
    { name: 'DRAGON TIGER', provider: 'Ezugi', src: 'https://ik.imagekit.io/sitecdn/casino/ezu/962651.webp?v=4' },
    { name: "GOA'S ANDAR BAHAR", provider: 'SUPERN@WA', src: 'https://ik.imagekit.io/sitecdn/casino/spn/Goasandarbahar.webp' },
    { name: 'SAKURAROULETTE', provider: 'Vimplay', src: 'https://ik.imagekit.io/sitecdn/casino/vmpy/SAKURAROULETTE.webp?v=1' },
    { name: 'ARABICROULETTE', provider: 'Vimplay', src: 'https://ik.imagekit.io/sitecdn/casino/vmpy/ARABICROULETTE.webp?v=1' },
    { name: 'MONACOROULETTE', provider: 'Vimplay', src: 'https://ik.imagekit.io/sitecdn/casino/vmpy/MONACOROULETTE.webp?v=1' },
    { name: 'LIGHTNING ROULETTE', provider: 'Evolution', src: 'https://ik.imagekit.io/sitecdn/casino/evoln/Lightningroulette.webp?v=10' },
  ];

  return (
    <div style={{
      width: '320px', flexShrink: 0,
      background: '#1a1a1a', border: '1px solid #CCFF00', borderRadius: '12px',
      padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px',
      fontFamily: "'Outfit', sans-serif"
    }}>
      {/* Top Tabs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
        <span style={{ color: '#888', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Betlist</span>
        <span style={{ color: '#888', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Recent Activity</span>
        <span style={{ color: '#CCFF00', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>Promotion</span>
      </div>

      <div style={{ color: '#fff', fontSize: '14px', fontWeight: 700 }}>
        No records found
      </div>

      {/* Sub Tabs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '10px', marginTop: '8px' }}>
        <span style={{ color: '#888', fontSize: '13px', fontWeight: 600, cursor: 'pointer', flex: 1, textAlign: 'center' }}>Providers</span>
        <span style={{ color: '#CCFF00', fontSize: '13px', fontWeight: 700, cursor: 'pointer', flex: 1, textAlign: 'center' }}>Live</span>
        <span style={{ color: '#888', fontSize: '13px', fontWeight: 600, cursor: 'pointer', flex: 1, textAlign: 'center' }}>Virtual</span>
      </div>

      {/* Game Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', overflowY: 'auto', paddingRight: '4px', scrollbarWidth: 'thin' }}>
        {games.map(g => (
          <div key={g.name} style={{ width: '100%', aspectRatio: '0.7', borderRadius: '8px', overflow: 'hidden', position: 'relative', border: '1px solid #333' }}>
            <img src={g.src} alt={g.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://ik.imagekit.io/sitecdn/casino/evoln/20210358117264.webp'; }} />
          </div>
        ))}
      </div>
    </div>
  );
}
