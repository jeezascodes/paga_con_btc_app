import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Login, Loading} from '_screens/AuthScreens/';
import {RouteNames} from '_utils/constans/Constants';
const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{header: () => null}}
      initialRouteName={RouteNames.LOADING}>
      <Stack.Screen name={RouteNames.LOADING} component={Loading} />
      <Stack.Screen name={RouteNames.LOGIN} component={Login} />
    </Stack.Navigator>
  );
}
