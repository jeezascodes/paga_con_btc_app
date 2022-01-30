import React, {useState, useEffect} from 'react';
import MainView from '_components/MainView/MainView';
import {Button, Text, TextInput} from 'paga-con-btc-ui';
import {ScrollView, Image} from 'react-native';
import {thumbnails} from './ServiceDetailStyles';
import {useTheme} from '_utils/styles/themeProvider';
import {TextTypes, RouteNames} from '_utils/constans/Constants';
import {} from '../../../data/APIInterface';

export default function ServiceDetail({navigation, route}) {
  const theme = useTheme().theme;
  const service = route.params?.item;

  return (
    <MainView testID="screen_feed">
      <ScrollView keyboardShouldPersistTaps={true}>
        <Image style={thumbnails} source={{uri: service.thumbnail}} />
        <Text light={true}>{service.name}</Text>
        <Text type={TextTypes.TIRTIARY} light={true}>
          {service.description}
        </Text>
        <TextInput placeholder="Monto" />
        <Button title="Añadir al carrtio" />
      </ScrollView>
    </MainView>
  );
}
