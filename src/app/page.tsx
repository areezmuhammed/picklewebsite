import ParallaxHero from '@/components/ParallaxHero';
import MasonryGrid from '@/components/MasonryGrid';
import FooterCTA from '@/components/FooterCTA';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-brand-olive overflow-x-hidden">
      <ParallaxHero />
      <MasonryGrid />
      <FooterCTA />
    </main>
  );
}
