import { MISSIONS } from '../gameData/missions';
import { getLocalProfile, updateLocalGold, saveLocalProfile } from '../api/playerApi';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Check, Clock, Star } from 'lucide-react';
import { toast } from 'sonner';

export default function MissionsPage() {
  const [profile, setProfile] = useState(getLocalProfile());
  const [completedMissions, setCompletedMissions] = useState<Set<string>>(new Set());

  const handleClaimReward = (missionId: string, reward: number) => {
    updateLocalGold(reward);
    setCompletedMissions(prev => new Set([...prev, missionId]));
    
    const updatedProfile = getLocalProfile();
    updatedProfile.missionsCompleted += 1;
    saveLocalProfile(updatedProfile);
    setProfile(updatedProfile);
    
    toast.success(`Claimed ${reward.toLocaleString()} gold!`);
  };

  const getMissionProgress = (mission: typeof MISSIONS[0]) => {
    switch (mission.id) {
      case 'daily_race_1':
      case 'daily_race_3':
      case 'weekly_race_10':
      case 'achievement_races_50':
        return Math.min(profile.racesParticipated, mission.targetCount);
      case 'daily_win_1':
      case 'weekly_win_5':
      case 'achievement_wins_25':
        return Math.min(profile.racesWon, mission.targetCount);
      case 'achievement_cars_10':
        return Math.min(profile.ownedCars.length, mission.targetCount);
      default:
        return 0;
    }
  };

  const dailyMissions = MISSIONS.filter(m => m.type === 'daily');
  const weeklyMissions = MISSIONS.filter(m => m.type === 'weekly');
  const achievementMissions = MISSIONS.filter(m => m.type === 'achievement');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold gold-glow mb-2">Missions</h1>
        <p className="text-muted-foreground">
          Complete missions to earn gold and level up
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Missions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{profile.missionsCompleted}</div>
            <p className="text-xs text-muted-foreground mt-1">Completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Races Won</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{profile.racesWon}</div>
            <p className="text-xs text-muted-foreground mt-1">Victories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Cars Owned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{profile.ownedCars.length}</div>
            <p className="text-xs text-muted-foreground mt-1">In Garage</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="daily" className="w-full">
        <TabsList>
          <TabsTrigger value="daily">
            <Clock className="h-4 w-4 mr-2" />
            Daily
          </TabsTrigger>
          <TabsTrigger value="weekly">
            <Star className="h-4 w-4 mr-2" />
            Weekly
          </TabsTrigger>
          <TabsTrigger value="achievements">
            <Trophy className="h-4 w-4 mr-2" />
            Achievements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="mt-6 space-y-4">
          {dailyMissions.map(mission => (
            <MissionCard 
              key={mission.id}
              mission={mission}
              progress={getMissionProgress(mission)}
              isCompleted={completedMissions.has(mission.id)}
              onClaim={() => handleClaimReward(mission.id, mission.rewardGold)}
            />
          ))}
        </TabsContent>

        <TabsContent value="weekly" className="mt-6 space-y-4">
          {weeklyMissions.map(mission => (
            <MissionCard 
              key={mission.id}
              mission={mission}
              progress={getMissionProgress(mission)}
              isCompleted={completedMissions.has(mission.id)}
              onClaim={() => handleClaimReward(mission.id, mission.rewardGold)}
            />
          ))}
        </TabsContent>

        <TabsContent value="achievements" className="mt-6 space-y-4">
          {achievementMissions.map(mission => (
            <MissionCard 
              key={mission.id}
              mission={mission}
              progress={getMissionProgress(mission)}
              isCompleted={completedMissions.has(mission.id)}
              onClaim={() => handleClaimReward(mission.id, mission.rewardGold)}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function MissionCard({ 
  mission, 
  progress, 
  isCompleted, 
  onClaim 
}: { 
  mission: typeof MISSIONS[0];
  progress: number;
  isCompleted: boolean;
  onClaim: () => void;
}) {
  const progressPercent = (progress / mission.targetCount) * 100;
  const canClaim = progress >= mission.targetCount && !isCompleted;

  return (
    <Card className={canClaim ? 'border-primary' : ''}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{mission.title}</CardTitle>
            <CardDescription>{mission.description}</CardDescription>
          </div>
          <Badge variant={mission.type === 'achievement' ? 'default' : 'secondary'}>
            {mission.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{progress} / {mission.targetCount}</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/assets/generated/icon-gold.dim_256x256.png" alt="Gold" className="h-5 w-5" />
            <span className="font-semibold">{mission.rewardGold.toLocaleString()}</span>
          </div>

          {isCompleted ? (
            <Button disabled variant="outline" size="sm">
              <Check className="h-4 w-4 mr-2" />
              Claimed
            </Button>
          ) : canClaim ? (
            <Button onClick={onClaim} size="sm">
              Claim Reward
            </Button>
          ) : (
            <Button disabled variant="ghost" size="sm">
              In Progress
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
