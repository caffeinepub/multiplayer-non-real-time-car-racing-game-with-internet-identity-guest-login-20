import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGuestSession } from './useGuestSession';

export type AuthMode = 'ii' | 'guest' | 'none';

export function useAuthMode() {
  const { identity, clear: clearII } = useInternetIdentity();
  const { guestId, endGuestSession } = useGuestSession();

  const mode: AuthMode = identity ? 'ii' : guestId ? 'guest' : 'none';
  
  const displayName = identity 
    ? identity.getPrincipal().toString().substring(0, 8) + '...'
    : guestId 
    ? 'Guest'
    : '';

  const signOut = () => {
    if (identity) {
      clearII();
    }
    if (guestId) {
      endGuestSession();
    }
  };

  return {
    mode,
    displayName,
    signOut,
    isAuthenticated: mode !== 'none'
  };
}
