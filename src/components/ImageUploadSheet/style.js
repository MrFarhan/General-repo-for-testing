import { StyleSheet } from 'react-native';
import { colors } from '../../Themes';

export const styles = StyleSheet.create({
  optionListContainer: { paddingVertical: 30, paddingHorizontal: 20 },
  optionItemContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  optionItemText: {
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: colors.black,
  },
  profileImageContainer: {
    justifyContent: 'center',
    width: 100,
    alignSelf: 'center',
  },
  profileImage: {
    borderRadius: 100,
    resizeMode: 'cover',
    opacity: 0.5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: 100,
    height: 100,
  },
  cameraIconContainer: {
    position: 'absolute',
    left: 60,
    right: 0,
    top: 60,
    zIndex: 9999,
  },
  profileIconStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: "white",
    borderWidth: 3,
    borderRadius: 30,
    backgroundColor: "white"

  },
});
