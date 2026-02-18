'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Contact() {
  const sectionRef   = useRef<HTMLElement>(null);
  const darkPanelRef = useRef<HTMLDivElement>(null);
  const headlineRef  = useRef<HTMLDivElement>(null);
  const formBlockRef = useRef<HTMLDivElement>(null);
  const metaRef      = useRef<HTMLDivElement>(null);
  const taglineRef   = useRef<HTMLDivElement>(null);
  const footerRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section   = sectionRef.current;
    const darkPanel = darkPanelRef.current;
    const headline  = headlineRef.current;
    const formBlock = formBlockRef.current;
    const meta      = metaRef.current;
    const tagline   = taglineRef.current;
    const footer    = footerRef.current;

    if (!section || !darkPanel || !headline || !formBlock || !meta || !tagline || !footer) return;

    const isMobile = window.innerWidth < 768;

    // ── INITIAL STATE ─────────────────────────────────────────────────────────
    // Dark panel starts fully below
    gsap.set(darkPanel, { top: '100%' });

    // Headline: big, centered on the light bg
    gsap.set(headline, {
      top: '50%',
      left: isMobile ? '5%' : '8%',
      yPercent: -50,
      width: isMobile ? '90%' : '80%',
    });

    // Everything inside dark panel hidden
    gsap.set(formBlock, { opacity: 0, y: 24 });
    gsap.set(meta,      { opacity: 0, y: 16 });
    gsap.set(tagline,   { opacity: 0 });
    gsap.set(footer,    { opacity: 0 });

    // ── MASTER TIMELINE ───────────────────────────────────────────────────────
    const darkStop = isMobile ? '52%' : '38%';

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 2,
        end: '+=280%',
      },
    });

    tl
      // Dark panel rises
      .to(darkPanel, {
        top: darkStop,
        ease: 'power3.inOut',
        duration: 1,
      }, 0)
      // Headline floats up, stays on light bg
      .to(headline, {
        top: isMobile ? '13%' : '11%',
        yPercent: 0,
        ease: 'power3.inOut',
        duration: 1,
      }, 0)
      // Tagline fades in just above dark boundary
      .to(tagline, { opacity: 1, duration: 0.35 }, 0.5)
      // Content inside dark panel fades in
      .to(meta,      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, 0.85)
      .to(formBlock, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, 0.95)
      .to(footer,    { opacity: 1, duration: 0.35 }, 1.4);

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        .ct * { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── LIGHT BACKGROUND SECTION ──────────────────────────────── */
        .ct-section {
          position: relative;
          width: 100%;
          height: 100vh;
          background: #f5f2ee;
          overflow: hidden;
          font-family: 'Inter', system-ui, sans-serif;
        }
        .ct-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 75% 20%, rgba(217,119,6,0.06) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }

        /* ── DARK PANEL rises from below ───────────────────────────── */
        .ct-dark {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          background: #0e0e0f;
          z-index: 2;
          overflow: hidden;
        }
        .ct-dark::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at 60% 0%,  rgba(217,119,6,0.07) 0%, transparent 50%),
            radial-gradient(ellipse at 10% 100%, rgba(217,119,6,0.04) 0%, transparent 40%);
          pointer-events: none;
        }

        /* ── HEADLINE — lives on light bg ──────────────────────────── */
        .ct-headline {
          position: absolute;
          z-index: 3;
        }
        .ct-eyebrow {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #D97706;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 1.3rem;
        }
        .ct-eyebrow::before {
          content: '';
          display: block;
          width: 20px; height: 1px;
          background: #D97706;
          flex-shrink: 0;
        }
        .ct-h1 {
          font-size: clamp(3rem, 6vw, 8rem);
          font-weight: 900;
          line-height: 0.93;
          letter-spacing: -0.04em;
          color: #0e0e0f;
          display: block;
        }
        .ct-h1-accent {
          font-size: clamp(3rem, 6vw, 8rem);
          font-weight: 900;
          line-height: 0.93;
          letter-spacing: -0.04em;
          color: #D97706;
          display: block;
        }

        /* tagline just above dark boundary */
        .ct-tagline {
          position: absolute;
          z-index: 3;
          bottom: calc(62% + 20px);
          right: 8%;
          text-align: right;
        }
        .ct-tagline p {
          font-size: 11px;
          font-weight: 600;
          color: rgba(0,0,0,0.65);
          letter-spacing: 0.04em;
          line-height: 1.75;
        }

        /* ── META — left col inside dark panel ─────────────────────── */
        .ct-meta {
          position: absolute;
          z-index: 4;
          left: 8%;
          top: calc(38% + 3rem);
          width: 26%;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          bottom: 60px;
        }

        .ct-meta-label {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .ct-meta-label::before {
          content: '';
          display: block;
          width: 14px; height: 1px;
          background: rgba(255,255,255,0.45);
        }
        .ct-links { display: flex; flex-direction: column; }
        .ct-link {
          font-size: clamp(0.88rem, 1.1vw, 1rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #ffffff;
          text-decoration: none;
          padding: 11px 0;
          border-bottom: 1px solid rgba(255,255,255,0.12);
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          transition: color 0.18s;
        }
        .ct-link:first-child { border-top: 1px solid rgba(255,255,255,0.12); }
        .ct-link:hover { color: #D97706; }
        .ct-link-arr {
          font-size: 13px;
          opacity: 0.45;
          transition: opacity 0.18s, transform 0.18s;
        }
        .ct-link:hover .ct-link-arr { opacity: 1; transform: translate(3px,-3px); }

        .ct-info { display: flex; flex-direction: column; gap: 0.45rem; }
        .ct-info-row {
          font-size: 11px;
          font-weight: 400;
          color: rgba(255,255,255,0.58);
        }
        .ct-info-row strong { color: #ffffff; font-weight: 700; }

        /* ── FORM — right col inside dark panel ─────────────────────── */
        .ct-form {
          position: absolute;
          z-index: 4;
          right: 8%;
          width: 38%;
          top: calc(38% + 3rem);
          bottom: 60px;
          display: flex;
          flex-direction: column;
        }

        .ct-form-eyebrow {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          margin-bottom: 1.8rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .ct-form-eyebrow::before {
          content: '';
          display: block;
          width: 14px; height: 1px;
          background: rgba(255,255,255,0.45);
        }

        .ct-field {
          border-bottom: 1px solid rgba(255,255,255,0.09);
          display: flex;
          flex-direction: column;
        }
        .ct-field-lbl {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          padding: 16px 0 5px;
        }
        .ct-input {
          background: transparent;
          border: none;
          outline: none;
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.95rem, 1.15vw, 1.05rem);
          font-weight: 600;
          letter-spacing: -0.02em;
          color: #ffffff;
          padding: 4px 0 14px;
          width: 100%;
          caret-color: #D97706;
        }
        .ct-input::placeholder  { color: rgba(255,255,255,0.18); font-weight: 400; }
        .ct-textarea {
          background: transparent;
          border: none;
          outline: none;
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.95rem, 1.15vw, 1.05rem);
          font-weight: 600;
          letter-spacing: -0.02em;
          color: #ffffff;
          padding: 4px 0 14px;
          width: 100%;
          resize: none;
          height: 72px;
          caret-color: #D97706;
        }
        .ct-textarea::placeholder { color: rgba(255,255,255,0.18); font-weight: 400; }

        .ct-submit-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          padding-top: 2rem;
        }
        .ct-btn {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 15px 26px;
          background: #D97706;
          border: none;
          border-radius: 2px;
          cursor: pointer;
          transition: background 0.18s, transform 0.14s;
        }
        .ct-btn:hover  { background: #B45309; transform: translateY(-1px); }
        .ct-btn:active { transform: translateY(0); }
        .ct-btn-text {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #fff;
        }
        .ct-btn-arrow {
          width: 22px; height: 1px;
          background: rgba(255,255,255,0.6);
          position: relative;
          transition: width 0.18s;
        }
        .ct-btn:hover .ct-btn-arrow { width: 30px; }
        .ct-btn-arrow::after {
          content: '';
          position: absolute;
          right: -1px; top: -3px;
          width: 7px; height: 7px;
          border-top: 1px solid rgba(255,255,255,0.6);
          border-right: 1px solid rgba(255,255,255,0.6);
          transform: rotate(45deg);
        }
        .ct-privacy {
          font-size: 10px;
          font-weight: 400;
          color: rgba(255,255,255,0.2);
          letter-spacing: 0.04em;
        }

        /* ── FOOTER inside dark panel ───────────────────────────────── */
        .ct-footer {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px clamp(1.5rem, 4vw, 3rem);
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .ct-footer-txt {
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.18);
        }
        .ct-footer-center {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .ct-footer-sep {
          width: 1px; height: 10px;
          background: rgba(255,255,255,0.08);
        }

        /* ── MOBILE ─────────────────────────────────────────────────── */
        @media (max-width: 767px) {
          .ct-tagline { bottom: calc(48% + 16px); left: 5%; }
          .ct-meta    { display: none; }
          .ct-form {
            left: 5%; right: 5%; width: 90%;
            top: calc(52% + 1.5rem);
          }
          .ct-footer-center { display: none; }
        }

        @media (max-width: 1024px) and (min-width: 768px) {
          .ct-meta { width: 30%; left: 5%; }
          .ct-form { width: 44%; right: 5%; }
        }
      `}</style>

      <section id="contact" ref={sectionRef} className="ct ct-section">

        {/* ── HEADLINE on light bg ─────────────────────────────────── */}
        <div ref={headlineRef} className="ct-headline">
          <p className="ct-eyebrow">Get Started</p>
          <span className="ct-h1">Your Catalog,</span>
          <span className="ct-h1-accent">In AR Today.</span>
        </div>

        {/* ── TAGLINE above dark boundary ───────────────────────────── */}
        <div ref={taglineRef} className="ct-tagline">
          <p>From product photo to live AR in 48 hours.<br />No engineers. No guesswork. Just results.</p>
        </div>

        {/* ── DARK PANEL rises from bottom ──────────────────────────── */}
        <div ref={darkPanelRef} className="ct-dark" />

        {/* ── META — left col, z above dark panel ───────────────────── */}
        <div ref={metaRef} className="ct-meta">
          <div>
            <p className="ct-meta-label">Contact</p>
            <div className="ct-links">
              <a className="ct-link">hello@flareo.com<span className="ct-link-arr">↗</span></a>
              <a className="ct-link">LinkedIn<span className="ct-link-arr">↗</span></a>
              <a className="ct-link">Twitter / X<span className="ct-link-arr">↗</span></a>
            </div>
          </div>
          <div>
            <p className="ct-meta-label">What to Expect</p>
            <div className="ct-info">
              <p className="ct-info-row"><strong>Under 24 hrs</strong> — first reply</p>
              <p className="ct-info-row"><strong>48 hrs</strong> — first AR model live</p>
              <p className="ct-info-row"><strong>No credit card</strong> required</p>
            </div>
          </div>
        </div>

        {/* ── FORM — right col, z above dark panel ──────────────────── */}
        <div ref={formBlockRef} className="ct-form">
          <p className="ct-form-eyebrow">Send a Message</p>

          <div className="ct-field">
            <label className="ct-field-lbl">Name</label>
            <input className="ct-input" type="text" placeholder="Your full name" />
          </div>
          <div className="ct-field">
            <label className="ct-field-lbl">Email</label>
            <input className="ct-input" type="email" placeholder="you@company.com" />
          </div>
          <div className="ct-field">
            <label className="ct-field-lbl">Message</label>
            <textarea className="ct-textarea" placeholder="Tell us about your catalog..." />
          </div>

          <div className="ct-submit-row">
            <button className="ct-btn">
              <span className="ct-btn-text">Get Started</span>
              <div className="ct-btn-arrow" />
            </button>
            <span className="ct-privacy">No spam. Ever.</span>
          </div>
        </div>

        {/* ── FOOTER inside dark panel ──────────────────────────────── */}
        <div ref={footerRef} className="ct-footer">
          <span className="ct-footer-txt">© 2025 flAReo</span>
          <div className="ct-footer-center">
            <span className="ct-footer-txt">Privacy</span>
            <div className="ct-footer-sep" />
            <span className="ct-footer-txt">Terms</span>
            <div className="ct-footer-sep" />
            <span className="ct-footer-txt">Made with AI</span>
          </div>
          <span className="ct-footer-txt">AR for everyone.</span>
        </div>

      </section>
    </>
  );
}