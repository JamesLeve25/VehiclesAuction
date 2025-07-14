import { Vehicle, FilterOptions } from '../entities/Vehicle';

export class VehicleService {
  private vehicles: Vehicle[];

  constructor(initialVehicles: Vehicle[]) {
    this.vehicles = [...initialVehicles];
  }

  getVehicles(): Vehicle[] {
    return [...this.vehicles];
  }

  applyFilters(filterOptions: FilterOptions): Vehicle[] {
    let result = [...this.vehicles];
    
    if (filterOptions.make) {
      result = result.filter(vehicle => vehicle.make === filterOptions.make);
    }
    
    if (filterOptions.model) {
      result = result.filter(vehicle => vehicle.model === filterOptions.model);
    }
    
    if (filterOptions.minBid !== null) {
      result = result.filter(vehicle => vehicle.startingBid >= filterOptions.minBid!);
    }
    
    if (filterOptions.maxBid !== null) {
      result = result.filter(vehicle => vehicle.startingBid <= filterOptions.maxBid!);
    }
    
    if (filterOptions.favouritesOnly) {
      result = result.filter(vehicle => vehicle.favourite);
    }
    
    return result;
  }

  getPaginatedVehicles(
    page: number, 
    pageSize: number, 
    filterOptions: FilterOptions
  ): { 
    vehicles: Vehicle[]; 
    totalCount: number; 
    hasMore: boolean 
  } {
    const filteredVehicles = this.applyFilters(filterOptions);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedVehicles = filteredVehicles.slice(startIndex, endIndex);
    
    return {
      vehicles: paginatedVehicles,
      totalCount: filteredVehicles.length,
      hasMore: endIndex < filteredVehicles.length
    };
  }

  toggleFavorite(vehicle: Vehicle): Vehicle {
    // Find the vehicle in the array
    const index = this.vehicles.findIndex(
      v => v.make === vehicle.make && 
           v.model === vehicle.model && 
           v.year === vehicle.year && 
           v.mileage === vehicle.mileage
    );
    
    if (index !== -1) {
      // Toggle the favorite status
      this.vehicles[index] = {
        ...this.vehicles[index],
        favourite: !this.vehicles[index].favourite
      };
      
      return this.vehicles[index];
    }
    
    return vehicle;
  }

  getUniqueValues(field: keyof Vehicle): string[] {
    const values = new Set(this.vehicles.map(vehicle => vehicle[field]));
    return Array.from(values).filter(value => typeof value === 'string') as string[];
  }

  updateVehicles(vehicles: Vehicle[]): void {
    this.vehicles = [...vehicles];
  }
}