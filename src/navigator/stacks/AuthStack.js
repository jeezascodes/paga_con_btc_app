import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Login,
  RegisterPhone,
  VerifyPhone,
  DailyQuote,
  Loading,
} from '_screens/AuthScreens/';
import {RouteNames} from '_utils/constans/Constants';
const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{header: () => null}}
      initialRouteName={RouteNames.LOADING}>
      <Stack.Screen name={RouteNames.LOADING} component={Loading} />
      <Stack.Screen name={RouteNames.LOGIN} component={Login} />
      <Stack.Screen
        name={RouteNames.REGISTER_PHONE}
        component={RegisterPhone}
      />
      <Stack.Screen name={RouteNames.VERIFY_PHONE} component={VerifyPhone} />
      <Stack.Screen name={RouteNames.DAILY_QUOTE} component={DailyQuote} />
    </Stack.Navigator>
  );
}
