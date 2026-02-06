import { Outlet } from '@tanstack/react-router';
import HeaderBar from './HeaderBar';
import NavigationBar from './NavigationBar';

export default function GameLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <HeaderBar />
      <NavigationBar />
      <main className="flex-1 container mx-auto px-4 py-6 animate-fade-in">
        <Outlet />
      </main>
      <footer className="border-t border-border py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2026. Built with ❤️ using{' '}
          <a 
            href="https://caffeine.ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </div>
      </footer>
    </div>
  );
}
