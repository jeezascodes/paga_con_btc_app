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
        // invoice: {
        //   ln_invoice:
        //     'lnbc20m1pvjluezpp5qqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqypqhp58yjmdan79s6qqdhdzgynm4zwqd5d7xmw5fk98klysy043l2ahrqsfpp3qjmp7lwpagxun9pygexvgpjdc4jdj85fr9yq20q82gphp2nflc7jtzrcazrra7wwgzxqc8u7754cdlpfrmccae92qgzqvzq2ps8pqqqqqqpqqqqq9qqqvpeuqafqxu92d8lr6fvg0r5gv0heeeqgcrqlnm6jhphu9y00rrhy4grqszsvpcgpy9qqqqqqgqqqqq7qqzqj9n4evl6mr5aj9f58zp6fyjzup6ywn3x6sk8akg5v4tgn2q8g4fhx05wf6juaxu9760yp46454gpg5mtzgerlzezqcqvjnhjh8z3g2qqdhhwkj',
        //   amount_mxn: '300',
        //   amount_sats: '3000',
        //   exchange_rate: '995134.8301',
        //   expires_at: '2021-12-19T19:30:40-06:00',
        // },
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
        {/* <MaskedView
          style={{
            flex: 1,
            flexDirection: 'row',
            height: getHeight(150),
          }}
          maskElement={

          }>
          <View
            style={{
              flex: 1,
              height: '100%',
              backgroundColor: 'white',
            }}
          />
        </MaskedView> */}
        <View
          style={{
            backgroundColor: 'transparent',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={[thumbnails, GlobalStyles().topMargin]}
            source={{
              uri: service.thumbnail,
              headers: {
                Accept: '*/*',
              },
            }}
          />
        </View>
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
