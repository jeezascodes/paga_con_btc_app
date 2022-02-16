import {getHeight, getWidth} from '_utils/helpers/interfaceDimensions';
import {GlobalStyles} from '_utils/styles/globalStyles';

export const thumbnails = {
  width: '100%',
  height: getHeight(100),
  resizeMode: 'contain',
};

export const container = GlobalStyles().horizontalPadding;
