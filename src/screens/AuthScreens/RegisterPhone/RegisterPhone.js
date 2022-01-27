import React, {useState} from 'react';
import MainView from '_components/MainView/MainView';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {
  Button,
  Logo,
  TextInput,
  Text,
  Checkbox,
  Modal,
  LoaderSpinner,
} from 'kvell-app-ui';
import {View, ScrollView} from 'react-native';
import {registerPhoneStyles} from './RegisterPhoneStyles';
import {Colors} from '_utils/styles';
import Log from '_utils/helpers/errorHandler';
import {
  TextTypes,
  ButtonPaddingTypes,
  ButtonTypes,
  RouteNames,
  errorMessages,
  firebaseErrors,
} from '_utils/constans/Constants';
import {useUser} from '_store/hooks/useUser';
import {flexContent} from '_utils/styles/globalStyles';
import {useTests} from '_store/hooks/useTests';
import {TouchableOpacity} from 'react-native';
import TermsAndConditions from '_components/TermsAndConditions/TermsAndConditions';
import {verifyPhoneStyles} from '../VerifyPhone/VerifyPhoneStyles';

export default function RegisterPhone({navigation}) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const {actionsUser} = useUser();
  const {actionsTests} = useTests(navigation);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isError, setisError] = useState(false);
  const [errorMessage, seterrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleRegister = () => {
    setIsLoading(true);
    const phone = phoneNumber.replace(/[-() ]+/g, '').trim();
    if (global.testmode) {
      actionsTests.registerPhone(phone);
      return;
    }
    actionsUser
      .signInWithPhoneNumber(phone)
      .then(confirmation => {
        setIsLoading(false);
        navigation.navigate(RouteNames.VERIFY_PHONE, {
          phoneNumber: phone,
          confirm: confirmation,
        });
      })
      .catch(error => {
        setIsLoading(false);
        setisError(true);
        if (error?.code == firebaseErrors.INVALID_NUMBER) {
          seterrorMessage(errorMessages.INVALID_NUMBER);
        } else {
          seterrorMessage(errorMessages.WRONG);
        }
        const errorWithNumber = new Error(
          `Error:${error.toString()} Number:${phone}`,
        );
        Log.Error(errorWithNumber);
      });
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={flexContent}>
      <MainView horizontalPadding={true}>
        <View style={[registerPhoneStyles().logoContainer]}>
          <Logo type="MainLogo" height={100} color={Colors().brandColor} />
        </View>
        <View style={registerPhoneStyles().wrapper}>
          <View>
            <TextInput
              onChangeText={setPhoneNumber}
              value={phoneNumber}
              maxLength={30}
              placeholder="Phone number"
              keyboardType="phone-pad"
              isPhone={true}
              label=""
              testID="ip_phone"
              returnKeyLabel="Done"
              returnKeyType="done"
            />

            <Text type={TextTypes.TIRTIARY}>
              We will send you a verification code to the number entered above.
              Message and data rates may apply.
            </Text>
          </View>
          {isError && (
            <Text style={registerPhoneStyles().errorMessage}>
              {errorMessage}
            </Text>
          )}
          <View style={registerPhoneStyles().checkBoxContainer}>
            <Checkbox
              isSelected={termsAccepted}
              onPress={() => setTermsAccepted(!termsAccepted)}
              enableEdit={true}
            />
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={registerPhoneStyles().link}>Agree with terms</Text>
            </TouchableOpacity>
          </View>
          <View style={flexContent} />
          {isLoading ? (
            <LoaderSpinner isLoading={isLoading} />
          ) : (
            <Button
              testID="btn_send_verification"
              verticalPadding={ButtonPaddingTypes.THICK}
              type={ButtonTypes.GRADIENT}
              title="Send Verification Code"
              onPress={() => handleRegister()}
              disabled={!termsAccepted}
            />
          )}
          <Modal
            startOn={0}
            showCloseIcon={true}
            onClose={() => setModalVisible(false)}
            isVisible={modalVisible}
            key={1}>
            <ScrollView style={registerPhoneStyles().termsContainer}>
              <TermsAndConditions />
            </ScrollView>
          </Modal>
        </View>
      </MainView>
    </KeyboardAvoidingView>
  );
}
