import React, {useState, useEffect} from 'react';
import MainView from '_components/MainView/MainView';
import {Button, Text, TextInput} from 'paga-con-btc-ui';
import {ScrollView, Image, View} from 'react-native';
import {thumbnails} from './ServiceDetailStyles';
import {useTheme} from '_utils/styles/themeProvider';
import {
  TextTypes,
  RouteNames,
  serviceCategories,
  locallyStoredUserVariables,
} from '_utils/constans/Constants';
import {createInvoice} from '../../../data/APIInterface';
import Store from '_utils/helpers/store';

export default function ServiceDetail({navigation, route}) {
  const theme = useTheme().theme;
  const service = route.params?.item;
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [serviceRef, setServiceRef] = useState(null);
  const isRefRequired = service.requires_service_ref;
  const [email, setEmail] = useState('');

  const onCreateInvoice = async () => {
    data = {
      service_id: service.id,
      email,
      amount: selectedAmount,
      service_ref: serviceRef,
    };
    console.log(`data`, data);
    try {
      const invoice = await createInvoice(data);
      navigation.navigate(RouteNames.DISPLAY_INVOICE, {
        invoice: invoice.payload,
        service,
      });
    } catch (error) {
      console.log(`error`, error);
    }
  };

  const retrieveEmail = async () => {
    const retrievedEmail = await Store.get(
      locallyStoredUserVariables.USER_STORED_EMAIL,
    );
    setEmail(retrievedEmail);
  };

  useEffect(() => {
    retrieveEmail();
  }, []);

  const renderRefEntering = () => {
    return (
      <View>
        {service?.category == serviceCategories.PHONE_RECHARGE && (
          <>
            <TextInput
              label="Número teléfonico"
              placeholder="Número teléfonico"
              onChangeText={setServiceRef}
              value={serviceRef}
              maxLength={30}
              keyboardType="phone-pad"
              returnKeyLabel="Done"
              returnKeyType="done"
            />
          </>
        )}
        {service?.category == serviceCategories.SERVICE && (
          <>
            <TextInput
              label="Número de cuenta o contrato"
              placeholder="Número de cuenta o contrato"
              onChangeText={setServiceRef}
              value={serviceRef}
            />
          </>
        )}
      </View>
    );
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
          <TextInput
            label="Monto"
            placeholder="Monto"
            onChangeText={setSelectedAmount}
            value={selectedAmount}
            keyboardType="numeric"
            returnKeyLabel="Done"
            returnKeyType="done"
          />
        )}
        {isRefRequired && renderRefEntering()}
        <TextInput
          placeholder="Correo electrónico"
          label="Correo electrónico"
          value={email}
          onChangeText={setEmail}
        />
        <Button
          title="Continuar"
          disabled={!selectedAmount}
          onPress={onCreateInvoice}
        />
      </ScrollView>
    </MainView>
  );
}
