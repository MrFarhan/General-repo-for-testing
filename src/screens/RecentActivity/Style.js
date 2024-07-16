import { StyleSheet } from 'react-native';
import { colors } from '../../Themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  desc: { color: colors.primary, fontSize: 16, fontWeight: '600' },
  image: { width: 300, height: 300, objectFit: 'contain' },
  suggestion: {
    color: colors.gray_font,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  main: { flex: 1 },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeFilterContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    gap: 6,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeFilterItemContainer: isSelected => ({
    padding: 10,
    backgroundColor: colors.gray_bg_light,
    borderWidth: 1,
    borderColor: isSelected ? colors.primary : colors.gray,
    borderRadius: 15,
  }),
  timeFilterText: isSelected => ({
    color: isSelected ? colors.primary : colors.gray,
    fontSize: 12,
  }),
  productContainer: isSelected => ({
    marginBottom: isSelected ? 0 : 20,
  }),
  productGradient: isSelected => ({
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: isSelected ? 0 : 10,
    borderBottomRightRadius: isSelected ? 0 : 10,
  }),
  productHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  productTitleText: {
    color: colors.gray_bg_light,
    fontSize: 16,
    width: "100%",
    maxWidth: "90%"

  },
  productDetailsRow: index => ({
    borderWidth: 1,
    borderColor: colors.gray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0,
  }),
  productDetailsLabel: {
    padding: 5,
    borderRightWidth: 1,
    borderColor: colors.gray,
    width: '30%',
  },
  productDetailsLabelText: { color: colors.primary },
  productDetailsValueContainer: {
    flex: 1,
    padding: 5,
  },
  productDetailsValueText: { color: colors.secondary },
  moreOptionContainer: {
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.gray,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    padding: 5,
    marginBottom: 20,
  },
});
