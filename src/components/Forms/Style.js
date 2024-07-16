import { StyleSheet } from 'react-native';
import { colors } from '../../Themes';

export const styles = StyleSheet.create({
  heading: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  subHeading: { fontSize: 12, marginBottom: 20, color: colors.gray_font },
  inputContainer: {
    width: '100%',
    marginVertical: 20,
    gap: 24,
  },
  forgotPassword: {
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    fontSize: 16,
    color: colors.primary,
  },
  peraText: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.black
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 20,
  },
  radioContainer: { flexDirection: 'row', gap: 20 },
  radioGroup: { flexDirection: 'row', gap: 5, alignItems: 'center' },
  radio: toggle => ({
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.gray,
    backgroundColor: toggle ? colors.primary : colors.white,
  }),
  main: {
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 6,
    height: 50,
    maxHeight: 50,
  },
  listContainer: { borderWidth: 1, borderColor: colors.gray_font },
});
