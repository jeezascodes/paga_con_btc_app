import React, {useState, useEffect, useRef} from 'react';
import MainView from '_components/MainView/MainView';
import {
  Card,
  MainHeader,
  Text,
  HorizontalSlider,
  ModalSwipe,
  TextInput,
} from 'paga-con-btc-ui';
import {View, ScrollView, Image, TouchableOpacity} from 'react-native';
import {
  feedStyles,
  thumbnails,
  cardContainer,
  cardWrapper,
  scrollViewStyles,
  emoji,
  backgroundLayout,
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
import {ImageBackground} from 'react-native';
import BackgroundImage from '../../../../assets/paga_con.jpeg';

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

  const refModal = useRef(null);

  const showModal = () => {
    refModal.current?.showModal();
  };
  const closeModal = () => {
    refModal.current?.closeModal();
  };

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
    <>
      <ModalSwipe
        showInfoIcon={false}
        ref={refModal}
        enabledInnerScrolling={true}>
        <ScrollView keyboardShouldPersistTaps={true} style={scrollViewStyles}>
          <View style={[cardContainer]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: getHeight(10),
              }}>
              <Text type={TextTypes.SUBHEADER} bold={true}>
                Recarga telefónica
              </Text>
              {/* <Image source={Telephone} style={emoji} /> */}
            </View>

            <HorizontalSlider data={topProducts(phoneServices)} />
          </View>
          <View style={[cardContainer]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: getHeight(10),
              }}>
              <Text type={TextTypes.SUBHEADER} bold={true}>
                Entretenimiento
              </Text>
              {/* <Image source={Movie} style={emoji} /> */}
            </View>
            <HorizontalSlider data={topProducts(giftCard)} />
          </View>
          <View style={[cardContainer]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: getHeight(10),
              }}>
              <Text type={TextTypes.SUBHEADER} bold={true}>
                Servicios públicos
              </Text>
              {/* <Image source={ServiceIcon} style={emoji} /> */}
            </View>
            <HorizontalSlider data={topProducts(genericServices)} />
          </View>
        </ScrollView>
      </ModalSwipe>
      <MainView testID="screen_feed" gradient={true}>
        <View
          style={{
            height: getHeight(300),
            backgroundColor: 'transparent',
            paddingHorizontal: getWidth(20),
            paddingTop: getHeight(20),
          }}>
          <Text type={TextTypes.HEADLINEMEDIUM} bold={true} light={true}>
            Explorar
          </Text>
          <TextInput
            label=""
            placeholder="Buscar"
            onChangeText={() => {}}
            value={''}
            maxLength={30}
            keyboardType="phone-pad"
            returnKeyLabel="Done"
            returnKeyType="done"
          />

          {/* <LinearGradient
            start={{x: 0.0604, y: 0}}
            end={{x: 1.1, y: 1}}
            style={{flex: 1}}
            colors={colors}></LinearGradient> */}
        </View>
        {/* <MainHeader title={'Inicio'} /> */}
      </MainView>
    </>
  );
}
