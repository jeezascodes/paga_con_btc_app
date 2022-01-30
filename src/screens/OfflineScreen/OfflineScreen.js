import React, {useEffect} from 'react';
import {View, Image} from 'react-native';
import {styles} from './OfflineScreenStyles';
import {Text, MainHeader} from 'paga-con-btc-ui';
import MainView from '_components/MainView/MainView';
import {flexContent} from '_utils/styles/globalStyles';
import {TextTypes} from '_utils/constans/Constants';
import {useTheme} from '_utils/styles/themeProvider';
import NetInfo from '@react-native-community/netinfo';

const OfflineScreen = ({navigation}) => {
  const {theme} = useTheme();
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        navigation.goBack();
      }
    });
    return () => {
      unsubscribe();
    };
  }, [navigation]);
  return (
    <MainView customStyles={flexContent} gradientHorizontal>
      <MainHeader
        rightButtonType="null"
        leftButtonType="null"
        title="Offline"
      />
      <View style={styles.container(theme)}>
        <Text type={TextTypes.TITLE} bold>
          Connect to the internet
        </Text>
        <Image
          style={styles.offlineImage}
          source={require('../../../assets/logo/offlineImage.png')}
        />
        <Text type={TextTypes.TITLE} style={styles.offlineText}>
          You're offline{'\n\n'}Check your connection.
        </Text>
      </View>
    </MainView>
  );
};

export default OfflineScreen;
