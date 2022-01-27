import {getHeight} from '_utils/helpers/interfaceDimensions';

export function dailyQuoteStyles(theme) {
  return {
    logoContainer: {
      alignItems: 'center',
      borderColor: 'red',
      borderWidth: 1,
      height: '50%',
    },
    messageContainer: {
      paddingTop: getHeight(120),
      height: '50%',
      justifyContent: 'flex-start',
      borderColor: 'blue',
      borderWidth: 1,
    },
    quoteContainer: {
      marginTop: getHeight(30),
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      borderColor: 'green',
      borderWidth: 1,
    },
  };
}
