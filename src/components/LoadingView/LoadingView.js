import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppTabs from '_navigator/AppTabs';
import RNBootSplash from 'react-native-bootsplash';
import {Welcome} from '../../screens/HomeScreens/Welcome/Welcome';
import AuthStack from '_navigator/stacks/AuthStack';
import {useUser} from '_store/hooks/useUser';
import Store from '_utils/helpers/store';
import {locallyStoredUserVariables} from '_utils/constans/Constants';

const LoadingView = () => {
  const [storedEmail, setStoredEmail] = useState(null);
  const {isUserLoggedIn} = useUser();

  const getEmail = async () => {
    const email = await Store.get(locallyStoredUserVariables.USER_STORED_EMAIL);
    setTimeout(() => {
      RNBootSplash.hide({fade: true});
    }, 500);
    if (email) setStoredEmail(email);
  };

  useEffect(() => {
    getEmail();
    return () => {};
  }, []);
  let content = (
    <NavigationContainer>
      {isUserLoggedIn || storedEmail ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );

  return content;
};

export default LoadingView;
