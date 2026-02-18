import Navigation from '@/components/Navigation';
import DesktopLinks from '@/components/DesktopLinks';
import Hero from '@/sections/Hero';
import MobileLinks from '@/components/MobileLinks';
import Experience from '@/sections/Experience';

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <DesktopLinks />
      <Hero />
      <Experience />
      
      {/* Placeholder sections for now */}

      
      <section id="projects" className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Projects Section</h2>
          <p className="text-muted-foreground">Coming soon...</p>
        </div>
      </section>
      
      <section id="contact" className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Contact Section</h2>
          <p className="text-muted-foreground">Coming soon...</p>
        </div>
      </section>
    </main>
  );
}
