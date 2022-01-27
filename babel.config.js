module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        cwd: 'babelrc',
        root: ['./src'],
        extensions: ['.js', '.ios.js', '.android.js'],
        alias: {
          _components: './src/components',
          _molecules: './src/components/molecules',
          _atoms: './src/components/atoms',
          _organisms: './src/components/organisms',
          _navigator: './src/navigator',
          _screens: './src/screens',
          _data: './src/data',
          _store: './src/store',
          _utils: './src/utils',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: null,
        safe: false,
        allowUndefined: true,
        verbose: false,
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
