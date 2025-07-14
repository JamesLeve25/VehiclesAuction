import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  Dimensions
} from 'react-native';
import {Vehicle}  from '../entities/Vehicle';
import { calculateTimeUntilAuction } from '../presentation/utils/deteUtils';


interface VehicleDetailScreenProps {
  vehicle: Vehicle | null;
  visible: boolean;
  onClose: () => void;
  onFavoriteToggle: () => void;
}

const VehicleDetailScreen: React.FC<VehicleDetailScreenProps> = ({ 
  vehicle, 
  visible, 
  onClose, 
  onFavoriteToggle 
}) => {
  if (!vehicle) return null;
  
  const { days, hours } = calculateTimeUntilAuction(vehicle.auctionDateTime);
  
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.detailContainer}>
        <ScrollView>
          <View style={styles.detailHeader}>
            <TouchableOpacity style={styles.backButton} onPress={onClose}>
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onFavoriteToggle}>
              <Text style={[styles.favorite, vehicle.favourite && styles.favoriteActive]}>
                {vehicle.favourite ? '★' : '☆'}
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.detailImageContainer}>
            <View style={styles.detailImagePlaceholder}>
              <Text style={styles.detailImageText}>Vehicle Image</Text>
            </View>
          </View>
          
          <View style={styles.detailContent}>
            <Text style={styles.detailTitle}>{vehicle.make} {vehicle.model}</Text>
            <View style={styles.detailInfoRow}>
              <Text style={styles.detailInfoLabel}>Year:</Text>
              <Text style={styles.detailInfoValue}>{vehicle.year}</Text>
            </View>
            <View style={styles.detailInfoRow}>
              <Text style={styles.detailInfoLabel}>Engine:</Text>
              <Text style={styles.detailInfoValue}>{vehicle.engineSize}</Text>
            </View>
            <View style={styles.detailInfoRow}>
              <Text style={styles.detailInfoLabel}>Fuel:</Text>
              <Text style={styles.detailInfoValue}>{vehicle.fuel}</Text>
            </View>
            <View style={styles.detailInfoRow}>
              <Text style={styles.detailInfoLabel}>Mileage:</Text>
              <Text style={styles.detailInfoValue}>{vehicle.mileage.toLocaleString()} miles</Text>
            </View>
            
            <View style={styles.auctionInfoCard}>
              <Text style={styles.auctionInfoTitle}>Auction Information</Text>
              <View style={styles.detailInfoRow}>
                <Text style={styles.detailInfoLabel}>Starting Bid:</Text>
                <Text style={styles.bidAmount}>£{vehicle.startingBid.toLocaleString()}</Text>
              </View>
              <View style={styles.detailInfoRow}>
                <Text style={styles.detailInfoLabel}>Auction Date:</Text>
                <Text style={styles.detailInfoValue}>{vehicle.auctionDateTime.replace(' ', ' at ')}</Text>
              </View>
              <View style={styles.detailInfoRow}>
                <Text style={styles.detailInfoLabel}>Time Remaining:</Text>
                <Text style={styles.timeValue}>{days}d {hours}h</Text>
              </View>
            </View>
            
            <View style={styles.descriptionSection}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.descriptionText}>
                This {vehicle.year} {vehicle.make} {vehicle.model} is in excellent condition with only {vehicle.mileage.toLocaleString()} miles on the odometer. 
                It features a {vehicle.engineSize} {vehicle.fuel} engine that provides excellent performance and fuel efficiency.
                
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.
              </Text>
            </View>
            
            <View style={styles.featuresSection}>
              <Text style={styles.sectionTitle}>Features</Text>
              <View style={styles.featuresList}>
                <Text style={styles.featureItem}>• Air Conditioning</Text>
                <Text style={styles.featureItem}>• Power Steering</Text>
                <Text style={styles.featureItem}>• Electric Windows</Text>
                <Text style={styles.featureItem}>• Bluetooth Connectivity</Text>
                <Text style={styles.featureItem}>• Parking Sensors</Text>
                <Text style={styles.featureItem}>• Alloy Wheels</Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.bidButton}>
              <Text style={styles.bidButtonText}>Place Bid</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2196F3',
  },
  favorite: {
    fontSize: 24,
    color: '#999',
  },
  favoriteActive: {
    color: '#FFD700',
  },
  detailImageContainer: {
    width: '100%',
    height: 250,
    backgroundColor: 'white',
  },
  detailImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailImageText: {
    fontSize: 18,
    color: '#666',
  },
  detailContent: {
    padding: 16,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  detailInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailInfoLabel: {
    fontSize: 16,
    color: '#666',
  },
  detailInfoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  auctionInfoCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  auctionInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  bidAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  timeValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FF6B6B',
  },
  descriptionSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  featuresSection: {
    marginBottom: 24,
  },
  featuresList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  featureItem: {
    width: '50%',
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  bidButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  bidButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default VehicleDetailScreen;