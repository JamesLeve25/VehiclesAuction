// components/VehicleListFooter.tsx
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import styles, { themeColors } from '../theme/vehicleListStyles';

interface VehicleListFooterProps {
  loading: boolean;
}

const VehicleListFooter: React.FC<VehicleListFooterProps> = ({ loading }) => {
  if (!loading) return null;
  
  return (
    <View style={styles.loaderFooter}>
      <ActivityIndicator size="large" color={themeColors.loaderColor} />
      <Text style={styles.loaderText}>Loading more vehicles...</Text>
    </View>
  );
};

export default React.memo(VehicleListFooter);