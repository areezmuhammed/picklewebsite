'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);


const ingredients = [
  { id: 1, name: 'Byadgi Chili', desc: 'Deep red, mild heat, intense color.', colSpan: 'col-span-2 md:col-span-1', rowSpan: 'row-span-2', image: '/assets/byadgi.png' },
  { id: 2, name: 'Raw Green Mango', desc: 'Tart, firm, the acidic backbone.', colSpan: 'col-span-1', rowSpan: 'row-span-1', image: '/assets/mango.png' },
  { id: 3, name: 'Black Mustard', desc: 'Pungent aromatics when tempered in hot oil.', colSpan: 'col-span-1', rowSpan: 'row-span-1', image: '/assets/mustard.png' },
  { id: 4, name: 'Laterite Soil', desc: 'The terroir that shapes the spice profile.', colSpan: 'col-span-2 md:col-span-2', rowSpan: 'row-span-1', image: '/assets/laterite.png' },
  { id: 5, name: 'Garlic Cloves', desc: 'Sharp, buttery when aged in chili preserve.', colSpan: 'col-span-1 md:col-span-3', rowSpan: 'row-span-1', image: '/assets/garlic.png' },
];

export default function MasonryGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gsap.utils.toArray('.ingredient-card') as HTMLElement[];
    
    cards.forEach((card, i) => {
      gsap.fromTo(card, 
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }, []);

  return (
    <section className="bg-[#1a1c16] py-32 px-4 md:px-12 relative z-10 border-t border-[#3b4230]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
            <h2 className="text-brand-turmeric text-sm font-bold tracking-[0.2em] mb-4 uppercase">Raw Materials</h2>
            <h3 className="text-4xl md:text-5xl font-sans font-bold text-white max-w-2xl">
            Uncompromising quality starts with the elemental ingredients of the coast.
            </h3>
        </div>

        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4 md:gap-6">
          {ingredients.map((item) => (
            <div 
              key={item.id} 
              className={`ingredient-card relative group overflow-hidden rounded-2xl ${item.colSpan} ${item.rowSpan} p-8 flex flex-col justify-end transition-transform duration-500 hover:scale-[1.02] will-change-transform border border-white/10 shadow-xl`}
            >
              <Image 
                src={item.image} 
                alt={item.name} 
                fill 
                className="object-cover absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 opacity-90 z-0 transition-opacity duration-500 group-hover:opacity-75"></div>
              
              <div className="relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="text-2xl font-sans font-bold text-white mb-2 drop-shadow-md">{item.name}</h4>
                <p className="text-zinc-300 font-serif text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 drop-shadow-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
