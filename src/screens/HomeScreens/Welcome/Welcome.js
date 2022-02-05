import React, {useState, useEffect} from 'react';
import MainView from '_components/MainView/MainView';
import {Welcome} from 'paga-con-btc-ui';
import {RouteNames} from '_utils/constans/Constants';
import {useUser} from '_store/hooks/useUser';

export default function Feed({navigation}) {
  const [email, setEmail] = useState('');

  const handleInputChange = value => {
    setEmail(value);
  };

  const {actionsUser} = useUser();
  const onButtonPress = () => {
    actionsUser.logIn(email);
  };
  return (
    <MainView testID="screen_feed" customStyles={{backgroundColor: '#c6bcbe'}}>
      <Welcome
        onButtonPress={onButtonPress}
        handleInputChange={handleInputChange}
        email={email}
      />
    </MainView>
  );
}
