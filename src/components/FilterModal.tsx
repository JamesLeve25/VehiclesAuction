
import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  Switch,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Dimensions
} from 'react-native';
import { FilterOptions, Vehicle } from '../entities/Vehicle';
import styles, { themeColors} from '../theme/filterModalStyles';

// Get screen dimensions
const { height: screenHeight } = Dimensions.get('window');

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onApplyFilters: (filters: FilterOptions) => void;
  makes: string[];
  models: string[];
}

const FilterModal: React.FC<FilterModalProps> = ({ 
  visible, 
  onClose, 
  filters, 
  onApplyFilters,
  makes,
  models
}) => {
  const [tempFilters, setTempFilters] = useState<FilterOptions>({ ...filters });
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const minInputRef = useRef<TextInput>(null);
  const maxInputRef = useRef<TextInput>(null);
  
  useEffect(() => {
    setTempFilters({ ...filters });
  }, [filters, visible]);
  
  // Add keyboard listeners
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
        // Scroll to price input fields when keyboard appears
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  
  const handleApply = () => {
    Keyboard.dismiss();
    onApplyFilters(tempFilters);
    onClose();
  };
  
  const handleReset = () => {
    Keyboard.dismiss();
    const resetFilters: FilterOptions = {
      make: null,
      model: null,
      minBid: null,
      maxBid: null,
      favouritesOnly: false
    };
    setTempFilters(resetFilters);
    onApplyFilters(resetFilters);
    onClose();
  };
  
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      >
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View style={styles.modalOverlay}>
            {/* This spacer pushes the modal down */}
            <View style={styles.topSpacer} />
            
            <View style={[
              styles.modalContent,
              keyboardVisible && Platform.OS === 'android' && { maxHeight: '90%' }
            ]}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Filter Vehicles</Text>
                <TouchableOpacity onPress={onClose}>
                  <Text style={styles.closeButton}>✕</Text>
                </TouchableOpacity>
              </View>
              
              <ScrollView 
                ref={scrollViewRef}
                style={styles.modalBody}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.filterSection}>
                  <Text style={styles.filterLabel}>Make</Text>
                  <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    style={styles.chipContainer}
                    keyboardShouldPersistTaps="handled"
                  >
                    {['All', ...makes].map((make) => (
                      <TouchableOpacity
                        key={make}
                        style={[
                          styles.chip,
                          (make === 'All' && tempFilters.make === null) || make === tempFilters.make
                            ? styles.chipSelected
                            : null
                        ]}
                        onPress={() => setTempFilters({
                          ...tempFilters,
                          make: make === 'All' ? null : make
                        })}
                      >
                        <Text
                          style={[
                            styles.chipText,
                            (make === 'All' && tempFilters.make === null) || make === tempFilters.make
                              ? styles.chipTextSelected
                              : null
                          ]}
                        >
                          {make}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
                
                <View style={styles.filterSection}>
                  <Text style={styles.filterLabel}>Model</Text>
                  <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    style={styles.chipContainer}
                    keyboardShouldPersistTaps="handled"
                  >
                    {['All', ...models].map((model) => (
                      <TouchableOpacity
                        key={model}
                        style={[
                          styles.chip,
                          (model === 'All' && tempFilters.model === null) || model === tempFilters.model
                            ? styles.chipSelected
                            : null
                        ]}
                        onPress={() => setTempFilters({
                          ...tempFilters,
                          model: model === 'All' ? null : model
                        })}
                      >
                        <Text
                          style={[
                            styles.chipText,
                            (model === 'All' && tempFilters.model === null) || model === tempFilters.model
                              ? styles.chipTextSelected
                              : null
                          ]}
                        >
                          {model}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
                
                <View style={styles.filterSection}>
                  <Text style={styles.filterLabel}>Price Range (£)</Text>
                  <View style={styles.priceInputContainer}>
                    <TextInput
                      ref={minInputRef}
                      style={styles.priceInput}
                      placeholder="Min"
                      keyboardType="numeric"
                      value={tempFilters.minBid !== null ? tempFilters.minBid.toString() : ''}
                      onChangeText={(text) => setTempFilters({
                        ...tempFilters,
                        minBid: text ? parseInt(text, 10) : null
                      })}
                      onFocus={() => {
                        setTimeout(() => {
                          scrollViewRef.current?.scrollToEnd({ animated: true });
                        }, 100);
                      }}
                      onSubmitEditing={() => maxInputRef.current?.focus()}
                      returnKeyType="next"
                      blurOnSubmit={false}
                    />
                    <Text style={styles.priceSeparator}>to</Text>
                    <TextInput
                      ref={maxInputRef}
                      style={styles.priceInput}
                      placeholder="Max"
                      keyboardType="numeric"
                      value={tempFilters.maxBid !== null ? tempFilters.maxBid.toString() : ''}
                      onChangeText={(text) => setTempFilters({
                        ...tempFilters,
                        maxBid: text ? parseInt(text, 10) : null
                      })}
                      onFocus={() => {
                        setTimeout(() => {
                          scrollViewRef.current?.scrollToEnd({ animated: true });
                        }, 100);
                      }}
                      returnKeyType="done"
                      onSubmitEditing={dismissKeyboard}
                    />
                  </View>
                </View>
                
                <View style={styles.filterSection}>
                  <View style={styles.switchContainer}>
                    <Text style={styles.filterLabel}>Show Favorites Only</Text>
                    <Switch
                      value={tempFilters.favouritesOnly}
                      onValueChange={(value) => setTempFilters({
                        ...tempFilters,
                        favouritesOnly: value
                      })}
                      trackColor={{ 
                        false: themeColors.switchTrackOff, 
                        true: themeColors.switchTrackOn 
                      }}
                      thumbColor={
                        tempFilters.favouritesOnly 
                          ? themeColors.switchThumbOn 
                          : themeColors.switchThumbOff
                      }
                    />
                  </View>
                </View>
                
                {/* Add extra padding at the bottom when keyboard is visible */}
                {keyboardVisible && <View style={{ height: 120 }} />}
              </ScrollView>
              
              <View style={styles.modalFooter}>
                <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                  <Text style={styles.resetButtonText}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
                  <Text style={styles.applyButtonText}>Apply Filters</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default FilterModal;
