import React, {useState, useEffect} from 'react';
import MainView from '_components/MainView/MainView';
import {Card, MainHeader, Text, HorizontalSlider} from 'paga-con-btc-ui';
import {View, ScrollView, Image, TouchableOpacity} from 'react-native';
import {
  feedStyles,
  thumbnails,
  cardContainer,
  cardWrapper,
  scrollViewStyles,
  emoji,
} from './FeedStyles';
import {useTheme} from '_utils/styles/themeProvider';
import {
  RouteNames,
  TextTypes,
  serviceCategories,
} from '_utils/constans/Constants';
import {getServicesList} from '../../../data/APIInterface';
import {useUser} from '_store/hooks/useUser';
import {getHeight, getWidth} from '_utils/helpers/interfaceDimensions';
import MaskedView from '@react-native-community/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import {servicesColor} from '../../../utils/styles/AppColors';
import Telephone from '../../../../assets/telephone.png';
import Movie from '../../../../assets/movie.png';
import ServiceIcon from '../../../../assets/service.png';

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

  const colors = ['#fda6ab', '#fe710a'];

  const phoneServices = services?.filter(
    item => item.category == serviceCategories.PHONE_RECHARGE,
  );

  const giftCard = services?.filter(
    item => item.category == serviceCategories.GIFT_CARD,
  );

  const genericServices = services?.filter(
    item => item.category == serviceCategories.SERVICE,
  );

  const topProducts = list =>
    list?.map(item => {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate(RouteNames.SERVICE_DETAIL, {item})}
          style={cardWrapper}>
          <Card style={{backgroundColor: servicesColor[item.id]}}>
            <MaskedView
              style={{
                flex: 1,
                flexDirection: 'row',
                height: getHeight(100),
              }}
              maskElement={
                <View
                  style={{
                    backgroundColor: 'transparent',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image style={thumbnails} source={{uri: item.thumbnail}} />
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
          </Card>
        </TouchableOpacity>
      );
    });

  return (
    <MainView testID="screen_feed" gradient={false}>
      {/* <MainHeader title={'Inicio'} /> */}
      <ScrollView keyboardShouldPersistTaps={true} style={scrollViewStyles}>
        <View style={[feedStyles(theme).HorizontalViewStyles, cardContainer]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text type={TextTypes.SUBHEADER} bold={true}>
              Recarga telefónica
            </Text>
            <Image source={Telephone} style={emoji} />
          </View>

          <HorizontalSlider data={topProducts(phoneServices)} />
        </View>
        <View style={[feedStyles(theme).HorizontalViewStyles, cardContainer]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text type={TextTypes.SUBHEADER} bold={true}>
              Entretenimiento
            </Text>
            <Image source={Movie} style={emoji} />
          </View>
          <HorizontalSlider data={topProducts(giftCard)} />
        </View>
        <View style={[feedStyles(theme).HorizontalViewStyles, cardContainer]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text type={TextTypes.SUBHEADER} bold={true}>
              Servicios públicos
            </Text>
            <Image source={ServiceIcon} style={emoji} />
          </View>
          <HorizontalSlider data={topProducts(genericServices)} />
        </View>
      </ScrollView>
    </MainView>
  );
}
