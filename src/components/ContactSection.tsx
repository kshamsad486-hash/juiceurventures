import React, { useState } from 'react';
import {
  MessageCircle,
  Phone,
  Instagram,
  Copy,
  Check,
  Shield,
  Truck,
} from 'lucide-react';
import { soundManager } from '../utils/audio';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const phoneNumber = '9074395959';
  const instagramHandle = '@juiceurventures';
  const instagramUrl = 'https://instagram.com/juiceurventures';
  const whatsappUrl =
    'https://wa.me/919074395959?text=Hello%20Juiceur%2C%20I%20would%20like%20to%20place%20an%20order!';

  const copyPhoneNumber = () => {
    soundManager.playPop();
    navigator.clipboard.writeText(phoneNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen py-24 md:py-32 bg-[#07080c] border-t border-white/5 text-zinc-100 flex items-center justify-center overflow-hidden select-none"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[140px] opacity-20 bg-amber-500/20" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[140px] opacity-20 bg-purple-600/20" />
      </div>

      <div className="max-w-4xl mx-auto px-6 sm:px-10 w-full relative z-10">
        {/* Section Header with Brand Emblem */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center justify-center mb-6">
            <img
              src="/assets/aistudio/juiceur-logo_b6f9b506.png"
              alt="Juiceur Logo"
              className="w-24 h-24 sm:w-28 sm:h-28 object-contain drop-shadow-[0_10px_30px_rgba(245,158,11,0.25)] hover:scale-105 transition-transform"
            />
          </div>

          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white mb-3">
            Freshness Straight to You
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
            Ready to experience pure real fruit squeezed to perfection? Connect with us directly or place your order now on WhatsApp.
          </p>
        </div>

        {/* Main CTA: Prominent Order Now on WhatsApp */}
        <div className="mb-10 text-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playDrop()}
            className="w-full sm:max-w-lg mx-auto py-5 px-8 rounded-2xl font-black text-lg tracking-wide flex items-center justify-center gap-3.5 text-white bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 transition-all shadow-2xl shadow-emerald-600/30 hover:scale-[1.02] active:scale-98"
          >
            <MessageCircle className="w-6 h-6 fill-white text-transparent" />
            <span>Order Now on WhatsApp</span>
          </a>
          <p className="text-center text-xs text-zinc-400 mt-3 font-medium">
            Pre-filled order message: &ldquo;Hello Juiceur, I would like to place an order!&rdquo;
          </p>
        </div>

        {/* Contact Cards: Phone, Instagram, Quality Delivery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {/* Phone Card */}
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-amber-400/30 transition-all flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider font-semibold text-zinc-400">
                  Phone Inquiries
                </div>
                <a
                  href={`tel:${phoneNumber}`}
                  onClick={() => soundManager.playPop()}
                  className="text-xl font-bold font-display text-white hover:text-amber-400 transition-colors"
                >
                  {phoneNumber}
                </a>
              </div>
            </div>

            <button
              onClick={copyPhoneNumber}
              title="Copy phone number"
              className="p-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
              aria-label="Copy phone number"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Instagram Card */}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playPop()}
            className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-purple-500/40 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                <Instagram className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider font-semibold text-zinc-400">
                  Instagram Official
                </div>
                <span className="text-xl font-bold font-display text-white group-hover:text-purple-400 transition-colors">
                  {instagramHandle}
                </span>
              </div>
            </div>

            <span className="text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-white/5 group-hover:bg-purple-500/20 text-zinc-300 group-hover:text-purple-300 transition-colors">
              Follow
            </span>
          </a>
        </div>

        {/* Cold-Chain Promise Strip */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-zinc-900/80 via-zinc-900/40 to-zinc-900/80 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 mb-16 text-xs text-zinc-400 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>100% Real Fruit · Keep refrigerated at 2°C – 4°C · Shake well before opening</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400 shrink-0">
            <Truck className="w-4 h-4 text-amber-400" />
            <span>Fast Local Delivery</span>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Juiceur. All rights reserved.</span>
            <span>·</span>
            <span>Made with Real Fruit</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="tel:9074395959" className="hover:text-zinc-300 transition-colors">
              +91 9074395959
            </a>
            <a
              href="https://instagram.com/juiceurventures"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-300 transition-colors"
            >
              @juiceurventures
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
