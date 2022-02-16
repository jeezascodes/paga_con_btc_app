import {getHeight, getWidth} from '_utils/helpers/interfaceDimensions';

export const GlobalStyles = () => {
  return {
    topMargin: {marginTop: getHeight(30)},
    verticalSeparation: {marginVertical: getHeight(28)},
    horizontalPadding: {paddingHorizontal: getHeight(20)},
    HorizontalViewStyles: {
      marginHorizontal: getWidth(19),
    },
    fullWidthContainer: {width: '100%', alignItems: 'center'},
  };
};
export const flexContent = {
  flex: 1,
};
