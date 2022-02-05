import React, {useState, useEffect} from 'react';
import MainView from '_components/MainView/MainView';
import {Card, MainHeader, Text} from 'paga-con-btc-ui';
import {View, ScrollView, Image, TouchableOpacity} from 'react-native';
import {feedStyles, thumbnails, cardContainer, cardWrapper} from './FeedStyles';
import {useTheme} from '_utils/styles/themeProvider';
import {RouteNames, TextTypes} from '_utils/constans/Constants';
import {getServicesList} from '../../../data/APIInterface';
import {useUser} from '_store/hooks/useUser';
import {getHeight, getWidth} from '_utils/helpers/interfaceDimensions';
import Logo from '../../../../assets/spotify.png';
import MaskedView from '@react-native-community/masked-view';
import LinearGradient from 'react-native-linear-gradient';

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

  return (
    <MainView testID="screen_feed">
      {/* <MainHeader title={'Inicio'} /> */}
      <ScrollView
        keyboardShouldPersistTaps={true}
        style={feedStyles(theme).scrollView}>
        {/* <Text type={TextTypes.SUBHEADER} light={true}>
          Escoge un servicio
        </Text> */}
        <View
          style={[
            feedStyles(theme).HorizontalViewStyles,
            feedStyles(theme).verticalSeparation,
            cardContainer,
          ]}>
          {services?.map(item => {
            let name = item.name.includes('CFE') ? 'CFE' : item.name;
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(RouteNames.SERVICE_DETAIL, {item})
                }
                style={cardWrapper}>
                <Card>
                  {/* <View style={{padding: getHeight(30)}}>
                    <Image style={thumbnails} source={{uri: item.thumbnail}} />
                  </View> */}
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
                        <Image
                          style={thumbnails}
                          source={{uri: item.thumbnail}}
                        />
                      </View>
                    }>
                    {/* <LinearGradient
                      start={{x: 0.0604, y: 0}}
                      end={{x: 1.1, y: 1}}
                      style={{flex: 1, borderRadius: getWidth(5)}}
                      colors={colors}></LinearGradient> */}
                    <View
                      style={{
                        flex: 1,
                        height: '100%',
                        backgroundColor: 'white',
                      }}
                    />
                  </MaskedView>
                  <Text
                    type={TextTypes.BODY}
                    light={true}
                    medium={true}
                    style={{textAlign: 'center'}}>
                    {name}
                  </Text>
                </Card>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </MainView>
  );
}
