import React from 'react';
import MainView from '_components/MainView/MainView';
import {Button, LoaderSpinner, Logo} from 'kvell-app-ui';
import {View} from 'react-native';
import {loginStyles} from './LoginStyles';
import {
  ButtonTypes,
  ButtonPaddingTypes,
  RouteNames,
} from '_utils/constans/Constants';
import {IconNames} from '_utils/constans/Constants';
import {Colors} from '_utils/styles/colors';
import {useUser} from '_store/hooks/useUser';

export default function Login({navigation}) {
  const {actionsUser, user} = useUser();

  return (
    <MainView testID="screen_login" gradient={true} horizontalPadding={true}>
      <View style={loginStyles().logoContainer}>
        <Logo type="MainLogo" height={100} color={Colors().brandColor} />
      </View>
      {user.isLoading ? (
        <LoaderSpinner isLoading={user.isLoading} />
      ) : (
        <View style={loginStyles().buttonsContainer}>
          <Button
            testID="btn_login_phone"
            verticalPadding={ButtonPaddingTypes.THICK}
            type={ButtonTypes.SECONDARY}
            title="Continue With Phone Number"
            iconName={IconNames.PHONE}
            onPress={() => navigation.navigate(RouteNames.REGISTER_PHONE)}
          />
          {/* <Button
              verticalPadding={ButtonPaddingTypes.THICK}
              type={ButtonTypes.SECONDARY}
              title="Continue With Google"
              iconName={IconNames.GOOGLE_LOGO}
              onPress={actionsUser.RegisterUserGoogle}
            /> */}
          <Button
            verticalPadding={ButtonPaddingTypes.THICK}
            type={ButtonTypes.SECONDARY}
            title="Continue with Apple"
            iconName={IconNames.APPLE_LOGO}
            onPress={actionsUser.signInWithApple}
          />
        </View>
      )}
    </MainView>
  );
}
