export interface GetAuctionsDTO {
  items: Auction[];
  page: number;
  total: number;
}

export interface Auction {
  id: number;
  label: string;
  endingTime: string;
  currentHighestBidValue: number;
  amIHighestBidder: boolean;
  associatedVehicle: AssociatedVehicle;
}

export interface AssociatedVehicle {
  id: number;
  ez: string;
  fuelType: number;
  transmission: number;
  vehicleImages: VehicleImage[];
  mileageInKm: number;
}

export interface VehicleImage {
  url: string;
  perspective: number;
  createdAt: string;
  updatedAt: string;
}
