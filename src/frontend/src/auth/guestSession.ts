const GUEST_ID_KEY = 'racing_game_guest_id';

function generateGuestId(): string {
  return `guest_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

export function getGuestId(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(GUEST_ID_KEY);
}

export function createGuestSession(): string {
  const guestId = generateGuestId();
  localStorage.setItem(GUEST_ID_KEY, guestId);
  return guestId;
}

export function clearGuestSession(): void {
  localStorage.removeItem(GUEST_ID_KEY);
}

export function getOrCreateGuestId(): string {
  const existing = getGuestId();
  if (existing) return existing;
  return createGuestSession();
}
