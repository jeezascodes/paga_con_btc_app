import React, {useEffect} from 'react';
import MainView from '_components/MainView/MainView';
import {Logo, LoaderSpinner} from 'kvell-app-ui';
import {View} from 'react-native';
import {loginStyles} from '../Login/LoginStyles';
import {
  locallyStoredUserVariables,
  RouteNames,
} from '_utils/constans/Constants';
import {useUser} from '_store/hooks/useUser';
import {Colors} from '_utils/styles/colors';
import {refreshToken} from '_data/APIInterface';
import Store from '_utils/helpers/store';
import Log from '_utils/helpers/errorHandler';

export default function Loading({navigation}) {
  const {user, actionsUser} = useUser();

  const InitializeUser = actionsUser.InitializeUser;

  const refreshUserToken = async () => {
    try {
      const storeRefreshToken = await Store.get(
        locallyStoredUserVariables.REFRESH_TOKEN,
      );
      if (storeRefreshToken !== null) {
        const response = await refreshToken({
          refresh_token: storeRefreshToken,
        });
        await Store.set(
          locallyStoredUserVariables.REFRESH_TOKEN,
          response.refresh_token,
        );
        await Store.set(
          locallyStoredUserVariables.ACCESS_TOKEN,
          response.access_token,
        );
      }
    } catch (err) {
      Log.Error(err, err.stacktrace, err.statuscode);
    }
  };
  const initializeLoading = async () => {
    await refreshUserToken();
    await InitializeUser();
  };
  useEffect(() => {
    initializeLoading();

    return () => {};
  }, []);

  useEffect(() => {
    if (!user.isLoading) {
      if (user.userId) {
        navigation.navigate(RouteNames.DAILY_QUOTE);
      } else {
        navigation.navigate(RouteNames.LOGIN);
      }
    }
  }, [user.userId, user.isLoading]);

  return (
    <MainView testID="screen_login" gradient={true} horizontalPadding={true}>
      <View style={loginStyles().logoContainer}>
        <Logo type="MainLogo" height={100} color={Colors().brandColor} />
      </View>
      <View style={loginStyles().buttonsContainer}>
        <LoaderSpinner isLoading={user.isLoading} color={Colors().cardColor} />
      </View>
    </MainView>
  );
}
