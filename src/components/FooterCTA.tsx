'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function FooterCTA() {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Expanding Panel Parallax Reveal
    gsap.fromTo(panelRef.current,
      { yPercent: 30, scale: 0.95 },
      {
        yPercent: 0,
        scale: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: panelRef.current,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
        }
      }
    );
  }, []);

  return (
    <footer className="bg-brand-olive text-zinc-100 pb-8 px-4 md:px-12 relative z-0 overflow-hidden">
      <div 
        ref={panelRef}
        className="max-w-7xl mx-auto bg-[#0f110c] rounded-3xl p-12 md:p-24 flex flex-col items-center text-center will-change-transform border border-[#3b4230]"
      >
        <span className="text-brand-chili text-sm font-bold tracking-[0.2em] mb-4 uppercase">The Final Polish</span>
        <h2 className="text-5xl md:text-8xl font-sans font-black tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-br from-white to-zinc-500">
          Taste the <br/> Tradition.
        </h2>
        <p className="text-xl font-serif text-zinc-400 font-light max-w-xl mb-12">
          Secure your premium jar of authentic Tulunadu red chili mango preserve before the seasonal batch dissipates.
        </p>
        
        <button className="group relative inline-flex items-center justify-center px-10 py-5 font-sans font-bold tracking-wide text-white bg-brand-chili rounded-full overflow-hidden transition-all duration-300 hover:bg-red-800 active:scale-95 shadow-[0_0_40px_-10px_rgba(139,0,0,0.5)] hover:shadow-[0_0_60px_-15px_rgba(139,0,0,0.7)]">
          <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-12">Purchase Now</span>
          <span className="absolute inset-0 flex items-center justify-center translate-y-12 transition-transform duration-300 group-hover:translate-y-0 z-10">
            $24.99 Reserve
          </span>
        </button>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 flex flex-col md:flex-row justify-between items-center text-sm font-sans text-zinc-500">
        <p>© 2026 Tulunadu Taste. Crafted with precision.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
