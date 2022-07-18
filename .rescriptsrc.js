// https://github.com/arackaf/customize-cra/blob/master/src/customizers/webpack.js

const AntdScssThemePlugin = require('antd-scss-theme-plugin');
const { edit, remove, getPaths } = require('@rescripts/utilities');
const path = require('path');

module.exports = [
  {
    webpack: (config) => {
      config.output.libraryTarget = 'amd';
      config.output.filename = 'static/js/bundle.js';

      config.resolve.extensions = [...config.resolve.extensions, '.less'];
      config.plugins = [
        ...config.plugins,
        new AntdScssThemePlugin('./src/styles/bt-ux-framework/plugin-customization/antdesign/theme.scss'),
      ];

      config = addLoaders()(config);

      config.optimization.splitChunks = {
        cacheGroups: {
          default: false,
        },
      };
      config.optimization.runtimeChunk = false;

      return config;
    },
    devServer: (config) => {
      config.headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      };

      return config;
    },
  },
  [
    'use-babel-config',
    {
      presets: ['react-app'],
      plugins: [
        [
          'import',
          {
            libraryName: 'antd',
            style: true,
          },
        ],
      ],
    },
  ],
];

const addLoaders =
  (loaderOptions = {}) =>
  (config) => {
    const mode = process.env.NODE_ENV === 'development' ? 'dev' : 'prod';

    // Need these for production mode, which are copied from react-scripts
    const shouldUseSourceMap = mode === 'prod' && process.env.GENERATE_SOURCEMAP !== 'false';
    const lessRegex = /\.less$/;
    const sassRegex = /\.(scss|sass)$/;
    const lessModuleRegex = /\.module\.less$/;
    const localIdentName = loaderOptions.localIdentName || '[path][name]__[local]--[hash:base64:5]';

    const loadersMatcher = (inQuestion) =>
      inQuestion.rules && inQuestion.rules.find((rule) => Array.isArray(rule.oneOf));
    const sassMatcher = (inQuestion) => inQuestion.test && inQuestion.test.toString() === sassRegex.toString();

    // Insert less-loader as the penultimate item of loaders (before file-loader)

    const getStyleLoader = (cssOptions, styleLoaderOptions = {}) => [
      {
        loader: 'style-loader',
        options: styleLoaderOptions,
      },
      {
        loader: require.resolve('css-loader'),
        options: cssOptions,
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3,
            }),
          ],
          sourceMap: shouldUseSourceMap,
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: process.env.NODE_ENV !== 'production',
        },
      },
    ];

    const getSassLoader = (cssOptions) => {
      const styleLoaderOptions = { injectType: 'lazyStyleTag' };
      return getStyleLoader(cssOptions, styleLoaderOptions);
    };
    const getLessLoader = (cssOptions) => {
      //Insert option adds antd styles to the top of <head> tag
      const styleLoaderOptions = {
        insert: function insertAtTop(element) {
          var parent = document.querySelector('head');
          // eslint-disable-next-line no-underscore-dangle
          var lastInsertedElement = window._lastElementInsertedByStyleLoader;

          if (!lastInsertedElement) {
            parent.insertBefore(element, parent.firstChild);
          } else if (lastInsertedElement.nextSibling) {
            parent.insertBefore(element, lastInsertedElement.nextSibling);
          } else {
            parent.appendChild(element);
          }

          // eslint-disable-next-line no-underscore-dangle
          window._lastElementInsertedByStyleLoader = element;
        },
      };

      return [
        ...getStyleLoader(cssOptions, styleLoaderOptions),
        AntdScssThemePlugin.themify({
          loader: 'less-loader',
          options: {
            javascriptEnabled: true,
            sourceMap: process.env.NODE_ENV !== 'production',
          },
        }),
      ];
    };

    const transform = (match) => ({
      ...match,
      rules: [
        ...match.rules.filter((rule) => !Array.isArray(rule.oneOf)),
        {
          oneOf: [
            {
              test: lessRegex,
              exclude: lessModuleRegex,
              use: getLessLoader({
                importLoaders: 2,
              }),
              sideEffects: mode === 'prod',
            },
            {
              test: lessModuleRegex,
              use: getLessLoader({
                importLoaders: 2,
                modules: {
                  mode: 'local',
                  localIdentName: localIdentName,
                },
              }),
            },
            {
              test: sassRegex,
              exclude: [path.resolve(__dirname, 'node_modules')],
              use: getSassLoader({ importLoaders: 1 }),
              sideEffects: true,
            },

            ...match.rules.find((rule) => Array.isArray(rule.oneOf)).oneOf,
          ],
        },
      ],
    });

    config = remove(getPaths(sassMatcher, config), config);
    config = edit(transform, getPaths(loadersMatcher, config), config);

    return config;
  };
