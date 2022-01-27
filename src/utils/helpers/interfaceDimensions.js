import {Dimensions} from 'react-native';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
export const designWidth = 375;
export const designHeight = 812;

export const getWidth = size => {
  if (typeof size === 'number') {
    return (windowWidth * size) / designWidth;
  }

  return size;
};

export const getHeight = size => {
  if (typeof size === 'number') {
    return (windowHeight * size) / designHeight;
  }

  return size;
};
