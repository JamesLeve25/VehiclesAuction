import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FilterChips from './FilterChips';
import { FilterOptions } from '../entities/Vehicle';
import styles from '../theme/vehicleListStyles';

interface VehicleListHeaderProps {
  displayedCount: number;
  totalCount: number;
  filters: FilterOptions;
  onFilterPress: () => void;
  onRemoveFilter: (key: keyof FilterOptions) => void;
}

const VehicleListHeader: React.FC<VehicleListHeaderProps> = ({
  displayedCount,
  totalCount,
  filters,
  onFilterPress,
  onRemoveFilter
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <Text style={styles.title}>Vehicle Auctions</Text>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={onFilterPress}
          accessibilityLabel="Filter vehicles"
          accessibilityRole="button"
        >
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>
        {displayedCount} of {totalCount} vehicles shown
      </Text>
      
      <FilterChips 
        filters={filters} 
        onRemoveFilter={onRemoveFilter} 
      />
    </View>
  );
};

export default React.memo(VehicleListHeader);