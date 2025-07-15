import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FilterOptions } from '../entities/Vehicle';
import styles, { themeColors } from '../theme/vehicleListStyles';

interface VehicleListEmptyStateProps {
  loading: boolean;
  isFirstPage: boolean;
  filters: FilterOptions;
  onResetFilters: () => void;
}

const VehicleListEmptyState: React.FC<VehicleListEmptyStateProps> = ({
  loading,
  isFirstPage,
  filters,
  onResetFilters
}) => {
  if (loading && isFirstPage) {
    return (
      <View style={styles.emptyContainer}>
        <ActivityIndicator size="large" color={themeColors.loaderColor} />
        <Text style={styles.emptyText}>Loading vehicles...</Text>
      </View>
    );
  }
  
  const hasActiveFilters = filters.make || filters.model || 
    filters.minBid !== null || filters.maxBid !== null || filters.favouritesOnly;
  
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No vehicles found</Text>
      {hasActiveFilters && (
        <TouchableOpacity 
          style={styles.resetFiltersButton}
          onPress={onResetFilters}
          accessibilityLabel="Reset filters"
          accessibilityRole="button"
        >
          <Text style={styles.resetFiltersText}>Reset Filters</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default React.memo(VehicleListEmptyState);