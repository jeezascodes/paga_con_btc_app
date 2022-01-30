import React, {useState, useRef} from 'react';
import {ScrollView} from 'react-native';
import MainView from '_components/MainView/MainView';
import {MainHeader, ProfilePicture, Alert} from 'paga-con-btc-ui';
import {CommonActions} from '@react-navigation/routers';
import {useUser} from '_store/hooks/useUser';
import {styles} from './ProfileStyles';
import {successMessages} from '_utils/constans/Constants';

export default function Profile({navigation}) {
  const alert = useRef();
  // only for demo purposes
  const UriExample = 'https://www.w3schools.com/w3images/avatar6.png';
  const username = 'Stranger';

  const goBack = () => {
    navigation.dispatch(CommonActions.goBack());
  };

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
        rightButtonOnPress={() => {}}
        title="PROFILE"
        rightButtonText="Logout"
      />
      <ScrollView>
        <ProfilePicture
          showAddIcon={false}
          name={username}
          source={{uri: UriExample}}
        />
      </ScrollView>
    </MainView>
  );
}
