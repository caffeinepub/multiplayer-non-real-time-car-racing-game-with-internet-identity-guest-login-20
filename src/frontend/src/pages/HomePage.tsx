import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, Trophy, CreditCard, Flag, Zap } from 'lucide-react';
import PlayerProgress from '../components/PlayerProgress';
import { useLeaderboard } from '../hooks/useQueries';

export default function HomePage() {
  const { data: leaderboard } = useLeaderboard();

  return (
    <div className="space-y-8">
      <section className="text-center space-y-4 py-8">
        <h1 className="text-5xl font-bold gold-glow">Welcome to Luxury Racing</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Compete in thrilling multiplayer races, collect luxury cars, and climb the leaderboard
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        <PlayerProgress />
        
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Top Racers
            </CardTitle>
            <CardDescription>Current leaderboard standings</CardDescription>
          </CardHeader>
          <CardContent>
            {leaderboard && leaderboard.length > 0 ? (
              <div className="space-y-2">
                {leaderboard.slice(0, 5).map(([name, score], index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-primary w-6">#{index + 1}</span>
                      <span className="font-medium">{name}</span>
                    </div>
                    <span className="text-muted-foreground">{Number(score).toLocaleString()} pts</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No racers yet. Be the first to compete!
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/race">
            <Card className="card-hover cursor-pointer h-full border-2 hover:border-primary">
              <CardHeader>
                <Flag className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Start Racing</CardTitle>
                <CardDescription>Join or create a race lobby</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/garage">
            <Card className="card-hover cursor-pointer h-full border-2 hover:border-primary">
              <CardHeader>
                <Car className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Garage</CardTitle>
                <CardDescription>View and unlock luxury cars</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/missions">
            <Card className="card-hover cursor-pointer h-full border-2 hover:border-primary">
              <CardHeader>
                <Zap className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Missions</CardTitle>
                <CardDescription>Complete challenges for rewards</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/topup">
            <Card className="card-hover cursor-pointer h-full border-2 hover:border-primary">
              <CardHeader>
                <CreditCard className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Top Up</CardTitle>
                <CardDescription>Purchase diamond packs</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </section>
    </div>
  );
}
