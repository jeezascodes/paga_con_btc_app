import {ThemeTypes} from '../constans/Constants';

export const FixedColors = () => {
  return {
    sliderYellow: 'rgb(234,173,79)',
    sliderGreen: 'rgb(104,179,158)',
    sliderRed: 'rgb(217,118,91)',
    swipeRightRed: 'rgb(224,128,95)',
    white: 'rgb(255,255,255)',
    barBackground: 'rgba(255,255,255,0.2)',
    borderWheel: 'rgb(233,230,228)',
    blackTextChat: 'rgb(43, 47, 52)',
    shadowTextChat: 'rgba(214, 214, 214, 0.25)',
    mentalHealthPalette: ['#C1E8F2', '#ACE0EC', '#97D8E7', '#62C8DF'],
    physicalHealthPalette: [
      '#AFA8D1',
      '#BFB9DA',
      '#CFCBE3',
      '#DFDCED',
      '#EFEEF6',
    ],
    socialLifePalette: ['#FBD284', '#F9C35B', '#F8B432', '#F0B240'],
    financialsPalette: ['#85C893', '#74C585', '#64C278', '#53BF6A'],
    innerSelfPalette: ['#FD9F8A', '#FD7F63', '#FC5F3C', '#F33E15'],
    lovePalette: ['#F4CACF', '#F2B7BE', '#F1A4AD', '#EF909B'],
    disabledCalendar: 'rgb(169,169,169)',
    error: '#D9765B',
    pending: 'rgb(252,95,60)',
  };
};

export const Colors = theme => {
  if (theme === ThemeTypes.DARK) {
    return {
      shadowColor: 'rgb(0,0,0)', // Didn't find any example on dark theme
      white: 'rgb(255,255,255)', // For use in icons
      modalBackground: 'rgba(65, 73, 139, 0.44)',
      textColor: 'rgb(240,241,247)',
      brandColor: 'rgb(102,112,174)',
      mutedTextColor: 'rgb(179,184,214)',
      background: 'rgb(36,39,52)',
      cardColor: 'rgb(56,61,89)', // I used the actual content of figma, not the written tag
      gradientStart: 'rgb(65,73,139)', // The value here is not the same than brandcolor
      gradientEnd: 'rgb(102,112,174)', // The value here is not the same than background
      inputBorderColorAlert: 'rgb(217,118,91)', // Not defined in Figma
      codeVerifBottomBorder: 'rgb(224,226,239)',
      lightText: '#F0F1F7', // The value here is not the same than background
      gradientColorStart: '#69B49F',
      gradientColorEnd: '#E4E8F2',
      focusCodeVerifInput: '#007AFF',
      storyRoundButtonColor: 'rgba(240, 241, 247)',
      selectedCalendar: 'rgb(112, 108, 132)',
      dotColor: 'rgba(104, 179, 158, 1)',
    };
  } else {
    return {
      shadowColor: 'rgb(210,210,210)',
      white: 'rgb(255,255,255)', // For use in icons
      modalBackground: 'rgba(65, 73, 139, 0.44)',
      textColor: 'rgb(65,73,140)',
      brandColor: 'rgb(101,112,175)',
      mutedTextColor: 'rgb(186,187,220)',
      background: 'rgb(231,230,242)',
      cardColor: 'rgb(255,255,255)',
      gradientStart: 'rgb(101,112,175)',
      gradientEnd: 'rgb(231,230,242)',
      inputBorderColorAlert: 'rgb(217,118,91)', // Not defined in Figma
      codeVerifBottomBorder: 'rgb(43,61,114)',
      lightText: '#FFF', // The value here is not the same than background
      gradientColorStart: '#69B49F',
      gradientColorEnd: '#E4E8F2',
      focusCodeVerifInput: '#007AFF',
      storyRoundButtonColor: 'rgb(255, 255, 255)',
      selectedCalendar: 'rgb(196, 228, 220)',
      dotColor: 'rgba(105, 114, 177, 1)',
    };
  }
};
