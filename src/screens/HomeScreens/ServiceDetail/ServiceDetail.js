import React, {useState} from 'react';
import MainView from '_components/MainView/MainView';
import {Button, Text, TextInput} from 'paga-con-btc-ui';
import {ScrollView, Image} from 'react-native';
import {thumbnails} from './ServiceDetailStyles';
import {useTheme} from '_utils/styles/themeProvider';
import {TextTypes, RouteNames} from '_utils/constans/Constants';
import {createInvoice} from '../../../data/APIInterface';

export default function ServiceDetail({navigation, route}) {
  const theme = useTheme().theme;
  const service = route.params?.item;
  const [selectedAmount, setSelectedAmount] = useState(0);

  const onCreateInvoice = async () => {
    data = {
      service_id: service.id,
      email: 'jesus.gonzalez.xcv@gmail.com',
      amount: selectedAmount,
      service_ref: '5563324292',
    };
    try {
      const invoice = await createInvoice(data);
      navigation.navigate(RouteNames.DISPLAY_INVOICE, {
        invoice: invoice.payload,
      });
    } catch (error) {
      console.log(`error`, error);
    }
  };

  return (
    <MainView testID="screen_feed">
      <ScrollView keyboardShouldPersistTaps={true}>
        <Image style={thumbnails} source={{uri: service.thumbnail}} />
        <Text light={true}>{service.name}</Text>
        <Text type={TextTypes.TIRTIARY} light={true}>
          {service.description}
        </Text>

        {service?.amount_restricted ? (
          service.allowed_amounts?.map(amount => {
            return (
              <Button
                title={amount}
                onPress={() => setSelectedAmount(amount)}
              />
            );
          })
        ) : (
          <TextInput placeholder="Monto" />
        )}
        <Button
          title="Continuar"
          disabled={!selectedAmount}
          onPress={onCreateInvoice}
        />
      </ScrollView>
    </MainView>
  );
}
