import {Colors} from '../../utils/styles';
import {getWidth, getHeight} from '_utils/helpers/interfaceDimensions';

export function loginStyles(theme) {
  return {
    logoContainer: {alignItems: 'center', marginVertical: getHeight(75)},
    buttonsContainer: {height: getHeight(250), justifyContent: 'center'},
    fullWidthContainer: {width: '100%', alignItems: 'center'},
  };
}
