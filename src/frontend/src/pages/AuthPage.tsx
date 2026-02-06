import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGuestSession } from '../auth/useGuestSession';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, User, Shield } from 'lucide-react';

export default function AuthPage() {
  const { login, isLoggingIn } = useInternetIdentity();
  const { startGuestSession } = useGuestSession();

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(/assets/generated/racing-bg.dim_1920x1080.png)'
      }}
    >
      <div className="w-full max-w-md space-y-6 animate-fade-in">
        <div className="text-center space-y-2">
          <img 
            src="/assets/generated/logo.dim_512x512.png" 
            alt="Racing Logo" 
            className="h-24 w-24 mx-auto mb-4"
          />
          <h1 className="text-4xl font-bold gold-glow">Luxury Racing</h1>
          <p className="text-muted-foreground">
            Experience the thrill of multiplayer racing
          </p>
        </div>

        <Card className="border-2">
          <CardHeader>
            <CardTitle>Choose Your Login</CardTitle>
            <CardDescription>
              Sign in with Internet Identity or continue as a guest
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              onClick={login}
              disabled={isLoggingIn}
              className="w-full gap-2"
              size="lg"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Shield className="h-5 w-5" />
                  Sign in with Internet Identity
                </>
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            <Button 
              onClick={startGuestSession}
              variant="outline"
              className="w-full gap-2"
              size="lg"
            >
              <User className="h-5 w-5" />
              Continue as Guest
            </Button>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          Guest mode saves progress locally on this device only
        </p>
      </div>
    </div>
  );
}
