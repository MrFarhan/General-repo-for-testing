import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '../../Themes';
import Icons from '../../Themes/icons';
import { styles } from './Style';

const CustomHeading = props => {
  const { text, isBack = false, headingStyle = {}, rightIcon } = props;
  const { goBack } = useNavigation();

  return (
    <View style={styles.headingContainer}>
      <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center', }}>
        {isBack && (
          <Icons.Ionicons
            name="arrow-back"
            color={colors.primary}
            size={28}
            style={{ marginRight: 10 }}
            onPress={goBack}
          />
        )}
        <Text style={[styles.heading, headingStyle]}>{text}</Text>
      </View>
      {!!rightIcon && rightIcon}
    </View>
  );
};

export default CustomHeading;
