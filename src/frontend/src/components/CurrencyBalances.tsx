import { getLocalProfile } from '../api/playerApi';
import { useAuthMode } from '../auth/useAuthMode';
import { usePlayerProfile } from '../hooks/useQueries';
import { useEffect, useState } from 'react';

export default function CurrencyBalances() {
  const { mode } = useAuthMode();
  const { data: backendProfile } = usePlayerProfile();
  const [localProfile, setLocalProfile] = useState(getLocalProfile());

  useEffect(() => {
    if (mode === 'guest') {
      const interval = setInterval(() => {
        setLocalProfile(getLocalProfile());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [mode]);

  const gold = mode === 'ii' && backendProfile 
    ? Number(backendProfile.gold) 
    : localProfile.gold;
    
  const diamonds = mode === 'ii' && backendProfile 
    ? Number(backendProfile.diamonds) 
    : localProfile.diamonds;

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-md">
        <img 
          src="/assets/generated/icon-gold.dim_256x256.png" 
          alt="Gold" 
          className="h-5 w-5"
        />
        <span className="font-semibold text-sm">{gold.toLocaleString()}</span>
      </div>
      
      <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-md">
        <img 
          src="/assets/generated/icon-diamond.dim_256x256.png" 
          alt="Diamonds" 
          className="h-5 w-5"
        />
        <span className="font-semibold text-sm">{diamonds.toLocaleString()}</span>
      </div>
    </div>
  );
}
