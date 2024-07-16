import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './Style';
import { colors } from '../../Themes';

const CustomButton = props => {
  const {
    onPress = () => { },
    text,
    containerStyle = {},
    btnStyle = {},
    loader,
    disabled = false,
  } = props;
  return (
    <View style={[styles.btnContainer, containerStyle]}>
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.8}
        onPress={onPress}
        style={{
          ...styles.btn,
          backgroundColor: disabled ? 'gray' : colors.primary,
          ...btnStyle,
        }}>
        {loader ? (
          <ActivityIndicator color={colors.black} />
        ) : (
          <Text style={styles.btnText}>{text}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
