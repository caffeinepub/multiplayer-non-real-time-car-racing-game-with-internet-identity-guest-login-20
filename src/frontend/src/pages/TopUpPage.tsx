import { DIAMOND_PACKS } from '../gameData/diamondPacks';
import { updateLocalDiamonds } from '../api/playerApi';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sparkles, Check } from 'lucide-react';
import { toast } from 'sonner';

export default function TopUpPage() {
  const [selectedPack, setSelectedPack] = useState<typeof DIAMOND_PACKS[0] | null>(null);
  const [purchaseHistory, setPurchaseHistory] = useState<Array<{ pack: string; diamonds: number; date: string }>>([]);

  const handlePurchase = () => {
    if (!selectedPack) return;

    updateLocalDiamonds(selectedPack.diamonds);
    
    setPurchaseHistory(prev => [{
      pack: selectedPack.name,
      diamonds: selectedPack.diamonds,
      date: new Date().toLocaleDateString()
    }, ...prev]);

    toast.success(`Purchased ${selectedPack.diamonds} diamonds!`);
    setSelectedPack(null);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold gold-glow mb-2">Top Up</h1>
        <p className="text-muted-foreground">
          Purchase diamond packs to unlock premium luxury cars
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-4">Diamond Packs</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DIAMOND_PACKS.map(pack => (
            <Card 
              key={pack.id}
              className={`card-hover cursor-pointer relative ${
                pack.id === 'popular' ? 'border-2 border-primary' : ''
              }`}
              onClick={() => setSelectedPack(pack)}
            >
              {pack.id === 'popular' && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary">Most Popular</Badge>
                </div>
              )}
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <img 
                    src="/assets/generated/icon-diamond.dim_256x256.png" 
                    alt="Diamonds" 
                    className="h-10 w-10"
                  />
                </div>
                <CardTitle>{pack.name}</CardTitle>
                <CardDescription className="text-2xl font-bold text-foreground mt-2">
                  {pack.diamonds.toLocaleString()}
                  {pack.bonus && (
                    <span className="text-sm text-primary ml-2">{pack.bonus}</span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-3xl font-bold text-primary">{pack.displayPrice}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {purchaseHistory.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Purchase History</h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {purchaseHistory.map((purchase, index) => (
                  <div key={index} className="flex items-center justify-between p-4">
                    <div>
                      <p className="font-medium">{purchase.pack}</p>
                      <p className="text-sm text-muted-foreground">{purchase.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <img 
                        src="/assets/generated/icon-diamond.dim_256x256.png" 
                        alt="Diamonds" 
                        className="h-5 w-5"
                      />
                      <span className="font-semibold">+{purchase.diamonds.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      <Dialog open={!!selectedPack} onOpenChange={() => setSelectedPack(null)}>
        <DialogContent>
          {selectedPack && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedPack.name}</DialogTitle>
                <DialogDescription>
                  Confirm your diamond pack purchase
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="flex items-center justify-center">
                  <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center">
                    <img 
                      src="/assets/generated/icon-diamond.dim_256x256.png" 
                      alt="Diamonds" 
                      className="h-16 w-16"
                    />
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <p className="text-4xl font-bold">
                    {selectedPack.diamonds.toLocaleString()}
                    {selectedPack.bonus && (
                      <span className="text-lg text-primary ml-2">{selectedPack.bonus}</span>
                    )}
                  </p>
                  <p className="text-muted-foreground">Diamonds</p>
                </div>

                <div className="bg-secondary/50 p-4 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-1">Total Price</p>
                  <p className="text-3xl font-bold text-primary">{selectedPack.displayPrice}</p>
                </div>

                <div className="bg-muted/50 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground text-center">
                    This is a simulated purchase. No real money will be charged.
                  </p>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedPack(null)}>
                  Cancel
                </Button>
                <Button onClick={handlePurchase} className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  Confirm Purchase
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
