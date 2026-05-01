import { placeBet } from '../utils/auth';

const SPORTS_TABS = [
  { id: 'cricket', name: 'Cricket', live: 12, prematch: 3, img: '/all-icons/cricket.png' },
  { id: 'tennis', name: 'Tennis', live: 19, prematch: 6, img: '/all-icons/tennis.png' },
  { id: 'soccer', name: 'Soccer', live: 52, prematch: 12, img: '/all-icons/soccer.png' },
  { id: 'politics', name: 'Politics', live: 3, prematch: 1, img: '/all-icons/politics.png' },
];

const MATCHES = [
  {
    id: 1, sport: 'CRICKET', league: 'Indian Premier League',
    team1: 'IPL 2026', team1Icon: '/all-icons/cricket/team-1.png',
    odds: [1.6, 2.5, 3.2, 4.0, 5.5, 6.0]
  },
  {
    id: 2, sport: 'CRICKET', league: 'Indian Premier League',
    team1: 'Gujarat Tit', team1Icon: '/all-icons/cricket/team-1.png',
    team2: 'Royal Chc', team2Icon: '/all-icons/cricket/team-2.png',
    odds: [1.8, 1.9, 2.0, 2.1, 2.2, 2.3]
  },
  {
    id: 3, sport: 'CRICKET', league: 'Pakistan Super League',
    team1: 'PSL 2026', team1Icon: '/all-icons/cricket/team-1.png',
    odds: [5.1, 1.2, 7.9, 1.5, 2.5, 3.0]
  },
  {
    id: 4, sport: 'TENNIS', league: 'Ostrava Challenger 2026',
    team1: 'Sanchez Iz', team1Icon: '/all-icons/tennis/team-1.png',
    team2: 'Vi Sachko', team2Icon: '/all-icons/tennis/team-2.png',
    score1: '1 4 (30)', score2: '1 3 (0)',
    odds: [2.1, 3.4, 3.2, 1.9, 4.5, 5.0]
  },
  {
    id: 5, sport: 'TENNIS', league: 'Savannah Challenger 2026',
    team1: 'Ma Landal', team1Icon: '/all-icons/tennis/team-1.png',
    team2: 'Et Quinn', team2Icon: '/all-icons/tennis/team-2.png',
    score1: '1 4 (40)', score2: '1 5 (40)',
    odds: [1.9, 1.9]
  },
  {
    id: 6, sport: 'TENNIS', league: 'Savannah Challenger 2026',
    team1: 'Al Michels', team1Icon: '/all-icons/tennis/team-1.png',
    team2: 'Martin Til', team2Icon: '/all-icons/tennis/team-2.png',
    score1: '1 1 (15)', score2: '1 2 (15)',
    odds: [1.7, 1.8]
  },
  {
    id: 7, sport: 'TENNIS', league: 'WTA Saint Malo 2026',
    team1: 'Andreescu', team1Icon: '/all-icons/tennis/team-1.png',
    team2: 'Y Yuan', team2Icon: '/all-icons/tennis/team-2.png',
    score1: '0 5 (15)', score2: '1 3 (40)',
    odds: [2.2, 2.5]
  },
  {
    id: 8, sport: 'POLITICS', league: 'India Elections',
    team1: 'Assembly I', team1Icon: 'https://powerplay.club/images/all-icons/politics/republican.png',
    odds: [1.5, 1.6]
  }
];

export function SportsSection() {
  const handleBet = (match: string, odd: number) => {
    const amount = prompt(`Place bet on ${match} at odds ${odd}\nEnter Stake:`, "100");
    if (!amount) return;
    const stake = Number(amount);
    if (isNaN(stake) || stake <= 0) {
      alert("Invalid stake amount");
      return;
    }
    if (placeBet(match, stake, odd)) {
      alert("Bet placed successfully!");
    }
  };

  return (
    <div style={{ width: '100%', margin: '0 auto', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '0px', fontFamily: "'Outfit', sans-serif" }}>
      
      {/* Sports Tabs (matches img2) */}
      <div style={{ background: '#1a1b1e', minHeight: '52px', display: 'flex', padding: '0 8px', alignItems: 'center', gap: '6px', overflowX: 'auto', scrollbarWidth: 'none', borderBottom: '1px solid #2c2d30' }}>
        {SPORTS_TABS.map((tab, idx) => (
          <button key={tab.id} style={{
            height: '40px',
            background: idx === 0 ? '#2c2d30' : '#202228',
            border: '1px solid #414141',
            borderRadius: '6px',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            cursor: 'pointer',
            flexShrink: 0,
            gap: '8px',
            position: 'relative',
            marginTop: '4px'
          }}>
            {tab.img ? <img src={tab.img} alt={tab.name} style={{ width: '22px', height: '22px', objectFit: 'contain' }} /> : <span style={{ fontSize: '22px' }}>{tab.icon}</span>}
            <span style={{ fontSize: '12px', fontWeight: 600 }}>{tab.name}</span>
            
            {/* Badges on top right (matches img2) */}
            <div style={{ position: 'absolute', top: '-6px', right: '-2px', display: 'flex', gap: '1px', zIndex: 5 }}>
              <div style={{ background: '#000', color: '#CCFF00', fontSize: '8px', fontWeight: 900, height: '14px', minWidth: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '2px', border: '1px solid #CCFF00', padding: '0 2px' }}>{tab.live}</div>
              <div style={{ background: '#CCFF00', color: '#000', fontSize: '8px', fontWeight: 900, height: '14px', minWidth: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '2px', padding: '0 2px' }}>{tab.prematch}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Matches Grid */}
      <div style={{ padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {['CRICKET', 'TENNIS', 'SOCCER', 'POLITICS'].map(sport => {
          const sportMatches = MATCHES.filter(m => m.sport === sport);
          if (sportMatches.length === 0) return null;
          return (
            <div key={sport}>
              <div style={{ color: '#fff', fontSize: '16px', fontWeight: 800, marginBottom: '10px' }}>{sport.charAt(0) + sport.slice(1).toLowerCase()}</div>
              <div className="flex flex-col gap-3">
                {sportMatches.map((match: any, i) => (
                   <div key={i} className="w-full bg-[#1a1b1e] rounded-xl p-3 border border-[#2c2d30] flex flex-col gap-3">
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <span style={{ color: '#e74c3c', fontSize: '9px', fontWeight: 800, textTransform: 'uppercase' }}>{match.sport}</span>
                        <span style={{ color: '#CCFF00', fontSize: '12px', fontWeight: 700 }}>{match.league}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <div style={{ height: '16px', background: '#111', border: '1px solid #008000', borderRadius: '3px', display: 'flex', alignItems: 'center', padding: '0 4px', color: '#fff', fontSize: '8px', fontWeight: 900 }}>P <span style={{fontSize:'7px', marginLeft:'2px', color:'#fff'}}>10</span></div>
                        <div style={{ height: '16px', background: '#111', border: '1px solid #008000', borderRadius: '3px', display: 'flex', alignItems: 'center', padding: '0 4px', color: '#fff', fontSize: '8px', fontWeight: 900 }}>MD <span style={{fontSize:'7px', marginLeft:'2px', color:'#fff'}}>1</span></div>
                      </div>
                    </div>
                    
                    {/* Main Match Info */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                      {/* Left Team */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '40px', height: '40px', background: 'transparent', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #2c2d30' }}>
                            <img 
                              src={match.team1Icon} 
                              alt="team" 
                              style={{ width: '32px', height: '32px', objectFit: 'contain' }} 
                              onError={(e) => { e.currentTarget.src = 'https://cdn-icons-png.flaticon.com/512/5373/5373024.png'; }}
                            />
                          </div>
                          <span style={{ color: '#fff', fontSize: '13px', fontWeight: 700 }}>{match.team1}</span>
                        </div>
                        {match.score1 && <div style={{ color: '#fff', fontSize: '11px', fontWeight: 800, marginLeft: '50px' }}>{match.score1}</div>}
                      </div>
 
                      {/* LIVE Circle - Local GIF */}
                      <div style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                        <img 
                          src="/all-icons/live.gif" 
                          alt="LIVE" 
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                          onError={(e) => {
                            // If local GIF somehow fails, use CSS fallback
                            const target = e.currentTarget;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              const indicator = document.createElement('div');
                              indicator.style.width = '28px';
                              indicator.style.height = '28px';
                              indicator.style.background = '#ff4d4d';
                              indicator.style.borderRadius = '50%';
                              indicator.style.display = 'flex';
                              indicator.style.alignItems = 'center';
                              indicator.style.justifyContent = 'center';
                              indicator.style.color = '#fff';
                              indicator.style.fontSize = '8px';
                              indicator.style.fontWeight = '900';
                              indicator.innerText = 'LIVE';
                              indicator.style.boxShadow = '0 0 10px rgba(255, 77, 77, 0.6)';
                              parent.appendChild(indicator);
                            }
                          }}
                        />
                      </div>
 
                      {/* Right Team */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, alignItems: 'flex-end' }}>
                        {match.team2 ? (
                          <>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <span style={{ color: '#fff', fontSize: '13px', fontWeight: 700 }}>{match.team2}</span>
                              <div style={{ width: '40px', height: '40px', background: 'transparent', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #2c2d30' }}>
                                <img 
                                  src={match.team2Icon} 
                                  alt="team" 
                                  style={{ width: '32px', height: '32px', objectFit: 'contain' }}
                                  onError={(e) => { e.currentTarget.src = 'https://cdn-icons-png.flaticon.com/512/5373/5373024.png'; }} 
                                />
                              </div>
                            </div>
                            {match.score2 && <div style={{ color: '#fff', fontSize: '11px', fontWeight: 800, marginRight: '50px' }}>{match.score2}</div>}
                          </>
                        ) : (
                          <div style={{ width: '40px', height: '40px' }} />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
