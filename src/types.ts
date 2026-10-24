export interface Product {
  id: 'mango' | 'grape';
  nameEn: string;
  nameAr: string;
  tagline: string;
  subtext: string;
  volume: string;
  image: string;
  themeColor: {
    primary: string;
    secondary: string;
    accent: string;
    glow: string;
    gradient: string;
    border: string;
  };
  features: string[];
  ingredients: string[];
  nutrition: {
    energy: string;
    carbs: string;
    fiber: string;
    protein: string;
    vitaminC: string;
    fat: string;
  };
  whatsappText: string;
}

export const PRODUCTS: Record<'mango' | 'grape', Product> = {
  mango: {
    id: 'mango',
    nameEn: 'MANGO JUICE',
    nameAr: 'عصير مانجو',
    tagline: 'Squeezed & Sip The Real Fruit',
    subtext: 'Made with Real Mango',
    volume: '260 ml',
    image: '/assets/aistudio/mango-juice_096fe45b.png',
    themeColor: {
      primary: '#f59e0b',
      secondary: '#fbbf24',
      accent: '#ea580c',
      glow: 'rgba(245, 158, 11, 0.35)',
      gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
      border: 'border-amber-500/30',
    },
    features: ['100% Natural', 'Vegan Certified', 'Cold Squeezed', 'Real Fruit Pulp', 'Zero Preservatives'],
    ingredients: ['100% Fresh Alphonso & Totapuri Mango Pulp', 'Filtered Water', 'Natural Lemon Extract'],
    nutrition: {
      energy: '58 kcal / 100ml',
      carbs: '14.2 g',
      fiber: '1.8 g (Natural Fruit Fiber)',
      protein: '0.6 g',
      vitaminC: '45% Daily Value',
      fat: '0.1 g',
    },
    whatsappText: 'Hello Juiceur, I would like to order Mango Juice (260 ml)!',
  },
  grape: {
    id: 'grape',
    nameEn: 'GRAPE JUICE',
    nameAr: 'عصير العنب',
    tagline: 'Squeezed & Sip The Real Fruit',
    subtext: 'Made with Real Grapes',
    volume: '260 ml',
    image: '/assets/aistudio/grape-juice_ca52a340.png',
    themeColor: {
      primary: '#a855f7',
      secondary: '#c084fc',
      accent: '#7e22ce',
      glow: 'rgba(168, 85, 247, 0.35)',
      gradient: 'from-purple-600/20 via-fuchsia-600/10 to-transparent',
      border: 'border-purple-500/30',
    },
    features: ['100% Natural', 'Vegan Certified', 'Rich in Antioxidants', '100% Cold-Pressed', 'Zero Preservatives'],
    ingredients: ['100% Crushed Red Globe & Concord Grapes', 'Filtered Water', 'Natural Grape Skin Polyphenols'],
    nutrition: {
      energy: '62 kcal / 100ml',
      carbs: '15.4 g',
      fiber: '1.2 g (Natural Fruit Fiber)',
      protein: '0.5 g',
      vitaminC: '30% Daily Value',
      fat: '0.0 g',
    },
    whatsappText: 'Hello Juiceur, I would like to order Grape Juice (260 ml)!',
  },
};
