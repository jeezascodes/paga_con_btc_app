import React, {useState, useEffect} from 'react';
import MainView from '_components/MainView/MainView';
import {Card, MainHeader} from 'paga-con-btc-ui';
import {View, ScrollView, Image, TouchableOpacity} from 'react-native';
import {feedStyles, thumbnails, cardContainer, cardWrapper} from './FeedStyles';
import {useTheme} from '_utils/styles/themeProvider';
import {RouteNames} from '_utils/constans/Constants';
import {getServicesList} from '../../../data/APIInterface';

export default function Feed({navigation}) {
  const theme = useTheme().theme;
  const [services, setServices] = useState([]);

  const getServices = async () => {
    const response = await getServicesList();
    setServices(response.payload.results);
  };

  useEffect(() => {
    getServices();
  }, []);

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
          {services?.map(item => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(RouteNames.SERVICE_DETAIL, {item})
                }
                style={cardWrapper}>
                <Card>
                  <Image style={thumbnails} source={{uri: item.thumbnail}} />
                </Card>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </MainView>
  );
}
