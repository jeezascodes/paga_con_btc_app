import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppTabs from '_navigator/AppTabs';
import RNBootSplash from 'react-native-bootsplash';
import {Welcome} from '../../screens/HomeScreens/Welcome/Welcome';
import AuthStack from '_navigator/stacks/AuthStack';

const LoadingView = () => {
  useEffect(() => {
    RNBootSplash.hide({fade: true});
    return () => {};
  }, []);

  let content = (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );

  return content;
};

export default LoadingView;
