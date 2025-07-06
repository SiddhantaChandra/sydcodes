import MeshGradient from './MeshGradient';

export default function BackgroundEffects() {
  return (
    <>
      <div className="absolute inset-0" />
      <MeshGradient />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 animate-gradient-x" />
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary/30 rounded-full blur-lg animate-float" style={{ animationDelay: '2s' }} />
    </>
  );
} 