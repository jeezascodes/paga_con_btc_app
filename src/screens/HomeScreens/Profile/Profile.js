import React, {useState, useRef} from 'react';
import {KeyboardAvoidingView, ScrollView} from 'react-native';
import MainView from '_components/MainView/MainView';
import {MainHeader, ProfilePicture, Alert} from 'kvell-app-ui';
import {CommonActions} from '@react-navigation/routers';
import {useUser} from '_store/hooks/useUser';
import FormProfile from 'kvell-app-ui/src/components/molecules/FormProfile';
import {styles} from './ProfileStyles';
import {firebase} from '@react-native-firebase/auth';
import {RouteNames, successMessages} from '_utils/constans/Constants';
import {setBasicProfile} from '_data/APIInterface';

export default function Profile({navigation}) {
  const {user, actionsUser, userInfo} = useUser();
  const [loadingSave, setLoadingSave] = useState(false);

  const alert = useRef();
  // only for demo purposes
  const UriExample = 'https://www.w3schools.com/w3images/avatar6.png';

  const username =
    user.userName && user.userName !== '' ? user.userName : 'Stranger';

  const [data, setData] = useState(userInfo);

  const UpdateFields = async dataInfo => {
    const phoneNumber = dataInfo.firebase_phone.replace(/[-() ]+/g, '').trim();
    if (phoneNumber !== userInfo?.firebase_phone) {
      firebase
        .auth()
        .verifyPhoneNumber(phoneNumber)
        .then(confirmation => {
          navigation.navigate(RouteNames.VERIFY_PHONE, {
            phoneNumber,
            verificationId: confirmation.verificationId,
            dataInfo,
          });
        });
    } else {
      await setBasicProfile(user.userId, dataInfo);
      alert.current.showAlert();
      await actionsUser.validateIfUserAlreadyLoggedIn();
    }
  };

  const onSave = async dataValues => {
    setData(dataValues);
    setLoadingSave(true);
    await UpdateFields(dataValues);
    setLoadingSave(false);
  };
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
            loading={loadingSave}
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
