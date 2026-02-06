import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Flag, Users, Plus, LogIn, Trophy } from 'lucide-react';
import { toast } from 'sonner';

export default function RaceLobbyPage() {
  const [lobbyCode, setLobbyCode] = useState('');
  const [currentLobby, setCurrentLobby] = useState<string | null>(null);

  const handleCreateLobby = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setCurrentLobby(code);
    toast.success(`Lobby created! Code: ${code}`);
  };

  const handleJoinLobby = () => {
    if (!lobbyCode.trim()) {
      toast.error('Please enter a lobby code');
      return;
    }
    setCurrentLobby(lobbyCode.toUpperCase());
    toast.success('Joined lobby!');
  };

  if (currentLobby) {
    return <LobbyView lobbyCode={currentLobby} onLeave={() => setCurrentLobby(null)} />;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold gold-glow">Race Lobby</h1>
        <p className="text-muted-foreground">
          Create or join a lobby to start racing
        </p>
      </div>

      <Tabs defaultValue="create" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="create">Create Lobby</TabsTrigger>
          <TabsTrigger value="join">Join Lobby</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="mt-6">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                <Plus className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Create New Lobby</CardTitle>
              <CardDescription>
                Start a new race and invite other players
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-secondary/50 p-4 rounded-lg space-y-2">
                <div className="flex items-center gap-2">
                  <Flag className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Race Settings</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                  <li>• Turn-based racing mode</li>
                  <li>• 2-4 players per lobby</li>
                  <li>• 3 laps per race</li>
                </ul>
              </div>

              <Button onClick={handleCreateLobby} className="w-full" size="lg">
                <Plus className="h-5 w-5 mr-2" />
                Create Lobby
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="join" className="mt-6">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                <LogIn className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Join Existing Lobby</CardTitle>
              <CardDescription>
                Enter a lobby code to join a race
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Lobby Code</label>
                <Input 
                  placeholder="Enter 6-character code"
                  value={lobbyCode}
                  onChange={(e) => setLobbyCode(e.target.value.toUpperCase())}
                  maxLength={6}
                  className="text-center text-lg tracking-wider"
                />
              </div>

              <Button onClick={handleJoinLobby} className="w-full" size="lg">
                <LogIn className="h-5 w-5 mr-2" />
                Join Lobby
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="border-primary/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            How Racing Works
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">Turn-Based Racing:</strong> Each player submits their action for the current turn. Once all players are ready, the turn resolves and positions update.
          </p>
          <p>
            <strong className="text-foreground">Car Stats Matter:</strong> Your selected car's speed, acceleration, and handling affect your performance in each turn.
          </p>
          <p>
            <strong className="text-foreground">Win Rewards:</strong> Complete races to earn gold and XP. Win races for bonus rewards!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function LobbyView({ lobbyCode, onLeave }: { lobbyCode: string; onLeave: () => void }) {
  const [isReady, setIsReady] = useState(false);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gold-glow">Race Lobby</h1>
          <p className="text-muted-foreground">Lobby Code: <span className="font-mono font-bold text-foreground">{lobbyCode}</span></p>
        </div>
        <Button variant="outline" onClick={onLeave}>
          Leave Lobby
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Players (1/4)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">You</p>
                  <p className="text-xs text-muted-foreground">Host</p>
                </div>
              </div>
              <Badge variant={isReady ? 'default' : 'secondary'}>
                {isReady ? 'Ready' : 'Not Ready'}
              </Badge>
            </div>

            <div className="text-center py-8 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Waiting for other players to join...</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Race Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Mode</span>
                <span className="font-medium">Turn-Based</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Laps</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Max Players</span>
                <span className="font-medium">4</span>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <Button 
                onClick={() => setIsReady(!isReady)}
                variant={isReady ? 'outline' : 'default'}
                className="w-full"
              >
                {isReady ? 'Not Ready' : 'Ready Up'}
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              Race will start when all players are ready
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-muted/50">
        <CardContent className="p-4">
          <p className="text-sm text-center text-muted-foreground">
            <strong className="text-foreground">Note:</strong> This is a demonstration lobby. Full multiplayer functionality requires backend race state management.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
