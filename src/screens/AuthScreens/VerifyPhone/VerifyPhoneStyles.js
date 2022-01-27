import {FixedColors} from '_utils/styles/colors';
import {getWidth, getHeight} from '_utils/helpers/interfaceDimensions';

export const verifyPhoneStyles = () => {
  return {
    logoContainer: {
      alignItems: 'center',
      marginVertical: getHeight(75),
      alignSelf: 'stretch',
    },
    wrapper: {
      flex: 1,
      justifyContent: 'space-between',
      alignSelf: 'stretch',
    },
    errorMessage: {
      color: FixedColors().error,
      fontSize: getWidth(15),
      paddingHorizontal: getWidth(20),
    },
    resendCode: {textAlign: 'center', marginBottom: getWidth(30)},
  };
};
