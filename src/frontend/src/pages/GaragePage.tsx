import { useState } from 'react';
import { LUXURY_CARS } from '../gameData/luxuryCars';
import { getLocalProfile, purchaseLocalCar, selectLocalCar, saveLocalProfile } from '../api/playerApi';
import { useAuthMode } from '../auth/useAuthMode';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Lock, Check, Gauge, Zap, CircleDot } from 'lucide-react';
import { toast } from 'sonner';

export default function GaragePage() {
  const { mode } = useAuthMode();
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const [profile, setProfile] = useState(getLocalProfile());

  const refreshProfile = () => {
    setProfile(getLocalProfile());
  };

  const handlePurchase = (carId: number, goldCost: number, diamondCost: number) => {
    const success = purchaseLocalCar(carId, goldCost, diamondCost);
    if (success) {
      toast.success('Car purchased successfully!');
      refreshProfile();
      setSelectedCarId(null);
    } else {
      toast.error('Insufficient funds or car already owned');
    }
  };

  const handleSelect = (carId: number) => {
    const success = selectLocalCar(carId);
    if (success) {
      toast.success('Car selected!');
      refreshProfile();
    } else {
      toast.error('You must own this car first');
    }
  };

  const selectedCar = selectedCarId ? LUXURY_CARS.find(c => c.id === selectedCarId) : null;
  const isOwned = selectedCar ? profile.ownedCars.includes(selectedCar.id) : false;

  const ownedCars = LUXURY_CARS.filter(car => profile.ownedCars.includes(car.id));
  const lockedCars = LUXURY_CARS.filter(car => !profile.ownedCars.includes(car.id));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold gold-glow mb-2">Garage</h1>
        <p className="text-muted-foreground">
          Your collection of {ownedCars.length} / {LUXURY_CARS.length} luxury cars
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Cars ({LUXURY_CARS.length})</TabsTrigger>
          <TabsTrigger value="owned">Owned ({ownedCars.length})</TabsTrigger>
          <TabsTrigger value="locked">Locked ({lockedCars.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {LUXURY_CARS.map(car => (
              <CarCard 
                key={car.id} 
                car={car} 
                isOwned={profile.ownedCars.includes(car.id)}
                isSelected={profile.selectedCar === car.id}
                onSelect={() => setSelectedCarId(car.id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="owned" className="mt-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {ownedCars.map(car => (
              <CarCard 
                key={car.id} 
                car={car} 
                isOwned={true}
                isSelected={profile.selectedCar === car.id}
                onSelect={() => setSelectedCarId(car.id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="locked" className="mt-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {lockedCars.map(car => (
              <CarCard 
                key={car.id} 
                car={car} 
                isOwned={false}
                isSelected={false}
                onSelect={() => setSelectedCarId(car.id)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={!!selectedCarId} onOpenChange={() => setSelectedCarId(null)}>
        <DialogContent className="max-w-2xl">
          {selectedCar && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedCar.name}</DialogTitle>
                <DialogDescription>
                  <Badge variant={selectedCar.rarity === 'Legendary' ? 'default' : 'secondary'}>
                    {selectedCar.rarity}
                  </Badge>
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <img 
                  src={selectedCar.imagePath} 
                  alt={selectedCar.name}
                  className="w-full rounded-lg border border-border"
                />

                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Gauge className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Speed</p>
                      <p className="font-bold">{selectedCar.speed}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Acceleration</p>
                      <p className="font-bold">{selectedCar.acceleration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CircleDot className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Handling</p>
                      <p className="font-bold">{selectedCar.handling}</p>
                    </div>
                  </div>
                </div>

                {!isOwned && (
                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <p className="text-sm font-medium mb-2">Unlock Requirements:</p>
                    <div className="flex gap-4">
                      {selectedCar.unlockWithGold > 0 && (
                        <div className="flex items-center gap-2">
                          <img src="/assets/generated/icon-gold.dim_256x256.png" alt="Gold" className="h-5 w-5" />
                          <span className="font-semibold">{selectedCar.unlockWithGold.toLocaleString()}</span>
                        </div>
                      )}
                      {selectedCar.unlockWithDiamonds > 0 && (
                        <div className="flex items-center gap-2">
                          <img src="/assets/generated/icon-diamond.dim_256x256.png" alt="Diamonds" className="h-5 w-5" />
                          <span className="font-semibold">{selectedCar.unlockWithDiamonds.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter>
                {isOwned ? (
                  <Button 
                    onClick={() => handleSelect(selectedCar.id)}
                    disabled={profile.selectedCar === selectedCar.id}
                    className="w-full"
                  >
                    {profile.selectedCar === selectedCar.id ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Currently Selected
                      </>
                    ) : (
                      'Select This Car'
                    )}
                  </Button>
                ) : (
                  <Button 
                    onClick={() => handlePurchase(
                      selectedCar.id, 
                      selectedCar.unlockWithGold, 
                      selectedCar.unlockWithDiamonds
                    )}
                    className="w-full"
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Unlock Car
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function CarCard({ 
  car, 
  isOwned, 
  isSelected, 
  onSelect 
}: { 
  car: typeof LUXURY_CARS[0]; 
  isOwned: boolean; 
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <Card 
      className={`card-hover cursor-pointer relative overflow-hidden ${
        isSelected ? 'border-2 border-primary shadow-gold-glow' : ''
      }`}
      onClick={onSelect}
    >
      {!isOwned && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
          <Lock className="h-8 w-8 text-muted-foreground" />
        </div>
      )}
      {isSelected && (
        <div className="absolute top-2 right-2 z-20">
          <Badge className="bg-primary">Selected</Badge>
        </div>
      )}
      <CardHeader className="p-0">
        <img 
          src={car.imagePath} 
          alt={car.name}
          className="w-full h-32 object-cover"
        />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-base mb-1">{car.name}</CardTitle>
        <CardDescription className="text-xs mb-3">
          <Badge variant="outline" className="text-xs">{car.rarity}</Badge>
        </CardDescription>
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">SPD: {car.speed}</span>
          <span className="text-muted-foreground">ACC: {car.acceleration}</span>
          <span className="text-muted-foreground">HND: {car.handling}</span>
        </div>
      </CardContent>
    </Card>
  );
}
