const path = require('path');
const LicenseInfoWebpackPlugin = require('license-info-webpack-plugin').default;
const TerserPlugin = require('terser-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const constants = require('./constants');

const SOURCE_DIR_NAME = 'spa';
const OUTPUT_DIR_NAME = 'spa-dist/public';

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const plugins = [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({template: './index.html'}),
  ];
  if (isProduction) {
    plugins.push(
      new CleanWebpackPlugin([OUTPUT_DIR_NAME]),
      new LicenseInfoWebpackPlugin({
        glob: '{LICENSE,license,License}*',
      })
    );
  }
  return {
    context: path.resolve(__dirname, SOURCE_DIR_NAME),
    entry: {
      bundle: './index.js',
    },
    output: {
      path: path.resolve(__dirname, OUTPUT_DIR_NAME),
      filename: isProduction ? '[name].[contentHash].js' : '[name].js',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          include: path.resolve(__dirname, SOURCE_DIR_NAME),
          use: 'vue-loader',
        },
        {
          test: /\.css$/,
          include: path.resolve(__dirname, SOURCE_DIR_NAME),
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          include: path.resolve(__dirname, SOURCE_DIR_NAME),
          use: 'babel-loader',
        },
      ],
    },
    plugins,
    optimization: isProduction
      ? {
          minimizer: [
            new TerserPlugin({
              terserOptions: {
                output: {
                  comments: /^\**!|@preserve|@license|@cc_on/,
                },
              },
            }),
          ],
        }
      : {},
    devServer: {
      port: constants.SPA_PORT_NUMBER,
      contentBase: path.resolve(__dirname, OUTPUT_DIR_NAME),
      historyApiFallback: true,
    },
  };
};
