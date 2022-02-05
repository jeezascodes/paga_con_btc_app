import React, {useState, useEffect} from 'react';
import MainView from '_components/MainView/MainView';
import {Card, MainHeader, Text} from 'paga-con-btc-ui';
import {View, ScrollView, Image, TouchableOpacity} from 'react-native';
import {feedStyles, thumbnails, cardContainer, cardWrapper} from './FeedStyles';
import {useTheme} from '_utils/styles/themeProvider';
import {RouteNames, TextTypes} from '_utils/constans/Constants';
import {getServicesList} from '../../../data/APIInterface';
import {useUser} from '_store/hooks/useUser';
import {getHeight} from '_utils/helpers/interfaceDimensions';
import Logo from '../../../../assets/spotify.png';

export default function Feed({navigation}) {
  const theme = useTheme().theme;
  const [services, setServices] = useState([]);
  const {user} = useUser();

  const getServices = async () => {
    const response = await getServicesList();
    setServices(response.payload.results);
  };

  useEffect(() => {
    getServices();
  }, []);

  console.log(`user`, user);

  return (
    <MainView testID="screen_feed">
      {/* <MainHeader title={'Inicio'} /> */}
      <ScrollView
        keyboardShouldPersistTaps={true}
        style={feedStyles(theme).scrollView}>
        <View
          style={[
            feedStyles(theme).HorizontalViewStyles,
            feedStyles(theme).verticalSeparation,
            cardContainer,
          ]}>
          <Text type={TextTypes.HEADLINEMEDIUM} light={true}>
            Escoge un servicio
          </Text>
          {services?.map(item => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(RouteNames.SERVICE_DETAIL, {item})
                }
                style={cardWrapper}>
                <Card>
                  <View style={{padding: getHeight(30)}}>
                    <Image style={thumbnails} source={Logo} />
                  </View>
                </Card>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </MainView>
  );
}
