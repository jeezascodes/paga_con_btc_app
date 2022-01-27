import {getHeight, getWidth} from '_utils/helpers/interfaceDimensions';
import {Colors} from '_utils/styles';

const {StyleSheet} = require('react-native');

export const styles = StyleSheet.create({
  container: theme => ({
    flex: 1,
    backgroundColor: Colors(theme).cardColor,
    alignItems: 'center',
    paddingTop: getHeight(30),
    justifyContent: 'space-evenly',
  }),
  offlineImage: {
    height: getHeight(250),
    width: getWidth(230),
    resizeMode: 'contain',
  },
  offlineText: {
    textAlign: 'center',
  },
});
