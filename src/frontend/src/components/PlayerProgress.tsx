import { getLocalProfile } from '../api/playerApi';
import { useAuthMode } from '../auth/useAuthMode';
import { usePlayerProfile } from '../hooks/useQueries';
import { Progress } from '@/components/ui/progress';
import { Trophy } from 'lucide-react';

export default function PlayerProgress() {
  const { mode } = useAuthMode();
  const { data: backendProfile } = usePlayerProfile();
  const localProfile = getLocalProfile();

  const level = mode === 'ii' && backendProfile 
    ? Number(backendProfile.level) 
    : localProfile.level;
    
  const racesWon = mode === 'ii' && backendProfile 
    ? Number(backendProfile.racesWon) 
    : localProfile.racesWon;
    
  const racesParticipated = mode === 'ii' && backendProfile 
    ? Number(backendProfile.racesParticipated) 
    : localProfile.racesParticipated;

  const xpProgress = ((level - 1) * 20) % 100;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
          <Trophy className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Level {level}</h3>
          <p className="text-sm text-muted-foreground">
            {racesWon} wins / {racesParticipated} races
          </p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progress to Level {level + 1}</span>
          <span className="font-medium">{xpProgress}%</span>
        </div>
        <Progress value={xpProgress} className="h-2" />
      </div>
    </div>
  );
}
