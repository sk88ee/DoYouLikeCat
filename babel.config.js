const presets = ['module:metro-react-native-babel-preset'];
const plugins = [
  [
    'module-resolver',
    {
      root: ['./src'],
      alias: {
        '@assets': './src/assets',
        '@components': './src/components',
        '@screens': './src/screens',
        '@common': './src/common',
        '@libs': './src/libs',
        '@stores': './src/stores',
        '@utils': './src/utils',
        '@services': './src/services',
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
];

module.exports = {
  presets,
  plugins,
};
