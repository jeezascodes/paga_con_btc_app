import React from 'react';
import {Feed, Profile, Welcome} from '_screens/HomeScreens';
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
      <Stack.Screen name={RouteNames.PROFILE} component={Profile} />
      <Stack.Screen name={RouteNames.OFFLINE} component={OfflineScreen} />
    </Stack.Navigator>
  );
}
