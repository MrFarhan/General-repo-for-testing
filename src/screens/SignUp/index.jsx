import { useIsFocused, useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native';
import { SignUpForm } from '../../components';
import { colors } from '../../Themes';
import { styles } from './Style';
import { useDispatch } from 'react-redux';

const SignUp = () => {
  const { navigate } = useNavigation();

  const handleNavigate = path => {
    navigate(path);
  };

  const isFocus = useIsFocused();
  const dispatch = useDispatch();
  const fetchLoc = async () => { };

  React.useEffect(() => {
    fetchLoc();
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <KeyboardAvoidingView
        style={styles.main}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500} // Adjust the offset as needed
      >
        <ScrollView contentContainerStyle={styles.container}>
          <SignUpForm isFocus={isFocus} />
          <Text style={{ ...styles.pera, color: colors.gray, marginVertical: 15 }}>
            By registering, you agree to Purchase Tracker's?{' '}
            <Text
              style={{ color: colors.primary }}
              onPress={() => handleNavigate('TermsAndCondition')}>
              Terms & Conditions
            </Text> and <Text
              style={{ color: colors.primary }}
              onPress={() => handleNavigate('PrivacyPolicy')}>
              Privacy Policy
            </Text>
          </Text>
          <Text style={styles.pera}>
            Already have an account?{' '}
            <Text
              style={{ color: colors.primary }}
              onPress={() => handleNavigate('Sign-in')}>
              Sign In
            </Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
