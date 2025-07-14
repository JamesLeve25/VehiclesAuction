import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Vehicle } from "../entities/Vehicle";
import { calculateTimeUntilAuction } from "../presentation/utils/deteUtils";
import styles from "../theme/vehicleCardStyles";

// VehicleCard Component
interface VehicleCardProps {
  vehicle: Vehicle;
  onPress: () => void;
  onFavoriteToggle: () => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onPress, onFavoriteToggle }) => {
  const { days, hours } = calculateTimeUntilAuction(vehicle.auctionDateTime);
  
  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.imagePlaceholder}>
        <Text style={styles.imageText}>Vehicle Image</Text>
      </View>
      
      <View style={styles.cardContent}>
        <View>
          <View style={styles.cardHeader}>
            <View style={styles.titleContainer}>
              <Text style={styles.cardTitle} numberOfLines={1} ellipsizeMode="tail">
                {vehicle.make} {vehicle.model}
              </Text>
            </View>
            
            <TouchableOpacity 
              style={styles.favoriteButton}
              onPress={(e) => {
                e.stopPropagation(); // Prevent triggering the card's onPress
                onFavoriteToggle();
              }}
              hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
            >
              <Text style={[styles.favorite, vehicle.favourite && styles.favoriteActive]}>
                {vehicle.favourite ? '★' : '☆'}
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.details}>
            <Text style={styles.detailText} numberOfLines={1}>
              {vehicle.year} • {vehicle.engineSize} {vehicle.fuel}
            </Text>
            <Text style={styles.detailText}>
              {vehicle.mileage.toLocaleString()} miles
            </Text>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.footer}>
          <View style={styles.bidContainer}>
            <Text style={styles.bidLabel}>Starting Bid</Text>
            <Text style={styles.bidAmount}>£{vehicle.startingBid.toLocaleString()}</Text>
          </View>
          
          <View style={styles.timeContainer}>
            <Text style={styles.timeLabel}>Auction in</Text>
            <Text style={styles.timeValue}>
              {days > 0 ? `${days}d ${hours}h` : `${hours}h`}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default VehicleCard;
