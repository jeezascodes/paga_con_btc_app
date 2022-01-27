import {Colors} from '../../utils/styles';
import {getWidth, getHeight} from '_utils/helpers/interfaceDimensions';
import {FixedColors} from '_utils/styles/colors';

export const registerPhoneStyles = () => {
  return {
    logoContainer: {
      alignItems: 'center',
      marginVertical: getHeight(65),
      alignSelf: 'stretch',
    },
    wrapper: {
      flex: 1,
      justifyContent: 'space-between',
      alignSelf: 'stretch',
    },
    checkBoxContainer: {flexDirection: 'row', marginTop: getHeight(20)},
    link: {textDecorationLine: 'underline'},
    termsContainer: {
      marginVertical: getHeight(40),
      marginHorizontal: getWidth(20),
    },
    errorMessage: {
      color: FixedColors().error,
      fontSize: getWidth(15),
    },
  };
};
