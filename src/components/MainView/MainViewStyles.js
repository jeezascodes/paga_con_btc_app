import {Colors, AppColors} from '../../utils/styles';
import {
  getHeight,
  getWidth,
  windowHeight,
  windowWidth,
} from '_utils/helpers/interfaceDimensions';

export function mainViewStyles(theme, gradient, horizontalMargin) {
  return {
    // backgroundColor: AppColors(theme).white,
    backgroundColor: '#f7f7f7',
    borderBottomLeftRadius: getWidth(40),
    borderBottomRightRadius: getWidth(40),
    flex: 1,
    containerPadding: {
      marginHorizontal: getWidth(20),
      flex: 1,
    },
  };
}
export function mainViewWithColor(theme) {
  return {
    backgroundColor: AppColors(theme).background,
    flex: 1,
  };
}
export const mainViewGradient = {
  height: getHeight(300),
  borderBottomLeftRadius: windowWidth,
  borderBottomRightRadius: windowWidth,
  width: windowWidth * 2,
  alignSelf: 'center',
};
export const contentGradientWithColor = {
  position: 'absolute',
  height: windowHeight,
};
