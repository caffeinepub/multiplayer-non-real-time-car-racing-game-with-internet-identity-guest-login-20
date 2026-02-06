import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGuestSession } from './auth/useGuestSession';
import { RouterProvider, createRouter, createRootRoute, createRoute } from '@tanstack/react-router';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import GaragePage from './pages/GaragePage';
import MissionsPage from './pages/MissionsPage';
import TopUpPage from './pages/TopUpPage';
import RaceLobbyPage from './pages/RaceLobbyPage';
import GameLayout from './components/GameLayout';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';

function RootComponent() {
  const { identity } = useInternetIdentity();
  const { guestId } = useGuestSession();
  const isAuthenticated = !!identity || !!guestId;

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return <GameLayout />;
}

const rootRoute = createRootRoute({
  component: RootComponent
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage
});

const garageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/garage',
  component: GaragePage
});

const missionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/missions',
  component: MissionsPage
});

const topUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/topup',
  component: TopUpPage
});

const raceLobbyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/race',
  component: RaceLobbyPage
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  garageRoute,
  missionsRoute,
  topUpRoute,
  raceLobbyRoute
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
