import React, { useState } from 'react';

function AccordionItem({ title, children }: { title: string, children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ width: '100%', marginBottom: '6px' }}>
      {/* 1429×42.5 container, margin 0px 6px 2px, padding 10px, background #212328 */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          margin: '0px 6px 2px 6px',
          background: '#212328',
          height: '42.5px',
          padding: '10px 14px',
          boxSizing: 'border-box',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: '4px',
        }}
      >
        {/* Text div: flexible width */}
        <div style={{
          flex: 1,
          marginRight: '12px',
          height: '22.5px',
          color: '#fff',
          fontFamily: "'Outfit', sans-serif",
          fontSize: '16px',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}>
          {title}
        </div>
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', flexShrink: 0 }}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>

      {isOpen && (
        <div style={{
          margin: '0px 6px 10px 6px',
          padding: '15px 20px',
          background: '#191b20',
          color: '#a39c9c',
          fontFamily: "'Outfit', sans-serif",
          fontSize: '13px',
          lineHeight: '1.6',
        }}>
          {children}
        </div>
      )}
    </div>
  );
}

export function AccordionSections() {
  return (
    <section style={{ width: '100%', marginTop: '8px' }}>
      <AccordionItem title="Powerplay - The Best Online Betting And Casino Platform In India">
        <p className="mb-3">
          Looking for a trusted online betting site in India? Powerplay is your ideal destination for online casino games and sports betting. With extensive industry experience, Powerplay offers an online gaming platform that’s safe, enjoyable, and easy to navigate. Developed by seasoned professionals, Powerplay ensures a smooth and engaging experience, complete with competitive features, advanced technology, and various games. Powerplay has everything you need for a secure and enjoyable gaming experience, making it a top choice for online gaming in India.
        </p>
        <table className="w-full text-left border-collapse mb-4">
          <tbody>
            <tr className="border-b border-[#333]"><th className="py-2 font-semibold">Platform</th><td className="py-2">Powerplay</td></tr>
            <tr className="border-b border-[#333]"><th className="py-2 font-semibold">Bonus</th><td className="py-2">25% Bonus on first deposit and 20% on every deposit</td></tr>
            <tr className="border-b border-[#333]"><th className="py-2 font-semibold">Sports</th><td className="py-2">30+ Sports</td></tr>
            <tr className="border-b border-[#333]"><th className="py-2 font-semibold">Casino</th><td className="py-2">10000+ Games</td></tr>
            <tr className="border-b border-[#333]"><th className="py-2 font-semibold">Withdrawal time</th><td className="py-2">Instant</td></tr>
          </tbody>
        </table>

        <h4 className="font-bold text-white mb-2">Why Choose Powerplay for Online Gaming and Betting?</h4>
        <p className="mb-3">Powerplay is India's go-to destination for online sports and betting. Whether you use a website or an app, Powerplay is one of India's best online gambling sites. Here's why you should use Powerplay.</p>
        <ul className="list-disc pl-5 mb-4 space-y-1">
          <li><strong className="text-white">User-Friendly Interface:</strong> The interface is easy to use, making it suitable for newbies and experienced users alike.</li>
          <li><strong className="text-white">Wide Range of Games and Sports:</strong> Enjoy a wide range of Casino games and sports betting options for endless excitement.</li>
          <li><strong className="text-white">Competitive Odds:</strong> As one of the online betting websites in India, Powerplay provides a competitive edge by offering a fair price for your bets, boosting your chances of winning.</li>
          <li><strong className="text-white">Secure and Reliable:</strong> Security and Trust: Bet on trust knowing that your business and data are safe.</li>
          <li><strong className="text-white">Exclusive Bonuses and Promotions:</strong> Earn ongoing bonuses and promotions.</li>
          <li><strong className="text-white">24/7 Customer Support:</strong> Get support around the clock for a hassle-free experience.</li>
          <li><strong className="text-white">Convenient Mobile Betting:</strong> You can bet anytime and anywhere with the best online betting app in India.</li>
        </ul>

        <h4 className="font-bold text-white mb-2">How to register to Powerplay? Best online betting sites in India!</h4>
        <div className="space-y-1 mb-4">
          <p><strong className="text-white">Step 1: Go to the Powerplay website:</strong> Check out the Powerplay website. https://powerplay.club<br/>App: Install the Powerplay app and launch from Google App.</p>
          <p><strong className="text-white">Step 2: Register.</strong> https://powerplay.club/signup<br/>Press or click the "Sign Up" or "Register" button.</p>
          <p><strong className="text-white">Step 3: Enter your profile.</strong> Enter your phone number, username and password.</p>
          <p><strong className="text-white">Step 4: Check your identity.</strong> Phone: Enter the SMS code (OTP) if necessary.</p>
          <p><strong className="text-white">Step 5: Embrace the information.</strong> Check the box if you agree to the terms and conditions.</p>
          <p><strong className="text-white">Step 6: Complete registration.</strong> Click "Submit" or "Register" to complete.</p>
          <p><strong className="text-white">Step 7: Deposit the money.</strong> Go in and make your first deposit.</p>
          <p><strong className="text-white">Step 8: Claim your bonus.</strong> Take your welcome bonus.</p>
          <p><strong className="text-white">Step 9: Start playing!</strong> Explore and enjoy Powerplay games and betting options.<br/>That’s it! You’re ready to enjoy Powerplay on both the website and the app.</p>
        </div>

        <h4 className="font-bold text-white mb-2">Powerplay: Top Online Betting Site in India with the Best Bonuses</h4>
        <ul className="list-disc pl-5 mb-4 space-y-1">
          <li><strong className="text-white">Deposit Bonus:</strong> Get a 5% bonus on all deposits. The norms and regulations apply.</li>
          <li><strong className="text-white">Associated partners:</strong> Becoming an Affiliate Partner allows you to receive a large compensation for marketing Powerplay.</li>
          <li><strong className="text-white">VIP panel:</strong> Pass the VIP level to gain access to unique incentives and premium services as a VIP member. Enjoy these fantastic perks and prizes at Powerplay!</li>
        </ul>

        <h4 className="font-bold text-white mb-2">What Is Online Sports Betting?</h4>
        <p className="mb-4">Online sports betting allows you to digitally bet on the outcome of sporting events. Instead of going to an actual bookmaker, you can use a computer or smartphone to bet on your favorite sports, teams, or players from the comfort of your home Bookmakers can choose from cricket, football, basketball, and many other sports, with bets such as winning predictions, overall scores, or individual player performance</p>

        <h4 className="font-bold text-white mb-2">What are Casino Games?</h4>
        <p className="mb-4">Casino games are a type of gambling game that can be played online, giving players the chance to win while enjoying the thrill of the game. These games include classic games like slots, blackjack, roulette and poker, as well as new games that players love. Online casinos bring the fun of a traditional casino to your smartphone, allowing you to play from any location at any time.</p>

        <h4 className="font-bold text-white mb-2">Conclusion:</h4>
        <p>If you want to play the greatest online casino games, Powerplay is the place to go. Powerplay provides a superior gambling experience with games from renowned Providers such as Spribe, Evolution, Supernova, and RTG Slots. Whether you love slots, live dealer games, classic table games or sports betting, Powerplay has everything you need for an enjoyable and lucrative online gambling experience. Play Now</p>
      </AccordionItem>
      
      <AccordionItem title="Powerplay Frequently Asked Questions (FAQ)">
        <div className="space-y-4">
          <div>
            <strong className="text-white block mb-1">1. Why is Powerplay one of the best online betting sites in India?</strong>
            <p>Powerplay stands out for its user-friendly interface, diverse range of games, secure transactions, and the option to bet with Crypto making it a top choice for Indian players.</p>
          </div>
          <div>
            <strong className="text-white block mb-1">2. Can I bet on cricket and other sports on Powerplay?</strong>
            <p>Yes, Powerplay offers betting options on cricket and a wide range of other sports, making it a great platform for sports enthusiasts.</p>
          </div>
          <div>
            <strong className="text-white block mb-1">3. What types of online betting games can I play on Powerplay?</strong>
            <p>On Powerplay, you can enjoy a variety of online betting games, including casino games like Roulette, Teen Patti, and Blackjack, and sports betting on popular events like IPL and BBL.</p>
          </div>
          <div>
            <strong className="text-white block mb-1">4. Is online betting legal in India, and can I do it on Powerplay?</strong>
            <p>Yes, online betting is legal in many parts of India, and you can safely place bets on Powerplay, which operates within legal guidelines.</p>
          </div>
          <div>
            <strong className="text-white block mb-1">5. How can I start playing online casino games in India with Powerplay?</strong>
            <p>To start playing on Powerplay, simply sign up for an account, deposit funds using INR, and choose from a variety of online casino games available.</p>
          </div>
          <div>
            <strong className="text-white block mb-1">6. Can I ever win in an online casino?</strong>
            <p>Yes, you can win in an online casino, but outcomes are based on chance, and games are designed with a house edge, so it's important to play responsibly.</p>
          </div>
          <div>
            <strong className="text-white block mb-1">7. Is online casino games a skill or luck?</strong>
            <p>Online casino games are generally based on luck, though some games like poker or blackjack may involve elements of skill.</p>
          </div>
          <div>
            <strong className="text-white block mb-1">8. Do online casinos pay real money?</strong>
            <p>Yes, online casinos can pay real money if you win, but it's essential to play on licensed and reputable platforms like Powerplay for secure transactions.</p>
          </div>
          <div>
            <strong className="text-white block mb-1">9. How does Powerplay keep my betting safe?</strong>
            <p>Powerplay ensures safe betting by using advanced encryption technology, secure payment gateways, and adhering to strict regulatory standards for user protection.</p>
          </div>
        </div>
      </AccordionItem>
    </section>
  );
}
