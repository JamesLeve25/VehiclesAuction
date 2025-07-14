import { StyleSheet, Platform } from 'react-native';

// Define colors for reusability
const colors = {
  white: '#FFFFFF',
  black: '#000000',
  grey50: '#FAFAFA',
  grey100: '#F5F5F5',
  grey200: '#EEEEEE',
  grey300: '#E0E0E0',
  grey400: '#BDBDBD',
  grey500: '#9E9E9E',
  grey600: '#757575',
  grey700: '#616161',
  gold: '#FFD700',
  green: '#2E7D32',
  red: '#FF6B6B',
  imagePlaceholder: '#ECEFF1',
};

// Create and export the styles
const vehicleCardStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: Platform.OS === 'ios' ? 0 : 0.5,
    borderColor: colors.grey300,
  },
  imagePlaceholder: {
    width: 130,
    height: 'auto',
    backgroundColor: colors.imagePlaceholder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    color: colors.grey500,
    fontSize: 14,
    fontWeight: '500',
  },
  cardContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
    paddingRight: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 2,
  },
  favoriteButton: {
    padding: 4,
    marginTop: -4,
    marginRight: -4,
  },
  favorite: {
    fontSize: 26,
    color: colors.grey400,
  },
  favoriteActive: {
    color: colors.gold,
  },
  details: {
    marginBottom: 12,
  },
  detailText: {
    color: colors.grey600,
    fontSize: 14,
    marginBottom: 4,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 'auto',
  },
  bidContainer: {
    flex: 1,
  },
  bidLabel: {
    fontSize: 12,
    color: colors.grey600,
    marginBottom: 2,
  },
  bidAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.green,
  },
  timeContainer: {
    alignItems: 'flex-end',
  },
  timeLabel: {
    fontSize: 12,
    color: colors.grey600,
    marginBottom: 2,
  },
  timeValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.red,
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 0,
    backgroundColor: colors.red,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  badgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: colors.grey200,
    marginVertical: 10,
  },
});

export default vehicleCardStyles;
