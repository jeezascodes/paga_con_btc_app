import {Appearance} from 'react-native';

// export const ThemeProvider = Appearance.getColorScheme();

import {useState, useEffect} from 'react';

//Método que codifica las credenciales
// import {ThemeTypes} from '../utils/Constants';
export const useTheme = () => {
  const [theme, setTheme] = useState('');
  // List of Actions

  useEffect(() => {
    const listener = Appearance.addChangeListener(({colorScheme}) =>
      setTheme(colorScheme),
    );
    return () => {
      Appearance.removeChangeListener(listener);
    };
  }, []);

  useEffect(() => {
    setTheme(Appearance.getColorScheme());
  });

  return {
    theme,
  };
};
