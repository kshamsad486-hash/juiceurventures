import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, Info, Sparkles, CheckCircle2 } from 'lucide-react';
import { PRODUCTS, Product } from '../types';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';

gsap.registerPlugin(ScrollTrigger);

interface MangoSectionProps {
  onOpenNutrition: (product: Product) => void;
}

export const MangoSection: React.FC<MangoSectionProps> = ({ onOpenNutrition }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLImageElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const floatingFruitsRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const product = PRODUCTS.mango;

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
          rotationZ: -4,
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
          x: 60,
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

      // Floating items subtle continuous parallax
      const floatingItems = section.querySelectorAll('.floating-mango-item');
      floatingItems.forEach((item, idx) => {
        gsap.to(item, {
          y: idx % 2 === 0 ? -18 : 20,
          x: idx % 2 === 0 ? 12 : -10,
          rotation: idx % 2 === 0 ? 8 : -12,
          duration: 3.5 + idx * 0.7,
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

  const triggerMangoSplash = () => {
    soundManager.playPop();
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#fbbf24', '#f97316', '#22c55e'],
    });
  };

  return (
    <section
      id="mango"
      ref={sectionRef}
      className="relative min-h-screen py-24 md:py-32 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#08090d] via-[#100e0a] to-[#0a0a0f] select-none"
    >
      {/* Background radial amber warmth aura */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[500px] md:w-[750px] h-[500px] md:h-[750px] rounded-full blur-[140px] opacity-25 bg-radial from-amber-500/40 via-orange-500/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Bottle Display Column (Interactive 3D with Floating Mango Elements) */}
          <div
            className="lg:col-span-6 flex items-center justify-center relative cursor-grab active:cursor-grabbing"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Ambient Back Glow Ring */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-amber-500/20 to-orange-400/20 blur-3xl" />

            {/* Floating Fruit Elements & Splash Accents */}
            <div ref={floatingFruitsRef} className="absolute inset-0 pointer-events-none">
              
              {/* Floating Mango Slice Top-Left */}
              <div className="floating-mango-item absolute -top-4 left-6 sm:left-12 w-20 sm:w-28 drop-shadow-xl z-20">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-none">
                  {/* Stylized mango slice */}
                  <path
                    d="M 20,50 Q 30,20 65,25 Q 90,30 85,65 Q 80,90 45,85 Q 15,80 20,50 Z"
                    fill="url(#mangoGrad1)"
                    stroke="#ea580c"
                    strokeWidth="1.5"
                  />
                  {/* Inner juicy texture lines */}
                  <path d="M 40,40 Q 60,42 70,55" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
                  <path d="M 35,55 Q 52,58 62,72" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
                  <defs>
                    <linearGradient id="mangoGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fde047" />
                      <stop offset="60%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#ea580c" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Floating Mango Leaf Top-Right */}
              <div className="floating-mango-item absolute top-12 right-4 sm:right-10 w-16 sm:w-24 drop-shadow-lg z-10">
                <svg viewBox="0 0 80 80" className="w-full h-full fill-none">
                  <path
                    d="M 10,70 Q 35,50 45,20 Q 55,50 70,10 Q 50,45 40,70 Q 25,60 10,70 Z"
                    fill="url(#leafGrad1)"
                    stroke="#15803d"
                    strokeWidth="1.2"
                  />
                  <path d="M 40,70 Q 43,45 60,18" stroke="#86efac" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
                  <defs>
                    <linearGradient id="leafGrad1" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#166534" />
                      <stop offset="70%" stopColor="#22c55e" />
                      <stop offset="100%" stopColor="#4ade80" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Floating Juice Splash Bottom-Left */}
              <div className="floating-mango-item absolute bottom-8 left-4 sm:left-14 w-16 sm:w-20 drop-shadow-lg z-20">
                <svg viewBox="0 0 60 60" className="w-full h-full fill-none">
                  <circle cx="30" cy="30" r="14" fill="#fbbf24" opacity="0.85" />
                  <circle cx="48" cy="18" r="6" fill="#f59e0b" opacity="0.9" />
                  <circle cx="16" cy="46" r="4" fill="#fde047" opacity="0.95" />
                  <path d="M 28,16 Q 30,8 36,12" stroke="#fde047" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>

              {/* Golden Droplet Bottom-Right */}
              <div className="floating-mango-item absolute bottom-20 right-6 sm:right-16 w-12 sm:w-16 drop-shadow-md z-10">
                <svg viewBox="0 0 40 50" className="w-full h-full fill-none">
                  <path
                    d="M 20,5 Q 32,25 32,35 A 12,12 0 1,1 8,35 Q 8,25 20,5 Z"
                    fill="url(#dropGrad1)"
                  />
                  <ellipse cx="16" cy="30" rx="3" ry="5" fill="#ffffff" opacity="0.6" transform="rotate(-20 16 30)" />
                  <defs>
                    <linearGradient id="dropGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fef08a" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Crisp Background-Removed Mango Bottle Image with 3D Depth */}
            <div className="relative z-10 p-4 transition-transform duration-100 ease-out">
              <img
                ref={bottleRef}
                src={product.image}
                alt="Juiceur Mango Juice Bottle"
                className="w-56 sm:w-72 md:w-80 lg:w-96 max-h-[580px] object-contain drop-shadow-[0_25px_45px_rgba(245,158,11,0.3)] filter contrast-105"
                draggable={false}
              />

              {/* Reflection Base */}
              <div className="w-3/4 mx-auto h-4 bg-amber-500/20 blur-md rounded-full mt-2" />
            </div>
          </div>

          {/* Product Details & Purchase Module Column */}
          <div ref={textGroupRef} className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Volume & Slogan Bar */}
            <div className="flex items-center gap-3 text-xs tracking-wider text-amber-400 font-semibold uppercase mb-3">
              <span>{product.volume} (260 ml / 250 ml)</span>
              <span className="text-zinc-600">·</span>
              <span>Cold-Pressed Daily</span>
            </div>

            {/* Title: MANGO JUICE / عصير مانجو */}
            <div className="mb-4">
              <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-none">
                MANGO JUICE
              </h2>
              <div className="mt-2 flex items-baseline gap-4">
                <span className="font-arabic font-extrabold text-3xl sm:text-4xl text-amber-400">
                  {product.nameAr}
                </span>
                <span className="text-xs uppercase tracking-widest text-zinc-400 font-medium">
                  Pure Authentic
                </span>
              </div>
            </div>

            {/* Subtext: Made with Real Mango */}
            <p className="text-lg sm:text-xl font-medium text-zinc-200 mb-2">
              Made with Real Mango
            </p>
            <p className="text-sm text-zinc-400 max-w-md leading-relaxed mb-6">
              Squeezed & Sip The Real Fruit. Prepared with handpicked golden ripe mangoes, rich with smooth pulp and naturally refreshing sunlit sweetness.
            </p>

            {/* Quality Attribute Tags */}
            <div className="grid grid-cols-2 gap-3 mb-8 max-w-md">
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-zinc-900/60 border border-amber-500/20">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs font-semibold text-zinc-200">100% Real Fruit</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-zinc-900/60 border border-amber-500/20">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs font-semibold text-zinc-200">Cold Squeezed</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-zinc-900/60 border border-amber-500/20">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs font-semibold text-zinc-200">100% Vegan</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-zinc-900/60 border border-amber-500/20">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs font-semibold text-zinc-200">Zero Preservatives</span>
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
                  triggerMangoSplash();
                }}
                className="inline-flex items-center justify-center gap-3 px-7 py-4 text-sm font-bold text-black uppercase tracking-wider bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all active:scale-98"
              >
                <MessageCircle className="w-5 h-5 fill-black text-transparent" />
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
                <Info className="w-4 h-4 text-amber-400" />
                <span>Purity & Nutrition</span>
              </button>
            </div>

            {/* Interactive Splash Prompt */}
            <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span>Drag or hover cursor on the bottle for interactive 3D physics</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
