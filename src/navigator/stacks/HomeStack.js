import React from 'react';
import {Feed, Profile} from '_screens/HomeScreens';
import {VerifyPhone} from '_screens/AuthScreens';
import {createStackNavigator} from '@react-navigation/stack';
import {RouteNames} from '_utils/constans/Constants';
import OfflineScreen from '_screens/OfflineScreen';
const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{header: () => null}}
      initialRouteName={RouteNames.FEED}>
      <Stack.Screen name={RouteNames.FEED} component={Feed} />
      <Stack.Screen
        name={RouteNames.PROFILE}
        component={Profile}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen name={RouteNames.VERIFY_PHONE} component={VerifyPhone} />
      <Stack.Screen name={RouteNames.OFFLINE} component={OfflineScreen} />
    </Stack.Navigator>
  );
}