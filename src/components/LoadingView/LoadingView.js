import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppTabs from '_navigator/AppTabs';
import RNBootSplash from 'react-native-bootsplash';

const LoadingView = () => {
  useEffect(() => {
    RNBootSplash.hide({fade: true});
    return () => {};
  }, []);

  let content = (
    <NavigationContainer>
      <AppTabs />
    </NavigationContainer>
  );

  return content;
};

export default LoadingView;
