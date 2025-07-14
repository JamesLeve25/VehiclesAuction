import { useState, useEffect, useCallback, useRef } from 'react';
import vehiclesData from '../data/vehicles.json';
import { Vehicle, FilterOptions } from '../entities/Vehicle';
import { VehicleService } from '../services/VehicleService';

export const useVehicles = () => {
  // Create a ref for the service to avoid recreating it on each render
  const vehicleServiceRef = useRef<VehicleService>(
    new VehicleService(vehiclesData as Vehicle[])
  );
  
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [displayedVehicles, setDisplayedVehicles] = useState<Vehicle[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    make: null,
    model: null,
    minBid: null,
    maxBid: null,
    favouritesOnly: false
  });
  
  // Get unique makes and models for the filter
  const makes = vehicleServiceRef.current.getUniqueValues('make');
  const models = vehicleServiceRef.current.getUniqueValues('model');
  
  // Load initial data
  useEffect(() => {
    // Set the full vehicle data
    const allVehicles = vehicleServiceRef.current.getVehicles();
    setVehicles(allVehicles);
  }, []);
  
  // Apply filters when they change
  useEffect(() => {
    if (vehicles.length > 0) {
      // Update the service with the current vehicles
      vehicleServiceRef.current.updateVehicles(vehicles);
      
      // Get filtered and paginated data
      const { vehicles: paginatedVehicles, totalCount: total, hasMore: more } = 
        vehicleServiceRef.current.getPaginatedVehicles(1, 10, filters);
      
      setTotalCount(total);
      setDisplayedVehicles(paginatedVehicles);
      setPage(1);
      setHasMore(more);
    }
  }, [vehicles, filters]);
  
  // Function to load vehicles with pagination
  const loadFilteredVehicles = useCallback((pageNum: number) => {
    setLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Get filtered and paginated data
      const { vehicles: paginatedVehicles, hasMore: more } = 
        vehicleServiceRef.current.getPaginatedVehicles(pageNum, 10, filters);
      
      // Update state
      if (pageNum === 1) {
        setDisplayedVehicles(paginatedVehicles);
      } else {
        setDisplayedVehicles(prev => [...prev, ...paginatedVehicles]);
      }
      
      setPage(pageNum);
      setHasMore(more);
      setLoading(false);
    }, 300);
  }, [filters]);
  
  // Add a function to handle toggling favorite from the detail view
  const toggleFavoriteFromDetail = useCallback(() => {
    if (!selectedVehicle) return;
    
    // Use the service to toggle favorite
    const updatedVehicle = vehicleServiceRef.current.toggleFavorite(selectedVehicle);
    
    // Update the selected vehicle
    setSelectedVehicle(updatedVehicle);
    
    // Update all vehicles array to reflect changes
    setVehicles(vehicleServiceRef.current.getVehicles());
    
    // Update displayed vehicles
    setDisplayedVehicles(prev => 
      prev.map(v => 
        v.make === selectedVehicle.make && 
        v.model === selectedVehicle.model && 
        v.year === selectedVehicle.year &&
        v.mileage === selectedVehicle.mileage
          ? { ...v, favourite: updatedVehicle.favourite } 
          : v
      )
    );
  }, [selectedVehicle]);
  
  const handleVehiclePress = useCallback((vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setDetailModalVisible(true);
  }, []);
  
  const toggleFavorite = useCallback((index: number) => {
    const vehicleToToggle = displayedVehicles[index];
    if (!vehicleToToggle) return;
    
    // Use the service to toggle favorite
    const updatedVehicle = vehicleServiceRef.current.toggleFavorite(vehicleToToggle);
    
    // Update displayed vehicles
    setDisplayedVehicles(prev => 
      prev.map((v, idx) => idx === index ? updatedVehicle : v)
    );
    
    // Update all vehicles array to reflect changes
    setVehicles(vehicleServiceRef.current.getVehicles());
  }, [displayedVehicles]);
  
  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore) {
      loadFilteredVehicles(page + 1);
    }
  }, [loading, hasMore, page, loadFilteredVehicles]);
  
  const handleApplyFilters = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters);
  }, []);
  
  const handleRemoveFilter = useCallback((key: keyof FilterOptions) => {
    if (key === 'minBid' || key === 'maxBid') {
      setFilters(prev => ({
        ...prev,
        minBid: null,
        maxBid: null
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [key]: key === 'favouritesOnly' ? false : null
      }));
    }
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      make: null,
      model: null,
      minBid: null,
      maxBid: null,
      favouritesOnly: false
    });
  }, []);

  return {
    vehicles,
    displayedVehicles,
    totalCount,
    loading,
    hasMore,
    page,
    filters,
    filterModalVisible,
    selectedVehicle,
    detailModalVisible,
    makes,
    models,
    handleLoadMore,
    handleVehiclePress,
    toggleFavorite,
    handleApplyFilters,
    handleRemoveFilter,
    setFilterModalVisible,
    setDetailModalVisible,
    toggleFavoriteFromDetail,
    resetFilters
  };
};
