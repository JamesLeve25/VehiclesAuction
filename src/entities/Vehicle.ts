export interface Vehicle {
  make: string;
  model: string;
  engineSize: string;
  fuel: string;
  year: number;
  mileage: number;
  auctionDateTime: string;
  startingBid: number;
  favourite: boolean;
}


export interface FilterOptions {
  make: string | null;
  model: string | null;
  minBid: number | null;
  maxBid: number | null;
  favouritesOnly: boolean;
}