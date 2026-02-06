export interface DiamondPack {
  id: string;
  name: string;
  diamonds: number;
  displayPrice: string;
  bonus?: string;
}

export const DIAMOND_PACKS: DiamondPack[] = [
  {
    id: 'starter',
    name: 'Starter Pack',
    diamonds: 100,
    displayPrice: '$4.99'
  },
  {
    id: 'popular',
    name: 'Popular Pack',
    diamonds: 500,
    displayPrice: '$19.99',
    bonus: '+50 Bonus'
  },
  {
    id: 'premium',
    name: 'Premium Pack',
    diamonds: 1200,
    displayPrice: '$39.99',
    bonus: '+200 Bonus'
  },
  {
    id: 'ultimate',
    name: 'Ultimate Pack',
    diamonds: 3000,
    displayPrice: '$89.99',
    bonus: '+700 Bonus'
  }
];
