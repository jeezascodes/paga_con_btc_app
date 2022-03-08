import React, {useState, useEffect} from 'react';
import MainView from '_components/MainView/MainView';
import {Button, Text, TextInput} from 'paga-con-btc-ui';
import {ScrollView, Image, View} from 'react-native';
import {thumbnails, container} from './ServiceDetailStyles';
import {useTheme} from '_utils/styles/themeProvider';
import {
  TextTypes,
  RouteNames,
  serviceCategories,
  locallyStoredUserVariables,
  ButtonTypes,
  ButtonPaddingTypes,
} from '_utils/constans/Constants';
import {createInvoice} from '../../../data/APIInterface';
import Store from '_utils/helpers/store';
import {getHeight, getWidth} from '_utils/helpers/interfaceDimensions';
import {AppColors} from '_utils/styles';
import {servicesColor} from '../../../utils/styles/AppColors';
import {GlobalStyles} from '_utils/styles/globalStyles';
import MaskedView from '@react-native-community/masked-view';

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
              label=""
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
              label=""
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
    <MainView
      testID="screen_feed"
      customStyles={{backgroundColor: servicesColor[service.id]}}>
      <ScrollView style={container} keyboardShouldPersistTaps={true}>
        {/* <Image
          style={[thumbnails, GlobalStyles().topMargin]}
          source={{uri: service.thumbnail}}
        /> */}
        <MaskedView
          style={{
            flex: 1,
            flexDirection: 'row',
            height: getHeight(150),
          }}
          maskElement={
            <View
              style={{
                backgroundColor: 'transparent',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={[thumbnails, GlobalStyles().topMargin]}
                source={{uri: service.thumbnail}}
              />
            </View>
          }>
          <View
            style={{
              flex: 1,
              height: '100%',
              backgroundColor: 'white',
            }}
          />
        </MaskedView>
        <View style={{marginBottom: getHeight(30), marginTop: getHeight(15)}}>
          {/* <Text light={true} type={TextTypes.HEADLINEMEDIUM} bold={true}>
            {service.name}
          </Text> */}
          <Text light={true} type={TextTypes.TIRTIARY}>
            {service.description}
          </Text>
        </View>

        {service?.amount_restricted && (
          <Text light={true} bold={true}>
            Selecciona un monto
          </Text>
        )}
        {service?.amount_restricted ? (
          service.allowed_amounts?.map(amount => {
            let isSelected = amount == selectedAmount;
            return (
              <Button
                type={ButtonTypes.SECONDARY}
                verticalPadding={ButtonPaddingTypes.THIN}
                title={`${amount} MXN`}
                onPress={() => setSelectedAmount(amount)}
                customStyles={[
                  isSelected && {
                    backgroundColor: AppColors().brandColor,
                    borderWidth: 0,
                  },
                ]}
              />
            );
          })
        ) : (
          <TextInput
            label=""
            placeholder="Monto"
            onChangeText={setSelectedAmount}
            value={selectedAmount}
            keyboardType="numeric"
            returnKeyLabel="Done"
            returnKeyType="done"
          />
        )}
        <View style={GlobalStyles().verticalSeparation}>
          {isRefRequired && renderRefEntering()}
          <TextInput
            placeholder="Correo electrónico"
            label=""
            value={email}
            onChangeText={setEmail}
          />
          <View style={GlobalStyles().verticalSeparation}>
            <Button
              title="Continuar"
              disabled={!selectedAmount}
              onPress={onCreateInvoice}
            />
          </View>
        </View>
      </ScrollView>
    </MainView>
  );
}
