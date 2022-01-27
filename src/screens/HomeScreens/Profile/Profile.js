import React, {useState, useRef} from 'react';
import {KeyboardAvoidingView, ScrollView} from 'react-native';
import MainView from '_components/MainView/MainView';
import {MainHeader, ProfilePicture, Alert} from 'kvell-app-ui';
import {CommonActions} from '@react-navigation/routers';
import {useUser} from '_store/hooks/useUser';
import FormProfile from 'kvell-app-ui/src/components/molecules/FormProfile';
import {styles} from './ProfileStyles';
import {successMessages} from '_utils/constans/Constants';

export default function Profile({navigation}) {
  const {actionsUser, userInfo} = useUser();

  const alert = useRef();
  // only for demo purposes
  const UriExample = 'https://www.w3schools.com/w3images/avatar6.png';
  const username = 'Stranger';
  const [data, setData] = useState(userInfo);

  const onSave = async () => {};
  const goBack = () => {
    navigation.dispatch(CommonActions.goBack());
  };
  const verifiedPhone = userInfo?.phone_is_valid;
  const verifiedEmail = userInfo?.email_is_verified;

  return (
    <MainView customStyles={styles.contain} gradient>
      <Alert
        alertTitleText={successMessages.PROFILE_UPDATE}
        positiveButtonText="Ok"
        ref={alert}
      />
      <MainHeader
        leftButtonOnPress={goBack}
        logOutButton={true}
        rightButtonOnPress={actionsUser.LogoutUser}
        title="PROFILE"
        rightButtonText="Logout"
      />
      <ScrollView>
        <ProfilePicture
          showAddIcon={false}
          name={username}
          source={{uri: UriExample}}
        />
        <KeyboardAvoidingView behavior={'position'}>
          <FormProfile
            styleContain={styles.formContain}
            userData={data}
            onSaveData={onSave}
            verifiedPhone={verifiedPhone}
            verifiedEmail={verifiedEmail}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </MainView>
  );
}
