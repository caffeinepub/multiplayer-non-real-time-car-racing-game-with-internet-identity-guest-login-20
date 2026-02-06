export interface LuxuryCar {
  id: number;
  name: string;
  rarity: string;
  speed: number;
  acceleration: number;
  handling: number;
  unlockWithGold: number;
  unlockWithDiamonds: number;
  imagePath: string;
}

export const LUXURY_CARS: LuxuryCar[] = [
  {
    id: 1,
    name: "Lamborghini Aventador",
    rarity: "Legendary",
    speed: 95,
    acceleration: 90,
    handling: 85,
    unlockWithGold: 500000,
    unlockWithDiamonds: 0,
    imagePath: "/assets/generated/car-01.dim_512x256.png"
  },
  {
    id: 2,
    name: "Bugatti Chiron",
    rarity: "Legendary",
    speed: 100,
    acceleration: 95,
    handling: 90,
    unlockWithGold: 0,
    unlockWithDiamonds: 1000,
    imagePath: "/assets/generated/car-02.dim_512x256.png"
  },
  {
    id: 3,
    name: "Ferrari LaFerrari",
    rarity: "Epic",
    speed: 92,
    acceleration: 88,
    handling: 84,
    unlockWithGold: 400000,
    unlockWithDiamonds: 0,
    imagePath: "/assets/generated/car-03.dim_512x256.png"
  },
  {
    id: 4,
    name: "Porsche 911 Turbo S",
    rarity: "Epic",
    speed: 90,
    acceleration: 85,
    handling: 95,
    unlockWithGold: 350000,
    unlockWithDiamonds: 0,
    imagePath: "/assets/generated/car-04.dim_512x256.png"
  },
  {
    id: 5,
    name: "McLaren P1",
    rarity: "Legendary",
    speed: 98,
    acceleration: 93,
    handling: 89,
    unlockWithGold: 0,
    unlockWithDiamonds: 900,
    imagePath: "/assets/generated/car-05.dim_512x256.png"
  },
  {
    id: 6,
    name: "Rolls-Royce Phantom",
    rarity: "Luxury",
    speed: 70,
    acceleration: 65,
    handling: 80,
    unlockWithGold: 1500000,
    unlockWithDiamonds: 0,
    imagePath: "/assets/generated/car-06.dim_512x256.png"
  },
  {
    id: 7,
    name: "Bentley Continental GT",
    rarity: "Luxury",
    speed: 80,
    acceleration: 75,
    handling: 85,
    unlockWithGold: 900000,
    unlockWithDiamonds: 0,
    imagePath: "/assets/generated/car-07.dim_512x256.png"
  },
  {
    id: 8,
    name: "Aston Martin DB11",
    rarity: "Luxury",
    speed: 85,
    acceleration: 80,
    handling: 87,
    unlockWithGold: 800000,
    unlockWithDiamonds: 0,
    imagePath: "/assets/generated/car-08.dim_512x256.png"
  },
  {
    id: 9,
    name: "Mercedes-Benz S-Class",
    rarity: "Luxury",
    speed: 75,
    acceleration: 70,
    handling: 83,
    unlockWithGold: 550000,
    unlockWithDiamonds: 0,
    imagePath: "/assets/generated/car-09.dim_512x256.png"
  },
  {
    id: 10,
    name: "Tesla Model S Plaid",
    rarity: "Luxury",
    speed: 88,
    acceleration: 100,
    handling: 92,
    unlockWithGold: 600000,
    unlockWithDiamonds: 0,
    imagePath: "/assets/generated/car-10.dim_512x256.png"
  },
  {
    id: 11,
    name: "BMW M8 Competition",
    rarity: "Luxury",
    speed: 78,
    acceleration: 73,
    handling: 85,
    unlockWithGold: 500000,
    unlockWithDiamonds: 0,
    imagePath: "/assets/generated/car-11.dim_512x256.png"
  },
  {
    id: 12,
    name: "Audi RS7",
    rarity: "Luxury",
    speed: 82,
    acceleration: 77,
    handling: 84,
    unlockWithGold: 340000,
    unlockWithDiamonds: 0,
    imagePath: "/assets/generated/car-01.dim_512x256.png"
  },
  {
    id: 13,
    name: "Jaguar F-Type R",
    rarity: "Luxury",
    speed: 83,
    acceleration: 78,
    handling: 86,
    unlockWithGold: 300000,
    unlockWithDiamonds: 0,
    imagePath: "/assets/generated/car-02.dim_512x256.png"
  },
  {
    id: 14,
    name: "Lexus LC 500",
    rarity: "Luxury",
    speed: 77,
    acceleration: 72,
    handling: 85,
    unlockWithGold: 270000,
    unlockWithDiamonds: 0,
    imagePath: "/assets/generated/car-03.dim_512x256.png"
  },
  {
    id: 15,
    name: "Genesis G90",
    rarity: "Luxury",
    speed: 72,
    acceleration: 68,
    handling: 82,
    unlockWithGold: 250000,
    unlockWithDiamonds: 0,
    imagePath: "/assets/generated/car-04.dim_512x256.png"
  },
  {
    id: 16,
    name: "Cadillac CT6",
    rarity: "Luxury",
    speed: 75,
    acceleration: 70,
    handling: 83,
    unlockWithGold: 240000,
    unlockWithDiamonds: 0,
    imagePath: "/assets/generated/car-05.dim_512x256.png"
  },
  {
    id: 17,
    name: "Maserati Quattroporte",
    rarity: "Luxury",
    speed: 79,
    acceleration: 74,
    handling: 85,
    unlockWithGold: 260000,
    unlockWithDiamonds: 0,
    imagePath: "/assets/generated/car-06.dim_512x256.png"
  },
  {
    id: 18,
    name: "Infiniti Q70L",
    rarity: "Luxury",
    speed: 73,
    acceleration: 69,
    handling: 83,
    unlockWithGold: 220000,
    unlockWithDiamonds: 0,
    imagePath: "/assets/generated/car-07.dim_512x256.png"
  },
  {
    id: 19,
    name: "Lincoln Continental",
    rarity: "Luxury",
    speed: 71,
    acceleration: 66,
    handling: 81,
    unlockWithGold: 230000,
    unlockWithDiamonds: 0,
    imagePath: "/assets/generated/car-08.dim_512x256.png"
  },
  {
    id: 20,
    name: "Acura RLX",
    rarity: "Luxury",
    speed: 74,
    acceleration: 70,
    handling: 82,
    unlockWithGold: 210000,
    unlockWithDiamonds: 0,
    imagePath: "/assets/generated/car-09.dim_512x256.png"
  }
];

export function getCarById(id: number): LuxuryCar | undefined {
  return LUXURY_CARS.find(car => car.id === id);
}
