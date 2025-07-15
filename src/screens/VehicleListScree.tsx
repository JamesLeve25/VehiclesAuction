import React from 'react';
import { SafeAreaView } from 'react-native';
import { useVehicles } from '../hooks/useVehicles';
import VehicleListHeader from '../components/VehicleListHeader';
import VehicleList from '../components/VehicleList';
import VehicleModals from '../components/VehicleModals';
import styles from '../theme/vehicleListStyles';

const VehicleListScreen: React.FC = () => {
  const {
    displayedVehicles,
    totalCount,
    loading,
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

  return (
    <SafeAreaView style={styles.container} testID="vehicle-list-screen">
      <VehicleListHeader
        displayedCount={displayedVehicles.length}
        totalCount={totalCount}
        filters={filters}
        onFilterPress={() => setFilterModalVisible(true)}
        onRemoveFilter={handleRemoveFilter}
      />
      
      <VehicleList
        vehicles={displayedVehicles}
        loading={loading}
        page={page}
        filters={filters}
        onLoadMore={handleLoadMore}
        onVehiclePress={handleVehiclePress}
        onFavoriteToggle={toggleFavorite}
        onResetFilters={resetFilters}
      />
      
      <VehicleModals
        filterModalVisible={filterModalVisible}
        detailModalVisible={detailModalVisible}
        filters={filters}
        selectedVehicle={selectedVehicle}
        makes={makes}
        models={models}
        onCloseFilterModal={() => setFilterModalVisible(false)}
        onCloseDetailModal={() => setDetailModalVisible(false)}
        onApplyFilters={handleApplyFilters}
        onFavoriteToggle={toggleFavoriteFromDetail}
      />
    </SafeAreaView>
  );
};

export default VehicleListScreen;
