import { StyleSheet } from 'react-native';

export const filterChipsStyles = StyleSheet.create({
  activeFiltersContainer: {
    marginTop: 12,
  },
  activeFiltersContent: {
    paddingBottom: 8,
  },
  activeFilterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e1f5fe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  activeFilterText: {
    color: '#0277bd',
    marginRight: 4,
  },
  removeFilterIcon: {
    color: '#0277bd',
    fontSize: 14,
  },
});

export default filterChipsStyles;