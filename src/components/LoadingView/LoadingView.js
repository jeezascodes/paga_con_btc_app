import React, {useEffect} from 'react';
import {useUser} from '_store/hooks/useUser';
import {NavigationContainer} from '@react-navigation/native';
import AppTabs from '_navigator/AppTabs';
import AuthStack from '_navigator/stacks/AuthStack';
import RNBootSplash from 'react-native-bootsplash';
import RaygunClient from 'raygun4reactnative';
import {raygunConfig} from '_utils/constans/Configs';

RaygunClient.init(raygunConfig);

const LoadingView = () => {
  const {user, isUserLoggedIn} = useUser();
  useEffect(() => {
    RNBootSplash.hide({fade: true});
    return () => {};
  }, []);

  let content = (
    <NavigationContainer>
      {isUserLoggedIn && !user.showQuote ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );

  return content;
};

export default LoadingView;
