import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';
import { soundManager } from '../utils/audio';

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const logoImgRef = useRef<HTMLImageElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation for Logo: smooth scale and fade-in
      gsap.fromTo(
        logoWrapperRef.current,
        { scale: 0.6, opacity: 0, y: 30 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.6,
          ease: 'power3.out',
        }
      );

      // Subtle breathing float loop
      gsap.to(logoWrapperRef.current, {
        y: -12,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Ambient pulsing glow
      gsap.to('.hero-aura', {
        scale: 1.15,
        opacity: 0.55,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.8,
      });

      // Scroll Down indicator entrance
      gsap.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: -10 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 1.2,
          ease: 'power2.out',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Gentle 3D perspective tracking on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !logoImgRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });

    gsap.to(logoImgRef.current, {
      rotationY: x * 18,
      rotationX: -y * 18,
      transformPerspective: 900,
      ease: 'power2.out',
      duration: 0.5,
    });
  };

  const handleMouseLeave = () => {
    if (!logoImgRef.current) return;
    gsap.to(logoImgRef.current, {
      rotationY: 0,
      rotationX: 0,
      ease: 'power2.out',
      duration: 0.8,
    });
  };

  const scrollToFirstProduct = () => {
    soundManager.playDrop();
    const elem = document.getElementById('mango');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden bg-[#08090d] select-none"
    >
      {/* Dynamic Ambient Background Auras matching Logo Palette */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        {/* Mango Gold Glow */}
        <div
          className="hero-aura absolute w-[380px] sm:w-[540px] h-[380px] sm:h-[540px] rounded-full blur-[110px] opacity-35 bg-gradient-to-tr from-amber-500/40 to-orange-500/20"
          style={{
            transform: `translate(${mousePos.x * 25}px, ${mousePos.y * 25}px)`,
          }}
        />
        {/* Grape Purple Glow */}
        <div
          className="hero-aura absolute -bottom-10 right-1/4 w-[320px] sm:w-[480px] h-[320px] sm:h-[480px] rounded-full blur-[120px] opacity-30 bg-purple-600/30"
          style={{
            transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`,
          }}
        />
        {/* Botanic Green Glow */}
        <div
          className="hero-aura absolute -top-10 left-1/4 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full blur-[120px] opacity-25 bg-emerald-500/25"
          style={{
            transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`,
          }}
        />
        {/* Subtle circular grid vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#08090d_85%)]" />
      </div>

      {/* Centered Juiceur Logo - The Sole Focal Anchor of Section 1 */}
      <div
        ref={logoWrapperRef}
        className="relative z-10 flex flex-col items-center justify-center cursor-pointer"
        onClick={() => soundManager.playPop()}
      >
        <div className="relative group">
          {/* Subtle concentric ripple rings */}
          <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-amber-500/20 via-emerald-500/15 to-purple-500/20 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 animate-pulse-glow" />

          {/* Logo Emblem Image */}
          <img
            ref={logoImgRef}
            src="/assets/aistudio/juiceur-logo_b6f9b506.png"
            alt="Juiceur Logo"
            className="w-56 h-56 sm:w-72 sm:h-72 md:w-88 md:h-88 lg:w-96 lg:h-96 object-contain drop-shadow-[0_20px_50px_rgba(245,158,11,0.22)] transition-transform duration-300"
            draggable={false}
          />
        </div>
      </div>

      {/* Subtle "Scroll Down" Indicator at Bottom */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer group opacity-90 hover:opacity-100 transition-opacity"
        onClick={scrollToFirstProduct}
      >
        <span className="text-[11px] font-medium tracking-[0.25em] uppercase text-zinc-400 group-hover:text-amber-400 transition-colors">
          Scroll Down
        </span>
        <div className="w-5 h-9 rounded-full border border-zinc-600/70 group-hover:border-amber-400/80 flex items-start justify-center p-1 transition-colors">
          <div className="w-1 h-2 rounded-full bg-amber-400 animate-bounce" />
        </div>
        <ChevronDown className="w-4 h-4 text-zinc-500 group-hover:text-amber-400 -mt-1 animate-pulse transition-colors" />
      </div>
    </section>
  );
};
