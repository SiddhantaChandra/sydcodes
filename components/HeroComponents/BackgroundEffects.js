import MeshGradient from './MeshGradient';

export default function BackgroundEffects() {
  return (
    <div className="absolute inset-0 pointer-events-none -z-20">
      <div className="absolute inset-0 noise-overlay" />
      <MeshGradient />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-white/5 to-accent/20 animate-gradient-x" />
      <div className="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-transparent" />
      <div className="absolute top-20 left-10 w-24 h-24 bg-primary/25 rounded-full blur-2xl animate-float" />
      <div className="absolute bottom-20 right-10 w-36 h-36 bg-accent/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-primary/25 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
    </div>
  );
} 