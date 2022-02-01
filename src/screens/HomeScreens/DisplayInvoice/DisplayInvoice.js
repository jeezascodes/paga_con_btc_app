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

export default function DisplayInvoice({navigation, route}) {
  const theme = useTheme().theme;
  const invoice = route.params?.invoice;
  const [isLoading, setIsLoading] = useState(false);
  const [currentPaymentStatus, setCurrentPaymentStatus] = useState(
    PaymentStates.AWAITING_INVOICE_PAYMENT,
  );
  const [paymentData, setpaymentData] = useState(null);

  const onGetInvoiceStatus = async () => {
    const status = await getPaymentStatus(invoice?.id);
    console.log(`status.payload?.status)`, status.payload?.status);
    setCurrentPaymentStatus(status.payload?.status);
    setpaymentData(status.payload);
  };

  useEffect(() => {
    let time = 300;
    let interval;
    if (currentPaymentStatus == PaymentStates.AWAITING_INVOICE_PAYMENT) {
      interval = setInterval(() => {
        if (time !== 0) {
          time = time - 1;
          onGetInvoiceStatus();
        }
      }, 1000);
    }
    if (currentPaymentStatus == PaymentStates.SERVICE_PAID) {
      clearInterval(interval);
    } else if (time === 0) {
      clearInterval(interval);
    }
  }, [currentPaymentStatus]);

  const successStyles = {backgroundColor: 'green'};
  const isSuccess =
    currentPaymentStatus == PaymentStates.INVOICE_PAID ||
    currentPaymentStatus == PaymentStates.SERVICE_PAYMENT_IN_PROCESS ||
    currentPaymentStatus == PaymentStates.SERVICE_PAID;

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
    <MainView testID="screen_feed" customStyles={isSuccess && successStyles}>
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
