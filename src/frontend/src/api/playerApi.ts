import { getOrCreateGuestId } from '../auth/guestSession';

export interface LocalProfile {
  displayName: string;
  level: number;
  gold: number;
  diamonds: number;
  ownedCars: number[];
  selectedCar: number | null;
  racesWon: number;
  racesParticipated: number;
  missionsCompleted: number;
  score: number;
}

const PROFILE_KEY = 'racing_game_profile';

function getDefaultProfile(): LocalProfile {
  return {
    displayName: 'Guest',
    level: 1,
    gold: 100000,
    diamonds: 0,
    ownedCars: [],
    selectedCar: null,
    racesWon: 0,
    racesParticipated: 0,
    missionsCompleted: 0,
    score: 0
  };
}

export function getLocalProfile(): LocalProfile {
  const guestId = getOrCreateGuestId();
  const key = `${PROFILE_KEY}_${guestId}`;
  const stored = localStorage.getItem(key);
  if (stored) {
    return JSON.parse(stored);
  }
  const defaultProfile = getDefaultProfile();
  localStorage.setItem(key, JSON.stringify(defaultProfile));
  return defaultProfile;
}

export function saveLocalProfile(profile: LocalProfile): void {
  const guestId = getOrCreateGuestId();
  const key = `${PROFILE_KEY}_${guestId}`;
  localStorage.setItem(key, JSON.stringify(profile));
}

export function updateLocalGold(amount: number): void {
  const profile = getLocalProfile();
  profile.gold += amount;
  saveLocalProfile(profile);
}

export function updateLocalDiamonds(amount: number): void {
  const profile = getLocalProfile();
  profile.diamonds += amount;
  saveLocalProfile(profile);
}

export function purchaseLocalCar(carId: number, goldCost: number, diamondCost: number): boolean {
  const profile = getLocalProfile();
  
  if (profile.ownedCars.includes(carId)) {
    return false;
  }
  
  if (goldCost > 0 && profile.gold < goldCost) {
    return false;
  }
  
  if (diamondCost > 0 && profile.diamonds < diamondCost) {
    return false;
  }
  
  if (goldCost > 0) {
    profile.gold -= goldCost;
  }
  
  if (diamondCost > 0) {
    profile.diamonds -= diamondCost;
  }
  
  profile.ownedCars.push(carId);
  saveLocalProfile(profile);
  return true;
}

export function selectLocalCar(carId: number): boolean {
  const profile = getLocalProfile();
  
  if (!profile.ownedCars.includes(carId)) {
    return false;
  }
  
  profile.selectedCar = carId;
  saveLocalProfile(profile);
  return true;
}
