import React, {useState, useEffect} from 'react';
import MainView from '_components/MainView/MainView';
import {Button, Text, TextInput, Icon} from 'paga-con-btc-ui';
import {ScrollView, View} from 'react-native';
// import {} from './DisplayInvoiceStyles';
import {useTheme} from '_utils/styles/themeProvider';
import {
  TextTypes,
  RouteNames,
  PaymentStates,
  IconNames,
} from '_utils/constans/Constants';
import {getPaymentStatus} from '../../../data/APIInterface';
import QRCode from 'react-native-qrcode-svg';
import {getWidth, windowWidth} from '_utils/helpers/interfaceDimensions';
import {useUser} from '_store/hooks/useUser';

export default function DisplayInvoice({navigation, route}) {
  const invoice = route.params?.invoice;
  const service = route.params?.service;
  const [isLoading, setIsLoading] = useState(false);
  const [currentPaymentStatus, setCurrentPaymentStatus] = useState(
    PaymentStates.AWAITING_INVOICE_PAYMENT,
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
    while (!finalityStatusList.includes(currentPaymentStatusV2)) {
      await sleep(1000);
      onGetInvoiceStatus();
    }
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
        <View>
          <Icon
            iconColor={'white'}
            name={IconNames.CHECKBOX}
            width="60"
            height="60"
          />
          <Text type={TextTypes.BODY} light={true}>
            Recibimos tu pago
          </Text>
        </View>
      );
    } else if (
      currentPaymentStatus == PaymentStates.SERVICE_PAYMENT_IN_PROCESS
    ) {
      return (
        <View>
          <Icon
            iconColor={'white'}
            name={IconNames.CHECKBOX}
            width="60"
            height="60"
          />
          <Text type={TextTypes.BODY} light={true}>
            Estamos procesando el pago de tu servicio
          </Text>
        </View>
      );
    } else if (currentPaymentStatus == PaymentStates.SERVICE_PAID) {
      return (
        <View>
          <Icon
            iconColor={'white'}
            name={IconNames.CHECKBOX}
            width="60"
            height="60"
          />
          <Text type={TextTypes.BODY} light={true}>
            Servicio pago con éxito
          </Text>
          <Text type={TextTypes.BODY} light={true}>
            {paymentData.payment_folio}
          </Text>
        </View>
      );
    }
  };

  return (
    <MainView
      testID="screen_feed"
      customStyles={isSuccess ? successStyles : isFailure ? failureStyles : ''}>
      {currentPaymentStatus == PaymentStates.AWAITING_INVOICE_PAYMENT ? (
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
      ) : (
        renderInvoiceState()
      )}
    </MainView>
  );
}
