import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { styles } from './Style';
import { getUserAuthDetails } from '../../service/auth';
import { useIsFocused } from '@react-navigation/native';
import { colors } from '../../Themes';

const Profile = () => {
  const isFocused = useIsFocused();
  const [userData, setUserData] = useState(null);
  const [pageLoader, setPageLoader] = useState(true);

  const fetchUserData = async () => {
    try {

      const data = await getUserAuthDetails();

      setUserData(data);
      setPageLoader(false);
    } catch (error) {
      setPageLoader(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [isFocused]);

  if (pageLoader) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <ActivityIndicator size={55} />
      </View>
    );
  }
  console.log("data on profile is ", userData)
  return (
    <SafeAreaView style={styles.main}>
      <KeyboardAvoidingView
        style={styles.main}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500} // Adjust the offset as needed
      >
        <ScrollView style={styles.container}>
          <Text>Profile page</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Profile;
