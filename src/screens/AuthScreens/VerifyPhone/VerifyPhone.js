import React, {useState, useEffect} from 'react';
import MainView from '_components/MainView/MainView';
import {
  Button,
  Logo,
  CodeVerification,
  Text,
  LoaderSpinner,
} from 'kvell-app-ui';
import {View} from 'react-native';
import {verifyPhoneStyles} from './VerifyPhoneStyles';
import {Colors} from '_utils/styles';
import {
  RouteNames,
  errorMessages,
  TextTypes,
  firebaseErrors,
} from '_utils/constans/Constants';
import Log from '_utils/helpers/errorHandler';
import {useUser} from '_store/hooks/useUser';
import {firebase} from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import {setBasicProfile} from '_data/APIInterface';
import {useTests} from '_store/hooks/useTests';

export default function VerifyPhone({route, navigation}) {
  const {phoneNumber, confirm, verificationId, dataInfo} = route.params;
  const [code, setCode] = useState('');
  const {actionsUser} = useUser();
  const [isError, setisError] = useState(false);
  const [errorMessage, seterrorMessage] = useState('');
  const [timeToSend, setTimeToSend] = useState(0);
  const [timesResent, settimesResent] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const {actionsTests} = useTests(navigation);
  let FbconfirmCode = confirm;

  const initIntervalSms = () => {
    let time = timesResent * 30;
    setTimeToSend(time);
    const interval = setInterval(() => {
      if (time !== 0) {
        time = time - 1;
        setTimeToSend(time);
      }

      if (time === 0) {
        clearInterval(interval);
      }
    }, 1000);
  };

  useEffect(() => {
    settimesResent(timesResent + 1);
    initIntervalSms();
  }, []);

  async function confirmCode() {
    setIsLoading(true);
    if (verificationId) {
      const credential = await firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        code,
      );
      await auth().currentUser.updatePhoneNumber(credential);
      setBasicProfile(dataInfo).then(() => {
        navigation.navigate(RouteNames.PROFILE);
      });
      return;
    }
    try {
      if (global.testmode) {
        await actionsTests.verifyPhoneTest(
          code,
          seterrorMessage,
          setisError,
          setIsLoading,
          phoneNumber,
        );
        return;
      }
      const response = confirm.confirm(code);
      response
        .then(async () => {
          await actionsUser.RegisterUserPhone(phoneNumber);
        })
        .catch(err => {
          setIsLoading(false);
          setisError(true);
          if (err.code == firebaseErrors.VERIFICATION_CODE) {
            seterrorMessage(errorMessages.INVALID_CODE);
          }
          if (err.code == firebaseErrors.USER_NOT_FOUND) {
            seterrorMessage(errorMessages.USER_NOT_FOUND);
          }
        });
    } catch (error) {
      setisError(true);
      seterrorMessage(error);
      setIsLoading(false);
      Log.Error(error);
    }
  }

  const resendCode = () => {
    settimesResent(timesResent + 1);
    actionsUser
      .signInWithPhoneNumber(phoneNumber)
      .then(confirmation => {
        initIntervalSms();
        FbconfirmCode = confirmation;
      })
      .catch(err => {
        Log.Error(err);
      });
  };

  useEffect(() => {
    if (isError) {
      setisError(false);
    }
    if (code?.length == 6) {
      confirmCode();
    }
  }, [code]);

  return (
    <MainView horizontalPadding={true}>
      <View style={[verifyPhoneStyles().logoContainer]}>
        <Logo type="MainLogo" height={100} color={Colors().brandColor} />
      </View>
      <View style={verifyPhoneStyles().wrapper}>
        <View>
          <CodeVerification
            title="Verify Phone Number"
            setCode={setCode}
            phone={phoneNumber}
            testID="ip_verify"
          />
          {isError && (
            <Text style={verifyPhoneStyles().errorMessage}>{errorMessage}</Text>
          )}
        </View>
        {isLoading && <LoaderSpinner isLoading={isLoading} />}

        {code?.length < 6 && (
          <View>
            {timesResent > 2 && (
              <Text
                type={TextTypes.TIRTIARY}
                style={verifyPhoneStyles().resendCode}>
                The verification code was sent again
              </Text>
            )}
            <Button
              onPress={() => resendCode()}
              disabled={timeToSend !== 0}
              title={timeToSend !== 0 ? `${timeToSend} seconds` : 'Resend code'}
            />
          </View>
        )}
      </View>
    </MainView>
  );
}
