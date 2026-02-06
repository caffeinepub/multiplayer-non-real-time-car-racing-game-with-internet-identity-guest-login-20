import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Profile {
    ownedCars: Array<bigint>;
    selectedCar?: bigint;
    displayName: string;
    diamonds: bigint;
    racesWon: bigint;
    gold: bigint;
    racesParticipated: bigint;
    level: bigint;
    score: bigint;
    missionsCompleted: bigint;
}
export interface backendInterface {
    createProfile(displayName: string): Promise<void>;
    getAllLuxuryCars(): Promise<Array<{
        id: bigint;
        unlockWithGold: bigint;
        name: string;
        speed: bigint;
        acceleration: bigint;
        rarity: string;
        handling: bigint;
        unlockWithDiamonds: bigint;
    }>>;
    getLeaderboard(): Promise<Array<[string, bigint]>>;
    getPlayerProfile(player: Principal): Promise<Profile>;
    purchaseLuxuryCar(carId: bigint): Promise<void>;
    selectLuxuryCar(carId: bigint): Promise<void>;
}
