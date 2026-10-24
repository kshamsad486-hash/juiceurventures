import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, Info, Sparkles, CheckCircle2 } from 'lucide-react';
import { PRODUCTS, Product } from '../types';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';

gsap.registerPlugin(ScrollTrigger);

interface GrapeSectionProps {
  onOpenNutrition: (product: Product) => void;
}

export const GrapeSection: React.FC<GrapeSectionProps> = ({ onOpenNutrition }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLImageElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const floatingGrapeItemsRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const product = PRODUCTS.grape;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Bottle Entrance scroll animation
      gsap.fromTo(
        bottleRef.current,
        {
          y: 120,
          opacity: 0,
          scale: 0.88,
          rotationZ: 4,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationZ: 0,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      );

      // Text Entrance
      gsap.fromTo(
        textGroupRef.current,
        {
          x: -60,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Floating items continuous subtle parallax
      const floatingItems = section.querySelectorAll('.floating-grape-item');
      floatingItems.forEach((item, idx) => {
        gsap.to(item, {
          y: idx % 2 === 0 ? 18 : -18,
          x: idx % 2 === 0 ? -12 : 12,
          rotation: idx % 2 === 0 ? -8 : 10,
          duration: 3.8 + idx * 0.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 3D bottle tilt on hover / move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!bottleRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const rx = -y * 22;
    const ry = x * 22;
    setTilt({ rx, ry });

    gsap.to(bottleRef.current, {
      rotationX: rx,
      rotationY: ry,
      transformPerspective: 1000,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!bottleRef.current) return;
    setTilt({ rx: 0, ry: 0 });
    gsap.to(bottleRef.current, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.6,
      ease: 'power3.out',
    });
  };

  const triggerGrapeSplash = () => {
    soundManager.playPop();
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#a855f7', '#c084fc', '#7e22ce', '#38bdf8'],
    });
  };

  return (
    <section
      id="grape"
      ref={sectionRef}
      className="relative min-h-screen py-24 md:py-32 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a0a0f] via-[#120a1a] to-[#08080f] select-none"
    >
      {/* Background radial violet warmth aura */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[500px] md:w-[750px] h-[500px] md:h-[750px] rounded-full blur-[140px] opacity-25 bg-radial from-purple-600/40 via-fuchsia-600/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Product Details & Purchase Module Column (Left on Desktop for Rhythm) */}
          <div ref={textGroupRef} className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1">
            
            {/* Volume & Slogan Bar */}
            <div className="flex items-center gap-3 text-xs tracking-wider text-purple-400 font-semibold uppercase mb-3">
              <span>{product.volume} (260 ml / 250 ml)</span>
              <span className="text-zinc-600">·</span>
              <span>100% Cold-Pressed</span>
            </div>

            {/* Title: GRAPE JUICE / عصير العنب */}
            <div className="mb-4">
              <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-none">
                GRAPE JUICE
              </h2>
              <div className="mt-2 flex items-baseline gap-4">
                <span className="font-arabic font-extrabold text-3xl sm:text-4xl text-purple-400">
                  {product.nameAr}
                </span>
                <span className="text-xs uppercase tracking-widest text-zinc-400 font-medium">
                  Pure Authentic
                </span>
              </div>
            </div>

            {/* Subtext: Made with Real Grapes */}
            <p className="text-lg sm:text-xl font-medium text-zinc-200 mb-2">
              Made with Real Grapes
            </p>
            <p className="text-sm text-zinc-400 max-w-md leading-relaxed mb-6">
              Squeezed & Sip The Real Fruit. Crushed from premium luscious dark grapes, rich in natural antioxidants and bursting with deep, crisp berry sweetness.
            </p>

            {/* Quality Attribute Tags */}
            <div className="grid grid-cols-2 gap-3 mb-8 max-w-md">
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-zinc-900/60 border border-purple-500/20">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="text-xs font-semibold text-zinc-200">100% Real Grapes</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-zinc-900/60 border border-purple-500/20">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="text-xs font-semibold text-zinc-200">Antioxidant Rich</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-zinc-900/60 border border-purple-500/20">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="text-xs font-semibold text-zinc-200">100% Cold-Pressed</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-zinc-900/60 border border-purple-500/20">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="text-xs font-semibold text-zinc-200">100% Vegan</span>
              </div>
            </div>

            {/* Actions: Direct WhatsApp Order + Purity Details */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {/* Direct Order on WhatsApp Button */}
              <a
                href={`https://wa.me/919074395959?text=${encodeURIComponent(product.whatsappText)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  soundManager.playDrop();
                  triggerGrapeSplash();
                }}
                className="inline-flex items-center justify-center gap-3 px-7 py-4 text-sm font-bold text-white uppercase tracking-wider bg-gradient-to-r from-purple-600 via-purple-500 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 rounded-xl shadow-lg shadow-purple-600/25 hover:shadow-purple-600/40 transition-all active:scale-98"
              >
                <MessageCircle className="w-5 h-5 fill-white text-transparent" />
                <span>Order via WhatsApp</span>
              </a>

              {/* View Nutrition / Ingredients */}
              <button
                onClick={() => {
                  soundManager.playPop();
                  onOpenNutrition(product);
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-4 text-sm font-semibold text-zinc-300 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 rounded-xl transition-colors"
              >
                <Info className="w-4 h-4 text-purple-400" />
                <span>Purity & Nutrition</span>
              </button>
            </div>

            {/* Interactive Splash Prompt */}
            <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin" />
              <span>Drag or hover cursor on the bottle for interactive 3D physics</span>
            </div>

          </div>

          {/* Bottle Display Column (Interactive 3D with Floating Grape Elements) */}
          <div
            className="lg:col-span-6 flex items-center justify-center relative cursor-grab active:cursor-grabbing order-1 lg:order-2"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Ambient Back Glow Ring */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-purple-600/25 to-fuchsia-500/20 blur-3xl" />

            {/* Floating Fruit Elements & Splash Accents */}
            <div ref={floatingGrapeItemsRef} className="absolute inset-0 pointer-events-none">
              
              {/* Floating Grape Bunch Top-Right */}
              <div className="floating-grape-item absolute -top-4 right-6 sm:right-12 w-20 sm:w-28 drop-shadow-xl z-20">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-none">
                  {/* Grape cluster spheres */}
                  <circle cx="48" cy="30" r="10" fill="url(#grapeGrad1)" />
                  <circle cx="34" cy="36" r="9" fill="url(#grapeGrad2)" />
                  <circle cx="62" cy="36" r="9.5" fill="url(#grapeGrad1)" />
                  <circle cx="42" cy="48" r="11" fill="url(#grapeGrad2)" />
                  <circle cx="58" cy="48" r="10" fill="url(#grapeGrad1)" />
                  <circle cx="50" cy="62" r="9" fill="url(#grapeGrad1)" />
                  <circle cx="50" cy="74" r="7" fill="url(#grapeGrad2)" />
                  {/* Stem and curl */}
                  <path d="M 48,22 Q 46,12 55,8" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" />
                  <defs>
                    <radialGradient id="grapeGrad1" cx="35%" cy="35%" r="65%">
                      <stop offset="0%" stopColor="#d8b4fe" />
                      <stop offset="45%" stopColor="#7e22ce" />
                      <stop offset="100%" stopColor="#3b0764" />
                    </radialGradient>
                    <radialGradient id="grapeGrad2" cx="35%" cy="35%" r="65%">
                      <stop offset="0%" stopColor="#e9d5ff" />
                      <stop offset="45%" stopColor="#9333ea" />
                      <stop offset="100%" stopColor="#581c87" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>

              {/* Floating Grape Leaf Top-Left */}
              <div className="floating-grape-item absolute top-12 left-4 sm:left-10 w-16 sm:w-24 drop-shadow-lg z-10">
                <svg viewBox="0 0 80 80" className="w-full h-full fill-none">
                  <path
                    d="M 40,75 C 20,60 10,40 18,25 C 28,30 35,18 40,15 C 45,18 52,30 62,25 C 70,40 60,60 40,75 Z"
                    fill="url(#grapeLeafGrad)"
                    stroke="#16a34a"
                    strokeWidth="1.2"
                  />
                  <path d="M 40,70 L 40,25" stroke="#86efac" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                  <defs>
                    <linearGradient id="grapeLeafGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#15803d" />
                      <stop offset="60%" stopColor="#22c55e" />
                      <stop offset="100%" stopColor="#86efac" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Floating Ruby Splash Bottom-Right */}
              <div className="floating-grape-item absolute bottom-8 right-4 sm:right-14 w-16 sm:w-20 drop-shadow-lg z-20">
                <svg viewBox="0 0 60 60" className="w-full h-full fill-none">
                  <circle cx="30" cy="30" r="14" fill="#9333ea" opacity="0.8" />
                  <circle cx="48" cy="18" r="6" fill="#c084fc" opacity="0.9" />
                  <circle cx="16" cy="46" r="4" fill="#a855f7" opacity="0.95" />
                  <path d="M 28,16 Q 30,8 36,12" stroke="#e9d5ff" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>

              {/* Deep Ruby Dew Droplet Bottom-Left */}
              <div className="floating-grape-item absolute bottom-20 left-6 sm:left-16 w-12 sm:w-16 drop-shadow-md z-10">
                <svg viewBox="0 0 40 50" className="w-full h-full fill-none">
                  <path
                    d="M 20,5 Q 32,25 32,35 A 12,12 0 1,1 8,35 Q 8,25 20,5 Z"
                    fill="url(#grapeDropGrad)"
                  />
                  <ellipse cx="16" cy="30" rx="3" ry="5" fill="#ffffff" opacity="0.5" transform="rotate(-20 16 30)" />
                  <defs>
                    <linearGradient id="grapeDropGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f3e8ff" />
                      <stop offset="100%" stopColor="#7e22ce" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Crisp Background-Removed Grape Bottle Image with 3D Depth */}
            <div className="relative z-10 p-4 transition-transform duration-100 ease-out">
              <img
                ref={bottleRef}
                src={product.image}
                alt="Juiceur Grape Juice Bottle"
                className="w-56 sm:w-72 md:w-80 lg:w-96 max-h-[580px] object-contain drop-shadow-[0_25px_45px_rgba(168,85,247,0.3)] filter contrast-105"
                draggable={false}
              />

              {/* Reflection Base */}
              <div className="w-3/4 mx-auto h-4 bg-purple-600/20 blur-md rounded-full mt-2" />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
