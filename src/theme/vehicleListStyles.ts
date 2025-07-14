import { StyleSheet } from 'react-native';

// Define colors for reusability
const colors = {
  background: '#f5f5f5',
  white: 'white',
  border: '#e0e0e0',
  text: {
    primary: '#000000',
    secondary: '#666666',
    tertiary: '#333333',
  },
  button: {
    background: '#f0f0f0',
    resetBackground: '#e0e0e0',
  },
  loader: '#0000ff',
};

// Create and export the styles
const vehicleListScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  subtitle: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 4,
  },
  filterButton: {
    backgroundColor: colors.button.background,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterButtonText: {
    fontWeight: '500',
    color: colors.text.primary,
  },
  content: {
    padding: 16,
    flexGrow: 1,
  },
  loaderFooter: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderText: {
    marginTop: 8,
    color: colors.text.secondary,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    minHeight: 300,
  },
  emptyText: {
    fontSize: 16,
    color: colors.text.secondary,
    marginTop: 8,
  },
  resetFiltersButton: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.button.resetBackground,
    borderRadius: 20,
  },
  resetFiltersText: {
    color: colors.text.tertiary,
  },
});

// Export colors for potential use in the component
export const themeColors = {
  loaderColor: colors.loader,
};

export default vehicleListScreenStyles;