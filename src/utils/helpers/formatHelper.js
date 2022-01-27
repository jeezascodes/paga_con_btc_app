class FormatHelper {
  // convert value to percentage string // 34.34343 to 34.34%
  ToPercentString = (value, decimalPlaces = 2) => {
    return value.toFixed(decimalPlaces) + '%';
  };
  SeparateText = text => {
    return text
      .replace(/([A-Z])/g, ' $1')
      .replace(/([,])/g, '$1 ')
      .replace('and', ' ')
      .replace(/\b\w/g, l => l.toUpperCase())
      .trim();
  };
  RemoveSlash = text => {
    return text?.replace(/([\\"])/g, '$1');
  };
}

export default new FormatHelper();
