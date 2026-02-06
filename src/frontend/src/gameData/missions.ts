export interface Mission {
  id: string;
  title: string;
  description: string;
  targetCount: number;
  rewardGold: number;
  type: 'daily' | 'weekly' | 'achievement';
}

export const MISSIONS: Mission[] = [
  {
    id: 'daily_race_1',
    title: 'First Race of the Day',
    description: 'Complete 1 race today',
    targetCount: 1,
    rewardGold: 5000,
    type: 'daily'
  },
  {
    id: 'daily_race_3',
    title: 'Racing Enthusiast',
    description: 'Complete 3 races today',
    targetCount: 3,
    rewardGold: 15000,
    type: 'daily'
  },
  {
    id: 'daily_win_1',
    title: 'Victory Lap',
    description: 'Win 1 race today',
    targetCount: 1,
    rewardGold: 10000,
    type: 'daily'
  },
  {
    id: 'weekly_race_10',
    title: 'Weekly Warrior',
    description: 'Complete 10 races this week',
    targetCount: 10,
    rewardGold: 50000,
    type: 'weekly'
  },
  {
    id: 'weekly_win_5',
    title: 'Champion of the Week',
    description: 'Win 5 races this week',
    targetCount: 5,
    rewardGold: 75000,
    type: 'weekly'
  },
  {
    id: 'achievement_races_50',
    title: 'Veteran Racer',
    description: 'Complete 50 total races',
    targetCount: 50,
    rewardGold: 200000,
    type: 'achievement'
  },
  {
    id: 'achievement_wins_25',
    title: 'Master Champion',
    description: 'Win 25 total races',
    targetCount: 25,
    rewardGold: 300000,
    type: 'achievement'
  },
  {
    id: 'achievement_cars_10',
    title: 'Collector',
    description: 'Own 10 different cars',
    targetCount: 10,
    rewardGold: 100000,
    type: 'achievement'
  }
];
