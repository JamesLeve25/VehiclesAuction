import { VehicleService } from '../../src/services/VehicleService';
import { Vehicle, FilterOptions } from '../../src/entities/Vehicle';

describe('VehicleService', () => {
  // Mock data for testing
  const mockVehicles: Vehicle[] = [
    {
      make: 'Toyota',
      model: 'Corolla',
      year: 2020,
      engineSize: '1.8L',
      fuel: 'Petrol',
      mileage: 15000,
      startingBid: 12000,
      auctionDateTime: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      favourite: false
    },
    {
      make: 'Honda',
      model: 'Civic',
      year: 2019,
      engineSize: '1.5L',
      fuel: 'Petrol',
      mileage: 20000,
      startingBid: 10000,
      auctionDateTime: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
      favourite: true
    },
    {
      make: 'Toyota',
      model: 'Camry',
      year: 2021,
      engineSize: '2.5L',
      fuel: 'Hybrid',
      mileage: 5000,
      startingBid: 18000,
      auctionDateTime: new Date(Date.now() + 259200000).toISOString(), // 3 days from now
      favourite: false
    }
  ];

  let vehicleService: VehicleService;

  beforeEach(() => {
    // Create a fresh instance of VehicleService before each test
    vehicleService = new VehicleService([...mockVehicles]);
  });

  test('getVehicles should return all vehicles', () => {
    const vehicles = vehicleService.getVehicles();
    expect(vehicles).toHaveLength(mockVehicles.length);
    expect(vehicles).toEqual(mockVehicles);
  });

  test('applyFilters should filter by make', () => {
    const filters: FilterOptions = {
      make: 'Toyota',
      model: null,
      minBid: null,
      maxBid: null,
      favouritesOnly: false
    };
    
    const filteredVehicles = vehicleService.applyFilters(filters);
    expect(filteredVehicles).toHaveLength(2);
    expect(filteredVehicles.every(v => v.make === 'Toyota')).toBe(true);
  });

  test('applyFilters should filter by model', () => {
    const filters: FilterOptions = {
      make: null,
      model: 'Civic',
      minBid: null,
      maxBid: null,
      favouritesOnly: false
    };
    
    const filteredVehicles = vehicleService.applyFilters(filters);
    expect(filteredVehicles).toHaveLength(1);
    expect(filteredVehicles[0].model).toBe('Civic');
  });

  test('applyFilters should filter by minBid', () => {
    const filters: FilterOptions = {
      make: null,
      model: null,
      minBid: 15000,
      maxBid: null,
      favouritesOnly: false
    };
    
    const filteredVehicles = vehicleService.applyFilters(filters);
    expect(filteredVehicles).toHaveLength(1);
    expect(filteredVehicles[0].startingBid).toBeGreaterThanOrEqual(15000);
  });

  test('applyFilters should filter by maxBid', () => {
    const filters: FilterOptions = {
      make: null,
      model: null,
      minBid: null,
      maxBid: 15000,
      favouritesOnly: false
    };
    
    const filteredVehicles = vehicleService.applyFilters(filters);
    expect(filteredVehicles).toHaveLength(2);
    expect(filteredVehicles.every(v => v.startingBid <= 15000)).toBe(true);
  });

  test('applyFilters should filter by favouritesOnly', () => {
    const filters: FilterOptions = {
      make: null,
      model: null,
      minBid: null,
      maxBid: null,
      favouritesOnly: true
    };
    
    const filteredVehicles = vehicleService.applyFilters(filters);
    expect(filteredVehicles).toHaveLength(1);
    expect(filteredVehicles[0].favourite).toBe(true);
  });

  test('applyFilters should combine multiple filters', () => {
    const filters: FilterOptions = {
      make: 'Toyota',
      model: null,
      minBid: 15000,
      maxBid: null,
      favouritesOnly: false
    };
    
    const filteredVehicles = vehicleService.applyFilters(filters);
    expect(filteredVehicles).toHaveLength(1);
    expect(filteredVehicles[0].make).toBe('Toyota');
    expect(filteredVehicles[0].startingBid).toBeGreaterThanOrEqual(15000);
  });

  test('getPaginatedVehicles should return correct page of vehicles', () => {
    const filters: FilterOptions = {
      make: null,
      model: null,
      minBid: null,
      maxBid: null,
      favouritesOnly: false
    };
    
    const result = vehicleService.getPaginatedVehicles(1, 2, filters);
    expect(result.vehicles).toHaveLength(2);
    expect(result.totalCount).toBe(3);
    expect(result.hasMore).toBe(true);
    
    const secondPage = vehicleService.getPaginatedVehicles(2, 2, filters);
    expect(secondPage.vehicles).toHaveLength(1);
    expect(secondPage.totalCount).toBe(3);
    expect(secondPage.hasMore).toBe(false);
  });

  test('toggleFavorite should toggle the favourite status of a vehicle', () => {
    const vehicle = mockVehicles[0]; // Toyota Corolla, favourite: false
    const updatedVehicle = vehicleService.toggleFavorite(vehicle);
    
    expect(updatedVehicle.favourite).toBe(true);
    
    // Toggle again
    const toggledAgain = vehicleService.toggleFavorite(updatedVehicle);
    expect(toggledAgain.favourite).toBe(false);
  });

  test('getUniqueValues should return unique values for a field', () => {
    const makes = vehicleService.getUniqueValues('make');
    expect(makes).toContain('Toyota');
    expect(makes).toContain('Honda');
    expect(makes).toHaveLength(2);
    
    const models = vehicleService.getUniqueValues('model');
    expect(models).toContain('Corolla');
    expect(models).toContain('Civic');
    expect(models).toContain('Camry');
    expect(models).toHaveLength(3);
  });

});