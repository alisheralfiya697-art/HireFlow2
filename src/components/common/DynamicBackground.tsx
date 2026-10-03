import React, { useEffect, useRef, useState } from 'react';

export type BackgroundTheme =
  | 'landing-hero'
  | 'intelligence-graph'
  | 'workflow'
  | 'resume-analyzer'
  | 'ai-recruiter'
  | 'candidates'
  | 'analytics'
  | 'pipeline'
  | 'dashboard-default'
  | 'auth';

interface DynamicBackgroundProps {
  theme: BackgroundTheme;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  alpha: number;
}

export const DynamicBackground: React.FC<DynamicBackgroundProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const mouseTarget = useRef({ x: -1000, y: -1000 });
  const mouseCurrent = useRef({ x: -1000, y: -1000 });

  // Mouse tracking with smooth lerp
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseTarget.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Canvas particle & ambient neural grid animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Number of particles depends on theme
    const particleCount =
      theme === 'landing-hero' || theme === 'intelligence-graph'
        ? 38
        : theme === 'resume-analyzer' || theme === 'ai-recruiter'
        ? 24
        : 14;

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 1.5 + 0.8,
        baseAlpha: Math.random() * 0.3 + 0.15,
        alpha: 0,
      });
    }

    let tick = 0;

    const render = () => {
      tick++;

      // Smooth mouse lerp
      mouseCurrent.current.x += (mouseTarget.current.x - mouseCurrent.current.x) * 0.08;
      mouseCurrent.current.y += (mouseTarget.current.y - mouseCurrent.current.y) * 0.08;
      setMousePos({ x: mouseCurrent.current.x, y: mouseCurrent.current.y });

      ctx.clearRect(0, 0, width, height);

      // Render subtle connections between nearby particles (neural network effect)
      if (theme === 'landing-hero' || theme === 'intelligence-graph' || theme === 'ai-recruiter') {
        const maxDist = theme === 'intelligence-graph' ? 140 : 110;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDist) {
              const alpha = (1 - dist / maxDist) * 0.12;
              ctx.strokeStyle =
                theme === 'intelligence-graph'
                  ? `rgba(6, 182, 212, ${alpha})`
                  : `rgba(99, 102, 241, ${alpha})`;
              ctx.lineWidth = 0.75;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }

      // Update & render particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Subtle pulsation
        const pulse = Math.sin(tick * 0.02 + i) * 0.1;
        p.alpha = Math.max(0.05, Math.min(0.6, p.baseAlpha + pulse));

        ctx.fillStyle =
          theme === 'intelligence-graph'
            ? `rgba(56, 189, 248, ${p.alpha})`
            : theme === 'ai-recruiter'
            ? `rgba(168, 85, 247, ${p.alpha})`
            : `rgba(147, 197, 253, ${p.alpha})`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  // Color gradient definitions based on active theme
  const getGradientAtmosphere = () => {
    switch (theme) {
      case 'landing-hero':
        return (
          <>
            <div className="absolute top-[-10%] left-[20%] w-[650px] h-[450px] bg-indigo-600/18 blur-[150px] rounded-full pointer-events-none transition-all duration-1000" />
            <div className="absolute top-[20%] right-[15%] w-[500px] h-[350px] bg-cyan-500/12 blur-[140px] rounded-full pointer-events-none transition-all duration-1000" />
            <div className="absolute top-[50%] left-[10%] w-[400px] h-[300px] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none transition-all duration-1000" />
          </>
        );
      case 'intelligence-graph':
        return (
          <>
            <div className="absolute top-[10%] left-[30%] w-[700px] h-[500px] bg-cyan-600/14 blur-[160px] rounded-full pointer-events-none transition-all duration-1000" />
            <div className="absolute bottom-[10%] right-[25%] w-[600px] h-[400px] bg-indigo-600/16 blur-[150px] rounded-full pointer-events-none transition-all duration-1000" />
            {/* Soft grid lines */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-35" />
          </>
        );
      case 'resume-analyzer':
        return (
          <>
            <div className="absolute top-[15%] left-[20%] w-[550px] h-[400px] bg-cyan-700/12 blur-[140px] rounded-full pointer-events-none transition-all duration-1000" />
            <div className="absolute bottom-[20%] right-[20%] w-[450px] h-[350px] bg-indigo-800/15 blur-[150px] rounded-full pointer-events-none transition-all duration-1000" />
            {/* Subtle horizontal data scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(99,102,241,0.02)_50%,transparent_100%)] [background-size:100%_48px] opacity-40" />
          </>
        );
      case 'ai-recruiter':
        return (
          <>
            <div className="absolute top-[10%] right-[20%] w-[600px] h-[450px] bg-purple-700/15 blur-[160px] rounded-full pointer-events-none transition-all duration-1000" />
            <div className="absolute bottom-[15%] left-[25%] w-[500px] h-[380px] bg-indigo-900/20 blur-[150px] rounded-full pointer-events-none transition-all duration-1000" />
            <div className="absolute inset-0 bg-[radial-gradient(#2d1e57_1px,transparent_1px)] [background-size:40px_40px] opacity-25" />
          </>
        );
      case 'analytics':
        return (
          <>
            <div className="absolute top-[20%] right-[10%] w-[600px] h-[400px] bg-emerald-600/10 blur-[160px] rounded-full pointer-events-none transition-all duration-1000" />
            <div className="absolute bottom-[10%] left-[15%] w-[550px] h-[400px] bg-indigo-600/12 blur-[150px] rounded-full pointer-events-none transition-all duration-1000" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:48px_48px] opacity-30" />
          </>
        );
      case 'pipeline':
        return (
          <>
            <div className="absolute top-[10%] left-[25%] w-[650px] h-[450px] bg-indigo-700/10 blur-[160px] rounded-full pointer-events-none transition-all duration-1000" />
            <div className="absolute bottom-[10%] right-[20%] w-[500px] h-[350px] bg-cyan-700/10 blur-[150px] rounded-full pointer-events-none transition-all duration-1000" />
          </>
        );
      case 'candidates':
        return (
          <>
            <div className="absolute top-[15%] right-[25%] w-[600px] h-[400px] bg-indigo-600/12 blur-[150px] rounded-full pointer-events-none transition-all duration-1000" />
            <div className="absolute bottom-[15%] left-[20%] w-[500px] h-[350px] bg-cyan-600/10 blur-[140px] rounded-full pointer-events-none transition-all duration-1000" />
          </>
        );
      default:
        // Quiet, high-focus dashboard atmosphere
        return (
          <>
            <div className="absolute top-[-5%] left-[30%] w-[600px] h-[400px] bg-indigo-700/10 blur-[160px] rounded-full pointer-events-none transition-all duration-1000" />
            <div className="absolute bottom-[5%] right-[25%] w-[500px] h-[350px] bg-cyan-700/08 blur-[150px] rounded-full pointer-events-none transition-all duration-1000" />
          </>
        );
    }
  };

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#090A0F] transition-colors duration-1000 select-none"
    >
      {/* 1. Theme-Specific Colored Radiant Blobs */}
      {getGradientAtmosphere()}

      {/* 2. Interactive Mouse Ambient Spotlight */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(750px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.055), transparent 70%)`,
        }}
      />

      {/* 3. Dynamic Canvas for Moving Neural Particles & Links */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />

      {/* 4. Film Grain / Micro Noise Texture for Physical Tactile Depth */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
