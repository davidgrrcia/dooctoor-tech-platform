module.exports = function (api) {
  api.cache(true);
  let plugins = [];

  return {
    presets: ['nativewind/babel', ['babel-preset-expo', { jsxImportSource: 'nativewind' }]],
    plugins,
  };
};
