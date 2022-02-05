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

export const servicesColor = {
  'd9b62d64-f279-42fb-b978-c6d7d93bc4c6': '#1f49a7',
  '3a6992bb-8181-4209-a601-f2c53662f978': '#60c302',
  '41aa65b0-73a8-4506-9cf2-75427e07a9fd': '#1bca5c',
  '562cf92b-e3d2-47db-a5e8-5e58ed16936b': '#008654',
  'e427f7c6-0028-4934-92b4-234884025106': '#f21a0c',
  'e427f7c6-0028-4934-92b4-234884025106': '#f21a0c',
  '44ab2f1d-9e90-4a02-aaf3-7f1a8cfd45e7': 'black',
};
