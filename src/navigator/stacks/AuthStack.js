import React from 'react';
import {Welcome} from '_screens/HomeScreens';
import {createStackNavigator} from '@react-navigation/stack';
import {RouteNames} from '_utils/constans/Constants';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{header: () => null}}
      initialRouteName={RouteNames.WELCOME}>
      <Stack.Screen
        name={RouteNames.WELCOME}
        component={Welcome}
        options={{tabBarVisible: false}}
      />
    </Stack.Navigator>
  );
}
