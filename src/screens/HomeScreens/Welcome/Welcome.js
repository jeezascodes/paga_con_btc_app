import React, {useEffect} from 'react';
import MainView from '_components/MainView/MainView';
import {Welcome} from 'paga-con-btc-ui';
import {RouteNames} from '_utils/constans/Constants';
import {useUser} from '_store/hooks/useUser';

export default function Feed({navigation}) {
  const {actionsUser} = useUser();
  const onButtonPress = () => {
    actionsUser.logIn();
  };
  return (
    <MainView testID="screen_feed">
      <Welcome onButtonPress={onButtonPress} />
    </MainView>
  );
}
