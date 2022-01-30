import {ThemeTypes} from '../constans/Constants';
const {LIGHT} = ThemeTypes;

export const FixedColors = () => {
  return {};
};

export const AppColors = theme => {
  if (theme === ThemeTypes.DARK) {
    return {
      background: 'rgb(0,0,0)',
      brandColor: 'rgb(248, 202, 18)',
      black: 'rgb(0,0,0)',
      textColor: 'white',
      lightText: 'white',
      white: 'white',
    };
  } else {
    return {
      background: 'rgb(0,0,0)',
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
