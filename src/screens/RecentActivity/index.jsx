import React from 'react';
import {

  Button,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

import { styles } from './Style';
import { logout } from '../../service/auth';
import { useNavigation } from '@react-navigation/native';
import { useAuthenticator } from '@aws-amplify/ui-react-native';


const RecentActivity = () => {

  const { navigate } = useNavigation()
  const HandleLogout = async () => {
    await logout().then(() => {
      navigate("Sign-in")
    })
  }

  const { authStatus } = useAuthenticator(context => [context.route]);
  const isLoggedIn = authStatus === 'authenticated';
  return (
    <SafeAreaView style={styles.container}>
      <View><Text>My Screen {authStatus}</Text></View>
      <Button title='Logout' onPress={HandleLogout}></Button>
    </SafeAreaView>
  );
};



export default RecentActivity;
