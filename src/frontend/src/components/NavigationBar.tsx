import { Link, useRouterState } from '@tanstack/react-router';
import { Home, Car, Trophy, CreditCard, Flag } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/garage', label: 'Garage', icon: Car },
  { path: '/missions', label: 'Missions', icon: Trophy },
  { path: '/race', label: 'Race', icon: Flag },
  { path: '/topup', label: 'Top Up', icon: CreditCard }
];

export default function NavigationBar() {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-1 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap',
                  'hover:text-primary hover:bg-accent/50',
                  isActive 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-muted-foreground'
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
