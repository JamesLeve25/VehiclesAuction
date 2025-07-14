import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FilterOptions} from '../entities/Vehicle';
import styles from '../theme/filterChipsStyles';
interface FilterChipsProps {
  filters: FilterOptions;
  onRemoveFilter: (key: keyof FilterOptions) => void;
}

const FilterChips: React.FC<FilterChipsProps> = ({ filters, onRemoveFilter }) => {
  if (
    !filters.make &&
    !filters.model &&
    !filters.minBid &&
    !filters.maxBid &&
    !filters.favouritesOnly
  ) {
    return null;
  }
  
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      style={styles.activeFiltersContainer}
      contentContainerStyle={styles.activeFiltersContent}
    >
      {filters.make && (
        <TouchableOpacity 
          style={styles.activeFilterChip}
          onPress={() => onRemoveFilter('make')}
        >
          <Text style={styles.activeFilterText}>Make: {filters.make}</Text>
          <Text style={styles.removeFilterIcon}>✕</Text>
        </TouchableOpacity>
      )}
      
      {filters.model && (
        <TouchableOpacity 
          style={styles.activeFilterChip}
          onPress={() => onRemoveFilter('model')}
        >
          <Text style={styles.activeFilterText}>Model: {filters.model}</Text>
          <Text style={styles.removeFilterIcon}>✕</Text>
        </TouchableOpacity>
      )}
      
      {(filters.minBid !== null || filters.maxBid !== null) && (
        <TouchableOpacity 
          style={styles.activeFilterChip}
          onPress={() => {
            onRemoveFilter('minBid');
            onRemoveFilter('maxBid');
          }}
        >
          
          <Text style={styles.activeFilterText}>
            Price: {filters.minBid !== null ? '£' + filters.minBid : '£0'} - 
            {filters.maxBid !== null ? '£' + filters.maxBid : 'Any'}
          </Text>
          <Text style={styles.removeFilterIcon}>✕</Text>
        </TouchableOpacity>
      )}
      
      {filters.favouritesOnly && (
        <TouchableOpacity 
          style={styles.activeFilterChip}
          onPress={() => onRemoveFilter('favouritesOnly')}
        >
          <Text style={styles.activeFilterText}>Favorites Only</Text>
          <Text style={styles.removeFilterIcon}>✕</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

 export default FilterChips;