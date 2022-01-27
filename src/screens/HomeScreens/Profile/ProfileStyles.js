import {StyleSheet} from 'react-native';
import {getHeight, getWidth} from '_utils/helpers/interfaceDimensions';
import {Colors} from '_utils/styles';
import {colorByMood} from '_utils/styles/colors';

export const styles = StyleSheet.create({
  contain: {marginBottom: getHeight(60)},
  formContain: {marginTop: getHeight(30)},
  modalContent: {
    height: getHeight(300),
    justifyContent: 'space-between',
    paddingHorizontal: getWidth(45),
  },
  modalButtonWrapper: {marginBottom: getHeight(20)},
  deleteAccount: {alignItems: 'center', marginVertical: getHeight(25)},
  centerText: {textAlign: 'center'},
  modalBody: {width: '100%'},
  bodyContent: {width: '100%', justifyContent: 'center', alignItems: 'center'},
  modalButton: {
    marginTop: getHeight(70),
    marginBottom: getHeight(40),
    justifyContent: 'space-between',
  },
  bodyText: {marginVertical: getHeight(12)},
  modalTitle: mood => ({marginBottom: getHeight(20), color: colorByMood(mood)}),
  icon: (selected, theme) => ({
    borderWidth: selected ? 3 : 0,
    borderColor: Colors(theme).textColor,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  }),
});
