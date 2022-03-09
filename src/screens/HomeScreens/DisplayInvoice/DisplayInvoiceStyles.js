import {
  getHeight,
  getWidth,
  windowWidth,
} from '_utils/helpers/interfaceDimensions';
import {GlobalStyles} from '_utils/styles/globalStyles';

export const container = GlobalStyles().horizontalPadding;

export const qrContiner = {
  width: windowWidth - getWidth(40),
  display: 'flex',
  alignItems: 'center',
  marginTop: getHeight(50),
};

export const textContainer = {
  marginTop: getHeight(50),
  height: getHeight(100),
  justifyContent: 'space-between',
};

export const invoiceStatusStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
};
