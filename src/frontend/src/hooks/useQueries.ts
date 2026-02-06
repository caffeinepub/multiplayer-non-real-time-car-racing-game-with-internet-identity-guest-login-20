import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useAuthMode } from '../auth/useAuthMode';
import type { Profile } from '../backend';
import { Principal } from '@icp-sdk/core/principal';

export function usePlayerProfile() {
  const { actor, isFetching } = useActor();
  const { mode } = useAuthMode();

  return useQuery<Profile | null>({
    queryKey: ['profile', mode],
    queryFn: async () => {
      if (!actor || mode === 'guest') return null;
      try {
        const principal = await actor.getPlayerProfile(Principal.fromText('2vxsx-fae'));
        return principal;
      } catch (error) {
        return null;
      }
    },
    enabled: !!actor && !isFetching && mode === 'ii'
  });
}

export function useCreateProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (displayName: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.createProfile(displayName);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    }
  });
}

export function useAllCars() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['cars'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllLuxuryCars();
    },
    enabled: !!actor && !isFetching
  });
}

export function usePurchaseCar() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (carId: number) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.purchaseLuxuryCar(BigInt(carId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    }
  });
}

export function useSelectCar() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (carId: number) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.selectLuxuryCar(BigInt(carId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    }
  });
}

export function useLeaderboard() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLeaderboard();
    },
    enabled: !!actor && !isFetching
  });
}
