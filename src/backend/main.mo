import Text "mo:core/Text";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Nat "mo:core/Nat";

actor {
  type Profile = {
    displayName : Text;
    level : Nat;
    gold : Nat;
    diamonds : Nat;
    ownedCars : [Nat];
    selectedCar : ?Nat;
    racesWon : Nat;
    racesParticipated : Nat;
    missionsCompleted : Nat;
    score : Nat;
  };

  module Profile {
    public func compare(p1 : Profile, p2 : Profile) : Order.Order {
      switch (Text.compare(p1.displayName, p2.displayName)) {
        case (#equal) { Nat.compare(p1.score, p2.score) };
        case (order) { order };
      };
    };
  };

  let profiles = Map.empty<Principal, Profile>();

  let cars = List.fromIter<{
    id : Nat;
    name : Text;
    rarity : Text;
    speed : Nat;
    acceleration : Nat;
    handling : Nat;
    unlockWithGold : Nat;
    unlockWithDiamonds : Nat;
  }>(
    [
      {
        id = 1;
        name = "Lamborghini Aventador";
        rarity = "Legendary";
        speed = 95;
        acceleration = 90;
        handling = 85;
        unlockWithGold = 500_000;
        unlockWithDiamonds = 0;
      },
      {
        id = 2;
        name = "Bugatti Chiron";
        rarity = "Legendary";
        speed = 100;
        acceleration = 95;
        handling = 90;
        unlockWithGold = 0;
        unlockWithDiamonds = 1_000;
      },
      {
        id = 3;
        name = "Ferrari LaFerrari";
        rarity = "Epic";
        speed = 92;
        acceleration = 88;
        handling = 84;
        unlockWithGold = 400_000;
        unlockWithDiamonds = 0;
      },
      {
        id = 4;
        name = "Porsche 911 Turbo S";
        rarity = "Epic";
        speed = 90;
        acceleration = 85;
        handling = 95;
        unlockWithGold = 350_000;
        unlockWithDiamonds = 0;
      },
      {
        id = 5;
        name = "McLaren P1";
        rarity = "Legendary";
        speed = 98;
        acceleration = 93;
        handling = 89;
        unlockWithGold = 0;
        unlockWithDiamonds = 900;
      },
      {
        id = 6;
        name = "Rolls-Royce Phantom";
        rarity = "Luxury";
        speed = 70;
        acceleration = 65;
        handling = 80;
        unlockWithGold = 1_500_000;
        unlockWithDiamonds = 0;
      },
      {
        id = 7;
        name = "Bentley Continental GT";
        rarity = "Luxury";
        speed = 80;
        acceleration = 75;
        handling = 85;
        unlockWithGold = 900_000;
        unlockWithDiamonds = 0;
      },
      {
        id = 8;
        name = "Aston Martin DB11";
        rarity = "Luxury";
        speed = 85;
        acceleration = 80;
        handling = 87;
        unlockWithGold = 800_000;
        unlockWithDiamonds = 0;
      },
      {
        id = 9;
        name = "Mercedes-Benz S-Class";
        rarity = "Luxury";
        speed = 75;
        acceleration = 70;
        handling = 83;
        unlockWithGold = 550_000;
        unlockWithDiamonds = 0;
      },
      {
        id = 10;
        name = "Tesla Model S Plaid";
        rarity = "Luxury";
        speed = 88;
        acceleration = 100;
        handling = 92;
        unlockWithGold = 600_000;
        unlockWithDiamonds = 0;
      },
      {
        id = 11;
        name = "BMW M8 Competition";
        rarity = "Luxury";
        speed = 78;
        acceleration = 73;
        handling = 85;
        unlockWithGold = 500_000;
        unlockWithDiamonds = 0;
      },
      {
        id = 12;
        name = "Audi RS7";
        rarity = "Luxury";
        speed = 82;
        acceleration = 77;
        handling = 84;
        unlockWithGold = 340_000;
        unlockWithDiamonds = 0;
      },
      {
        id = 13;
        name = "Jaguar F-Type R";
        rarity = "Luxury";
        speed = 83;
        acceleration = 78;
        handling = 86;
        unlockWithGold = 300_000;
        unlockWithDiamonds = 0;
      },
      {
        id = 14;
        name = "Lexus LC 500";
        rarity = "Luxury";
        speed = 77;
        acceleration = 72;
        handling = 85;
        unlockWithGold = 270_000;
        unlockWithDiamonds = 0;
      },
      {
        id = 15;
        name = "Genesis G90";
        rarity = "Luxury";
        speed = 72;
        acceleration = 68;
        handling = 82;
        unlockWithGold = 250_000;
        unlockWithDiamonds = 0;
      },
      {
        id = 16;
        name = "Cadillac CT6";
        rarity = "Luxury";
        speed = 75;
        acceleration = 70;
        handling = 83;
        unlockWithGold = 240_000;
        unlockWithDiamonds = 0;
      },
      {
        id = 17;
        name = "Maserati Quattroporte";
        rarity = "Luxury";
        speed = 79;
        acceleration = 74;
        handling = 85;
        unlockWithGold = 260_000;
        unlockWithDiamonds = 0;
      },
      {
        id = 18;
        name = "Infiniti Q70L";
        rarity = "Luxury";
        speed = 73;
        acceleration = 69;
        handling = 83;
        unlockWithGold = 220_000;
        unlockWithDiamonds = 0;
      },
      {
        id = 19;
        name = "Lincoln Continental";
        rarity = "Luxury";
        speed = 71;
        acceleration = 66;
        handling = 81;
        unlockWithGold = 230_000;
        unlockWithDiamonds = 0;
      },
      {
        id = 20;
        name = "Acura RLX";
        rarity = "Luxury";
        speed = 74;
        acceleration = 70;
        handling = 82;
        unlockWithGold = 210_000;
        unlockWithDiamonds = 0;
      },
    ].values(),
  );

  func findCarById(carId : Nat) : ?{
    id : Nat;
    name : Text;
    rarity : Text;
    speed : Nat;
    acceleration : Nat;
    handling : Nat;
    unlockWithGold : Nat;
    unlockWithDiamonds : Nat;
  } {
    cars.values().find(func(car) { car.id == carId });
  };

  public shared ({ caller }) func createProfile(displayName : Text) : async () {
    if (profiles.containsKey(caller)) { Runtime.trap("This user already exists") };
    let profile = {
      displayName;
      level = 1;
      gold = 100_000;
      diamonds = 0;
      ownedCars = [];
      selectedCar = null;
      racesWon = 0;
      racesParticipated = 0;
      missionsCompleted = 0;
      score = 0;
    };
    profiles.add(caller, profile);
  };

  public query ({ caller }) func getPlayerProfile(player : Principal) : async Profile {
    switch (profiles.get(player)) {
      case (null) { Runtime.trap("Player does not exist") };
      case (?profile) { profile };
    };
  };

  public query ({ caller }) func getLeaderboard() : async [(Text, Nat)] {
    profiles.values().toArray().sort().map(
      func(profile) { (profile.displayName, profile.score) }
    );
  };

  public query ({ caller }) func getAllLuxuryCars() : async [{
    id : Nat;
    name : Text;
    rarity : Text;
    speed : Nat;
    acceleration : Nat;
    handling : Nat;
    unlockWithGold : Nat;
    unlockWithDiamonds : Nat;
  }] {
    cars.toArray();
  };

  public shared ({ caller }) func purchaseLuxuryCar(carId : Nat) : async () {
    switch (profiles.get(caller)) {
      case (null) { Runtime.trap("Player does not exist") };
      case (?profile) {
        switch (findCarById(carId)) {
          case (null) { Runtime.trap("Car does not exist") };
          case (?car) {
            if (profile.gold < car.unlockWithGold and profile.diamonds < car.unlockWithDiamonds) {
              Runtime.trap("Insufficient funds");
            };
            let updatedCars = profile.ownedCars.concat([carId]);
            let updatedProfile = {
              profile with
              gold = if (profile.gold >= car.unlockWithGold) {
                profile.gold - car.unlockWithGold;
              } else {
                profile.gold;
              };
              diamonds = if (profile.diamonds >= car.unlockWithDiamonds) {
                profile.diamonds - car.unlockWithDiamonds;
              } else {
                profile.diamonds;
              };
              ownedCars = updatedCars;
            };
            profiles.add(caller, updatedProfile);
          };
        };
      };
    };
  };

  public shared ({ caller }) func selectLuxuryCar(carId : Nat) : async () {
    switch (profiles.get(caller)) {
      case (null) { Runtime.trap("Player does not exist") };
      case (?profile) {
        if (not profile.ownedCars.values().any(func(oId) { oId == carId })) {
          Runtime.trap("Car is not owned");
        };
        let updatedProfile = { profile with selectedCar = ?carId };
        profiles.add(caller, updatedProfile);
      };
    };
  };
};
