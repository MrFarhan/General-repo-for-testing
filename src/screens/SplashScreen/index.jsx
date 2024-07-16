import LinearGradient from 'react-native-linear-gradient';
import { Styles } from './Style';
import { colors, images } from '../../Themes';
import React, { useEffect, useRef, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { saveUserDetails } from '../../store/slice/userSlice';
import { Animated, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useAuthenticator } from '@aws-amplify/ui-react-native';

const SplashScreen = () => {
  const { reset } = useNavigation();

  const isFocused = useIsFocused();
  const { authStatus } = useAuthenticator(context => [context.route]);
  const isLoggedIn = authStatus === 'authenticated';
  console.log("splash ", isLoggedIn, authStatus)

  const checkAuth = async () => {
    reset({
      index: 0,
      routes: [
        {
          name: isLoggedIn
            ? 'Main'
            : 'Sign-in'

        },
      ],
    });
  };
  useEffect(() => {
    if (authStatus === "configuring") return
    checkAuth();
  }, [isFocused, authStatus]);

  const opacity = useRef(new Animated.Value(0)).current; // Initial opacity is 0

  useEffect(() => {
    const fadeIn = Animated.timing(opacity, {
      toValue: 1, // Fade in to opacity 1
      duration: 1000, // Duration of the fade in animation
      useNativeDriver: true,
    });

    const fadeOut = Animated.timing(opacity, {
      toValue: 0, // Fade out to opacity 0
      duration: 1000, // Duration of the fade out animation
      useNativeDriver: true,
    });

    // Loop the animation sequence indefinitely
    Animated.loop(Animated.sequence([fadeIn, fadeOut])).start();
  }, [opacity]);

  return (
    <View style={Styles.linearGradient}>
      <View style={{ flex: 1, justifyContent: 'center', padding: 50 }}>
        <Animated.View
          style={{
            flex: 1,
            justifyContent: 'center',
            width: '100%',
            opacity: opacity,
          }}>
          <Text>My App</Text>
        </Animated.View>
      </View>
    </View>
  );
};
export default SplashScreen;
