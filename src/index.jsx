import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import {
  Profile,

  RecentActivity,
  SignIn,
  SignUp,
  SplashScreen,
} from './screens';
import { Icons, colors } from './Themes';
import LinearGradient from 'react-native-linear-gradient';
import { useAuthenticator } from '@aws-amplify/ui-react-native';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function Navigations() {

  const { authStatus } = useAuthenticator(context => [context.route]);
  const isLoggedIn = authStatus === 'authenticated';

  console.log("navigation", authStatus)
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#fff' },
          cardStyle: { backgroundColor: '#fff' },
        }}>
        <Stack.Screen name="Splash-screen" component={SplashScreen} />
        {!isLoggedIn ?
          <>
            <Stack.Screen name="Sign-in" component={SignIn} />
            <Stack.Screen name="Sign-up" component={SignUp} />
          </>
          :
          <Stack.Screen name="Main" component={BottomNavigation} />
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function BottomNavigation() {
  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: colors.white }}
      initialRouteName="recent-activity"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarBackground: () => (
          <LinearGradient
            colors={[colors.primary, colors.primary, colors.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0 }}
            style={{ flex: 1 }}
          />
        ),
      }}>
      <Tab.Screen
        name="recent-activity"
        component={RecentActivity}
        options={{
          headerShown: null,
          tabBarIcon: ({ focused }) => {
            return (
              <Icons.AntDesign
                name="menuunfold"
                size={26}
                color={focused ? colors.gray_bg_light : colors.gray}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: null,
          tabBarIcon: ({ focused }) => {
            return (
              <Icons.FontAwesome5
                name="user-circle"
                size={26}
                color={focused ? colors.gray_bg_light : colors.gray}
              />
            );
          },
        }}
      />

    </Tab.Navigator>
  );
}
