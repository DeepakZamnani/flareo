'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const flRef = useRef<HTMLSpanElement>(null);
  const arRef = useRef<HTMLSpanElement>(null);
  const eoRef = useRef<HTMLSpanElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const fl = flRef.current;
    const ar = arRef.current;
    const eo = eoRef.current;
    
    if (!section || !video || !fl || !ar || !eo) return;

    const onLoad = () => {
      console.log('Video loaded! Duration:', video.duration);
      setLoaded(true);

      // Main pin - extended duration for video + split
      const mainTrigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=500%', // 5x viewport scroll
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Video plays in first 60% (0.0 to 0.6)
          if (progress <= 0.6) {
            video.currentTime = video.duration * (progress / 0.6);
          } else {
            video.currentTime = video.duration; // Keep at end
          }

          // Split animation in last 40% (0.6 to 1.0)
          if (progress > 0.6) {
            const splitProgress = (progress - 0.6) / 0.4; // 0 to 1
            
            // fl moves left
            gsap.set(fl, { x: -40 * splitProgress + 'vw' });
            
            // AR scales up
            gsap.set(ar, { scale: 1 + (0.8 * splitProgress) });
            
            // eo moves right
            gsap.set(eo, { x: 40 * splitProgress + 'vw' });
          } else {
            // Reset positions during video phase
            gsap.set(fl, { x: 0 });
            gsap.set(ar, { scale: 1 });
            gsap.set(eo, { x: 0 });
          }
        },
      });
    };

    video.addEventListener('loadedmetadata', onLoad);
    if (video.readyState >= 2) onLoad();

    return () => {
      video.removeEventListener('loadedmetadata', onLoad);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover opacity-70"
        muted
        playsInline
        preload="auto"
      >
        <source src="/videos/0215.mov" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Loading */}
      {!loaded && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-700 border-t-amber-600" />
        </div>
      )}

      {/* Logo - Split Animation */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <h1 className="flex items-center text-8xl font-light tracking-widest text-white md:text-9xl lg:text-[12rem]">
          {/* fl - moves LEFT */}
          <span ref={flRef} className="inline-block">
            fl
          </span>
          
          {/* AR - stays CENTER, scales up */}
          <span ref={arRef} className="inline-block font-semibold text-amber-500">
            AR
          </span>
          
          {/* eo - moves RIGHT */}
          <span ref={eoRef} className="inline-block">
            eo
          </span>
        </h1>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-16 left-1/2 z-20 -translate-x-1/2">
        <p className="mb-3 text-xs uppercase tracking-widest text-white/60">Scroll to explore</p>
        <div className="h-16 w-0.5 overflow-hidden bg-white/20">
          <div className="h-8 w-full bg-amber-500" style={{ animation: 'scroll 2s ease-in-out infinite' }} />
        </div>
      </div>
    </section>
  );
}