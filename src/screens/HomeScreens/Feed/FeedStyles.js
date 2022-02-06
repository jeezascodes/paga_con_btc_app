import {
  getHeight,
  getWidth,
  windowWidth,
} from '_utils/helpers/interfaceDimensions';

export const feedStyles = (theme, isListDone) => {
  const ModalContainer = {
    justifyContent: 'center',
    marginHorizontal: 0,
    width: '100%',
    paddingVertical: getHeight(10),
    paddingHorizontal: getWidth(20),
  };

  if (!isListDone) {
    ModalContainer.height = getHeight(550);
  }
  return {
    topMargin: {marginTop: getHeight(30)},
    verticalSeparation: {marginVertical: getHeight(18)},
    titleStyles: {marginBottom: getHeight(15)},
    HorizontalViewStyles: {
      marginHorizontal: getWidth(19),
    },
    bottomMargin: {marginBottom: getHeight(30)},
    ModalContainer,
    CheckListContainer: {
      justifyContent: 'center',
      marginHorizontal: 0,
      width: '100%',
      paddingVertical: getHeight(10),
      paddingHorizontal: getWidth(20),
    },
  };
};

export const thumbnails = {
  width: '70%',
  height: getHeight(100),
  resizeMode: 'contain',
};

export const cardContainer = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
};

export const cardWrapper = {
  width: windowWidth / 1.8,
  paddingBottom: getWidth(10),
};

export const scrollViewStyles = {
  // backgroundColor: '#f7f7f7',
  // borderBottomLeftRadius: getWidth(40),
  // borderBottomRightRadius: getWidth(40),
};

export const emoji = {
  width: getHeight(25),
  resizeMode: 'contain',
  marginLeft: getWidth(10),
};
