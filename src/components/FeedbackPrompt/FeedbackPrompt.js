import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Card, Text, Bubble} from 'paga-con-btc-ui';

import {getHeight, getWidth} from '_utils/helpers/interfaceDimensions';
import {useFeedback} from '_store/hooks/useFeedback';
import {useNavigation} from '@react-navigation/native';
import {RouteNames} from '_utils/constans/Constants';

const ChatMenu = ({
  isVisible,
  title,
  message,
  description,
  testID = '',
  onPressPositive,
  onPressNegative,
}) => {
  return (
    <View>
      <Bubble
        buttonTestID={testID}
        bubbleUnderChildren={false}
        isVisible={isVisible}
        withButton={false}
        touchable={true}
        title={title}
        message={message}>
        <Card>
          <View style={styles.contain}>
            <View>
              <Text style={styles.margin}>{description}</Text>
            </View>
            <View>
              <Button title="Yes" onPress={() => onPressPositive()} />
              <Button
                type="Secondary"
                title="No"
                onPress={() => onPressNegative()}
              />
            </View>
          </View>
        </Card>
      </Bubble>
    </View>
  );
};

export default ChatMenu;

const styles = StyleSheet.create({
  contain: {
    height: getHeight(400),
    justifyContent: 'space-between',
  },
  margin: {
    marginHorizontal: getWidth(20),
  },
});
