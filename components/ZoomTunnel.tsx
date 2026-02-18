'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const solutions = [
  {
    id: 1,
    title: 'Image to 3D',
    description: 'Upload photos, get 3D models instantly',
    stat: '2 Minutes',
    image: '/images/image-to-3d.jpg',
    icon: '📸',
  },
  {
    id: 2,
    title: 'AR Catalog',
    description: 'Deploy full AR catalog in minutes',
    stat: 'The Core',
    image: '/images/ar-catalog.jpg',
    icon: '📱',
    isHero: true,
  },
  {
    id: 3,
    title: 'Fast Setup',
    description: 'Go live in under 24 hours',
    stat: '24 Hours',
    image: '/images/fast-setup.jpg',
    icon: '⚡',
  },
  {
    id: 4,
    title: '70% Cheaper',
    description: 'Fraction of traditional 3D costs',
    stat: 'Save $$$',
    image: '/images/cost-savings.jpg',
    icon: '💰',
  },
  {
    id: 5,
    title: 'Real-time Preview',
    description: 'See changes instantly',
    stat: 'Instant',
    image: '/images/realtime.jpg',
    icon: '👁️',
  },
  {
    id: 6,
    title: 'Easy Updates',
    description: 'Update catalog anytime',
    stat: 'One Click',
    image: '/images/easy-updates.jpg',
    icon: '🔄',
  },
];

export default function ZoomTunnel() {
  const sectionRef = useRef<HTMLElement>(null);
  const tunnelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const tunnel = tunnelRef.current;

    if (!section || !tunnel) return;

    const cards = gsap.utils.toArray('.zoom-card');
    const totalCards = cards.length;

    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=500%',
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        cards.forEach((card, index) => {
          const cardElement = card as HTMLElement;
          
          const loopProgress = (progress * totalCards + index) % totalCards;
          const normalizedProgress = loopProgress / totalCards;
          
          const zStart = -3000;
          const zEnd = 3000;
          const zProgress = normalizedProgress * 2 - 1;
          const z = zProgress * (zEnd - zStart) / 2;
          
          const scale = gsap.utils.mapRange(-3000, 0, 0.1, 1, z);
          const scaleClamped = Math.max(0.1, Math.min(2, scale));
          
          let opacity = 0;
          if (z < -500) {
            opacity = gsap.utils.mapRange(-3000, -500, 0, 1, z);
          } else if (z > 500) {
            opacity = gsap.utils.mapRange(500, 3000, 1, 0, z);
          } else {
            opacity = 1;
          }
          
          const rotation = normalizedProgress * 360;
          
          const radius = 150;
          const angle = (index / totalCards) * Math.PI * 2;
          const x = Math.sin(angle) * radius * (1 - Math.abs(zProgress));
          const y = Math.cos(angle) * radius * (1 - Math.abs(zProgress));
          
          gsap.set(cardElement, {
            z: z,
            scale: scaleClamped,
            opacity: opacity,
            x: x,
            y: y,
            rotationZ: rotation * 0.1,
          });
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-white via-amber-50 to-white"
    >
      {/* Background rings */}
      <div className="absolute inset-0 z-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-amber-200/20"
            style={{
              width: `${(i + 1) * 20}%`,
              height: `${(i + 1) * 20}%`,
            }}
          />
        ))}
      </div>

      {/* Tunnel */}
      <div
        ref={tunnelRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: '1000px', perspectiveOrigin: '50% 50%' }}
      >
        <div className="relative h-full w-full" style={{ transformStyle: 'preserve-3d' }}>
          {solutions.map((solution) => (
            <div
              key={solution.id}
              className="zoom-card absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div
                className={`relative flex h-[500px] w-[400px] flex-col items-center justify-center overflow-hidden rounded-3xl border-4 p-8 shadow-2xl backdrop-blur-md ${
                  solution.isHero
                    ? 'border-amber-500 bg-gradient-to-br from-amber-50/90 to-white/90'
                    : 'border-white/50 bg-white/80'
                }`}
              >
                {/* Image */}
                <div className="absolute inset-0 z-0 opacity-30">
                  <Image
                    src={solution.image}
                    alt={solution.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10 text-center">
                  <div className="mb-6 text-8xl">{solution.icon}</div>

                  {solution.isHero && (
                    <div className="mb-4 inline-block rounded-full bg-amber-500 px-6 py-2 text-sm font-bold uppercase tracking-wider text-white">
                      ⭐ Core Solution
                    </div>
                  )}

                  <h2
                    className={`mb-4 text-5xl font-light leading-tight ${
                      solution.isHero ? 'text-amber-900' : 'text-gray-900'
                    }`}
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {solution.title}
                  </h2>

                  <div
                    className={`mb-4 text-6xl font-bold ${
                      solution.isHero ? 'text-amber-600' : 'text-amber-500'
                    }`}
                  >
                    {solution.stat}
                  </div>

                  <p className="text-xl leading-relaxed text-gray-600">
                    {solution.description}
                  </p>
                </div>

                {solution.isHero && (
                  <div className="absolute -inset-4 -z-10 rounded-3xl bg-amber-400/20 blur-xl" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Center dot */}
      <div className="absolute left-1/2 top-1/2 z-30 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-amber-500" />

      {/* Scroll hint */}
      <div className="absolute bottom-16 left-1/2 z-20 -translate-x-1/2 text-center">
        <p className="mb-3 text-xs uppercase tracking-widest text-gray-500">Scroll to explore</p>
        <div className="flex gap-2">
          {[0, 0.2, 0.4].map((delay, i) => (
            <div
              key={i}
              className="h-2 w-2 animate-pulse rounded-full bg-amber-500"
              style={{ animationDelay: `${delay}s` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}