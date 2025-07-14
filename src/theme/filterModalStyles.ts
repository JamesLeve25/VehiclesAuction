import { StyleSheet, Dimensions } from 'react-native';

// Get screen dimensions
const { height: screenHeight } = Dimensions.get('window');

// Colors
const colors = {
  primary: '#2196F3',
  white: 'white',
  black: 'rgba(0, 0, 0, 0.5)',
  grey100: '#f0f0f0',
  grey200: '#e0e0e0',
  grey300: '#ccc',
  grey400: '#666',
  grey500: '#333',
  switchTrackOff: '#767577',
  switchTrackOn: '#81b0ff',
  switchThumbOff: '#f4f3f4',
  switchThumbOn: '#f5dd4b',
};

// Create and export the styles
const filterModalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.black,
    justifyContent: 'flex-end',
  },
  // This spacer pushes the modal down
  topSpacer: {
    height: screenHeight * 0.15, // 15% of screen height as top space
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '75%', // Reduced from 80% to 75%
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey200,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 18,
    color: colors.grey400,
  },
  modalBody: {
    padding: 16,
    maxHeight: '65%', // Reduced from 70% to 65%
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.grey200,
  },
  filterSection: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  chipContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  chip: {
    backgroundColor: colors.grey100,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  chipSelected: {
    backgroundColor: colors.primary,
  },
  chipText: {
    color: colors.grey500,
  },
  chipTextSelected: {
    color: colors.white,
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.grey200,
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  priceSeparator: {
    marginHorizontal: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resetButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.grey300,
    borderRadius: 8,
  },
  resetButtonText: {
    color: colors.grey400,
  },
  applyButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  applyButtonText: {
    color: colors.white,
    fontWeight: '500',
  },
});

// Export the colors for use in the component
export const themeColors = {
  switchTrackOff: colors.switchTrackOff,
  switchTrackOn: colors.switchTrackOn,
  switchThumbOff: colors.switchThumbOff,
  switchThumbOn: colors.switchThumbOn,
};

export default filterModalStyles;