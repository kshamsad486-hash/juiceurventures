import React, { useState, useEffect } from 'react';
import { MessageCircle, Volume2, VolumeX, Menu, X } from 'lucide-react';
import { soundManager } from '../utils/audio';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const next = soundManager.toggle();
    setAudioEnabled(next);
  };

  const navLinks = [
    { label: 'Overview', href: '#hero' },
    { label: 'Mango Juice', href: '#mango' },
    { label: 'Grape Juice', href: '#grape' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#090a0f]/85 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/40 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Zone */}
          <a
            href="#hero"
            onClick={() => soundManager.playPop()}
            className="flex items-center gap-2.5 group whitespace-nowrap shrink-0 text-decoration-none"
          >
            <img
              src="/assets/aistudio/juiceur-logo_b6f9b506.png"
              alt="Juiceur Logo"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-amber-400/30 group-hover:scale-105 transition-transform"
            />
            <span className="font-display font-extrabold text-xl tracking-wide bg-gradient-to-r from-amber-400 via-emerald-400 to-purple-400 bg-clip-text text-transparent">
              JUICEUR
            </span>
          </a>

          {/* Zone 2: Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => soundManager.playPop()}
                className="hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-400 hover:after:w-full after:transition-all after:duration-300 whitespace-nowrap shrink-0"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action & Controls */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Audio Toggle */}
            <button
              onClick={handleAudioToggle}
              title={audioEnabled ? 'Mute sound effects' : 'Enable fresh sound effects'}
              className="p-2 rounded-lg bg-zinc-800/60 hover:bg-zinc-700/60 border border-white/5 text-zinc-300 hover:text-white transition-colors"
              aria-label="Toggle audio effects"
            >
              {audioEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-zinc-400" />}
            </button>

            {/* Direct WhatsApp CTA */}
            <a
              href="https://wa.me/919074395959?text=Hello%20Juiceur%2C%20I%20would%20like%20to%20place%20an%20order!"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playDrop()}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 rounded-lg shadow-sm hover:shadow-amber-400/25 transition-all whitespace-nowrap shrink-0 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-black text-transparent" />
              <span>Order on WhatsApp</span>
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-zinc-800/80 text-zinc-200"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/90 backdrop-blur-xl md:hidden flex flex-col justify-center items-center gap-6 px-6 pt-20">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => {
                soundManager.playPop();
                setMobileMenuOpen(false);
              }}
              className="text-2xl font-display font-semibold text-zinc-100 hover:text-amber-400 transition-colors"
            >
              {link.label}
            </a>
          ))}

          <a
            href="https://wa.me/919074395959?text=Hello%20Juiceur%2C%20I%20would%20like%20to%20place%20an%20order!"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              soundManager.playDrop();
              setMobileMenuOpen(false);
            }}
            className="flex items-center justify-center gap-2.5 w-full max-w-xs py-3.5 px-6 rounded-xl text-black font-bold bg-amber-400 active:scale-95 transition-transform"
          >
            <MessageCircle className="w-5 h-5 fill-black text-transparent" />
            <span>Order on WhatsApp</span>
          </a>
        </div>
      )}
    </>
  );
};
