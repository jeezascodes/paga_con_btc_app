import {ThemeTypes} from '../constans/Constants';
const {LIGHT} = ThemeTypes;

export const FixedColors = () => {
  return {};
};

export const AppColors = theme => {
  if (theme === ThemeTypes.DARK) {
    return {
      background: 'white',
      brandColor: 'rgb(248, 202, 18)',
      black: 'black',
      textColor: 'white',
      lightText: 'white',
      white: 'white',
    };
  } else {
    return {
      background: 'white',
      brandColor: 'rgb(248, 202, 18)',
      black: 'rgb(0,0,0)',
      textColor: 'rgb(0,0,0)',
      lightText: 'white',
      white: 'white',
    };
  }
};

export const colorOpacity = (color = '', opacity = '') => {
  return color.replace('(', 'a(').replace(')', `,${opacity})`);
};
