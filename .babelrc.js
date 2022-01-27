const plugins = [
  [
    require.resolve('babel-plugin-module-resolver'),
    {
      root: ['./src/'],
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
];
