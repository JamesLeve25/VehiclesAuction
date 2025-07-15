// / components/VehicleList.tsx
import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import { Vehicle ,FilterOptions} from '../entities/Vehicle';
import VehicleCard from './VehicleCard';
import VehicleListFooter from './VehicleListFooter';
import VehicleListEmptyState from './VehicleListEmptyState';
import styles from '../theme/vehicleListStyles';

interface VehicleListProps {
  vehicles: Vehicle[];
  loading: boolean;
  page: number;
  filters: FilterOptions;
  onLoadMore: () => void;
  onVehiclePress: (vehicle: Vehicle) => void;
  onFavoriteToggle: (index: number) => void;
  onResetFilters: () => void;
}

const VehicleList: React.FC<VehicleListProps> = ({
  vehicles,
  loading,
  page,
  filters,
  onLoadMore,
  onVehiclePress,
  onFavoriteToggle,
  onResetFilters
}) => {
  const renderVehicleItem = useCallback(({ item, index }: { item: Vehicle; index: number }) => (
    <VehicleCard
      vehicle={item}
      onPress={() => onVehiclePress(item)}
      onFavoriteToggle={() => onFavoriteToggle(index)}
    />
  ), [onVehiclePress, onFavoriteToggle]);
  
  const renderFooter = useCallback(() => (
    <VehicleListFooter loading={loading} />
  ), [loading]);
  
  const renderEmpty = useCallback(() => (
    <VehicleListEmptyState
      loading={loading}
      isFirstPage={page === 1}
      filters={filters}
      onResetFilters={onResetFilters}
    />
  ), [loading, page, filters, onResetFilters]);
  
  return (    
    <FlatList
      data={vehicles}
      renderItem={renderVehicleItem}
      keyExtractor={(item) => Math.random().toString()}
      contentContainerStyle={styles.content}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
      initialNumToRender={10}
      removeClippedSubviews={true}
      maxToRenderPerBatch={5}
      windowSize={10}
      testID="vehicle-list"
    />
  );
};

export default React.memo(VehicleList);