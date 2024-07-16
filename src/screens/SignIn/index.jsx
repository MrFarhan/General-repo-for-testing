import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native';
import { SignInForm } from '../../components';
import { colors } from '../../Themes';
import { styles } from './Style';
import { useSelector } from 'react-redux';

const SignIn = () => {
  const { navigate } = useNavigation();
  const isFocused = useIsFocused()

  const handleNavigate = path => {
    navigate(path);
  };



  return (
    <SafeAreaView style={styles.main}>
      <KeyboardAvoidingView
        style={styles.main}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // adjust the value according to your needs
      >
        <ScrollView contentContainerStyle={styles.container}>
          <SignInForm />
          <Text style={styles.pera}>

            Don’t have an account?{' '}
            <Text
              style={{ color: colors.primary }}
              onPress={() => handleNavigate('Sign-up')}>
              Sign up
            </Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
