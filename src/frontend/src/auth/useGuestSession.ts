import { useState, useEffect } from 'react';
import { getGuestId, createGuestSession, clearGuestSession } from './guestSession';

export function useGuestSession() {
  const [guestId, setGuestId] = useState<string | null>(null);

  useEffect(() => {
    setGuestId(getGuestId());
  }, []);

  const startGuestSession = () => {
    const id = createGuestSession();
    setGuestId(id);
    return id;
  };

  const endGuestSession = () => {
    clearGuestSession();
    setGuestId(null);
  };

  return {
    guestId,
    startGuestSession,
    endGuestSession,
    isGuest: !!guestId
  };
}
