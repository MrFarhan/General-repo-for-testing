import { StyleSheet } from 'react-native';
import { colors } from '../../Themes';

export const styles = StyleSheet.create({
  headingContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" },
  heading: {
    color: colors.secondary,
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 20,
  },
});
