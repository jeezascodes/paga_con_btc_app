import React, {useEffect} from 'react';
import {useUser} from '_store/hooks/useUser';
import MainView from '_components/MainView/MainView';
import {Button, Text, Card, Welcome} from 'paga-con-btc-ui';
import {View, ScrollView} from 'react-native';
import {feedStyles} from './FeedStyles';
import {useTheme} from '_utils/styles/themeProvider';
import {TextTypes, RouteNames} from '_utils/constans/Constants';

export default function Feed({navigation}) {
  const theme = useTheme().theme;

  const username = 'Stranger';

  // only for demo purposes
  const UriExample = 'https://www.w3schools.com/w3images/avatar6.png';
  useEffect(() => {}, []);
  const goToHistory = () => {};
  useEffect(() => {}, []);

  return (
    <MainView testID="screen_feed">
      <ScrollView
        keyboardShouldPersistTaps={true}
        style={feedStyles(theme).scrollView}>
        <View
          style={[
            feedStyles(theme).HorizontalViewStyles,
            feedStyles(theme).verticalSeparation,
          ]}>
          <Card>
            <Text type={TextTypes.TITLE} style={feedStyles(theme).titleStyles}>
              Hero’s Diary
            </Text>
            <Text>
              'You have no diary entry for today. Writing is a great way to
              document your journey, let’s put some thoughts on paper!'
            </Text>
            <Button
              customStyles={feedStyles().verticalSeparation}
              title="Create New Entry"
              onPress={() => goToHistory()}
            />
          </Card>
        </View>
      </ScrollView>
    </MainView>
  );
}
