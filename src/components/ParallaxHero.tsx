'use client';

import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ParallaxHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRootsRef = useRef<HTMLDivElement>(null);
  const textFusionRef = useRef<HTMLDivElement>(null);
  const textCulminationRef = useRef<HTMLDivElement>(null);
  
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Hydration safety: ensure we are fully mounted on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Video loaded logic
  useEffect(() => {
    if (!isMounted) return;
    
    const video = videoRef.current;
    if (!video) return;

    const onLoadedMetadata = () => setVideoLoaded(true);

    if (video.readyState >= 1) { // HAVE_METADATA
      setVideoLoaded(true);
    } else {
      video.addEventListener('loadedmetadata', onLoadedMetadata);
    }

    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
    };
  }, [isMounted]);

  // Parallax / Scrubbing Core Logic using bulletproof gsap.context
  useEffect(() => {
    if (!videoLoaded || !videoRef.current || !containerRef.current) return;

    const video = videoRef.current;
    
    // Ensure video format initializes right immediately
    video.pause();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=800%', // 8 viewport heights of pinning
          pin: true,
          scrub: 1, // Smoothing factor
          onUpdate: (self) => {
            if (video && !isNaN(video.duration)) {
              video.currentTime = video.duration * self.progress;
            }
          }
        },
      });

      // Frame intervals mapped to narrative fades
      tl.to(textRootsRef.current, { autoAlpha: 1, duration: 0.1, ease: 'power2.out' }, 0.1)
        .to(textRootsRef.current, { autoAlpha: 0, duration: 0.1, ease: 'power2.in' }, 0.3)
        
        .to(textFusionRef.current, { autoAlpha: 1, duration: 0.1, ease: 'power2.out' }, 0.45)
        .to(textFusionRef.current, { autoAlpha: 0, duration: 0.1, ease: 'power2.in' }, 0.65)
        
        .to(textCulminationRef.current, { autoAlpha: 1, duration: 0.1, ease: 'power2.out' }, 0.8)

    }, containerRef);

    // Cleanup when component unmounts or re-renders
    return () => ctx.revert();
  }, [videoLoaded]); // Re-run only when video loading state changes

  // Block SSR hydration mismatches completely
  if (!isMounted) {
    return <section className="w-full h-screen bg-brand-olive" />;
  }

  return (
    <section className="relative w-full h-screen bg-brand-olive overflow-hidden">
      <div ref={containerRef} className="w-full h-full relative">
        
        {/* Loading Overlay */}
        <div className={`absolute inset-0 z-50 flex items-center justify-center bg-brand-olive text-zinc-400 font-sans tracking-widest text-sm uppercase transition-opacity duration-1000 ${videoLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
             Loading Heritage...
        </div>

        {/* The Scrubbing Video Element */}
        <video 
          ref={videoRef} 
          src="/assets/hero-video.mp4"
          className="block absolute top-0 left-0 w-full h-full object-cover"
          style={{ willChange: 'transform' }}
          muted
          playsInline
          preload="auto"
        />

        {/* Narrative Overlays overlaying the video */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex flex-col justify-center px-4 md:px-16 max-w-7xl mx-auto z-10">
          
          <div ref={textRootsRef} className="absolute top-1/4 opacity-0 will-change-transform translate-y-8 max-w-2xl bg-black/60 backdrop-blur-md p-8 rounded-3xl border border-white/5 shadow-2xl">
            <h2 className="text-brand-turmeric text-sm font-bold tracking-[0.2em] mb-4 uppercase">The Foundation</h2>
            <h3 className="text-4xl md:text-6xl font-sans font-extrabold leading-tight text-white mb-6 drop-shadow-md">
              Grounded in <br/> Laterite & Tradition
            </h3>
            <p className="text-lg md:text-xl font-serif text-zinc-300 font-light leading-relaxed drop-shadow-sm">
              Sourced directly from the porous landscapes of the coastal belt. Raw mango, whole dried red chilies, and black mustard seeds resting where the heritage begins.
            </p>
          </div>

          <div ref={textFusionRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 will-change-transform text-center max-w-3xl bg-black/60 backdrop-blur-md p-10 rounded-3xl border border-white/5 shadow-2xl">
            <h2 className="text-brand-chili text-sm font-bold tracking-[0.2em] mb-4 uppercase">The Alchemy</h2>
            <h3 className="text-5xl md:text-7xl font-sans font-black leading-none text-white mb-6 drop-shadow-lg">
              Explosive Flavor. <br/> Controlled Chaos.
            </h3>
            <p className="text-xl md:text-2xl font-serif text-zinc-200 font-medium leading-relaxed drop-shadow-md">
              The violent collision of deep chili oils and raw ingredients. An intense, cinematic blending of spices that defines the regional palate.
            </p>
          </div>

          <div ref={textCulminationRef} className="absolute bottom-1/4 right-0 lg:right-16 opacity-0 will-change-transform translate-y-8 max-w-xl text-right bg-black/60 backdrop-blur-md p-8 rounded-3xl border border-white/5 shadow-2xl pointer-events-auto">
            <h2 className="text-zinc-400 text-sm font-bold tracking-[0.2em] mb-4 uppercase">The Culmination</h2>
            <h3 className="text-4xl md:text-6xl font-sans font-bold leading-tight text-white mb-6 drop-shadow-md">
              Suspended <br/> Perfection.
            </h3>
            <p className="text-lg font-serif text-zinc-300 font-light leading-relaxed mb-8 drop-shadow-sm">
              The final preservation. A premium, sealed vessel holding the culinary culmination of Tulu Nadu, ready for the discernible palate.
            </p>
            <button className="bg-white text-black px-8 py-4 rounded-full font-sans font-bold tracking-wide hover:bg-brand-turmeric transition-colors duration-300 transform active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(244,196,48,0.5)]">
              Discover the Taste
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
