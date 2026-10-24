/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MangoSection } from './components/MangoSection';
import { GrapeSection } from './components/GrapeSection';
import { ContactSection } from './components/ContactSection';
import { NutritionModal } from './components/NutritionModal';
import { AmbientCanvas } from './components/AmbientCanvas';
import { Product } from './types';
import { MessageCircle } from 'lucide-react';
import { soundManager } from './utils/audio';

export default function App() {
  const [activeNutritionProduct, setActiveNutritionProduct] = useState<Product | null>(null);

  const handleOpenNutrition = (prod: Product) => {
    setActiveNutritionProduct(prod);
  };

  const handleCloseNutrition = () => {
    setActiveNutritionProduct(null);
  };

  return (
    <div className="min-h-screen bg-[#08090d] text-zinc-100 selection:bg-amber-400 selection:text-black">
      {/* Ambient background particles */}
      <AmbientCanvas />

      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        {/* Section 1: Hero / Landing with ONLY the Juiceur logo centered */}
        <HeroSection />

        {/* Section 2: Mango Juice Showcase */}
        <MangoSection onOpenNutrition={handleOpenNutrition} />

        {/* Section 3: Grape Juice Showcase */}
        <GrapeSection onOpenNutrition={handleOpenNutrition} />

        {/* Section 4: Final Contact & Order Page */}
        <ContactSection />
      </main>

      {/* Nutrition / Purity Modal */}
      <NutritionModal
        product={activeNutritionProduct}
        onClose={handleCloseNutrition}
      />

      {/* Persistent Floating Quick WhatsApp Trigger (Bottom Right) */}
      <aside aria-label="Direct order support" className="fixed bottom-6 right-6 z-40">
        <a
          href="https://wa.me/919074395959?text=Hello%20Juiceur%2C%20I%20would%20like%20to%20place%20an%20order!"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => soundManager.playDrop()}
          title="Chat directly on WhatsApp"
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold shadow-xl shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95 border border-emerald-300/40"
        >
          <MessageCircle className="w-5 h-5 fill-black text-transparent" />
          <span className="hidden sm:inline text-xs uppercase tracking-wider font-extrabold">
            Quick Order
          </span>
        </a>
      </aside>
    </div>
  );
}
