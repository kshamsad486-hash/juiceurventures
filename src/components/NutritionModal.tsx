import React from 'react';
import { X, Check, ShieldCheck, Sparkles, MessageCircle } from 'lucide-react';
import { Product } from '../types';
import { soundManager } from '../utils/audio';

interface NutritionModalProps {
  product: Product | null;
  onClose: () => void;
}

export const NutritionModal: React.FC<NutritionModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  const isMango = product.id === 'mango';
  const accentColor = isMango ? 'text-amber-400' : 'text-purple-400';
  const borderCol = isMango ? 'border-amber-500/30' : 'border-purple-500/30';
  const btnGradient = isMango
    ? 'from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black'
    : 'from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className={`relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#10121a] border ${borderCol} p-6 sm:p-8 shadow-2xl text-zinc-200`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => {
            soundManager.playPop();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-xl bg-zinc-900 border border-white/10 p-1.5 flex items-center justify-center shrink-0">
            <img src={product.image} alt={product.nameEn} className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-extrabold text-2xl text-white tracking-wide">
                {product.nameEn}
              </h3>
              <span className={`font-arabic text-xl font-bold ${accentColor}`}>
                {product.nameAr}
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              {product.subtext} · {product.volume}
            </p>
          </div>
        </div>

        {/* Badges / Guarantees */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6 text-xs font-medium">
          {product.features.map((feat) => (
            <div
              key={feat}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-900/80 border border-white/5 text-zinc-300"
            >
              <Check className={`w-3.5 h-3.5 shrink-0 ${accentColor}`} />
              <span className="truncate">{feat}</span>
            </div>
          ))}
        </div>

        {/* Nutrition Facts Table */}
        <div className="mb-6 rounded-xl bg-zinc-900/60 border border-white/5 p-4">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10">
            <span className="text-xs uppercase tracking-wider font-semibold text-zinc-400">
              Nutritional Values
            </span>
            <span className="text-xs text-zinc-500">Per Serving ({product.volume})</span>
          </div>

          <div className="divide-y divide-white/5 text-sm">
            <div className="flex justify-between py-1.5">
              <span className="text-zinc-400">Energy Value</span>
              <span className="font-semibold text-zinc-100 tabular-nums">{product.nutrition.energy}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-zinc-400">Carbohydrates</span>
              <span className="font-semibold text-zinc-100 tabular-nums">{product.nutrition.carbs}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-zinc-400">Dietary Fiber</span>
              <span className="font-semibold text-zinc-100 tabular-nums">{product.nutrition.fiber}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-zinc-400">Protein</span>
              <span className="font-semibold text-zinc-100 tabular-nums">{product.nutrition.protein}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-zinc-400">Vitamin C</span>
              <span className={`font-semibold tabular-nums ${accentColor}`}>{product.nutrition.vitaminC}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-zinc-400">Total Fat</span>
              <span className="font-semibold text-zinc-100 tabular-nums">{product.nutrition.fat}</span>
            </div>
          </div>
        </div>

        {/* Ingredients & Pure Promise */}
        <div className="mb-6 text-xs leading-relaxed space-y-2">
          <div className="flex items-start gap-2">
            <Sparkles className={`w-4 h-4 mt-0.5 shrink-0 ${accentColor}`} />
            <div>
              <span className="font-semibold text-zinc-300">Pure Ingredients: </span>
              <span className="text-zinc-400">{product.ingredients.join(', ')}.</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 mt-0.5 shrink-0 text-emerald-400" />
            <div>
              <span className="font-semibold text-zinc-300">Storage & Freshness: </span>
              <span className="text-zinc-400">Keep refrigerated between 2°C – 4°C. Shake vigorously before opening to blend real fruit pulp. Consume within 48 hours after opening.</span>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <a
          href={`https://wa.me/919074395959?text=${encodeURIComponent(product.whatsappText)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => soundManager.playDrop()}
          className={`w-full py-3 px-5 rounded-xl font-bold flex items-center justify-center gap-2.5 bg-gradient-to-r ${btnGradient} transition-transform active:scale-98 shadow-lg shadow-black/50`}
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span>Order {product.nameEn} on WhatsApp</span>
        </a>
      </div>
    </div>
  );
};
