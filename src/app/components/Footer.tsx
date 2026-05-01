import React from 'react';

/* ─── Footer ──────────────────────────────────────────────────────────────
 * Mobile-first footer matching the original PowerPlay site (img5):
 *  - Logo + green description text
 *  - "100% Safe & Instant Payments" section
 *  - Payment icons (18+, gamecare, gt)
 *  - DOWNLOAD APP button (outlined blue)
 *  - "Accepted Modes Of Payments" + payment logos image
 *  - Telegram + Whatsapp social links
 *  - Pipe-separated footer links
 *  - Copyright centered
 */

const PaymentBadge = ({ src, alt, h }: { src: string; alt: string; h: number }) => (
  <img
    src={src}
    alt={alt}
    style={{ height: `${h}px`, objectFit: 'contain', mixBlendMode: 'screen' }}
  />
);

export function Footer() {
  return (
    <footer style={{
      width: '100%',
      marginTop: '24px',
      background: 'transparent',
      fontFamily: "'Outfit', sans-serif",
      paddingBottom: '70px', /* space for mobile bottom nav */
    }}>
      <div style={{
        width: '100%',
        maxWidth: '480px',
        margin: '0 auto',
        padding: '0 12px',
        boxSizing: 'border-box',
      }}>

        {/* ── Main block ── */}
        <div style={{
          background: '#292B30',
          borderRadius: '15px 15px 0 0',
          padding: '20px 16px 0',
          borderBottom: '1px solid #414141',
        }}>

          {/* Logo */}
          <div style={{ marginBottom: '14px', display: 'flex', justifyContent: 'flex-start' }}>
            <img
              src="/logo/logo.png"
              alt="PowerPlay"
              style={{ height: '30px', objectFit: 'contain' }}
            />
          </div>

          {/* Description — GREEN text matching original */}
          <p style={{
            color: '#A39C9C',
            fontSize: '12px',
            lineHeight: '1.65',
            margin: '0 0 6px 0',
          }}>
            <a href="javascript:void(0)" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600 }}>Powerplay</a>
            {' is the best platform for live and uninterrupted online betting for sports, Live 24hr betting with a wide spectrum of sports such as Cricket, Soccer, Horse Racing, Kabaddi, '}
            <a href="javascript:void(0)" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600 }}>Aviator Predictor</a>
            {', Hockey, Basketball, '}
            <a href="javascript:void(0)" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600 }}>Andar Bahar Game</a>
            {' and many more. Powerplay is a resourceful online betting provider with competitive odds on in-play and upcoming matches. Popular casino games like Blackjack, Po'}
          </p>
          <div style={{ marginBottom: '20px' }}>
            <span style={{ color: '#516dfd', fontWeight: 700, fontSize: '12px', cursor: 'pointer', textTransform: 'uppercase' }}>
              READ MORE
            </span>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: '#414141', margin: '0 -16px 20px' }} />

          {/* 100% Safe & Instant Payments */}
          <div style={{ marginBottom: '16px', textAlign: 'center' }}>
            <h4 style={{
              color: '#516dfd',
              fontSize: '15px',
              fontWeight: 700,
              margin: '0 0 10px 0',
              letterSpacing: '0.02em',
            }}>
              100% Safe &amp; Instant payments
            </h4>
            <p style={{ color: '#A39C9C', fontSize: '12px', lineHeight: '1.65', margin: '0 0 14px 0' }}>
              You can make payments and receive earnings instantly via your UPI ID — so you can be sure that your money is safe and secure. All UPI platforms are accepted.
            </p>

            {/* Trust badges */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
              <PaymentBadge src="https://ik.imagekit.io/sitecdn/content/assets/images/18plus.png" alt="18+" h={32} />
              <PaymentBadge src="https://ik.imagekit.io/sitecdn/content/assets/images/gamecare.png" alt="GameCare" h={16} />
              <PaymentBadge src="https://ik.imagekit.io/sitecdn/content/assets/images/gt.png" alt="GT" h={24} />
            </div>

            {/* DOWNLOAD APP button */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
              <a
                href="javascript:void(0)"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 28px',
                  border: '1.5px solid #516dfd',
                  color: '#516dfd',
                  fontSize: '12px',
                  fontWeight: 700,
                  borderRadius: '4px',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  letterSpacing: '0.05em',
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                </svg>
                DOWNLOAD APP
              </a>
            </div>

            {/* Responsible gambling */}
            <p style={{ color: '#516dfd', fontSize: '11px', fontWeight: 500, margin: '0 0 16px 0', textAlign: 'center' }}>
              Gambling can be addictive, please play responsibly
            </p>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: '#414141', margin: '0 -16px 20px' }} />

          {/* Accepted Modes Of Payments */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h4 style={{
              color: '#516dfd',
              fontSize: '14px',
              fontWeight: 700,
              margin: '0 0 12px 0',
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
            }}>
              Accepted Modes Of Payments
            </h4>
            <img
              src="https://ik.imagekit.io/sitecdn/content/assets/images/footer-payment.webp"
              alt="Payment Methods"
              style={{ width: '100%', maxWidth: '300px', height: 'auto', mixBlendMode: 'screen' }}
            />
          </div>
        </div>

        {/* ── Social links + footer links ── */}
        <div style={{
          background: '#292B30',
          padding: '14px 16px',
          borderBottom: '1px solid #414141',
        }}>
          {/* Social links */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '28px',
            marginBottom: '14px',
          }}>
            <a href="javascript:void(0)" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#A39C9C', fontSize: '13px', fontWeight: 500, textDecoration: 'none' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="15" viewBox="0 0 18 15" fill="none">
                <path d="M16.785 0.0986285L0.840489 6.20002C-0.247661 6.6423 -0.241365 7.24547 0.640845 7.51444L4.73445 8.78332L14.2058 2.84549C14.6537 2.57473 15.0629 2.72039 14.7265 3.01706L7.05283 9.8985H7.05104L7.05283 9.8994L6.77045 14.0921C7.18413 14.0921 7.36669 13.9035 7.59871 13.681L9.58705 11.7598L13.7229 14.7953C14.4855 15.2126 15.0332 14.9982 15.2229 14.0939L17.9379 1.38002C18.2158 0.272876 17.5126 -0.228421 16.785 0.0986285V0.0986285Z" fill="#516dfd"/>
              </svg>
              Telegram
            </a>
            <a href="javascript:void(0)" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#A39C9C', fontSize: '13px', fontWeight: 500, textDecoration: 'none' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                <path d="M15.7286 3.93115C13.1856 -0.000129954 7.9937 -1.16889 3.96729 1.27488C0.0468473 3.71865 -1.22465 9.03119 1.31834 12.9625L1.53026 13.2812L0.682596 16.4687L3.93115 15.6187L4.17921 15.8312C5.55666 16.575 7.04008 17 8.52349 17C10.1129 17 11.7022 16.575 13.0797 15.725C17.0001 13.1812 18.1657 7.96868 15.7286 3.93115V3.93115ZM13.5035 12.1125C13.0797 12.75 12.5499 13.175 11.8082 13.2812C11.3844 13.2812 10.8546 13.4937 8.73541 12.6437C6.93412 11.7937 5.45071 10.4124 4.39113 8.81869C3.75538 8.07493 3.4375 7.11867 3.4375 6.16242C3.33155 5.20616 3.86134 4.35616 4.60259 3.8249C4.81452 3.71865 4.92043 3.6124 5.2382 3.6124C5.45013 3.6124 5.55604 3.6124 5.76796 3.6124C5.97989 3.6124 6.29777 3.71865 6.40368 4.03741C6.8275 5.09991 7.25132 6.05616 7.25132 6.26866C7.35722 6.48116 7.35722 6.69367 7.1453 7.01242C7.03939 7.11867 6.93348 7.22492 6.82757 7.33117C6.61565 7.54368 6.40373 7.75618 6.61565 8.18119C6.93353 8.71244 7.35735 9.24369 7.88673 9.77494C8.41611 10.1999 8.9455 10.6249 9.58125 10.9437C10.0051 11.1562 10.5349 11.05 10.7468 10.7312C10.9587 10.4124 11.2766 9.88118 11.5945 9.45618C11.8064 9.13743 12.1243 9.03118 12.4422 9.24368C12.9716 9.45618 14.5609 10.3062 14.7728 10.4124C14.9847 10.5187 15.0906 10.7312 15.1966 10.8375C15.1966 11.3687 14.8787 11.9004 13.5035 12.1125Z" fill="#516dfd"/>
              </svg>
              Whatsapp
            </a>
          </div>

          {/* Quick links — centered, pipe separated */}
          <div style={{ textAlign: 'center', lineHeight: 2 }}>
            <a href="javascript:void(0)" style={{ color: '#A39C9C', fontSize: '12px', textDecoration: 'none' }}>Responsible Gambling</a>
            <span style={{ color: '#555', fontSize: '12px', margin: '0 6px' }}>|</span>
            <a href="javascript:void(0)" style={{ color: '#A39C9C', fontSize: '12px', textDecoration: 'none' }}>Terms &amp; Condition</a>
            <span style={{ color: '#555', fontSize: '12px', margin: '0 6px' }}>|</span>
            <a href="javascript:void(0)" style={{ color: '#A39C9C', fontSize: '12px', textDecoration: 'none' }}>KYC Policy</a>
            <br />
            <a href="javascript:void(0)" style={{ color: '#A39C9C', fontSize: '12px', textDecoration: 'none' }}>Cricket Rules</a>
          </div>
        </div>

        {/* ── Copyright ── */}
        <div style={{
          background: '#292B30',
          borderRadius: '0 0 15px 15px',
          padding: '14px 16px 20px',
          textAlign: 'center',
          color: '#A39C9C',
          fontSize: '12px',
        }}>
          © Copyright 2010 - 2026 Powerplay
        </div>

      </div>
    </footer>
  );
}
