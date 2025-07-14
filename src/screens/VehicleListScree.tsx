import React, { useState, useEffect } from 'react';
import { 
  SafeAreaView, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator
} from 'react-native';

import { Vehicle, FilterOptions } from '../entities/Vehicle';
import VehicleDetailScreen from '../components/VehicleDetailScreen';
import VehicleCard from '../components/VehicleCard';
import FilterChips from '../components/FilterChips';
import FilterModal from '../components/FilterModal';
import { useVehicles } from '../hooks/useVehicles';
import styles, { themeColors } from '../theme/vehicleListStyles';

const VehicleListScreen = () => {
  const {
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
  } = useVehicles();

  const renderVehicleItem = ({ item, index }: { item: Vehicle; index: number }) => (
    <VehicleCard
      vehicle={item}
      onPress={() => handleVehiclePress(item)}
      onFavoriteToggle={() => toggleFavorite(index)}
    />
  );
  
  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.loaderFooter}>
        <ActivityIndicator size="large" color={themeColors.loaderColor} />
        <Text style={styles.loaderText}>Loading more vehicles...</Text>
      </View>
    );
  };

  const renderEmpty = () => {
    if (loading && page === 1) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={themeColors.loaderColor} />
          <Text style={styles.emptyText}>Loading vehicles...</Text>
        </View>
      );
    }
    
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No vehicles found</Text>
        {(filters.make || filters.model || filters.minBid || filters.maxBid || filters.favouritesOnly) && (
          <TouchableOpacity 
            style={styles.resetFiltersButton}
            onPress={resetFilters}
          >
            <Text style={styles.resetFiltersText}>Reset Filters</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>Vehicle Auctions</Text>
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setFilterModalVisible(true)}
          >
            <Text style={styles.filterButtonText}>Filter</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>
          {displayedVehicles.length} of {totalCount} vehicles shown
        </Text>
        
        <FilterChips 
          filters={filters} 
          onRemoveFilter={handleRemoveFilter} 
        />
      </View>
      
      <FlatList
        data={displayedVehicles}
        renderItem={renderVehicleItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.content}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        initialNumToRender={10}
      />
      
      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        filters={filters}
        onApplyFilters={handleApplyFilters}
        makes={makes}
        models={models}
      />
      
      <VehicleDetailScreen
        vehicle={selectedVehicle}
        visible={detailModalVisible}
        onClose={() => setDetailModalVisible(false)}
        onFavoriteToggle={toggleFavoriteFromDetail}
      />
    </SafeAreaView>
  );
};

export default VehicleListScreen;
