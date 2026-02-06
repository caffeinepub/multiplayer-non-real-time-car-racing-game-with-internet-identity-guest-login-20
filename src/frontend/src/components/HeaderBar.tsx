import { useAuthMode } from '../auth/useAuthMode';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut } from 'lucide-react';
import CurrencyBalances from './CurrencyBalances';

export default function HeaderBar() {
  const { displayName, signOut, mode } = useAuthMode();

  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img 
            src="/assets/generated/logo.dim_512x512.png" 
            alt="Racing Logo" 
            className="h-10 w-10"
          />
          <h1 className="text-2xl font-bold gold-glow">Luxury Racing</h1>
        </div>
        
        <div className="flex items-center gap-6">
          <CurrencyBalances />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <User className="h-4 w-4" />
                {displayName}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                {mode === 'ii' ? 'Internet Identity' : 'Guest Mode'}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut} className="gap-2">
                <LogOut className="h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
