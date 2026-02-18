'use client';

import { useEffect, useRef, useState } from 'react';

const links = [
  { label: 'Home',    href: '#hero' },
  { label: 'Demo',    href: '#demo' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop]     = useState(true);
  const [open, setOpen]       = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      if (open) return; // don't hide while menu is open
      const y = window.scrollY;
      const delta = y - lastY.current;
      setAtTop(y < 40);
      if (Math.abs(delta) > 6) {
        setVisible(y < 40 || delta < 0);
        lastY.current = y;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open]);

  // lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const scrollTo = (href: string) => {
    setOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 320); // let menu close first
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=DM+Mono:wght@300;400&display=swap');

        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          pointer-events: none;
          transform: translateY(0);
          transition: transform 0.65s cubic-bezier(0.16,1,0.3,1),
                      opacity  0.65s cubic-bezier(0.16,1,0.3,1);
        }
        .nav.hidden {
          transform: translateY(-140%);
          opacity: 0;
        }

        /* ── HAIRLINE ROW ───────────────────────────────────────────── */
        .nav-inner {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 34px clamp(1.5rem, 5vw, 5rem);
          pointer-events: none;
        }
        .nav-inner::before {
          content: '';
          position: absolute;
          top: 50%;
          left: clamp(1.5rem, 5vw, 5rem);
          right: clamp(1.5rem, 5vw, 5rem);
          height: 1px;
          background: rgba(255,255,255,0.18);
          transform: translateY(-50%);
          transition: background 0.4s;
        }
        .nav-inner.dark-line::before {
          background: rgba(0,0,0,0.14);
        }

        /* ── LOGO ───────────────────────────────────────────────────── */
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 9px;
          cursor: pointer;
          pointer-events: all;
          position: relative;
          z-index: 1;
          padding: 7px 16px 7px 10px;
          background: rgba(14,14,15,0.58);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 2px;
          transition: background 0.25s;
          text-decoration: none;
        }
        .nav-logo:hover { background: rgba(14,14,15,0.8); }
        .nav-logo-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #D97706;
          box-shadow: 0 0 7px 1px rgba(217,119,6,0.75);
          animation: navPulse 2.4s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes navPulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.35; transform:scale(0.8); }
        }
        .nav-logo-text {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #ffffff;
          line-height: 1;
        }
        .nav-logo-text em {
          font-style: normal;
          color: #D97706;
        }

        /* ── CENTER LINKS ───────────────────────────────────────────── */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 0;
          list-style: none;
          margin: 0; padding: 0;
          position: relative;
          z-index: 1;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 2px;
          overflow: hidden;
          pointer-events: all;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          background: rgba(14,14,15,0.58);
        }
        .nav-link {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          cursor: pointer;
          padding: 11px 26px;
          position: relative;
          transition: color 0.18s, background 0.18s;
          white-space: nowrap;
        }
        .nav-link + .nav-link::before {
          content: '';
          position: absolute;
          left: 0; top: 25%; bottom: 25%;
          width: 1px;
          background: rgba(255,255,255,0.08);
        }
        .nav-link:hover { color: #ffffff; background: rgba(255,255,255,0.05); }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 20%; right: 20%;
          height: 1px;
          background: #D97706;
          transform: scaleX(0);
          transition: transform 0.22s cubic-bezier(0.4,0,0.2,1);
        }
        .nav-link:hover::after { transform: scaleX(1); }

        /* ── CTA ────────────────────────────────────────────────────── */
        .nav-cta {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 28px 10px 20px;
          background: #D97706;
          border: none;
          border-radius: 2px;
          cursor: pointer;
          pointer-events: all;
          position: relative;
          z-index: 1;
          transition: background 0.18s, transform 0.14s;
          clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%);
        }
        .nav-cta:hover  { background: #B45309; transform: translateY(-1px); }
        .nav-cta:active { transform: translateY(0); }
        .nav-cta-text {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #fff;
          white-space: nowrap;
        }

        /* ── HAMBURGER BUTTON ───────────────────────────────────────── */
        .nav-burger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 38px; height: 38px;
          padding: 8px;
          background: rgba(14,14,15,0.58);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 2px;
          cursor: pointer;
          pointer-events: all;
          position: relative;
          z-index: 110;
          transition: background 0.2s;
        }
        .nav-burger:hover { background: rgba(14,14,15,0.85); }

        .nav-burger-bar {
          display: block;
          width: 100%;
          height: 1px;
          background: #ffffff;
          transform-origin: center;
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1),
                      opacity   0.3s ease,
                      width     0.3s ease;
        }
        /* X state */
        .nav-burger.is-open .nav-burger-bar:nth-child(1) {
          transform: translateY(6px) rotate(45deg);
        }
        .nav-burger.is-open .nav-burger-bar:nth-child(2) {
          opacity: 0;
          width: 0;
        }
        .nav-burger.is-open .nav-burger-bar:nth-child(3) {
          transform: translateY(-6px) rotate(-45deg);
        }

        /* ── MOBILE FULLSCREEN MENU ─────────────────────────────────── */
        .nav-mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 105;
          background: #0e0e0f;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 clamp(2rem, 8vw, 4rem);
          pointer-events: all;

          /* closed state */
          clip-path: inset(0 0 100% 0);
          transition: clip-path 0.55s cubic-bezier(0.16,1,0.3,1);
        }
        .nav-mobile-menu.is-open {
          clip-path: inset(0 0 0% 0);
        }

        /* amber top border accent */
        .nav-mobile-menu::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(to right, #D97706, #B45309);
        }

        .nav-mobile-links {
          list-style: none;
          margin: 0; padding: 0;
          display: flex;
          flex-direction: column;
        }
        .nav-mobile-link {
          font-family: 'Inter', sans-serif;
          font-size: clamp(2.8rem, 11vw, 5rem);
          font-weight: 900;
          letter-spacing: -0.04em;
          color: rgba(255,255,255,0.15);
          cursor: pointer;
          padding: 0.15em 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: color 0.22s;
          line-height: 1.1;
        }
        .nav-mobile-link:first-child { border-top: 1px solid rgba(255,255,255,0.06); }
        .nav-mobile-link:hover { color: #ffffff; }
        .nav-mobile-link:active { color: #D97706; }

        .nav-mobile-link-arr {
          font-size: 0.35em;
          font-family: 'DM Mono', monospace;
          font-weight: 300;
          letter-spacing: 0.2em;
          opacity: 0;
          transition: opacity 0.18s;
          color: #D97706;
        }
        .nav-mobile-link:hover .nav-mobile-link-arr { opacity: 1; }

        /* staggered entry for links */
        .nav-mobile-link:nth-child(1) { transition-delay: 0.05s; }
        .nav-mobile-link:nth-child(2) { transition-delay: 0.1s;  }
        .nav-mobile-link:nth-child(3) { transition-delay: 0.15s; }

        .nav-mobile-footer {
          position: absolute;
          bottom: clamp(2rem, 6vh, 3.5rem);
          left: clamp(2rem, 8vw, 4rem);
          right: clamp(2rem, 8vw, 4rem);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-mobile-footer-text {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          font-weight: 300;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.22);
        }
        .nav-mobile-cta {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 28px 11px 20px;
          background: #D97706;
          border: none;
          border-radius: 2px;
          cursor: pointer;
          clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%);
          transition: background 0.18s;
        }
        .nav-mobile-cta:hover  { background: #B45309; }
        .nav-mobile-cta-text {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: #fff;
        }

        /* ── RESPONSIVE ─────────────────────────────────────────────── */
        @media (max-width: 640px) {
          .nav-links { display: none; }
          .nav-cta   { display: none; }
          .nav-burger { display: flex; }
          .nav-inner { padding: 28px clamp(1.25rem, 5vw, 2rem); }
          .nav-inner::before {
            left: clamp(1.25rem, 5vw, 2rem);
            right: clamp(1.25rem, 5vw, 2rem);
          }
        }
      `}</style>

      {/* ── MAIN NAV BAR ─────────────────────────────────────────────── */}
      <nav className={`nav${visible ? '' : ' hidden'}`}>
        <div className={`nav-inner${atTop ? '' : ' dark-line'}`}>

          <a className="nav-logo" onClick={() => scrollTo('#hero')}>
            <div className="nav-logo-dot" />
            <span className="nav-logo-text">fl<em>AR</em>eo</span>
          </a>

          <ul className="nav-links">
            {links.map(link => (
              <li key={link.label} className="nav-link" onClick={() => scrollTo(link.href)}>
                {link.label}
              </li>
            ))}
          </ul>

          <button className="nav-cta" onClick={() => scrollTo('#contact')}>
            <span className="nav-cta-text">Get Started</span>
          </button>

          {/* Hamburger — mobile only */}
          <button
            className={`nav-burger${open ? ' is-open' : ''}`}
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className="nav-burger-bar" />
            <span className="nav-burger-bar" />
            <span className="nav-burger-bar" />
          </button>

        </div>
      </nav>

      {/* ── MOBILE FULLSCREEN MENU ─────────────────────────────────────── */}
      <div className={`nav-mobile-menu${open ? ' is-open' : ''}`}>
        <ul className="nav-mobile-links">
          {links.map(link => (
            <li key={link.label} className="nav-mobile-link" onClick={() => scrollTo(link.href)}>
              {link.label}
              <span className="nav-mobile-link-arr">↗</span>
            </li>
          ))}
        </ul>

        <div className="nav-mobile-footer">
          <span className="nav-mobile-footer-text">flAReo — AR for everyone</span>
          <button className="nav-mobile-cta" onClick={() => scrollTo('#contact')}>
            <span className="nav-mobile-cta-text">Get Started</span>
          </button>
        </div>
      </div>
    </>
  );
}