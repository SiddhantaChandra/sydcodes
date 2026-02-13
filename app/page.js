import Navigation from '@/components/Navigation';
import Hero from '@/sections/Hero';

export default function Home() {
  return (
    <main className="relative">
      {/* <Navigation /> */}
      <Hero />
      
      {/* Placeholder sections for now */}
      <section id="about" className="min-h-screen flex items-center justify-center bg-muted/50">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">About Section</h2>
          <p className="text-muted-foreground">Coming soon...</p>
        </div>
      </section>
      
      <section id="projects" className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Projects Section</h2>
          <p className="text-muted-foreground">Coming soon...</p>
        </div>
      </section>
      
      <section id="experience" className="min-h-screen flex items-center justify-center bg-muted/50">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Experience Section</h2>
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
