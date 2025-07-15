import React from 'react';
import FilterModal from './FilterModal';
import VehicleDetailScreen from './VehicleDetailScreen';
import { Vehicle, FilterOptions } from '../entities/Vehicle';

interface VehicleModalsProps {
  filterModalVisible: boolean;
  detailModalVisible: boolean;
  filters: FilterOptions;
  selectedVehicle: Vehicle | null;
  makes: string[];
  models: string[];
  onCloseFilterModal: () => void;
  onCloseDetailModal: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
  onFavoriteToggle: () => void;
}

const VehicleModals: React.FC<VehicleModalsProps> = ({
  filterModalVisible,
  detailModalVisible,
  filters,
  selectedVehicle,
  makes,
  models,
  onCloseFilterModal,
  onCloseDetailModal,
  onApplyFilters,
  onFavoriteToggle
}) => {
  return (
    <>
      <FilterModal
        visible={filterModalVisible}
        onClose={onCloseFilterModal}
        filters={filters}
        onApplyFilters={onApplyFilters}
        makes={makes}
        models={models}
      />
      
      <VehicleDetailScreen
        vehicle={selectedVehicle}
        visible={detailModalVisible}
        onClose={onCloseDetailModal}
        onFavoriteToggle={onFavoriteToggle}
      />
    </>
  );
};

export default React.memo(VehicleModals);