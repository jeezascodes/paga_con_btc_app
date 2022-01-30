import React, {useEffect} from 'react';
import MainView from '_components/MainView/MainView';
import {Welcome} from 'paga-con-btc-ui';

export default function Feed({navigation}) {
  return (
    <MainView testID="screen_feed">
      <Welcome />
    </MainView>
  );
}
