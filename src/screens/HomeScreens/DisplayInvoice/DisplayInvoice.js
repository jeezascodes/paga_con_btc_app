import React, {useState, useEffect} from 'react';
import MainView from '_components/MainView/MainView';
import {Button, Text, TextInput, Icon} from 'paga-con-btc-ui';
import {ScrollView, View} from 'react-native';
import {
  container,
  qrContiner,
  textContainer,
  invoiceStatusStyle,
} from './DisplayInvoiceStyles';
import {useTheme} from '_utils/styles/themeProvider';
import {
  TextTypes,
  RouteNames,
  PaymentStates,
  IconNames,
} from '_utils/constans/Constants';
import {getPaymentStatus} from '../../../data/APIInterface';
import QRCode from 'react-native-qrcode-svg';
import {
  getHeight,
  getWidth,
  windowWidth,
} from '_utils/helpers/interfaceDimensions';
import {useUser} from '_store/hooks/useUser';
import {servicesColor} from '../../../utils/styles/AppColors';

export default function DisplayInvoice({navigation, route}) {
  const invoice = route.params?.invoice;
  const service = route.params?.service;
  const [isLoading, setIsLoading] = useState(false);
  const [currentPaymentStatus, setCurrentPaymentStatus] = useState(
    PaymentStates.SERVICE_PAID,
  );

  let currentPaymentStatusV2 = PaymentStates.AWAITING_INVOICE_PAYMENT;
  const [paymentData, setpaymentData] = useState(null);
  const {actionsUser} = useUser();

  const onGetInvoiceStatus = async () => {
    try {
      const status = await getPaymentStatus(invoice?.id);
      setCurrentPaymentStatus(status.payload?.status);
      currentPaymentStatusV2 = status.payload?.status;
      setpaymentData(status.payload);
    } catch (err) {
      console.log(`err`, err);
    }
  };

  useEffect(() => {
    workerChecker();
    actionsUser.setInvoiceId(invoice?.id);
  }, []);

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const finalityStatusList = [
    PaymentStates.SERVICE_PAID,
    PaymentStates.SERVICE_PAYMENT_FAILED,
    PaymentStates.INVOICE_EXPIRED,
  ];

  const workerChecker = async () => {
    // while (!finalityStatusList.includes(currentPaymentStatusV2)) {
    //   await sleep(1000);
    //   onGetInvoiceStatus();
    // }
  };

  const successStyles = {backgroundColor: 'green'};
  const isSuccess =
    currentPaymentStatus == PaymentStates.INVOICE_PAID ||
    currentPaymentStatus == PaymentStates.SERVICE_PAYMENT_IN_PROCESS ||
    currentPaymentStatus == PaymentStates.SERVICE_PAID;

  const failureStyles = {backgroundColor: 'red'};
  const isFailure =
    currentPaymentStatus == PaymentStates.SERVICE_PAYMENT_FAILED;

  const renderInvoiceState = () => {
    if (currentPaymentStatus == PaymentStates.INVOICE_PAID) {
      return (
        <View style={invoiceStatusStyle}>
          <Icon
            iconColor={'white'}
            name={IconNames.CHECKBOX}
            width="60"
            height="60"
          />
          <Text light={true} type={TextTypes.BODY} light={true}>
            Recibimos tu pago
          </Text>
        </View>
      );
    } else if (
      currentPaymentStatus == PaymentStates.SERVICE_PAYMENT_IN_PROCESS
    ) {
      return (
        <View style={invoiceStatusStyle}>
          <Icon
            iconColor={'white'}
            name={IconNames.CHECKBOX}
            width="60"
            height="60"
          />
          <Text light={true} type={TextTypes.BODY} light={true}>
            Estamos procesando el pago
          </Text>
        </View>
      );
    } else if (currentPaymentStatus == PaymentStates.SERVICE_PAID) {
      return (
        <View style={invoiceStatusStyle}>
          <Icon
            iconColor={'white'}
            name={IconNames.CHECKBOX}
            width="60"
            height="60"
          />
          <Text light={true} type={TextTypes.BODY}>
            Servicio pago con éxito
          </Text>
          <View>
            <Text
              style={{textAlign: 'center', marginTop: getHeight(20)}}
              light={true}
              type={TextTypes.BODY}>
              Folio
            </Text>
            <Text bold={true} light={true} type={TextTypes.SUBHEADER}>
              {paymentData?.payment_folio} 12312312
            </Text>
          </View>
        </View>
      );
    }
  };

  return (
    <MainView
      testID="screen_feed"
      customStyles={[
        {backgroundColor: servicesColor[service?.id] || '#1f49a7'},
        isSuccess ? successStyles : isFailure ? failureStyles : '',
      ]}>
      {currentPaymentStatus == PaymentStates.AWAITING_INVOICE_PAYMENT ? (
        <ScrollView keyboardShouldPersistTaps={true} style={container}>
          <View style={qrContiner}>
            <QRCode
              size={getWidth(windowWidth * 0.8)}
              value={invoice?.ln_invoice}
            />
          </View>
          <TextInput label="" value={invoice?.ln_invoice} />
          <View style={textContainer}>
            <Text bold={true} light={true} type={TextTypes.BODY}>
              {invoice?.amount_mxn} MXN
            </Text>
            <Text type={TextTypes.TIRTIARY} light={true}>
              {invoice?.amount_sats} SATS
            </Text>
            <Text type={TextTypes.TIRTIARY} light={true}>
              {invoice?.exchange_rate} SATS/MXN
            </Text>
            <Text type={TextTypes.TIRTIARY} light={true}>
              {invoice?.expires_at}
            </Text>
          </View>
        </ScrollView>
      ) : (
        renderInvoiceState()
      )}
    </MainView>
  );
}
