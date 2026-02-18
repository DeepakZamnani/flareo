// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// if (typeof window !== 'undefined') {
//   gsap.registerPlugin(ScrollTrigger);
// }

// import Particles from './Particles';

// const problems = [
//   {
//     id: 1,
//     title: 'Paper Catalogs',
//     subtitle: "Don't Convert",
//     stat: '2%',
//     label: 'click-through rate',
//     description: 'Traditional catalogs gather dust while customers shop online',
//   },
//   {
//     id: 2,
//     title: 'Traditional 3D',
//     subtitle: 'Costs a Fortune',
//     stat: '$2000',
//     label: 'per model',
//     description: '3D modeling agencies charge premium prices for basic furniture',
//   },
//   {
//     id: 3,
//     title: "Customers Can't",
//     subtitle: 'See It At Home',
//     stat: '67%',
//     label: 'abandon cart',
//     description: 'Without AR visualization, buyers hesitate and leave',
//   },
//   {
//     id: 4,
//     title: 'Development',
//     subtitle: 'Takes Forever',
//     stat: '6',
//     label: 'months timeline',
//     description: 'Building custom AR solutions drains time and resources',
//   },
// ];

// export default function HorizontalScroll() {
//   const sectionRef = useRef<HTMLElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const progressRef = useRef<HTMLDivElement>(null);
//   const [activeIndex, setActiveIndex] = useState(0);

//   useEffect(() => {
//     const section = sectionRef.current;
//     const container = containerRef.current;
//     const progress = progressRef.current;

//     if (!section || !container || !progress) return;

//     const cards = gsap.utils.toArray('.problem-card');

//     // Pin section and horizontal scroll
//     const scrollTween = gsap.to(cards, {
//       xPercent: -100 * (cards.length - 1),
//       ease: 'none',
//       scrollTrigger: {
//         trigger: section,
//         pin: true,
//         scrub: 1,
//         end: () => '+=' + container.offsetWidth,
//         onUpdate: (self) => {
//           // Update progress bar
//           gsap.to(progress, { scaleX: self.progress, duration: 0.1 });
          
//           // Update active index
//           const newIndex = Math.floor(self.progress * cards.length);
//           setActiveIndex(Math.min(newIndex, cards.length - 1));
//         },
//       },
//     });

//     // 3D rotation effect for each card
//     cards.forEach((card, index) => {
//       gsap.fromTo(
//         card as gsap.TweenTarget,
//         { rotationY: 15, opacity: 0.6 },
//         {
//           rotationY: 0,
//           opacity: 1,
//           scrollTrigger: {
//             trigger: section,
//             start: 'top top',
//             end: () => '+=' + container.offsetWidth,
//             scrub: 1,
//             onUpdate: (self) => {
//               const cardProgress = self.progress * cards.length - index;
//               const rotation = gsap.utils.interpolate(15, -15, cardProgress);
//               gsap.set(card as gsap.TweenTarget, { rotationY: rotation });
//             },
//           },
//         }
//       );
//     });

//     return () => {
//       ScrollTrigger.getAll().forEach((t) => t.kill());
//     };
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="relative h-screen w-full overflow-hidden bg-white "
//     >
//       {/* Particles Background */}
//       {/* <div className="absolute inset-0 z-0">
//         <Particles
//           particleColors={["#D97706", "#F59E0B", "#FBBF24"]}
//           particleCount={200}
//           particleSpread={10}
//           speed={0.1}
//           particleBaseSize={100}
//           moveParticlesOnHover
//           alphaParticles={false}
//           disableRotation={false}
//           pixelRatio={1}
//         />
//       </div> */}

//       {/* Progress Bar */}
//       <div className="absolute left-0 right-0 top-12 z-20 px-12 md:px-24">
//         <div className="flex items-center justify-between mb-6">
//           {problems.map((problem, index) => (
//             <div
//               key={problem.id}
//               className={`text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
//                 activeIndex === index ? 'text-amber-600 scale-110' : 'text-gray-400'
//               }`}
//             >
//               Problem {problem.id}
//             </div>
//           ))}
//         </div>
//         <div className="h-1 w-full overflow-hidden bg-gray-200">
//           <div
//             ref={progressRef}
//             className="h-full origin-left bg-gradient-to-r from-amber-500 to-amber-600"
//             style={{ transform: 'scaleX(0)' }}
//           />
//         </div>
//       </div>

//       {/* Horizontal Scroll Container */}
//       <div ref={containerRef} className="flex h-full items-center justify-center" style={{ perspective: '1000px' }}>
//         {problems.map((problem, index) => (
//           <div
//             key={problem.id}
//             className="problem-card relative flex h-full w-screen flex-shrink-0 items-center justify-center px-12 md:px-24 lg:px-32"
//             style={{ transformStyle: 'preserve-3d' }}
//           >
//             {/* Card Content */}
//             <div className="relative z-10 w-full max-w-3xl text-center">
//               {/* Title */}
//               <h2 className="mb-6 text-5xl font-light leading-tight text-gray-900 md:text-6xl lg:text-7xl">
//                 {problem.title}
//                 <br />
//                 <span className="font-semibold text-amber-600">{problem.subtitle}</span>
//               </h2>

//               {/* Animated Stat */}
//               <div className="mb-8 flex flex-col items-center gap-2 md:flex-row md:justify-center md:gap-4">
//                 <div className="text-6xl font-bold text-amber-600 md:text-7xl lg:text-8xl">
//                   <AnimatedStat
//                     value={problem.stat}
//                     isActive={activeIndex === index}
//                   />
//                 </div>
//                 <div className="text-lg text-gray-500 md:text-xl">{problem.label}</div>
//               </div>

//               {/* Description */}
//               <p className="text-lg leading-relaxed text-gray-600 md:text-xl lg:text-2xl">
//                 {problem.description}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Scroll Hint */}
//       <div className="absolute bottom-16 left-1/2 z-20 -translate-x-1/2 text-center">
//         <p className="mb-3 text-xs uppercase tracking-widest text-gray-500">Scroll to continue</p>
//         <div className="flex gap-2">
//           <div className="h-2 w-2 animate-pulse rounded-full bg-amber-500" style={{ animationDelay: '0s' }} />
//           <div className="h-2 w-2 animate-pulse rounded-full bg-amber-500" style={{ animationDelay: '0.2s' }} />
//           <div className="h-2 w-2 animate-pulse rounded-full bg-amber-500" style={{ animationDelay: '0.4s' }} />
//         </div>
//       </div>
//     </section>
//   );
// }

// // Animated stat counter component
// function AnimatedStat({ value, isActive }: { value: string; isActive: boolean }) {
//   const [displayValue, setDisplayValue] = useState(value);
//   const numberMatch = value.match(/\d+/);
//   const prefix = value.match(/^\D+/)?.[0] || '';
//   const suffix = value.match(/\D+$/)?.[0] || '';

//   useEffect(() => {
//     if (!isActive || !numberMatch) return;

//     const targetNumber = parseInt(numberMatch[0]);
//     const duration = 1500;
//     const steps = 60;
//     const increment = targetNumber / steps;
//     let current = 0;
//     let step = 0;

//     const timer = setInterval(() => {
//       step++;
//       current = Math.min(current + increment, targetNumber);
      
//       if (step >= steps) {
//         setDisplayValue(value);
//         clearInterval(timer);
//       } else {
//         setDisplayValue(`${prefix}${Math.floor(current)}${suffix}`);
//       }
//     }, duration / steps);

//     return () => clearInterval(timer);
//   }, [isActive, value, prefix, suffix, numberMatch]);

//   return <>{displayValue}</>;
// }
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const problems = [
  {
    id: '01',
    tag: 'THE CATALOG',
    title: 'Paper Catalogs',
    subtitle: "Don't Convert",
    stat: '2%',
    label: 'click-through rate',
    description: 'Traditional catalogs gather dust while customers scroll past competing brands.',
  },
  {
    id: '02',
    tag: 'THE COST',
    title: 'Traditional 3D',
    subtitle: 'Costs a Fortune',
    stat: '$2,000',
    label: 'per model',
    description: '3D modeling agencies charge premium prices for even the most basic furniture assets.',
  },
  {
    id: '03',
    tag: 'THE DOUBT',
    title: "Customers Can't",
    subtitle: 'See It at Home',
    stat: '67%',
    label: 'abandon cart',
    description: 'Without spatial context, buyers lose confidence and leave before purchasing.',
  },
  {
    id: '04',
    tag: 'THE TIMELINE',
    title: 'Development',
    subtitle: 'Takes Forever',
    stat: '6',
    label: 'months average',
    description: 'Building custom AR pipelines drains engineering budget and kills momentum.',
  },
];

export default function HorizontalScroll() {
  const sectionRef    = useRef<HTMLElement>(null);
  const imageRef      = useRef<HTMLDivElement>(null);
  const overlayRef    = useRef<HTMLDivElement>(null);
  const textWrapRef   = useRef<HTMLDivElement>(null);
  const progressRef   = useRef<HTMLDivElement>(null);
  const panelRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs       = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section   = sectionRef.current;
    const image     = imageRef.current;
    const overlay   = overlayRef.current;
    const textWrap  = textWrapRef.current;
    const progress  = progressRef.current;

    if (!section || !image || !overlay || !textWrap || !progress) return;

    // ─── INITIAL STATE (Phase 1: Split — text left, image right) ─────────────
    gsap.set(image, {
      left: '54%',
      top: '13%',
      width: '40%',
      height: '70%',
      borderRadius: '3px',
    });
    gsap.set(overlay, { opacity: 0 });
    gsap.set(textWrap, {
      left: '6%',
      top: '50%',
      yPercent: -50,
      width: '42%',
      xPercent: 0,
    });

    // Text panels: first visible, rest hidden
    panelRefs.current.forEach((el, i) => {
      if (el) gsap.set(el, { opacity: i === 0 ? 1 : 0 });
    });

    // ─── MASTER SCRUB TIMELINE ────────────────────────────────────────────────
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 2,
        end: '+=380%',
        onUpdate: (self) => {
          // Progress bar
          gsap.to(progress, { scaleX: self.progress, duration: 0.1, overwrite: true });

          // Active dot highlight
          const active = Math.min(Math.floor(self.progress * 4), 3);
          dotRefs.current.forEach((el, i) => {
            if (!el) return;
            gsap.to(el, {
              scaleX: i === active ? 1 : 0.35,
              opacity: i === active ? 1 : 0.3,
              duration: 0.25,
              overwrite: true,
            });
          });
        },
      },
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // PHASE 1 → 2 : Contained box EXPANDS → full-bleed backdrop   [t: 0 → 1]
    // Image floods the entire screen. Text centers, turns white.
    // ═══════════════════════════════════════════════════════════════════════════
    tl
      .to(image, {
        left: '0%', top: '0%', width: '100%', height: '100%',
        borderRadius: '0px',
        ease: 'power3.inOut',
        duration: 1,
      }, 0)
      .to(overlay, { opacity: 0.64, ease: 'power2.inOut', duration: 1 }, 0)
      .to(textWrap, {
        left: '50%',
        xPercent: -50,
        width: '50%',
        ease: 'power3.inOut',
        duration: 1,
      }, 0)
      .to(textWrap, { color: '#f5f5f5', duration: 0.6, ease: 'none' }, 0.1)

      // Panel crossfade 1 → 2
      .to(panelRefs.current[0], { opacity: 0, duration: 0.3 }, 0.1)
      .to(panelRefs.current[1], { opacity: 1, duration: 0.3 }, 0.7)

    // ═══════════════════════════════════════════════════════════════════════════
    // PHASE 2 → 3 : Full bleed COLLAPSES → left-edge bleed         [t: 1 → 2]
    // Image slams into the left as a tall slab. Text migrates right.
    // ═══════════════════════════════════════════════════════════════════════════
      .to(image, {
        left: '0%', top: '-8%', width: '38%', height: '118%',
        borderRadius: '0px',
        ease: 'power3.inOut',
        duration: 1,
      }, 1)
      .to(overlay, { opacity: 0.1, ease: 'power2.inOut', duration: 1 }, 1)
      .to(textWrap, {
        left: '45%',
        xPercent: 0,
        width: '48%',
        ease: 'power3.inOut',
        duration: 1,
      }, 1)
      .to(textWrap, { color: '#111112', duration: 0.5, ease: 'none' }, 1.1)

      // Panel crossfade 2 → 3
      .to(panelRefs.current[1], { opacity: 0, duration: 0.3 }, 1.1)
      .to(panelRefs.current[2], { opacity: 1, duration: 0.3 }, 1.7)

    // ═══════════════════════════════════════════════════════════════════════════
    // PHASE 3 → 4 : Left slab RETREATS → bottom-right portrait      [t: 2 → 3]
    // Image becomes an editorial portrait. Text anchors left, stat dominates.
    // ═══════════════════════════════════════════════════════════════════════════
      .to(image, {
        left: '64%', top: '24%', width: '28%', height: '56%',
        borderRadius: '2px',
        ease: 'power3.inOut',
        duration: 1,
      }, 2)
      .to(overlay, { opacity: 0, ease: 'power2.inOut', duration: 0.8 }, 2)
      .to(textWrap, {
        left: '6%',
        xPercent: 0,
        width: '54%',
        ease: 'power3.inOut',
        duration: 1,
      }, 2)

      // Panel crossfade 3 → 4
      .to(panelRefs.current[2], { opacity: 0, duration: 0.3 }, 2.1)
      .to(panelRefs.current[3], { opacity: 1, duration: 0.3 }, 2.7);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-white"
    >

      {/* ─── MORPHING IMAGE ─────────────────────────────────────────────── */}
      <div ref={imageRef} className="absolute z-10 overflow-hidden">
        {/* Premium placeholder — swap for <Image> with your AR render */}
        <div
          className="w-full h-full relative"
          style={{
            background: 'linear-gradient(145deg, #1c1917 0%, #27201b 45%, #3d1f06 100%)',
          }}
        >
          {/* Ambient glow */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 65% 38%, rgba(251,191,36,0.16) 0%, transparent 62%),' +
                'radial-gradient(ellipse at 18% 78%, rgba(180,83,9,0.22) 0%, transparent 52%)',
            }}
          />
          {/* Subtle grid texture */}
          <div
            className="absolute inset-0"
            style={{
              opacity: 0.055,
              backgroundImage:
                'linear-gradient(rgba(245,245,245,.9) 1px, transparent 1px),' +
                'linear-gradient(90deg, rgba(245,245,245,.9) 1px, transparent 1px)',
              backgroundSize: '56px 56px',
            }}
          />
          {/* Horizon line / floor plane */}
          <div
            className="absolute"
            style={{
              bottom: '22%', left: '10%', right: '10%',
              height: '1px',
              background: 'linear-gradient(to right, transparent, rgba(251,191,36,0.35), transparent)',
            }}
          />
          {/* Furniture silhouette suggestion */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
            style={{
              width: '60%',
              height: '42%',
              background:
                'linear-gradient(to top, rgba(251,191,36,0.09) 0%, transparent 100%)',
              borderTop: '1px solid rgba(251,191,36,0.18)',
            }}
          />
          {/* AR tag */}
          <div
            className="absolute top-5 left-5 flex items-center gap-2"
            style={{ opacity: 0.45 }}
          >
            <span
              className="block rounded-full"
              style={{ width: 6, height: 6, background: '#f59e0b', boxShadow: '0 0 8px #f59e0b' }}
            />
            <span
              className="text-xs font-mono tracking-widest"
              style={{ color: '#f59e0b', fontSize: '0.6rem' }}
            >
              AR READY
            </span>
          </div>
        </div>

        {/* Dark overlay — animated during full-bleed phase */}
        <div
          ref={overlayRef}
          className="absolute inset-0 z-10"
          style={{ background: '#0c0a09', opacity: 0 }}
        />
      </div>

      {/* ─── PROGRESS STRIP ─────────────────────────────────────────────── */}
      <div className="absolute left-0 right-0 top-8 z-30 px-10">
        <div className="flex items-center justify-between mb-4">
          {problems.map((p, i) => (
            <div key={p.id} className="flex items-center gap-2.5">
              <span
                ref={(el) => { dotRefs.current[i] = el; }}
                className="block origin-left"
                style={{
                  width: 28, height: 1,
                  background: '#1c1917',
                  opacity: i === 0 ? 1 : 0.3,
                  transform: `scaleX(${i === 0 ? 1 : 0.35})`,
                }}
              />
              <span
                className="text-xs font-mono tracking-[0.25em]"
                style={{ color: '#9ca3af' }}
              >
                {p.id}
              </span>
            </div>
          ))}
        </div>
        {/* Hairline progress */}
        <div className="w-full overflow-hidden" style={{ height: '1px', background: '#e5e7eb' }}>
          <div
            ref={progressRef}
            className="h-full origin-left"
            style={{ transform: 'scaleX(0)', background: '#d97706' }}
          />
        </div>
      </div>

      {/* ─── MORPHING TEXT CONTAINER ────────────────────────────────────── */}
      <div
        ref={textWrapRef}
        className="absolute z-20"
        style={{ color: '#111112' }}
      >
        {/* Fixed height so absolute panels stack */}
        <div style={{ position: 'relative', height: '62vh' }}>

          {problems.map((problem, index) => (
            <div
              key={problem.id}
              ref={(el) => { panelRefs.current[index] = el; }}
              className="absolute inset-0 flex flex-col justify-center"
              style={{ opacity: index === 0 ? 1 : 0 }}
            >
              {/* Eyebrow tag */}
              <p
                className="font-mono"
                style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.38em',
                  textTransform: 'uppercase',
                  opacity: 0.38,
                  marginBottom: '2rem',
                }}
              >
                PROBLEM {problem.id} — {problem.tag}
              </p>

              {/* Headline */}
              <h2
                style={{
                  fontSize: 'clamp(2rem, 3.8vw, 4.6rem)',
                  lineHeight: 1.06,
                  fontWeight: 300,
                  letterSpacing: '-0.025em',
                  margin: 0,
                }}
              >
                {problem.title}
              </h2>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 3.8vw, 4.6rem)',
                  lineHeight: 1.06,
                  fontWeight: 700,
                  letterSpacing: '-0.025em',
                  marginBottom: '2rem',
                }}
              >
                {problem.subtitle}
              </h2>

              {/* Hairline separator */}
              <div
                style={{
                  height: '1px',
                  background: 'currentColor',
                  opacity: 0.12,
                  marginBottom: '1.75rem',
                }}
              />

              {/* Stat */}
              <div className="flex items-baseline" style={{ gap: '1rem' }}>
                <span
                  style={{
                    fontSize:
                      index === 3
                        ? 'clamp(4.5rem, 8.5vw, 11rem)'
                        : 'clamp(3rem, 5.5vw, 7.5rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                  }}
                >
                  {problem.stat}
                </span>
                <span
                  style={{
                    fontSize: '0.7rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    opacity: 0.45,
                    paddingBottom: '0.5rem',
                  }}
                >
                  {problem.label}
                </span>
              </div>

              {/* Description */}
              <p
                style={{
                  marginTop: '1.5rem',
                  fontSize: '0.88rem',
                  lineHeight: 1.75,
                  opacity: 0.5,
                  maxWidth: '38ch',
                  fontWeight: 400,
                }}
              >
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── SCROLL CUE ─────────────────────────────────────────────────── */}
      <div
        className="absolute z-30 flex items-center"
        style={{ bottom: 36, right: 40, gap: '0.75rem' }}
      >
        <p
          className="font-mono"
          style={{
            fontSize: '0.6rem',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: '#9ca3af',
          }}
        >
          Scroll
        </p>
        <div
          style={{
            width: 38,
            height: 1,
            background: 'linear-gradient(to right, #f59e0b, #b45309)',
            animation: 'pulseBar 1.9s ease-in-out infinite',
          }}
        />
      </div>

      <style jsx>{`
        @keyframes pulseBar {
          0%   { transform: scaleX(0.25) translateX(-50%); opacity: 0.35; }
          50%  { transform: scaleX(1)    translateX(0);    opacity: 1;    }
          100% { transform: scaleX(0.25) translateX(50%);  opacity: 0.35; }
        }
      `}</style>
    </section>
  );
}