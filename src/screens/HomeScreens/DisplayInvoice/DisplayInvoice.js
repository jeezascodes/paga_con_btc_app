import React, {useState} from 'react';
import MainView from '_components/MainView/MainView';
import {Button, Text, TextInput} from 'paga-con-btc-ui';
import {ScrollView, Image} from 'react-native';
import {thumbnails} from './DisplayInvoiceStyles';
import {useTheme} from '_utils/styles/themeProvider';
import {TextTypes, RouteNames} from '_utils/constans/Constants';
import {createInvoice} from '../../../data/APIInterface';
import QRCode from 'react-native-qrcode-svg';
import {getWidth, windowWidth} from '_utils/helpers/interfaceDimensions';

export default function DisplayInvoice({navigation, route}) {
  const theme = useTheme().theme;
  const invoice = route.params?.invoice;

  return (
    <MainView testID="screen_feed">
      <ScrollView keyboardShouldPersistTaps={true}>
        <QRCode
          size={getWidth(windowWidth * 0.9)}
          value={invoice?.ln_invoice}
        />
        <Text type={TextTypes.BODY} light={true}>
          {invoice.ln_invoice}
        </Text>
        <Text type={TextTypes.BODY} light={true}>
          {invoice.amount_mxn}
        </Text>
        <Text type={TextTypes.BODY} light={true}>
          {invoice.amount_sats}
        </Text>
        <Text type={TextTypes.BODY} light={true}>
          {invoice.exchange_rate}
        </Text>
        <Text type={TextTypes.BODY} light={true}>
          {invoice.expires_at}
        </Text>
        <Button title="Continuar" />
      </ScrollView>
    </MainView>
  );
}
